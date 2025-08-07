# Inter

We use [Inter](https://rsms.me/inter) as our primary font. It's a variable font, which means it can be rendered at any possible weight. However, since it also contains detailed character sets for Cyrillic, Greek, and Vietnamese, it's quite large. To reduce the size of the font, we subset it to only include the characters we need.

### Subsetting

Subsetting removes characters we don't need from the font, which reduces the number of bytes our users have to download. To do this, we use the [fonttools](https://pypi.org/project/fonttools/) toolkit.

First, install fonttools:

```bash
python3 -m pip install fonttools
python3 -m pip install fonttools[ufo,lxml,woff,unicode]
```

Then, use the `pyftsubset` command to subset the font. Currently, we use the following command:

```bash
pyftsubset /path/to/full/inter.ttf --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+02BB-02BC,U+2000-206F,U+2122,U+2190-2199,U+2212,U+2215,U+FEFF,U+FFFD,U+E06B-E080,U+02E2,U+02E2,U+02B0,U+1D34,U+1D57,U+1D40,U+207F,U+1D3A,U+1D48,U+1D30,U+02B3,U+1D3F" --layout-features='*' --flavor="woff2" --output-file="Inter.var.latin.woff2"
```

Be sure to also run the command on the italic font.

The following characters are included:

- `U+0000-00FF` Basic Latin
- `U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC` Assorted Latin Extended Characters
- `U+02BB-02BC` Apostrophes
- `U+2000-206F` General Punctuation
- `U+2122` Trade Mark Sign
- `U+2190-2199` Arrow Symbols
- `U+2212` Minus Sign
- `U+2215` Division Slash
- `U+FEFF` Zero Width No-Break Space
- `U+FFFD` Replacement Character
- `U+E06B-E080` Tabular numbers, alternate numbers
- `U+02E2,U+02E2,U+02B0,U+1D34,U+1D57,U+1D40,U+207F,U+1D3A,U+1D48,U+1D30,U+02B3,U+1D3F` superscripts for s, h, t, n, d, r (full list [here](https://github.com/rsms/inter/blob/master/misc/superscript-codepoint-mapping.txt))
