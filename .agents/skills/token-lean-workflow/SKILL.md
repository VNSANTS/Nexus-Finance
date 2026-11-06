---
name: token-lean-workflow
description: Reduce wasted tokens and context usage during Nexus Finance development, research, testing, and handoffs. Use for long or multi-file tasks, repeated audits, excessive tool output, and resuming work.
---

# Token-lean workflow

Apply these steps without sacrificing correctness or security.

1. **Orient once:** read the latest concise checkpoint and `git status` (when local); identify the precise objective. Never restart an audit already documented unless the code or threat model changed.
2. **Discover narrowly:** search paths, symbols, or recent diffs before file contents. Read only relevant line ranges; expand when required. Avoid whole-repo dumps and redundant directory listings.
3. **Batch carefully:** combine independent lightweight tool calls; avoid re-fetching the same data. Keep tool outputs bounded, but preserve actionable errors and evidence.
4. **Plan small:** choose the smallest verifiable change that advances the current milestone; avoid gratuitous agents, integrations, dependencies, or full-project rebuilds.
5. **Validate proportionally:** first test affected functionality; run broader quality/security checks if release-critical. Never claim unrun tests passed.
6. **Record a handoff:** 5-10 concise lines covering goal, branch/commit, edits, checks (pass/fail/not run), blockers, and one next action. Reuse it to resume.
7. **Respect costs:** R$ 0 additional budget. Check for hidden usage limits, billing requirements, and paid fallbacks before touching external services.
8. **Respond briefly:** provide outcomes, evidence, risks, and the next step without repeating plans. Efficiency means fewer *wasted* tokens, not omitting necessary detail.

Avoid: installing piles of overlapping skills, inventing token savings percentages, endless subagent loops, noisy full logs, paid services, and premature deployment.
