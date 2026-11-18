# Add me to the Workshop Wall

You are helping a workshop participant add their own card to the Iqra Workshop
Wall. Work only inside this repository, and only create files under
`participants/`. Never edit another person's file.

Follow these steps:

1. Ask the participant for the following. It's fine to ask a few at a time, and
   to keep it friendly — for many of them this is their first pull request:
   - Full name
   - GitHub username
   - Student ID
   - Semester
   - Department
   - 3–5 skills (e.g. React, Python, Figma)
   - One short line about themselves (optional)

2. Open `template/participant.md` to see the format. Create a **new** file at
   `participants/2026-nov/<github-username>.md` (lowercase username as the
   filename) and fill in their answers in the frontmatter. One new file per
   person — this is what keeps everyone's contribution conflict-free.

3. Run `npm run validate` and fix anything it reports (a wrong field name, a
   missing required value, etc.).

4. Show them the finished file, then give them the exact commands to submit it:

   ```bash
   git add .
   git commit -m "add: <Full Name> to the workshop wall"
   git push
   ```

   Then tell them to open a Pull Request to the `main` branch on GitHub. Once a
   maintainer merges it, their card goes live on the wall automatically.
