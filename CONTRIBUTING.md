# Add yourself to the Workshop Wall

Welcome — this is probably your first open-source style contribution. It takes
about five minutes.

## The easy way (with Cursor)

1. **Fork** [umar9991/Iqra-University-Workshop](https://github.com/umar9991/Iqra-University-Workshop) (top-right on GitHub) and open your fork in **Cursor**.
2. In Cursor's chat, type `/do-task` and press enter.
3. Answer the questions it asks (name, GitHub username, student ID, semester,
   department, skills).
4. It creates your card file and shows you the commit commands. Run them, then
   open a Pull Request.

## The manual way (plain Git)

1. Fork [the repository](https://github.com/umar9991/Iqra-University-Workshop) and clone your fork.
2. Copy `template/participant.md` to
   `participants/2026-nov/<your-github-username>.md`.
3. Fill in your details in the frontmatter (keep the field names the same).
4. Check it:
   ```bash
   npm install
   npm run validate
   ```
5. Commit and push:
   ```bash
   git add participants/2026-nov/<your-github-username>.md
   git commit -m "add: <Your Name> to the workshop wall"
   git push
   ```
6. Open a **Pull Request** to the `main` branch.

## Two rules

- **One new file per person.** Never edit someone else's file — separate files
  are what keep everyone conflict-free.
- Use your **GitHub username** (lowercase) as the file name.

Once a maintainer merges your PR, your card appears on the wall automatically.
