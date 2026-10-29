# Portfolio

Andrea Barghigiani's personal portfolio, built with Astro and Tailwind CSS.
Keep project content and implementation rules in this repository; shared agent
procedures come from the pinned `.agent-workflows` submodule.

## Development commands

Run commands from the repository root using the package manager declared in
`package.json` (`pnpm`).

- Development server: `pnpm dev`.
- Production build: `pnpm build`.
- Read-only formatting validation: `pnpm format:check`, using the project-local
  Oxfmt configuration and ignore rules.
- Read-only lint validation: `pnpm lint`, using the project-local Oxlint
  configuration and ignore rules. `pnpm lint:fix` applies safe Oxlint fixes
  explicitly; review its diff before keeping the result.
- Format assigned changes with the configured Oxfmt tool before validation.
  `pnpm format` rewrites the whole project; keep formatting edits scoped to the task.
- No dedicated test command is currently declared in `package.json`.

Run the production build for application changes. For workflow-only setup,
verify the selected library installation with its helper's `--check` command.

See [the Oxfmt and Zed setup](docs/oxfmt-pilot.md) for runtime requirements,
formatting exclusions, editor setup, and pilot limitations.

<!-- agent-workflows:collaboration:start -->
## Working with the owner

The owner is a software engineer who edits the working tree and commits
concurrently.

- Re-check `git status` and `git log` before verifying or completing
  anything; treat committed owner changes as the design contract, not drift.
- Keep tests green as the contract for owner edits: update tests to the
  new design when intent is clear, and ask targeted questions when it is not.
- Challenge the owner when evidence contradicts a decision. Agreement is
  not the goal; disagreement is a learning signal for both sides.
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
  Respect the harness's workspace binding and preserve existing work.
  Editing a submodule's source is distinct from updating its consumer pin.
  When cross-project work is authorized, read the destination's instructions
  and check whether the change fits its implementation.
<!-- agent-workflows:collaboration:end -->

<!-- agent-workflows:memory:start -->
## Development memory

Read `.agents/memory/config.md` before using Basic Memory in this checkout.
<!-- agent-workflows:memory:end -->

<!-- agent-workflows:reference-only:start -->
## Shared, not installed

Some one-shot setup skills stay in the library instead of being installed
into `.agents/skills`. Discovery depends on this pointer existing. Read
their instructions at the pinned revision; the library's
`docs/skill-distribution.md` defines the distribution policy.

- dev-remote-inspection: `.agent-workflows/.agents/skills/dev-remote-inspection/SKILL.md`
- tailscale-web-dev: `.agent-workflows/.agents/skills/tailscale-web-dev/SKILL.md`
<!-- agent-workflows:reference-only:end -->
