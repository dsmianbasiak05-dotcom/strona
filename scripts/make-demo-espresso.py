# Demo Espresso mock-up = the official No.1 jar render recoloured.
#
#   python3 scripts/make-demo-espresso.py \
#     public/images/products/no-1/jar-front.jpg \
#     public/images/products/demo-espresso/jar-front-espresso.jpg
#
# - Geometry, lighting, background, shadow and the MONCRÉ / FOR DAILY CHAOS
#   print are kept exactly; cream print stays cream.
# - Navy is replaced by espresso with per-pixel luminance preserved.
#   Anti-aliased print edges are treated as cream/navy mixes, so no halos.
# - Only the small "No.1 matte clay" line is removed (the demo must not
#   claim to be No.1). One opaque image, no layering.
# Requires: Pillow, numpy.
import sys
from collections import deque
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

src, dst = sys.argv[1], sys.argv[2]
img = np.asarray(Image.open(src).convert("RGB")).astype(np.float32)
H, W, _ = img.shape
R, G, B = img[..., 0], img[..., 1], img[..., 2]
lum = lambda a: 0.2126 * a[..., 0] + 0.7152 * a[..., 1] + 0.0722 * a[..., 2]

# 1. jar silhouette: everything not reachable from the border through neutral greys
neutral = (np.abs(G - R) <= 7) & (B - R >= -9) & (B - R <= 10) & (R > 60)
bg = np.zeros((H, W), bool)
q = deque((y, x) for x in range(W) for y in (0, H - 1) if neutral[y, x])
q.extend((y, x) for y in range(H) for x in (0, W - 1) if neutral[y, x])
for y, x in q:
    bg[y, x] = True
while q:
    y, x = q.popleft()
    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        ny, nx = y + dy, x + dx
        if 0 <= ny < H and 0 <= nx < W and neutral[ny, nx] and not bg[ny, nx]:
            bg[ny, nx] = True
            q.append((ny, nx))
jm = Image.fromarray((~bg * 255).astype(np.uint8))
jm = jm.filter(ImageFilter.MaxFilter(11)).filter(ImageFilter.MinFilter(11)).filter(ImageFilter.GaussianBlur(8))
jar = np.asarray(jm) > 127

# 2. remove only the "No.1 matte clay" line (box measured on the 2000 px render)
x0, x1, y0, y1 = 1378, 1648, 890, 972
box = np.zeros((H, W), bool); box[y0:y1, x0:x1] = True
print_px = box & jar & ((B - R) < 18)
print_px = np.asarray(Image.fromarray((print_px * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(5))) > 0
print_px &= box
clean = img.copy()
for x in range(x0, x1):
    ref = img[y0 - 30:y0 - 4, x]                    # clean navy right above the line
    clean[print_px[:, x], x] = np.median(ref, axis=0)
R, G, B = clean[..., 0], clean[..., 1], clean[..., 2]

# 3. recolour: pixel = c·cream + (1−c)·navy  →  c·cream + (1−c)·espresso
cream = np.array([245, 239, 223], np.float32)
navy = np.array([40, 44, 68], np.float32)
espresso = np.array([56, 40, 33], np.float32)
L = lum(clean)[..., None]
# cream share: warm hue AND bright — dark warm-ish pixels (lid groove) stay "navy"
c = (np.clip((28 - (B - R)) / 50, 0, 1) * np.clip((lum(clean) - 60) / 80, 0, 1))[..., None]
n_lum = np.clip((L - c * lum(cream[None, None])[..., None]) / np.maximum(1 - c, 0.05), 0, 255)
n_est = navy * (n_lum / lum(navy[None, None])[..., None])
e_est = espresso * (n_lum / lum(espresso[None, None])[..., None])
# fade very bright speculars to neutral so they never tint orange
k = np.clip((n_lum / lum(espresso[None, None])[..., None] - 1.15) / 1.4, 0, 0.85)
e_est = e_est * (1 - k) + n_lum * k
recol = np.clip(clean + (1 - c) * (e_est - n_est), 0, 255)

alpha = np.asarray(Image.fromarray((jar * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2))).astype(np.float32)[..., None] / 255
out = img * (1 - alpha) + recol * alpha
im = Image.fromarray(out.astype(np.uint8))

# 4. explicit marker
d = ImageDraw.Draw(im)
font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf", 34)
label = "D E M O   /   C O N C E P T"
d.text(((W - d.textlength(label, font=font)) / 2, 1790), label, font=font, fill=(120, 118, 112))
im.save(dst, quality=90, optimize=True)
print("print px removed:", int(print_px.sum()))
