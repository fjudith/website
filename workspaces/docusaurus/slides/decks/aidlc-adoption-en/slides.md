---
theme: default
title: 'AI-DLC × OpenSpec — Staying in Control When the AI Writes the Code'
info: |
  ## AI-DLC × OpenSpec — Staying in control when the AI writes the code
  Adoption talk, engineering audience (Dev · Tech Lead · Architect).

  Thread: prompt → context → harness engineering (why OpenSpec/Spec-Kit
  exist) → the vibe/spec frontier → the self-halt rule → live demo of
  co-location + real Jira hand-off → one 30-day win.
class: text-center
transition: slide-left
mdc: true
drawings:
  persist: false
---

# AI-DLC × OpenSpec

**Staying in control** when the AI writes the code

<div class="pt-8 opacity-70 text-sm">
Not "one more method." An answer to a question you already ask yourself:<br>
<b>how do I stay accountable for code I didn't type?</b>
</div>

<div class="pt-4 opacity-50 text-xs">
Product Owner · Developer · Tech Lead · Architect — ~30 min, live demo at the end
</div>

<!--
Cold open. Do NOT start with "here is AI-DLC". Start with the real fear and flip
it: the AI that codes doesn't replace you, it shifts your work toward control.
This talk explains where that control sits. 1 min.
-->

---
layout: center
class: text-center
---

# You already know this pain

<div class="mt-8 text-xl opacity-80">

The agent starts well.<br>
Then, mid-way through a long task, it **forgets**.<br>
It redoes finished work, contradicts a decision made ten minutes ago.

</div>

<div class="mt-8 text-lg opacity-60">
This isn't a model bug.<br>
It's a <b>volatile-memory</b> problem — and it has a history.
</div>

<!--
Name a pain they've ALL lived before naming any method. Don't say "OpenSpec fixes
this" here — just plant the symptom. We return to it at the harness slide. 1-2 min.
-->

---
layout: section
---

# 1 · Four eras

Prompt engineering → context engineering → **harness engineering** → loop engineering.

Each era answers the **memory volatility** of the one before.

<div class="text-xs opacity-50 mt-2 text-center">
Each era appears because the previous one had a blind spot — something it couldn't preserve.<br/>
Today we're at the "harness" stage: write the spec before the code. The rest (automating the loop, then scaling to the team) comes once this foundation is solid.
</div>

---
layout: center
hide: true
---

```mermaid
timeline
  title The eras of AI-assisted coding — 2022 → 2027
  2022 : Prompt engineering : polish the wording
  2023 : Context engineering : RAG, examples, open files
  2024 : Context overflows : compaction, the agent forgets
  2025 : Harness engineering : the durable, versioned spec
  2026 : Loop engineering : tune the execution loop
  2027 : Team adoption : co-location + human gates
```

---
layout: two-cols-header
---

# Prompt engineering

We polish the **wording**. Rephrase, assign the role, structure the ask.

![prompt engineering](./media/diagrams/prompt-engineering.drawio.svg) {class="mx-auto block h-[200px]"}

::left::

<div class="pr-4 text-sm">

- The lever: quality of the question
- A real gain — a good prompt beats a bad one

</div>

::right::

<div class="pl-4 text-sm">

**The wall**: the model knows nothing about _your_ code, _your_ conventions, _your_ past decisions.

No rewording compensates for ignorance. The prompt is **volatile**: sent, then gone.

</div>

<!--
Stress the wall, not the technique. The wall justifies the next era.
"You can't prompt your way out of not knowing the context." 2 min.
-->

---
layout: two-cols-header
---

# Context engineering

We **inject** the right context: RAG, examples, open files, docs.

![context engineering](./media/diagrams/context-engineering.drawio.svg) {class="mx-auto block h-[200px]"}

::left::

<div class="pr-4 text-sm">

- The lever: what the model has in front of it
- The agent finally knows **your** project: your code, your conventions, your architecture decisions — not a generic answer

</div>

::right::

<div class="pl-4 text-sm">

**The wall**: on a long task, context **overflows**. It compacts, and the agent forgets.

That's the pain from slide 2. Context is **volatile** too — just one level up.

</div>

<!--
This is where we tie back to the cold open. "That's why your agent forgets:
context isn't memory, it's a window that empties." 2 min.
-->

---
layout: two-cols-header
---

# Harness engineering

We **externalize** intent and state into **durable, versioned** artifacts: the spec.

![harness engineering](./media/diagrams/harness-engineering.drawio.svg) {class="mx-auto block" width=600}

::left::

<div class="pr-4 text-sm">

<v-clicks>

- The spec is **not** one more context — context lives *inside* the model's window and disappears; the spec lives *alongside* it, in the repo, on the developer's local disk
- It's not injected permanently: the agent **re-reads the spec on demand** — at the start of each stage, after compaction, when in doubt or conflict
- Diffable, PR-reviewed or reviewed in a meeting, clear accountability

</v-clicks>

</div>

::right::

<div class="pl-4 text-sm">

**The unlock**: memory stops being volatile. The agent re-reads the spec when it needs it.

This is why **OpenSpec**, **Spec-Kit** and their kin exist: several teams converged on the same move — _write the spec before the code_.

<div class="mt-3 text-xs opacity-60">
OpenSpec and Spec-Kit are the two incarnations validated internally.
</div>

</div>

<!--
The top of the arc. The harness isn't "process": it's the only known answer to
volatility. Lineage, NOT comparison — if someone asks "why not X", defer to the
annex / Q&A. 3 min.
-->

---
layout: two-cols-header
---

# What's next? Loop engineering

The next step of the arc — **not for us today, but that's where we're headed**.

![loop engineering](./media/diagrams/loop-engineering.drawio.svg) {class="mx-auto block" width=600}

::left::

<div class="pr-4 text-sm">

Once intent is stabilized (the harness), you stabilize the **loop** itself: design the execution harness as a first-class object — tools, checks, retries — fit to a class of tasks.

- The agent no longer just follows a spec
- You **tune the loop**: which tools, which deterministic checks, when to retry

</div>

::right::

<div class="pl-4 text-sm">

**Why not now**: loop engineering assumes maturity — evals in place, tasks repetitive enough to justify the investment, tolerance for autonomy.

We're starting out: harness and co-location first. The autonomous loop comes when trust and evals are there.

<div class="mt-3 text-xs opacity-60">
prompt → context → harness → <b>loop</b>. We stop at harness; we keep the heading.
</div>

</div>

<!--
"Horizon" slide: show we know what's next without pretending we're there. Defuses
the "what about fully-autonomous agents?" — answer: yes, later, when evals and trust
are there. Do NOT sell loop engineering; place it. Ref: LangChain,
"The Art of Loop Engineering". 1-2 min.
-->

---
layout: default
---

# AI-DLC: the method and its 10 principles

AI-DLC (AI-Driven Development Lifecycle, Raja SP / AWS, 2025) is a **method**, not a tool: AI becomes a central collaborator, the human states intent and keeps control at the moments that matter. OpenSpec is one incarnation of it.

<div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs mt-3">

<div class="p-2 rounded border border-gray-500/30 bg-gray-500/5">
<b class="text-teal-500">1 · Reimagine, don't retrofit</b><br>
AI is a core participant, not a bolt-on tool — design an AI-native SDLC.
</div>

<div class="p-2 rounded border border-blue-500/50 bg-blue-500/10">
<b class="text-blue-400">2 · Reverse the conversation</b><br>
Human states <i>intent</i>; AI plans, asks, executes, validates — seeking approval.
</div>

<div class="p-2 rounded border border-blue-500/50 bg-blue-500/10">
<b class="text-blue-400">3 · Design techniques in the core</b><br>
DDD / BDD / TDD become part of the method, not team-optional.
</div>

<div class="p-2 rounded border border-amber-500/50 bg-amber-500/10">
<b class="text-amber-500">4 · Align with AI capability</b><br>
AI can't be 100% autonomous — <b>human-in-the-loop</b> validation and oversight.
</div>

<div class="p-2 rounded border border-gray-500/30 bg-gray-500/5">
<b class="text-teal-500">5 · Build complex systems</b><br>
Preserve full project context — services, stakeholders, tech debt — end to end.
</div>

<div class="p-2 rounded border border-blue-500/50 bg-blue-500/10">
<b class="text-blue-400">6 · Retain human symbiosis</b><br>
Keep continuous feedback where humans add judgment; automate + document touchpoints.
</div>

<div class="p-2 rounded border border-gray-500/30 bg-gray-500/5">
<b class="text-teal-500">7 · Transition through familiarity</b><br>
Adopt gradually, integrating with concepts teams already know.
</div>

<div class="p-2 rounded border border-gray-500/30 bg-gray-500/5">
<b class="text-teal-500">8 · Streamline responsibilities</b><br>
AI holds context across disciplines → integrated teams, fewer handoffs.
</div>

<div class="p-2 rounded border border-gray-500/30 bg-gray-500/5">
<b class="text-teal-500">9 · Minimize stages, maximize flow</b><br>
Blur phase boundaries — continuous, non-linear, shorter feedback loops.
</div>

<div class="p-2 rounded border border-amber-500/50 bg-amber-500/10">
<b class="text-amber-500">10 · No hard-wired workflows</b><br>
Adaptive — AI generates a custom workflow per project's goals & constraints.
</div>

</div>

<div class="mt-3 text-xs opacity-60">
Amber = the two principles this talk leans on: <b>#4</b> puts the human at the gate, <b>#10</b> is why OpenSpec (not a fixed pipeline) carries the flow. · Source: <b>IBM Think — "The AI-DLC"</b>, from Raja SP's AI-DLC Method Definition whitepaper.
</div>

<!--
"What is the method" grounding before the vibe/spec frontier. The 10 principles come
from Raja SP's whitepaper via IBM Think — same cards as the five-role deck, for
consistency. Stress #4 (the gate) and #10 (no fixed pipeline, hence OpenSpec). ~2 min.
-->

---
layout: section
---

# 2 · Where we're headed

Before showing, let's state the **destination**.

---
layout: two-cols-header
---

# OpenSpec at a glance

`explore` → `propose` → `apply` → `archive`. Four stages, two gates.

::left::

<div class="pr-4 text-sm">

- **`explore`** — frame, sketch (reversible)
- **`propose`** — the change proposal → **Architect gate**
- **`apply`** — break down + execute → **Tech Lead gate** at entry
- **`archive`** — fold into the baseline

</div>

::right::

```mermaid {scale: 0.62}
flowchart LR
  E[explore] --> P[propose]
  P --> A[apply]
  A --> R[archive]
  style P fill:#f59e0b,color:#000
  style A fill:#f59e0b,color:#000
```

<div class="text-xs opacity-60 mt-2 pl-2">
Trimmed view. The full five-role table comes once the team is convinced.
</div>

<!--
We do NOT teach the whole checkpoint map here — just the two gates that carry the
demo. The five-role deck is the "deck 2" of the widening phase. 2 min.
-->

---
layout: default
---

# Who does what in OpenSpec?

Four roles, four stages — each gate is held by the person who can judge.

<div class="mt-3 overflow-x-auto">
<table class="text-xs w-full border-collapse">
<thead>
<tr>
  <th class="border border-gray-500/30 px-3 py-2 text-left bg-gray-500/10">Stage</th>
  <th class="border border-gray-500/30 px-3 py-2 text-center bg-teal-500/10 text-teal-400">Product Owner</th>
  <th class="border border-gray-500/30 px-3 py-2 text-center bg-amber-500/10 text-amber-400">Architect</th>
  <th class="border border-gray-500/30 px-3 py-2 text-center bg-blue-500/10 text-blue-400">Tech Lead</th>
  <th class="border border-gray-500/30 px-3 py-2 text-center bg-purple-500/10 text-purple-400">Developer</th>
</tr>
</thead>
<tbody>
<tr>
  <td class="border border-gray-500/30 px-3 py-2 font-mono font-bold">explore</td>
  <td class="border border-gray-500/30 px-3 py-2 text-center">States business intent, defines success criteria</td>
  <td class="border border-gray-500/30 px-3 py-2 text-center">Sketches technical constraints and risks</td>
  <td class="border border-gray-500/30 px-3 py-2 text-center">Identifies dependencies and impact on existing code</td>
  <td class="border border-gray-500/30 px-3 py-2 text-center opacity-40">—</td>
</tr>
<tr class="bg-amber-500/5">
  <td class="border border-gray-500/30 px-3 py-2 font-mono font-bold">propose<br><span class="text-amber-400 font-sans font-normal">▲ gate</span></td>
  <td class="border border-gray-500/30 px-3 py-2 text-center">Validates alignment with business needs</td>
  <td class="border border-gray-500/30 px-3 py-2 text-center font-semibold text-amber-400">Approves or rejects the proposal — <b>decision gate</b></td>
  <td class="border border-gray-500/30 px-3 py-2 text-center opacity-40">—</td>
  <td class="border border-gray-500/30 px-3 py-2 text-center opacity-40">—</td>
</tr>
<tr class="bg-amber-500/5">
  <td class="border border-gray-500/30 px-3 py-2 font-mono font-bold">apply<br><span class="text-amber-400 font-sans font-normal">▲ gate</span></td>
  <td class="border border-gray-500/30 px-3 py-2 text-center opacity-40">—</td>
  <td class="border border-gray-500/30 px-3 py-2 text-center">Available for arbitration if design conflict arises</td>
  <td class="border border-gray-500/30 px-3 py-2 text-center font-semibold text-amber-400">Validates task breakdown — <b>entry gate</b></td>
  <td class="border border-gray-500/30 px-3 py-2 text-center">Executes tasks from tickets, escalates blockers</td>
</tr>
<tr>
  <td class="border border-gray-500/30 px-3 py-2 font-mono font-bold">archive</td>
  <td class="border border-gray-500/30 px-3 py-2 text-center">Confirms the deliverable meets the original intent</td>
  <td class="border border-gray-500/30 px-3 py-2 text-center">Folds decisions into the architecture baseline</td>
  <td class="border border-gray-500/30 px-3 py-2 text-center">Merges the PR, updates technical documentation</td>
  <td class="border border-gray-500/30 px-3 py-2 text-center">Closes tickets, signs off on tests</td>
</tr>
</tbody>
</table>
</div>

<div class="mt-3 text-xs opacity-50">
Amber = human gates. A gate without the right person present is an empty rubber stamp.
</div>

<!--
The most operational slide in the deck. Name who does what, not just the stages.
Stress the two amber rows: propose = Architect says yes or no;
apply = Tech Lead validates the breakdown is executable BEFORE devs start.
The PO appears at explore and archive — they frame and they accept. 3 min.
-->

---
layout: two-cols-header
---

# Co-location is the point

A gate is worth nothing unless the person who can judge is **present when it fires**.

::left::

<div class="pr-4 text-sm">

<v-clicks>

- The `propose` gate with no Architect present = an empty rubber stamp
- The `apply` gate with no Tech Lead = an unvalidated breakdown going to execution
- The spec is truth; stakeholders meet **at the stages**, not at the end

</v-clicks>

</div>

::right::

<div class="pl-4 text-sm">

This is the real thesis of the demo: **not a tool, a practice**.

The agent produces; the human judges at the stage; the validated plan goes into **Jira**; the team executes.

</div>

<!--
The core of what we advocate (answer Q9). Co-location isn't optional: it's what
makes the gate real. The demo will PROVE it live. 2 min.
-->

---
layout: section
---

# 3 · Live demo

OpenSpec from `explore` to `archive`, gate visible, **real** Jira hand-off.

---
layout: two-cols-header
---

# What the demo proves

A real change, on our code. The `propose` gate is the climax.

::left::

<div class="pr-4 text-sm">

1. `explore` → the agent frames
2. `propose` → the agent drafts the proposal
3. **Gate** → the Architect judges, present, live
4. `apply` → breakdown → **Tech Lead gate**
5. Validated plan → **real Jira issue** via MCP
6. The dev team executes from the issue

</div>

::right::

```mermaid {scale: 0.55}
flowchart LR
  OS[OpenSpec<br>apply tasks] -->|real MCP| EP[Jira Epic]
  EP --> I1[Issue: task 1]
  EP --> I2[Issue: task 2]
  style OS fill:#14b8a6,color:#000
  style EP fill:#3b82f6,color:#fff
```

<div class="text-xs opacity-60 mt-2 pl-2">
Real hand-off — not a mock. This is the money shot.
</div>

<!--
OpenSpec is slow to run: SCRIPT the path ahead of time, show live only the moments
that matter (the propose gate, the issue appearing). The Jira hand-off is REAL
(decision Q10a) — hence the safety-net slide that follows. 6-8 min.
-->

---
layout: center
class: text-center
---

# Safety net

<div class="mt-6 text-lg opacity-70">

If the live hand-off breaks (auth, network, API):<br>
<b>pre-recorded clip</b> + <b>screenshot of an already-created issue</b>.

</div>

<div class="mt-8 p-3 border-l-4 border-amber-500 bg-amber-500/10 text-sm inline-block text-left">
We stand for traceability: never a silent fake. If it's the fallback, we say so.
</div>

<!--
Backup slide — hidden unless the demo breaks. Do NOT play it if everything works.
Principle: show a real mechanism or honestly say we're on the fallback. An
unannounced faked hand-off would betray the very value we're selling. 0-1 min.
-->

---
layout: section
---

# 4 · So what now?

An inspiring meeting is worthless without **a concrete action**.

---
layout: center
class: text-center
---

# The 30-day ask

<div class="mt-8 text-xl opacity-85">

Pick **one** real upcoming change.<br>
Carry it from `explore` to `archive` in OpenSpec.<br>
**In a pair**: one convinced + one skeptic.

</div>

<div class="mt-8 p-3 border-l-4 border-teal-500 bg-teal-500/10 text-sm inline-block text-left">
One case, carried to the end, produces the internal testimony that converts the rest — better than any slide.
</div>

<!--
The ask MUST be concrete and small (answer Q12). One change, one pair, to archive.
The convinced+skeptic pair is deliberate: the skeptic who buys in becomes the best
relay. That's the propagation loop. 2 min.
-->

---
layout: center
class: text-center
---

# Recap

<div class="mt-6 text-lg opacity-80">

**History** → prompt, context, harness: each answers the previous one's volatility<br>
**Principle** → gate where determinism ends<br>
**Co-location** → the gate is real only if the right judge is present<br>
**Your turn** → one change, one pair, to `archive`

</div>

<div class="mt-8 opacity-50 text-sm">
Questions? · OpenSpec & Spec-Kit validated internally · Jira demo = real hand-off
</div>

<!--
Close + Q&A. Keep the tool comparison for Q&A if pushed.
Defer the fine-grained five-role mechanics to "deck 2". 1 min.
-->

---
layout: section
---

# Annex · Vibe or spec?

For Q&A if the question comes up.

---
layout: two-cols-header
---

# The frontier

The criterion isn't taste, it's **the cost of being wrong**.

::left::

<div class="pr-4 text-sm">

**Vibe coding** — the cost of error is near zero

- Prototype, exploration, throwaway
- You're still finding _what_ to build
- Being wrong costs nothing: rerun

</div>

::right::

<div class="pl-4 text-sm">

**Spec-driven** — the error is paid for

- Ships to prod, spans teams
- You know _what_ to build, it must be right
- Undoing is expensive: frame it first

</div>

<div class="mt-4 text-xs opacity-60 text-center">
Scope corollary: single-file/single-dev leans vibe; once it crosses modules or teams, spec.
</div>

<!--
The frontier is NOT arbitrary — the next slide shows it follows from a principle.
Here, just state the two regimes clearly. A vibe story and a spec story from our
own experience can illustrate. 2 min.
-->

---
layout: two-cols-header
---

# Why the frontier is principled

Same rule as autonomous AI itself: the **self-halt rule**.

::left::

<div class="pr-4 text-sm">

A stage may run **unattended** only if its post-conditions are **deterministically checkable**.

- Vibe: no post-condition that matters → let it run
- Spec: the error is paid for → human gate where determinism ends

</div>

::right::

```mermaid {scale: 0.55}
flowchart TD
  S[Stage completes] --> Q{Post-condition<br>deterministically<br>checkable?}
  Q -->|Yes| A[Self-halt OK<br>proceeds]
  Q -->|No — LLM-judged| H[Cannot<br>self-halt<br>HUMAN GATE]
  style H fill:#f59e0b,color:#000
  style A fill:#14b8a6,color:#000
```

<!--
Slide borrowed from the five-role deck. It's the bridge: the vibe/spec frontier
IS the self-halt rule, one level up. Vibe = nothing to check; spec = must check,
so a human is needed at the right place. 3 min.
-->
