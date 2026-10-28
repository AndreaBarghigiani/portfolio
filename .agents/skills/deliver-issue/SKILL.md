---
name: deliver-issue
description: Coordinate an accepted GitHub issue through implementation, independent review, and verified handoff. During portfolio's four-week pilot, compare Luna and Haiku initial submissions blind before owner selection. Use for delivery, not issue shaping or review alone.
---

# Deliver an issue

This is a portfolio-owned override of workflow pin
`768824d037a53a42cb583694db848084fe582c29`. Read the
[pinned delivery skill](../../../.agent-workflows/.agents/skills/deliver-issue/SKILL.md)
for scope, memory, integration, checks, preservation, review evidence and shipping
rules. Its default single-implementer dispatch and review sequence are replaced
only for enrolled pilot trials by the protocol below. Do not edit library source.

Read the [single experiment record](../../../docs/experiments/luna-haiku-delivery-pilot.md).
Check its state and UTC dates against current time before dispatch. When `armed`,
prepare the first accepted bounded trial, confirm model targets and common
readiness prerequisites, record start/end (exactly 28 days apart), and arrange
closeout before dispatch. Workers verify their newly bound checkout readiness
before implementation. When `active`, enroll only before `ends_at`. When expired
or `closed`, start no new paired work and use the pinned delivery workflow. If the
record is missing, dates/state are inconsistent, or the workflow pin differs,
report the setup gap and resolve it before a paired dispatch; do not invent dates
or silently substitute a model. A user request for ordinary delivery outside the
experiment uses the pinned workflow and is recorded as excluded if relevant.

## Paired delivery

Apply the experiment record's enrollment, isolation, budget, anonymization and
rubric requirements. Keep GitHub as the scope/status tracker. Before dispatch,
resolve product decisions and give both workers the same accepted brief, baseline
SHA, memory excerpts, integrations, exact formatting/check commands and non-goals.
Use the [local implementation skill](../implement-issue/SKILL.md) and explicitly
target Luna medium and Haiku medium; the installed implementer profile alone
does not select both models. Use T3 `delegate_task` with worktree isolation for
each worker, with no inherited parent conversation or recursive delegation.
Require workers to verify expected bases/pins before editing and report readiness
and timing; retain actual dispatch metadata. Follow the harness's
continuation instructions; do not poll or create shell worktrees for delegates.

Freeze each first handoff, blocker or budget-cutoff state before coaching, fixes
or coordinator edits. Preserve no-diff and failed submissions. Randomize A/B per
trial and prepare clean review materials without identity metadata or this
record. A fresh Sol judge receives both frozen candidates and the common brief,
runs mandatory checks independently, cites findings and scores the four criteria,
and returns A/B/tie/neither. A ranking is not verified approval. No candidate,
judge or comparison step may post to GitHub or ship changes.

Present the blind result and candidates to Andrea. Wait for an explicit selection
of A, B, neither, hybrid or defer; never treat elapsed time as selection. Record
the reason before unblinding. Resume only the selected candidate under the
original delivery authorization. Expiry prevents enrollment, not completion of
an already selected delivery. Undecided trials stay preserved and pending.

Resolve selected-candidate findings, then use a fresh independent Sol reviewer
with the pinned review skill and final revision. Required lint/format/build and
acceptance evidence remain mandatory. Only this normal final-review phase may
produce the pinned workflow's scoped verified issue comment. PRs, merges,
deployments and other mutations follow existing authorization, never the judge's
preference or scheduled report. Record actual targets, initial versus final
evidence, owner effort, exclusions and outcomes in the experiment record.
