---
status: active
started_at: 2026-10-28T20:09:15Z
ends_at: 2026-11-25T20:09:15Z
workflow_pin: 768824d037a53a42cb583694db848084fe582c29
---

# Four-week Luna-versus-Haiku delivery pilot

Andrea owns selection and the final adoption decision. The pilot is installed
but its clock starts at the first paired dispatch after common readiness
prerequisites are established, not at setup or merge. Each worker still checks
its new bound checkout before implementation. The coordinator must set
`started_at` and `ends_at` to ISO 8601 UTC instants exactly 28 days apart and set
`status: active` before that dispatch. At expiry,
new deliveries use the pinned workflow even if cleanup or automation is delayed.
Set `status: closed` after the report; never extend the dates silently.

This is the sole protocol/results record, not a task tracker. GitHub retains
issue scope and status. Keep this file, candidate threads, identity keys and past
verdicts out of blind-judge inputs. Sanitized task materials may contain the
relevant protocol excerpts without the identity/results sections.

## Purpose and baseline

Compare the usefulness of initial submissions and the effort needed to finish
bounded portfolio deliveries. Sol coordinates, fresh Sol judges blinded initial
submissions, Andrea selects, and fresh Sol reviews the selected final revision.
This measures configured model/provider workflows. Shared-family judge bias and
code-style identity clues limit the result; owner disagreements matter.

Setup baseline: `main` at `6ce0497`, pulled on 2026-10-28; workflow pin above.
Both #40 and #42 are closed. Oxfmt 0.74.0/compiler-rs 0.5.2 and Oxlint 1.89.0
are project-owned; `pnpm` is 10.24.0. Existing documented Astro lint limitations
and unverified editor observations in [the tooling guide](../oxfmt-pilot.md)
remain limitations, regardless of issue closure. This experiment makes no new
claims about Zed verification. #42 is preparation, not an enrolled comparison.

Representative evidence:

- [Add Projects to Portfolio](t3-thread://v1/9f8cbeaa-56b0-4774-9108-9a4eb45a7b70):
  Luna implementation and independent Sol review needed bounded fixes and distinct
  owner copy approval; freeze before coordinator/reviewer improvements.
- [Deliver Issue 40](t3-thread://v1/30cf35bb-78a7-4dcd-8238-7fc83759eaa2):
  an initial blocker diagnosis was resolved by configuration; the retry's review
  identified editor safeguards, rollback and evidence-provenance gaps. Retain
  blocked/no-diff submissions and assess diagnostic quality.
- [Set Up Agent Workflows](t3-thread://v1/4c19d153-67d8-49f4-bc4a-49fb1e97da38):
  setup and native dependency issues show why readiness precedes timing.

## Targets and equal conditions

| Role | Provider / model | Explicit options |
| --- | --- | --- |
| Candidate Luna | `codex` / `gpt-6-luna` | `reasoningEffort: medium` |
| Candidate Haiku | `claudeAgent` / `claude-haiku-5-5` | `effort: medium` |
| Coordinator, judge, final reviewer | `codex` / `gpt-6.1-sol` | `reasoningEffort: medium` |

The provider catalog previously advertised Haiku 5.5 medium and cross-provider
delegation. Profiles name Luna/Sol; that alone is not proof of runtime selection.
At first dispatch confirm current availability and valid options with the
harness, then retain actual dispatch metadata. No model smoke execution was part
of setup. If a target is unavailable, record the gap and do not substitute or
claim a paired result. Upgrades or option changes start a separate cohort.

Use the same accepted issue/slice, base SHA, pin, design decisions, memory
excerpts, integration access, tool versions and verification requirements. Scope
and product decisions are resolved before dispatch. Enroll bounded tasks that
both workers can verify independently; record exclusions before seeing results.
Do not manufacture tasks to reach a target sample size.

Use `delegate_task` with `isolation: worktree` for each worker and explicit
`target.providerInstanceId`, `target.model`, and `target.options`. The harness
owns checkout creation/binding. Give each child only the common brief, no full
parent history or recursive delegation. Confirm actual base/pin in both
checkouts before implementation; each worker must verify the supplied expected
base/pin and stop on mismatch. Do not continue the other arm after a mismatch is
reported; cancel the affected pair and resolve readiness before a replacement.

T3 had no saved checkout setup script when inspected. Verify readiness explicitly:
pinned submodules initialized, selected shared links/local overrides checked,
frozen dependency install completed, baseline commands recorded, and memory
excerpts supplied equally. Apply documented environment workarounds equally and
record them. A failed install is infrastructure evidence, not an implementer loss.
Changed owner commits require a new common baseline for the pair, not rebasing
only one arm. Preserve concurrent owner work and unrelated existing worktrees.

The common first-pass budget is 45 minutes of elapsed implementation time after
readiness; record setup, infrastructure delays and owner waiting separately.
Each worker records start UTC after the identical readiness phase and calculates
its deadline 45 minutes later; the coordinator may supply instants if readiness
was already established. Workers stop cooperatively
at work boundaries. If the harness reports a still-running child after cutoff,
cancel with `task_cancel` before preserving its state; follow tool continuation
instructions rather than polling. Tool overruns are recorded as deviations, not
hidden or represented as an enforced hard timeout. No quality coaching or repair
before freeze. Broadcast consequential clarification equally; if a prior
submission cannot receive it fairly, exclude/restart that pair with a new brief.

## Implementor token usage

For each arm, the coordinator retains observable harness/provider usage and its
source artifact or run reference. Record input, cached input, output and reasoning
tokens separately wherever reported. Preserve provider field names and accounting
semantics, including whether cached input is a subset of input and reasoning is
included in output. Do not sum overlapping counters or infer missing counters.
Mark missing values `unavailable` with a reason; zero requires an observed zero.

Record usage through the frozen first submission separately from selected-arm
repair/continuation usage. State the measured run/phase boundaries and whether
setup, readiness, retries or failed runs are included. Include failed/no-diff
submissions. If only cumulative usage is exposed, retain the observed snapshots
and derive a phase delta only when their scope and accounting match; otherwise
mark the phase split unavailable. Worker self-reports are supporting evidence,
not substitutes for unavailable provider counters. Do not estimate tokens from
text length or run extra model calls to obtain usage.

Keep usage, cost and source/run metadata outside blind judge inputs, including
sanitizing worker handoffs. Collection must not delay freezing or alter the common
implementation budget. Missing usage does not invalidate an otherwise valid pair.
At closeout report coverage and compare observed initial usage alongside quality
and selected-arm repair effort. Explain provider accounting differences; raw token
totals alone do not establish cost or efficiency. Record any observable cost with
currency, source and scope separately; do not infer it from incomparable counters.

## Freeze, anonymize and judge

Freeze at first explicit handoff, blocker or deadline. Retain both raw initial
submissions in their normal local commits/threads, including failed/no-diff and
partial cases. Record baseline SHA plus immutable candidate SHA or patch/source
digest. No coordinator edits or later review fixes belong in that snapshot.

Randomize A/B anew for every pair using a coin flip or system randomness; retain
the mapping in the trial block only, outside judge context. Prepare two neutral
source snapshots and patches against the same base, and handoffs with substantive
claims unchanged. Remove provider names, original paths, authors, commit messages,
thread/run IDs and model metadata; record redactions. Exclude `.git`, the identity
record and irrelevant artifacts from the judge's materials. Include applicable
project rules and exact mandatory checks as neutral common context. Resolve
dependencies equally before judging; do not rewrite candidate source. Do not
claim anonymity against a hostile investigator: this is context/metadata blinding,
and code style may still reveal origin. A detected leak invalidates that pair's
blind verdict.

A fresh Sol judge gets only the neutral A/B materials and common brief, with no
parent history, original candidate paths or access instructions for their threads.
The coordinator may stage neutral snapshots in temporary space; they are review
fixtures, not delegate checkouts. The harness binds any delegated review workspace.
The judge may execute read-only validation on both snapshots and inspect relevant
code. No source edits, installs, tracker comments, shipping or identity searches.
Report required-check failures/gaps even when one candidate ranks higher.

Score each dimension 0–4, citing concrete findings: 0 missing/unusable, 1 major
gaps, 2 substantial repair needed, 3 minor repair needed, 4 complete with sound
evidence. Apply these anchors separately to acceptance coverage,
correctness/regressions, scope discipline/maintainability, and evidence/diagnostic
quality. For a correct blocker diagnosis, assess evidence rather than rewarding
an unsupported diff. Sum scores as supporting evidence; blocking correctness or
mandatory-check gaps override numerical preference for verified approval. Return
A, B, tie or neither, with a reason. Ranking never proves closure readiness.

Andrea receives the blind verdict, findings and candidates, selects A/B/neither,
hybrid or defer, and gives a short reason before unblinding. Wait for selection;
no timeout or automation selects a candidate. Record disagreement and mapping
afterward. Hybrid outcomes retain their initial verdict but are excluded from
clean selected-arm delivery-effort comparisons.

Continue fixes only on the selected candidate under existing authorization.
Preserve the initial snapshot. A fresh independent Sol final reviewer follows
the pinned review skill on the final revision and independently runs affected
mandatory checks. The comparison is not this final review. Only selected work
can enter normal verified-summary/PR delivery. Never merge or deploy from a
comparison verdict. Expiry does not discard selected in-progress delivery;
undecided trials stay pending for Andrea.

## Required checks

Root AGENTS.md and path instructions are authoritative. From the repository root,
apply local Oxfmt only to assigned in-scope files, then run `pnpm format:check`
and `pnpm lint`; application changes also require `pnpm build` and justified
acceptance checks. `pnpm lint:fix` is an explicit write, not a review command.
No dedicated test script exists. Never infer Astro region coverage from a clean
lint run; use the documented limitations and relevant probes.

For this workflow-only setup, Markdown and `.agents/**` are excluded from Oxfmt
and Oxlint; preserve their established style. No application build is required.
Run the skill validator on both local directories and the selected library check
below. Check references, mode boundaries, anonymization, expiry and rollback
semantics separately; frontmatter validation alone is not behavioral evidence.

The shared installer does not natively accept local skill directories. During
the pilot, explicitly select the 13 still-shared skills (and both profiles):

```sh
python3 .agent-workflows/scripts/install.py --project . --skills add-integration llm-follow-through memory-capture memory-continue memory-notes memory-schema reconcile-issues-after-merge review-issue setup-agent-workflows setup-basic-memory shape-issue update-agent-workflows use-integration --codex-agents --check
```

Validate the two local `SKILL.md` files, their references, this record, and the
unchanged baseline pin separately. Do not run an all-skills installation/update
over the local overrides. At an intentional library update, reconcile this local
contract first; pin drift prevents a paired dispatch. Existing project setup
instructions do not authorize overwriting these consumer-owned files.

Record exact commands/cwd, exit status, revision/diff and skipped checks with
reasons. Baseline failures are gaps, not passes. Owner editor/product approval
and browser evidence follow the accepted task and current harness requirements;
CLI evidence cannot complete owner-only checks.

## Four weeks and the final decision

Week 1 calibrates one or two bounded trials; count them only if the protocol
worked. Freeze the rubric and record amendments with cohort boundaries. Weeks 2
and 3 aim for two pairs each across useful project task types. Week 4 completes
enrolled work, reports results and ends enrollment. Target 6–8 valid pairs;
fewer than six supports an inconclusive result rather than a default change.

Report all starts/exclusions, blind wins/losses/ties/neither, task mix, required
check pass rates, first-submission elapsed time, selected-candidate remediation
rounds, owner/coordinator intervention minutes and delivery elapsed time with
owner waiting separate. Usage/cost is included only when observable; otherwise
mark unavailable. Record escaped defects observed through closeout. Selected-arm
delivery metrics have selection bias and must not be presented as paired causal
estimates. Missing effort data cannot establish a cheaper workflow.

Consider a provisional default only after at least six valid pairs and at least
six decisive A/B verdicts, with an arm winning at least two-thirds of decisive
verdicts, no worse serious escaped-defect pattern and no higher observed median
owner intervention time. Report ties/neither separately. If signals conflict or
effort/defect evidence is insufficient, retain the pinned default and report
inconclusive. Andrea may override with a recorded rationale. No result updates
shared workflows automatically. Pause enrollment for contaminated bases, identity
leaks or repeated infrastructure mismatch; invalidate affected comparisons.

## Expiry, closeout automation and rollback

Closeout automation: `scheduled-task:8c111351-fd5d-4bb8-9e32-011ac34b2fa9`,
bound to the pilot setup thread in T3 project
`46f63788-bf73-4b68-9aff-fd18c6318a1d`. It is enabled with a 86,400,000ms interval;
the returned first run is `2026-10-29T17:46:55.616Z` (18:46 Rome). It checks daily
and does nothing while `armed` or before
`ends_at`; the first dispatch supplies those dates. Closeout can therefore lag
expiry by up to one interval, but both local skills prevent new enrollment at
the recorded UTC deadline without depending on the scheduler.

On expiry, use current status/log, this record and referenced trial artifacts to
write the final report here. Preserve running/undecided work; do not select,
cancel or modify it implicitly. Missing results stay pending/missing. Use
`shape-issue` to include a draft recommending adopt/reject/extend, with outcome,
scope, non-goals, criteria, dependencies, risks and verification. Do not publish
tracker issues. Prepare a separate cleanup branch/PR under the existing project
rules; no automatic merge, deployment or shared-library changes. Disable the
automation after saving the report/draft and report any blocked cleanup.

Original targets (directory symlinks, relative to `.agents/skills`):

```text
deliver-issue -> ../../.agent-workflows/.agents/skills/deliver-issue
implement-issue -> ../../.agent-workflows/.agents/skills/implement-issue
```

Restore only the two known pilot directories after checking for owner edits,
preferably by reversing their setup diff on a cleanup branch. Never reset or
delete unrelated work. Keep this record as history. Verify original links, all
other skill/profile links, and unchanged submodule pin. Then run the same helper
check with the full original 15-skill selection: add `deliver-issue` and
`implement-issue` to the 13 names above. Neither global config nor shared source
requires modification. Test restoration in temporary fixtures before handoff.

## Setup evidence

- Branch: `experiment/luna-haiku-delivery-pilot`; setup is not an enrolled trial.
- `git pull --ff-only origin main`: exit 0, already up to date at `6ce0497`.
- Workflow pin: `768824d037a53a42cb583694db848084fe582c29`; baseline links recorded above.
- Both local skills passed `skill-creator/scripts/quick_validate.py` (exit 0).
- Reduced selected installer `--check`: exit 0 for 13 shared skills and both
  profiles. Temporary rollback fixture verified this selection passes, the full
  selection rejects local overrides as expected, and restoring the two original
  symlinks makes the full 15-skill/profile check pass again. Fixture removed.
- All local Markdown references resolve; shared pin/source, AGENTS.md, profiles
  and all other skill links are unchanged.
- `pnpm format:check`: exit 0, 54 matched files; `pnpm lint`: exit 0.
  Scoped Oxfmt write found no targets because all three assigned files are
  intentionally excluded; their established Markdown style is preserved.
- `git diff --check`: exit 0. No production build run: workflow-only change.
- Automation creation returned enabled with the ID/first run recorded above.
  End-to-end scheduled execution and live model dispatch remain untested.
- Independent Sol behavior review exercised armed enrollment, standalone
  implementation, blocker/completion, neither/defer, delayed closeout and dirty
  owner-tree scenarios. It identified a readiness-order contradiction: dispatch
  creates the checkout, so only readiness prerequisites can precede dispatch.
  Coordinator corrected delivery/record wording and revalidated both skills.
  The reviewer independently passed both skill validators, reduced installer
  check, `pnpm format:check` and `pnpm lint` on the uncommitted setup against
  `6ce0497`. Final wording and scheduler/rollback evidence were coordinator
  verified, not independently re-reviewed. No live trial was executed.
- No first candidate selected or dispatched. Start/end remain null until readiness.

## Trials

P01 enrolled below. Add one block per started pair, including excluded pairs.
Persist the start/end dates and trial block in this record before dispatch and
retain updates through normal project commits/PRs so other sessions and the
closeout automation can recover them; a thread-only date does not start the clock.

```markdown
### P01 — issue/slice reference and category

- Enrollment rationale / exclusions decided in advance:
- Accepted brief/version, common context/checks, base SHA and workflow/pilot revisions:
- Observed targets/options, delegate links, checkout paths (never supplied to judge):
- Readiness/baseline evidence, infrastructure differences and setup time:
- Per-arm work start/deadline/stop UTC, elapsed time and waits/overruns:
- Frozen raw A/B revisions or digests and first handoff links:
- Random identity mapping, randomization method, redactions and leaks/deviations:
- Fresh blind Sol run/target, scores/findings, independent checks and verdict:
- Andrea's blind selection/reason, later unblinding and disagreement:
- Selected candidate fixes/rounds, owner/coordinator minutes and final review evidence:
- Per-arm initial token usage: input/cached input/output/reasoning or unavailable (reason):
- Usage source/run reference, provider field semantics/overlap and measured boundaries (setup/retries included?):
- Selected-arm continuation token usage and phase separation evidence or unavailable:
- PR/outcome reference, delivery time, observed cost/currency/source/scope or unavailable:
- Escaped defects through closeout; valid/excluded with reason:
```

## Final report and follow-up draft

Pending expiry. Include totals and missing evidence, rubric/cohort deviations,
owner disagreements, bias/limits, recommendation and rationale, the unpublished
`shape-issue` draft, restoration commit/PR/check evidence, and automation disable
evidence. Do not claim superiority or successful rollback without observations.

### P01 — #44 token/font and dark-only foundation

- Enrolled first bounded application trial; no issue prerequisites. Scope is #44 body plus latest owner direction in this delivery session: remove toggle and light theme now. Permit narrowly necessary component/layout theme wiring edits, superseding the body prohibition for that purpose only. No composition migration. Keep legacy coffee tokens; remove theme switching and make existing dark utilities unconditional without maintaining a class strategy.
- Common source baseline before enrollment: `4b7c1ea5ce256aa213226b15f9630425b650ea34`; candidate base is this enrollment commit. Workflow pin unchanged at `768824d037a53a42cb583694db848084fe582c29`.
- Catalog confirmed codex/gpt-6-luna reasoningEffort medium and claudeAgent/claude-haiku-5-5 effort medium; cross-provider worktree delegation supported. Actual dispatch metadata pending.
- Coordinator readiness in repository root: frozen pnpm install, format:check, lint, build and reduced 13-skill/profile installer --check all exit 0. Node v24.22.1, pnpm 10.24.0. Build warns about existing Shiki JSON language fallback. Clean owner tree at baseline. Workers repeat readiness before 45-minute implementation budget.
- GitHub explicit-repository gh reads succeeded for #44 and #43. No project integration index discovered. Memory search found pilot setup and formatter history: configured Astro compressHTML alignment resolves prior whitespace regression; retain project formatter configuration and documented lint limitations. Same excerpts supplied to both workers.
- Closeout task verified enabled, daily, next run 2026-10-29T17:46:55.616Z.
- Candidate snapshots, identities, timing, usage, blind judge and owner selection pending. No selection or shipping authorized by ranking. Initial provider token counters will be retained where observable; unavailable counters will be marked unavailable, never estimated.

#### P01 first frozen arm (identity: Haiku; judge must not receive this section)

- Actual dispatch target claudeAgent / claude-haiku-5-5, effort medium; run ordinal 1. Child reference: `thread:delegated-task:command%3Amcp%3Ad92a0b6c-e945-4429-b56c-88ae926d5420%3Adelegate-task%3A13ccfb1a-0bc7-460c-9bf7-f97290fc5f8b`.
- Frozen local SHA `934a2a40b92d30477f614a5fc057f0c52f0f3a2a`, common parent `cb09ddb4d1addf2b791e6ceb1d821dd16d08009b`. Worker-reported diff SHA256 `0e9c6c38dffe8af24bcb24ba446a680b6871053199f0a0fe4017089c16157db5`. Checkout `/home/cupofcraft/.t3/worktrees/portfolio/t3-dbdaff4a`. No coordinator edits.
- Worker timing: setup 20:09:51Z, ready 20:10:26Z, work 20:10:34Z, deadline 20:55:34Z, freeze 20:15:27Z on 2026-10-28. No reported overrun.
- Reports final format/lint/build exit 0; browser walkthrough and server changelog execution unperformed. Shared readiness check deviated: checked 13 skill symlinks rather than full prescribed installer/profile check. Preserve for judge evidence assessment.
- Initial input/cached-input/output/reasoning counters unavailable in worker session; no estimates. Dispatch response exposes no counters. Further harness evidence collection pending; setup included in run, phase split unavailable.
- Other arm remains pending. No blind labels assigned or judge dispatched yet.

#### P01 paired freeze and blind fixtures

- Second arm Luna frozen `89133752b0c56c980d895fb1a9581abc1bf27699`, base matches. Worker ready 20:10:39Z, work 20:10:42Z, deadline 20:55:42Z, freeze 20:16:20Z. Reports format/lint/build pass, browser unperformed. Initial token counters unavailable in worker and dispatch response; no estimates.
- Random A/B via system randomness; neutral fixture root `/tmp/p01-blind-vc3ww24h`. Removed .git, agent metadata, identity/results record and experiment docs. Patches retain repository-relative source paths only, no authors/commit messages. Handoff condensed to neutral substantive claims, excluding source/run/timing/usage metadata. Raw submissions remain in original completion messages/commits.
- A: `89133752b0c56c980d895fb1a9581abc1bf27699`, patch SHA256 `19960ad1af4c6d10a1f6839d060ccff6399246f06133a4d9c5c30892c22342cf`
- B: `934a2a40b92d30477f614a5fc057f0c52f0f3a2a`, patch SHA256 `0e9c6c38dffe8af24bcb24ba446a680b6871053199f0a0fe4017089c16157db5`

#### P01 blind verdict — pending owner selection

- Fresh codex/gpt-6.1-sol reasoningEffort medium judge: `thread:delegated-task:command%3Amcp%3Ad92a0b6c-e945-4429-b56c-88ae926d5420%3Adelegate-task%3A45d2d1d2-3fa3-4089-a5cf-8f84d745b04e`, completed 2026-10-28T20:20:22.487Z.
- Verdict B; A scores acceptance/correctness/scope/evidence 3/3/3/3 (12), B 3/3/4/4 (14). Neither verified approval. Independent format:check, lint and build exit 0 for both fixtures.
- Both P2: px sm/lg/xl overrides coexist with rem md/2xl defaults; generated CSS ordering lets md override lg/xl and .container falls back to 48rem. Normalize units while preserving thresholds before final approval.
- A root-resolved backing-color bridges limit descendant public-color remaps; B direct backing roles simpler. A token reference omits Caveat bytes (present in handoff); B records cost/limitations. B narrower source edits. Both deliver17 roles/fonts/scales/containers/spacing and dark-only toggle removal; 64 HTML pages, Caveat224476 bytes (Latin74932). Browser/full baseline route parity unverified.
- Process deviation: judge read generic review skill in bound checkout despite fixture-only instruction; reports no application/history/memory/identity access or detected identity leak. Retain verdict with disclosed limitation, pending owner acceptance; no automatic replacement judge.
- Owner selection/reason pending; identities not unblinded in selection presentation. Both initial submissions remain unchanged; no repairs, PR, deployment or tracker comment.
