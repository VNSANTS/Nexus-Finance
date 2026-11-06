# Nexus Finance — agent working rules

- Budget: R$ 0 in additional spending. Do not enable paid APIs, trials that auto-bill, paid hosting, or billable services.
- Before changes, inspect `git status` (if local) and the relevant project checkpoint/README; preserve existing work.
- Use targeted file discovery first (filenames, grep, small line ranges). Do not dump the whole repository or repeat completed audits.
- Reuse existing decisions and prior test results; rerun only tests relevant to changed code, then broader checks when release risk warrants.
- Batch independent reads and searches; keep command output and tool responses short. Do not suppress failure diagnostics needed to fix bugs.
- Make one coherent change at a time; validate behavior, report actual results, and update a short checkpoint with branch, commit, completed work, blockers, and next action.
- Never expose secrets or silently switch to paid providers. Preserve user data and avoid irreversible changes without confirmation.
- For long investigations, explicitly use the local `token-lean-workflow` skill in `.agents/skills/token-lean-workflow/SKILL.md`.
