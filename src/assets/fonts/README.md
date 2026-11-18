# Fonts

All fonts here are licensed under the SIL Open Font License 1.1.

| File | Source | Used for |
|---|---|---|
| `Geist-*.ttf`, `GeistMono-Regular.ttf` | [Geist](https://github.com/vercel/geist-font) | Open Graph image (`next/og` needs TTF) |
| `ArchivoExpanded-Black.woff2` | [Archivo](https://github.com/google/fonts/tree/main/ofl/archivo) | Display face (`font-display-wide`) |

`ArchivoExpanded-Black.woff2` is the Archivo variable font frozen at `wdth 125 / wght 900` and
subset to Basic Latin, Lithuanian letters and a few punctuation marks (7 KB instead of ~170 KB).
To rebuild it (Python with `fonttools` and `brotli`):

```python
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.subset import Subsetter, Options

font = instantiateVariableFont(TTFont("Archivo[wdth,wght].ttf"), {"wght": 900, "wdth": 125}, updateFontNames=True)
text = "".join(chr(c) for c in range(0x20, 0x7F)) + "ĄČĘĖĮŠŲŪŽąčęėįšųūž·–—’„“”…×"
options = Options()
options.flavor = "woff2"
options.layout_features = ["kern", "liga", "case", "tnum"]
options.name_IDs = ["*"]
subsetter = Subsetter(options=options)
subsetter.populate(text=text)
subsetter.subset(font)
font.flavor = "woff2"
font.save("ArchivoExpanded-Black.woff2")
```

If you add a heading with a character outside that set (e.g. another language), rebuild the subset.
