# Outlines the "Monedo" wordmark from Geist SemiBold so the logo does not depend on fonts.
# Usage: pip install fonttools && python scripts/generate-wordmark.py node_modules/geist/dist/fonts/geist-sans/Geist-SemiBold.ttf
# Paste the resulting "d" into src/components/graphics/wordmark-path.ts and public/brand/*.svg.
import json, sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

font = TTFont(sys.argv[1])
text = "Monedo"
size = 100.0                     # output units = px at font-size 100
tracking = -0.025                # em, matches the UI wordmark
upm = font["head"].unitsPerEm
scale = size / upm
cmap = font.getBestCmap()
gs = font.getGlyphSet()
hmtx = font["hmtx"]
# Kerning from the legacy kern table if present (Geist ships GPOS; letters here kern little).
x = 0.0
parts = []
for ch in text:
    name = cmap[ord(ch)]
    pen = SVGPathPen(gs, ntos=lambda v: f"{round(v, 2):g}")
    gs[name].draw(TransformPen(pen, (scale, 0, 0, -scale, x, 0)))
    parts.append(pen.getCommands())
    x += hmtx[name][0] * scale + tracking * size
width = x - tracking * size
os2 = font["OS/2"]
print(json.dumps({
    "d": " ".join(parts),
    "width": round(width, 2),
    "capHeight": round(os2.sCapHeight * scale, 2),
    "xHeight": round(os2.sxHeight * scale, 2),
    "descender": round(-font["hhea"].descent * scale, 2),
}))
