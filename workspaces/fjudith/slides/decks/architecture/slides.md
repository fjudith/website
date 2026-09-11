---
theme: default
title: Architecture Overview
info: |
  ## Example folder-based Slidev deck
  Demonstrates the slides/<name>/slides.md layout, where a deck can colocate
  its own assets and components.
transition: slide-left
mdc: true
---

# Architecture Overview

A second deck, using the folder layout (`slides/architecture/slides.md`)

<div class="pt-12">
  <span class="px-2 py-1 rounded bg-white bg-opacity-10">
    Press <kbd>space</kbd> to advance
  </span>
</div>

---

# Why a folder deck?

Keeping a deck in its own folder lets it carry its own resources:

- 🖼️ **Images** next to the slides that use them
- 🧩 **Components** scoped to this deck
- 🎨 **Theme overrides** without affecting other decks

The build script discovers `slides/<name>/slides.md` automatically.

---

layout: center
class: text-center
---

# Add as many as you like

Drop `slides/<name>.md` or `slides/<name>/slides.md` and it builds to
`/slides/<name>/`, listed on the decks index page.
