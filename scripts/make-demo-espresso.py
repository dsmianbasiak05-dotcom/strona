# Usage: python3 scripts/make-demo-espresso.py public/images/products/no-1/jar-front.jpg public/images/products/demo-espresso/jar-front.jpg
# Requires: Pillow, numpy.
# Demo Espresso mockup = No.1 jar render with (1) all printed text/logo removed,
# (2) navy recoloured to espresso preserving per-pixel luminance. Geometry,
# lighting, studio background and shadow are untouched.
import sys
from collections import deque
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

src, dst = sys.argv[1], sys.argv[2]
img = np.asarray(Image.open(src).convert("RGB")).astype(np.float32)
H, W, _ = img.shape
R, G, B = img[..., 0], img[..., 1], img[..., 2]

# 1. background (+ shadow) = neutral greys connected to the border
neutral = (np.abs(G - R) <= 7) & (B - R >= -9) & (B - R <= 10) & (R > 60)
bg = np.zeros((H, W), bool)
q = deque()
for x in range(W):
    for y in (0, H - 1):
        if neutral[y, x] and not bg[y, x]:
            bg[y, x] = True; q.append((y, x))
for y in range(H):
    for x in (0, W - 1):
        if neutral[y, x] and not bg[y, x]:
            bg[y, x] = True; q.append((y, x))
while q:
    y, x = q.popleft()
    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        ny, nx = y + dy, x + dx
        if 0 <= ny < H and 0 <= nx < W and neutral[ny, nx] and not bg[ny, nx]:
            bg[ny, nx] = True; q.append((ny, nx))
jar = ~bg
# Morphological closing: letter anti-aliasing that touches the jar outline
# reads as "neutral" and leaks into the background; pull it back in.
jm = Image.fromarray((jar * 255).astype(np.uint8))
jm = jm.filter(ImageFilter.MaxFilter(11)).filter(ImageFilter.MinFilter(11))
jar = np.asarray(jm.filter(ImageFilter.GaussianBlur(8))) > 127  # smooth the contour

# 2. printed text = warm/cream pixels inside the jar (navy has B-R ≈ +28)
# Printed text exists only on the jar body (below the lid groove at y≈856 in
# the 2000 px render) and is bright cream — lid ribs are never touched.
BODY_TOP = 856
yy = np.arange(H)[:, None]
lum0 = 0.2126 * R + 0.7152 * G + 0.0722 * B
cream = jar & ((B - R) < 18) & (lum0 > 75) & (yy >= BODY_TOP)
text = np.asarray(Image.fromarray((cream * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(7))) > 0
text &= jar & (yy >= BODY_TOP - 2)
body = jar & ~text

# column shading profile from clean body pixels in the label band
rows = np.where(text.any(axis=1))[0]
y0, y1 = rows.min(), rows.max()
band_body = body.copy(); band_body[:y0] = False; band_body[y1 + 1:] = False
prof = np.full((W, 3), np.nan, np.float32)
for x in range(W):
    ys = np.where(band_body[:, x])[0]
    if len(ys) > 20:
        prof[x] = np.median(img[ys, x], axis=0)
xs = np.arange(W); ok = ~np.isnan(prof[:, 0])
for c in range(3):
    prof[:, c] = np.interp(xs, xs[ok], prof[ok, c])
# vertical factor per row (soft top/bottom falloff of the label)
rowf = np.ones(H, np.float32)
for y in range(y0, y1 + 1):
    xs_b = np.where(band_body[y])[0]
    if len(xs_b) > 30:
        rowf[y] = np.median(img[y, xs_b].mean(axis=1) / np.maximum(prof[xs_b].mean(axis=1), 1))
rowf[y0:y1 + 1] = np.convolve(np.pad(rowf[y0:y1 + 1], 25, mode="edge"), np.ones(51) / 51, mode="valid")

clean = img.copy()
fill = prof[None, :, :] * rowf[:, None, None]
clean[text] = fill[text]

# 3. navy → espresso, luminance preserving
lum = lambda a: 0.2126 * a[..., 0] + 0.7152 * a[..., 1] + 0.0722 * a[..., 2]
navy = np.array([40, 44, 68], np.float32)
espresso = np.array([54, 39, 32], np.float32)  # deep espresso
scale = (lum(clean) / lum(navy[None, None, :]))[..., None]
recol = espresso[None, None, :] * scale
# Bright speculars would tint orange when scaled — fade them to neutral light.
L = lum(clean)[..., None]
w = np.clip((scale - 1.5) / 1.5, 0, 1)
recol = np.clip(recol * (1 - w) + np.repeat(L, 3, axis=2) * w, 0, 255)

alpha = np.asarray(Image.fromarray((jar * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2))).astype(np.float32)[..., None] / 255
out = img * (1 - alpha) + recol * alpha
im = Image.fromarray(out.astype(np.uint8))

# 4. explicit marker
d = ImageDraw.Draw(im)
font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf", 34)
label = "D E M O   /   C O N C E P T"
w = d.textlength(label, font=font)
d.text(((W - w) / 2, 1790), label, font=font, fill=(120, 118, 112))
im.save(dst, quality=88, optimize=True)
print("text rows", y0, y1, "jar px", int(jar.sum()), "text px", int(text.sum()))
