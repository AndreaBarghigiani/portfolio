---
name: implement-issue
description: Implement an accepted bounded issue or slice with project checks and an evidence-based handoff. In an explicitly enrolled portfolio pilot trial, stop at a frozen initial submission pending owner selection. Not for shaping or independent review.
---

# Implement an issue

This is a portfolio-owned override of workflow pin
`768824d037a53a42cb583694db848084fe582c29`. Read and follow the
[pinned implementation skill](../../../.agent-workflows/.agents/skills/implement-issue/SKILL.md).
Its scope, integration, formatting, verification, preservation and six-section
handoff requirements remain in force. Shared check guidance is at
[consumer checks](../../../.agent-workflows/docs/consumer-checks.md).

For an ordinary assignment without an explicit enrolled pilot brief, use the
pinned skill normally. Do not start another candidate or enroll an experiment
yourself. The coordinator owns dates, model selection and the experiment record.

## Enrolled first submission

The coordinator must supply trial ID, phase `initial`, accepted scope/non-goals,
common context, expected base and workflow pin, model target, readiness checks,
exact required commands, and the 45-minute budget. Confirm your
actual bound checkout and base before editing; report mismatches and stop. Do not
create or move a checkout yourself. Complete the common readiness steps before
implementation, including an authorized frozen dependency install and baseline
checks. Record your own work-start UTC immediately after readiness and calculate
the deadline 45 minutes later; if the coordinator supplied already-ready start
and deadline instants, use those instead. Return readiness/timing evidence to the
coordinator with the first submission. Apply supplied memory context rather than
searching private trial history or receiving the other candidate's work. Read
root/path instructions and relevant project docs; report missing consequential
context to the coordinator. Do not read the experiment results/identity record.

Implement only the assigned scope in your isolated checkout. No recursive agents,
other candidate access, tracker writes, pushes, PRs, merges or deployments. Local
commits are allowed to identify the submission; use neutral messages and do not
include provider/model labels in code, commits or the handoff. Report actual
model/run metadata separately to the coordinator when observable; do not guess it.
Report observable input, cached input, output and reasoning token counters with
source, provider field names and measured run/phase boundaries separately from
the neutral handoff. Mark missing counters unavailable with a reason; do not
estimate or treat missing as zero. The coordinator collects harness/provider
usage; do not run extra model calls or delay the freeze to obtain counters.
Keep initial-submission usage separate from any selected continuation usage;
identify cumulative or overlapping counters rather than summing them.

The equal first-pass limit is 45 minutes of elapsed implementation time after
readiness, with infrastructure/owner waits reported separately. Check current
time at work boundaries and stop by the supplied deadline, preserving partial
work and honest check status. A tool call can exceed the deadline; report that
overrun rather than claiming a hard enforcement guarantee. A blocker or first
explicit handoff also ends this phase. Request necessary clarification without
solving scope choices yourself; do not accept asymmetric quality coaching.

Format assigned changes, run the supplied mandatory and focused checks, and
return the pinned skill's sections: `## Issue`, `## Delivered`,
`## Partial or remaining`, `## Files`, `## Checks`, `## Risks`. Include exact
commands/cwd/results, base and frozen revision or diff digest, missing checks,
and deadline/blocker status. Checks that fail or were not run are not passes.
Stop after this first submission; no self-directed repair, cleanup or new pass.

## Selected continuation and expiry

Continue only when the coordinator explicitly supplies phase `selected`, Andrea's
selection and bounded remaining work. Preserve the initial snapshot. Report
remediation separately and follow the pinned implementation contract; final
independent review belongs to the coordinator. A selected trial can finish after
the enrollment window expires. Unselected or undecided work stays frozen.
Outside enrolled work, including after pilot expiry, this local entrypoint simply
uses the original pinned implementation workflow until its symlink is restored.
