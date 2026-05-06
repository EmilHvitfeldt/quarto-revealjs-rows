# grid

A [Quarto](https://quarto.org) extension for [Reveal.js](https://quarto.org/docs/presentations/revealjs/) that adds `.rows` / `.row` containers — the vertical counterpart to Quarto's built-in `.columns` / `.column`. Combine the two to lay slide content out as an arbitrary grid.

## Installation

```bash
quarto add EmilHvitfeldt/quarto-revealjs-grid
```

Or to start a new presentation from the template:

```bash
quarto use template EmilHvitfeldt/quarto-revealjs-grid
```

## Usage

Enable the plugin in your presentation's YAML:

```yaml
---
format: revealjs
revealjs-plugins:
  - grid
---
```

Then nest `.rows` / `.row` divs the same way you'd nest `.columns` / `.column`:

```markdown
## rows inside a column

::: {.columns}
::: {.column}
column 1
:::
::: {.column}
::: {.rows}
::: {.row}
row 1
:::
::: {.row}
row 2
:::
:::
:::
:::
```

You can also do it the other way around — `.rows` at the top level, `.columns` inside a `.row`:

```markdown
## columns inside a row

::: {.rows}
::: {.row}
top row
:::
::: {.row}
::: {.columns}
::: {.column}
bottom, column 1
:::
::: {.column}
bottom, column 2
:::
:::
:::
:::
```

When you put 3+ columns inside a row, give each `.column` an explicit width (Quarto's standard requirement):

```markdown
::: {.columns}
::: {.column width="33%"}
:::
::: {.column width="33%"}
:::
::: {.column width="33%"}
:::
:::
```

## How it works

`.rows` is a vertical flexbox and each `.row` gets `flex: 1`, so rows divide the available height evenly. The tricky part is making `.rows` know how much height is available — Reveal.js scales the slide and the `height: 100%` cascade is unreliable through it.

A small Reveal.js plugin (`grid.js`) hooks the `ready`, `slidechanged`, and `resize` events, walks `offsetTop` from each `.rows` up to its slide, and sets the inline height to fill from there to the bottom of the slide. The plugin only touches `.rows` on the currently presented slide, so it stays in sync as you navigate.
