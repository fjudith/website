---
theme: default
title: "AI-DLC × OpenSpec — Garder la main quand l'IA code"
info: |
  ## AI-DLC × OpenSpec — Garder la main quand l'IA code
  Talk d'évangélisation, public ingénieurs (Dév · Tech Lead · Architecte).

  Fil : prompt → context → harness engineering (pourquoi OpenSpec/Spec-Kit
  existent) → la frontière vibe/spec → la règle de l'auto-arrêt → démo live
  co-location + hand-off Jira → une victoire à 30 jours.
class: text-center
transition: slide-left
mdc: true
drawings:
  persist: false
---

# AI-DLC × OpenSpec

**Garder la main** quand l'IA écrit le code

<div class="pt-8 opacity-70 text-sm">
Pas « une méthode de plus ». Une réponse à une question que vous vous posez déjà :<br>
<b>comment rester responsable d'un code que je n'ai pas tapé ?</b>
</div>

<div class="pt-4 opacity-50 text-xs">
Dév · Tech Lead · Architecte — ~30 min, démo live à la fin
</div>

<!--
Accroche à froid. NE PAS commencer par « voici AI-DLC ». Commencer par la peur
réelle et la retourner : l'IA qui code ne vous remplace pas, elle déplace votre
travail vers le contrôle. Ce talk explique où se place ce contrôle. 1 min.
-->

---
layout: center
class: text-center
---

# Vous connaissez déjà cette douleur

<div class="mt-8 text-xl opacity-80">

L'agent démarre bien.<br>
Puis, au milieu d'une tâche longue, il **oublie**.<br>
Il refait ce qui était fait, contredit une décision prise dix minutes plus tôt.

</div>

<div class="mt-8 text-lg opacity-60">
Ce n'est pas un bug du modèle.<br>
C'est un problème de <b>mémoire volatile</b> — et il a une histoire.
</div>

<!--
On nomme une douleur qu'ils ont TOUS vécue avant de nommer la moindre méthode.
Ne pas dire « OpenSpec règle ça » ici — juste poser le symptôme. On y reviendra
à la slide harness. 1-2 min.
-->

---
layout: section
---

# 1 · L'histoire qu'on a vécue

Prompt engineering → context engineering → **harness engineering**.
Chaque ère répond à la **volatilité** de la précédente.

---
layout: two-cols-header
---

# Prompt engineering

On soigne la **formulation**. Reformuler, donner le rôle, structurer la demande.

::left::

<div class="pr-4 text-sm">

- Le levier : la qualité de la question
- Vrai gain, réel — un bon prompt bat un mauvais prompt

</div>

::right::

<div class="pl-4 text-sm">

**Le mur** : le modèle ne sait rien de _votre_ code, _vos_ conventions, _vos_ décisions passées.

Aucune reformulation ne compense l'ignorance. Le prompt est **volatil** : envoyé, puis perdu.

</div>

<!--
Insister sur le mur, pas sur la technique. Le mur justifie l'ère suivante.
« On ne peut pas prompter sa sortie de l'ignorance du contexte. » 2 min.
-->

---
layout: two-cols-header
---

# Context engineering

On **injecte** le bon contexte : RAG, exemples, fichiers ouverts, documentation.

::left::

<div class="pr-4 text-sm">

- Le levier : ce que le modèle a sous les yeux
- L'agent connaît enfin votre domaine

</div>

::right::

<div class="pl-4 text-sm">

**Le mur** : sur une tâche longue, le contexte **déborde**. Il se compacte, et l'agent oublie.

C'est la douleur de la slide 2. Le contexte est **volatil** aussi — juste un cran plus haut.

</div>

<!--
C'est ici qu'on relie au cold open. « Voilà pourquoi votre agent oublie : le
contexte n'est pas une mémoire, c'est une fenêtre qui se vide. » 2 min.
-->

---
layout: two-cols-header
---

# Harness engineering

On **externalise** l'intention et l'état dans des artefacts **durables et versionnés** : la spec.

::left::

<div class="pr-4 text-sm">

<v-clicks>

- La spec n'est pas un contexte de plus
- Elle est sur disque, relue à la demande
- Elle **survit à la compaction** — parce qu'elle n'a jamais été dans la fenêtre
- Diffable, revue en PR, propriété claire

</v-clicks>

</div>

::right::

<div class="pl-4 text-sm">

**Le déblocage** : la mémoire cesse d'être volatile. L'agent relit la spec quand il en a besoin.

C'est pour ça qu'existent **OpenSpec**, **Spec-Kit** et consorts : plusieurs équipes ont convergé vers le même geste — _écrire la spec avant le code_.

<div class="mt-3 text-xs opacity-60">
OpenSpec et Spec-Kit sont les deux incarnations validées chez nous.
</div>

</div>

<!--
Le sommet de l'arc. Le harnais n'est pas « du process » : c'est la seule réponse
connue à la volatilité. Lignée, PAS comparatif — si quelqu'un demande « pourquoi
pas X », renvoyer à l'annexe / Q&R. 3 min.
-->

---
layout: two-cols-header
---

# Et après ? Loop engineering

L'étape suivante de l'arc — **pas pour nous aujourd'hui, mais c'est là qu'on va**.

::left::

<div class="pr-4 text-sm">

Après avoir stabilisé l'intention (le harnais), on stabilise la **boucle** elle-même : concevoir le harnais d'exécution comme un objet à part entière — outils, vérifications, reprises — taillé pour une classe de tâches.

- L'agent ne se contente plus de suivre une spec
- On **règle la boucle** : quels outils, quelles vérifications déterministes, quand relancer

</div>

::right::

<div class="pl-4 text-sm">

**Pourquoi pas maintenant** : le loop engineering suppose une maturité — evals en place, tâches assez répétitives pour valoir l'investissement, tolérance à l'autonomie.

Nous, on démarre : d'abord le harnais et la co-location. La boucle autonome viendra quand la confiance et les evals seront là.

<div class="mt-3 text-xs opacity-60">
prompt → context → harness → <b>loop</b>. On s'arrête à harness ; on garde le cap.
</div>

</div>

<!--
Slide « horizon » : montrer qu'on connaît la suite sans prétendre y être. Désamorce
le « et l'agent full-autonome ? » — réponse : oui, plus tard, quand les evals et la
confiance sont là. Ne PAS vendre le loop engineering ; le situer. Réf : LangChain,
« The Art of Loop Engineering ». 1-2 min.
-->

---
layout: default
---

# AI-DLC : la méthode et ses 10 principes

AI-DLC (AI-Driven Development Lifecycle, Raja SP / AWS, 2025) est une **méthode**, pas un outil : l'IA devient collaboratrice centrale, l'humain donne l'intention et garde le contrôle aux moments qui comptent. OpenSpec en est une incarnation.

<div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs mt-3">

<div class="p-2 rounded border border-gray-500/30 bg-gray-500/5">
<b class="text-teal-500">1 · Réinventer, pas rafistoler</b><br>
L'IA est un participant central, pas un outil greffé — un SDLC pensé pour l'IA.
</div>

<div class="p-2 rounded border border-gray-500/30 bg-gray-500/5">
<b class="text-teal-500">2 · Inverser la conversation</b><br>
L'humain énonce l'<i>intention</i> ; l'IA planifie, questionne, exécute, valide — et demande l'approbation.
</div>

<div class="p-2 rounded border border-gray-500/30 bg-gray-500/5">
<b class="text-teal-500">3 · Techniques de conception au cœur</b><br>
DDD / BDD / TDD font partie de la méthode, pas d'une option d'équipe.
</div>

<div class="p-2 rounded border border-amber-500/50 bg-amber-500/10">
<b class="text-amber-500">4 · S'aligner sur la capacité de l'IA</b><br>
L'IA n'est pas 100 % autonome — <b>humain dans la boucle</b>, validation et supervision.
</div>

<div class="p-2 rounded border border-gray-500/30 bg-gray-500/5">
<b class="text-teal-500">5 · Construire des systèmes complexes</b><br>
Préserver tout le contexte projet — services, parties prenantes, dette — de bout en bout.
</div>

<div class="p-2 rounded border border-gray-500/30 bg-gray-500/5">
<b class="text-teal-500">6 · Garder la symbiose humaine</b><br>
Maintenir le feedback continu là où l'humain apporte du jugement ; automatiser et documenter les points de contact.
</div>

<div class="p-2 rounded border border-gray-500/30 bg-gray-500/5">
<b class="text-teal-500">7 · Transitionner par la familiarité</b><br>
Adopter progressivement, en s'appuyant sur des concepts déjà connus.
</div>

<div class="p-2 rounded border border-gray-500/30 bg-gray-500/5">
<b class="text-teal-500">8 · Simplifier les responsabilités</b><br>
L'IA porte le contexte entre disciplines → équipes intégrées, moins de passations.
</div>

<div class="p-2 rounded border border-gray-500/30 bg-gray-500/5">
<b class="text-teal-500">9 · Minimiser les étapes, maximiser le flux</b><br>
Estomper les frontières de phases — continu, non linéaire, boucles courtes.
</div>

<div class="p-2 rounded border border-amber-500/50 bg-amber-500/10">
<b class="text-amber-500">10 · Pas de workflow figé</b><br>
Adaptatif — l'IA génère un workflow sur mesure selon les buts et contraintes du projet.
</div>

</div>

<div class="mt-3 text-xs opacity-60">
Ambre = les deux principes que ce talk exploite : <b>#4</b> place l'humain au verrou, <b>#10</b> explique pourquoi OpenSpec (et non un pipeline figé) porte le flux. · Source : <b>IBM Think — « The AI-DLC »</b>, d'après le whitepaper de Raja SP.
</div>

<!--
Fondation « c'est quoi la méthode » avant la frontière vibe/spec. Les 10 principes
viennent du whitepaper Raja SP via IBM Think — mêmes cartes que le deck cinq-rôles,
pour cohérence. Insister sur #4 (le verrou) et #10 (pas de pipeline figé, d'où
OpenSpec). ~2 min.
-->

---
layout: section
---

# 2 · Le choix que cette histoire impose

Tout n'a pas besoin d'une spec. **Vibe ou spec ?**

---
layout: two-cols-header
---

# La frontière

Le critère n'est pas le goût, c'est **le coût de l'erreur**.

::left::

<div class="pr-4 text-sm">

**Vibe coding** — le coût de l'erreur est proche de zéro

- Prototype, exploration, jetable
- On cherche encore _quoi_ construire
- Se tromper ne coûte rien : on relance

</div>

::right::

<div class="pl-4 text-sm">

**Spec-driven** — l'erreur se paie

- Va en prod, traverse des équipes
- On sait _quoi_ construire, il faut le faire juste
- Défaire coûte cher : on cadre avant

</div>

<div class="mt-4 text-xs opacity-60 text-center">
Corollaire de portée : mono-fichier/mono-dev penche vibe ; dès que ça traverse modules ou équipes, spec.
</div>

<!--
La frontière n'est PAS arbitraire — la slide suivante montre qu'elle découle
d'un principe. Ici, juste poser les deux régimes clairement. Un récit vibe et un
récit spec de notre vécu peuvent illustrer. 2 min.
-->

---
layout: two-cols-header
---

# Pourquoi la frontière est principielle

Même règle que l'IA autonome elle-même : la **règle de l'auto-arrêt**.

::left::

<div class="pr-4 text-sm">

Une étape peut s'exécuter **sans surveillance** uniquement si ses post-conditions sont **vérifiables de façon déterministe**.

- Vibe : pas de post-condition qui compte → laisser courir
- Spec : l'erreur se paie → verrou humain là où le déterminisme s'arrête

</div>

::right::

```mermaid {scale: 0.55}
flowchart TD
  S[Étape terminée] --> Q{Post-condition<br>vérifiable<br>déterministe ?}
  Q -->|Oui| A[Auto-arrêt OK<br>ça continue]
  Q -->|Non — jugé LLM| H[Ne peut pas<br>s'auto-arrêter<br>VERROU HUMAIN]
  style H fill:#f59e0b,color:#000
  style A fill:#14b8a6,color:#000
```

<!--
Slide empruntée au deck cinq-rôles. C'est le pont : la frontière vibe/spec EST
la règle de l'auto-arrêt, remontée d'un cran. Vibe = rien à vérifier ; spec =
il faut vérifier, donc il faut un humain au bon endroit. 3 min.
-->

---
layout: section
---

# 3 · Vers où nous allons

Avant de montrer, disons **la destination**.

---
layout: two-cols-header
---

# OpenSpec en une carte

`explore` → `propose` → `apply` → `archive`. Quatre étapes, deux verrous.

::left::

<div class="pr-4 text-sm">

- **`explore`** — cadrer, esquisser (réversible)
- **`propose`** — la proposition de changement → **verrou Architecte**
- **`apply`** — décomposer + exécuter → **verrou Tech Lead** en entrée
- **`archive`** — intégrer à la ligne de base

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
Vue resserrée. Le tableau complet des cinq rôles vient une fois l'équipe convaincue.
</div>

<!--
On n'apprend PAS tout le checkpoint map ici — juste les deux verrous qui portent
la démo. Le deck cinq-rôles est le « deck 2 » de la phase d'élargissement. 2 min.
-->

---
layout: two-cols-header
---

# La co-location, c'est le point

Un verrou ne vaut que si la personne qui peut juger est **présente quand il se déclenche**.

::left::

<div class="pr-4 text-sm">

<v-clicks>

- Le verrou `propose` sans Architecte présent = un tampon vide
- Le verrou `apply` sans Tech Lead = une décomposition non validée qui part en exécution
- La spec est la vérité ; les parties prenantes se réunissent **aux étapes**, pas à la fin

</v-clicks>

</div>

::right::

<div class="pl-4 text-sm">

C'est la vraie thèse de la démo : **pas un outil, une pratique**.

L'agent produit ; l'humain juge à l'étape ; le plan validé part dans **Jira** ; l'équipe exécute.

</div>

<!--
C'est le cœur de ce qu'on évangélise (réponse Q9). La co-location n'est pas
optionnelle : c'est ce qui rend le verrou réel. La démo va le PROUVER en live. 2 min.
-->

---
layout: section
---

# 4 · Démo live

OpenSpec de `explore` à `archive`, verrou visible, hand-off Jira **réel**.

---
layout: two-cols-header
---

# Ce que la démo prouve

Un vrai changement, sur notre code. Le verrou `propose` est le point culminant.

::left::

<div class="pr-4 text-sm">

1. `explore` → l'agent cadre
2. `propose` → l'agent rédige la proposition
3. **Verrou** → l'Architecte juge, présent, en direct
4. `apply` → décomposition → **verrou Tech Lead**
5. Le plan validé → **ticket Jira réel** via MCP
6. L'équipe de dev exécute depuis le ticket

</div>

::right::

```mermaid {scale: 0.55}
flowchart LR
  OS[OpenSpec<br>tâches apply] -->|MCP réel| EP[Jira Epic]
  EP --> I1[Issue: tâche 1]
  EP --> I2[Issue: tâche 2]
  style OS fill:#14b8a6,color:#000
  style EP fill:#3b82f6,color:#fff
```

<div class="text-xs opacity-60 mt-2 pl-2">
Hand-off réel — pas une maquette. C'est le moment fort.
</div>

<!--
OpenSpec est long à exécuter : SCRIPTER le parcours à l'avance, ne montrer en
live que les moments qui comptent (le verrou propose, le ticket qui apparaît).
Le hand-off Jira est RÉEL (décision Q10a) — d'où la slide filet de sécurité qui
suit. 6-8 min.
-->

---
layout: center
class: text-center
---

# Filet de sécurité

<div class="mt-6 text-lg opacity-70">

Si le hand-off live casse (auth, réseau, API) :<br>
<b>clip pré-enregistré</b> + <b>capture d'un ticket déjà créé</b>.

</div>

<div class="mt-8 p-3 border-l-4 border-amber-500 bg-amber-500/10 text-sm inline-block text-left">
On évangélise la traçabilité : jamais de faux silencieux. Si c'est le repli, on le dit.
</div>

<!--
Slide de secours — masquée sauf si la démo casse. Ne PAS la jouer si tout marche.
Le principe : montrer un vrai mécanisme ou dire honnêtement qu'on est en repli.
Un hand-off truqué non annoncé trahirait la valeur même qu'on vend. 0-1 min.
-->

---
layout: section
---

# 5 · Et maintenant ?

Une réunion qui inspire ne vaut rien sans **une action concrète**.

---
layout: center
class: text-center
---

# La demande à 30 jours

<div class="mt-8 text-xl opacity-85">

Choisir **un** vrai changement à venir.<br>
Le porter de `explore` à `archive` dans OpenSpec.<br>
**En binôme** : un convaincu + un sceptique.

</div>

<div class="mt-8 p-3 border-l-4 border-teal-500 bg-teal-500/10 text-sm inline-block text-left">
Un seul cas, mené jusqu'au bout, produit le témoignage interne qui convertira le reste — mieux que n'importe quelle slide.
</div>

<!--
La demande DOIT être concrète et petite (réponse Q12). Un changement, un binôme,
jusqu'à archive. Le binôme convaincu+sceptique est délibéré : le sceptique qui
adhère devient le meilleur relais. C'est la boucle de propagation. 2 min.
-->

---
layout: center
class: text-center
---

# Récap

<div class="mt-6 text-lg opacity-80">

**Histoire** → prompt, context, harness : chacun répond à la volatilité du précédent<br>
**Frontière** → vibe si l'erreur ne coûte rien, spec si elle se paie<br>
**Principe** → verrouiller là où le déterminisme s'arrête<br>
**Co-location** → le verrou n'est réel que si le bon juge est présent<br>
**À vous** → un changement, un binôme, jusqu'à `archive`

</div>

<div class="mt-8 opacity-50 text-sm">
Questions ? · OpenSpec & Spec-Kit validés en interne · démo Jira = hand-off réel
</div>

<!--
Clôture + Q&R. Garder le comparatif d'outils pour la Q&R si on pousse.
Reporter la mécanique fine des cinq rôles au « deck 2 ». 1 min.
-->
