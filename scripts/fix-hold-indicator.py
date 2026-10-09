"""Redraw the HOLD strength indicator on the matte-clay box-back render.

5 cells in one row on the box's right face: cells 1-4 filled, cell 5 an
outline only; equal size, equal gap, following the face's perspective
(vertical sides, top/bottom edges sloping with the printed rules).
Only the indicator area is touched.

usage: python3 -I scripts/fix-hold-indicator.py <source.png> <out.png>
"""
import sys

import numpy as np
from PIL import Image, ImageDraw

SRC, OUT = sys.argv[1], sys.argv[2]
CREAM = (245, 239, 218)

# Old indicator area (and a ring around it for the navy fill).
X0, Y0, X1, Y1 = 929, 264, 970, 294

# New indicator geometry, in image px.
LEFT, TOP = 935.0, 276.5  # top-left corner of cell 1
SLOPE = -0.28  # rise of the face's horizontals per px (from the rules)
W, GAP, H = 4.6, 2.0, 13.0  # foreshortened width, gap, height
STROKE = 1.1
SS = 16  # supersampling

img = Image.open(SRC).convert("RGBA")
a = np.asarray(img).astype(float)

# 1. Erase the old marks: fill the box with a plane fitted to the navy ring.
ys, xs = np.mgrid[Y0 - 4 : Y1 + 4, X0 - 4 : X1 + 4]
ring = ~((ys >= Y0) & (ys < Y1) & (xs >= X0) & (xs < X1))
A = np.c_[xs[ring], ys[ring], np.ones(ring.sum())]
yy, xx = np.mgrid[Y0:Y1, X0:X1]
for c in range(3):
    coef, *_ = np.linalg.lstsq(A, a[ys[ring], xs[ring], c], rcond=None)
    a[Y0:Y1, X0:X1, c] = coef[0] * xx + coef[1] * yy + coef[2]
base = Image.fromarray(a.clip(0, 255).astype(np.uint8), "RGBA")

# 2. Draw the cells supersampled into a coverage mask, then downsample.
pad = 6
ox, oy = int(LEFT) - pad, int(TOP + SLOPE * 5 * (W + GAP)) - pad
mw, mh = int(5 * (W + GAP)) + 2 * pad, int(H - SLOPE * 5 * (W + GAP)) + 2 * pad
mask = Image.new("L", (mw * SS, mh * SS), 0)
d = ImageDraw.Draw(mask)


def cell(x, inset=0.0):
    """Parallelogram of a cell starting at x, shrunk by `inset` px."""
    xa, xb = x + inset, x + W - inset
    ta, tb = TOP + SLOPE * (xa - LEFT) + inset, TOP + SLOPE * (xb - LEFT) + inset
    pts = [(xa, ta), (xb, tb), (xb, tb + H - 2 * inset), (xa, ta + H - 2 * inset)]
    return [((px - ox) * SS, (py - oy) * SS) for px, py in pts]


for k in range(5):
    x = LEFT + k * (W + GAP)
    d.polygon(cell(x), fill=255)
    if k == 4:  # empty cell: keep only the outline
        d.polygon(cell(x, STROKE), fill=0)

cov = np.asarray(mask.resize((mw, mh), Image.BOX)).astype(float)[..., None] / 255
out = np.asarray(base).astype(float)
region = out[oy : oy + mh, ox : ox + mw, :3]
out[oy : oy + mh, ox : ox + mw, :3] = region * (1 - cov) + np.array(CREAM) * cov
Image.fromarray(out.clip(0, 255).astype(np.uint8), "RGBA").save(OUT, optimize=True)
print("saved", OUT)
