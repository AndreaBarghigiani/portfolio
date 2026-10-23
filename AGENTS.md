# Portfolio

Andrea Barghigiani's personal portfolio, built with Astro and Tailwind CSS.
Keep project content and implementation rules in this repository; shared agent
procedures come from the pinned `.agent-workflows` submodule.

## Development commands

Run commands from the repository root using the package manager declared in
`package.json` (`pnpm`).

- Development server: `pnpm dev`.
- Production build: `pnpm build`.
- Read-only formatting validation: `pnpm format:check`, using the existing
  Prettier configuration and ignore rules.
- Format assigned changes with the configured Prettier tool before validation.
  `pnpm format` rewrites the whole project; keep formatting edits scoped to the task.
- No dedicated lint or test command is currently declared in `package.json`.

Run the production build for application changes. For workflow-only setup,
verify the selected library installation with its helper's `--check` command.

<!-- agent-workflows:collaboration:start -->
## Working with the owner

The owner is a software engineer who edits the working tree and commits
concurrently.

- Re-check `git status` and `git log` before verifying or completing
  anything; treat committed owner changes as the design contract, not drift.
- Keep tests green as the contract for owner edits: update tests to the
  new design when intent is clear, and ask targeted questions when it is
  not.
- Challenge the owner when evidence contradicts a decision. Agreement is
  not the goal; disagreement is a learning signal for both sides.
- Consult the owner's Basic Memory when relevant to the task (routing
  lives in `.agents/memory/config.md`) and offer to capture durable
  knowledge when a session produces it.
- Default to the repository's integration branch only for mechanical
  chores (submodule bumps, generated-file re-syncs, lockfile refreshes);
  use a branch and pull request for anything else, and state the
  branching choice before committing when it was not explicitly
  requested.
- Before extending work into another project, identify the destination and
  benefit, then offer both a handoff prompt for a dedicated session (the usual
  preference) and continuing here with explicit authorization for that project
  and change. Wait for the owner's choice before editing there or launching
  another session or delegate to do so; preserve authorization already given.
- Use the harness's selected project, or the session's starting repository and
  agreed task scope, to identify the project boundary. Access, shared memory,
  similar structure, and changing directories do not expand authorization.
  Editing a submodule's source is distinct from updating its consumer pin.
  When cross-project work is authorized, read the destination's instructions
  and check whether the change fits its implementation.
<!-- agent-workflows:collaboration:end -->

<!-- agent-workflows:memory:start -->
## Development memory

Read `.agents/memory/config.md` before using Basic Memory in this checkout.
<!-- agent-workflows:memory:end -->
