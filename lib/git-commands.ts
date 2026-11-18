export type GitCommand = {
  command: string;
  purpose: string;
};

export type GitGroup = {
  id: string;
  title: string;
  note: string;
  commands: GitCommand[];
};

export const GIT_GROUPS: GitGroup[] = [
  {
    id: "setup",
    title: "Setup",
    note: "Run once on your machine. Use the name and email GitHub already knows.",
    commands: [
      {
        command: 'git config --global user.name "Your Name"',
        purpose: "Sets the name recorded on every commit you make.",
      },
      {
        command: 'git config --global user.email "you@users.noreply.github.com"',
        purpose: "Sets the email recorded on every commit.",
      },
      {
        command: "git config --global --list",
        purpose: "Prints the settings so you can confirm name and email.",
      },
    ],
  },
  {
    id: "inspect",
    title: "Inspect",
    note: "Look before you change anything. These commands do not edit files.",
    commands: [
      {
        command: "git status",
        purpose: "Shows the branch you are on, and which files are new, changed, or staged.",
      },
      {
        command: "git diff",
        purpose: "Shows unstaged edits, line by line.",
      },
      {
        command: "git diff --staged",
        purpose: "Shows what will go into the next commit.",
      },
      {
        command: "git log --oneline -15",
        purpose: "Shows the last 15 commits on this branch, one per line.",
      },
      {
        command: "git remote -v",
        purpose: "Shows the GitHub URLs this folder pushes to and pulls from.",
      },
    ],
  },
  {
    id: "commit",
    title: "Commit",
    note: "A commit is a saved checkpoint with a message. Stage the file first, then commit.",
    commands: [
      {
        command: "git add .",
        purpose: "Stages every change in this folder.",
      },
      {
        command: 'git commit -m "add: Your Name to the workshop wall"',
        purpose: "Records the staged files with this message.",
      },
      {
        command: "git status",
        purpose: "Confirms the working tree is clean after the commit.",
      },
    ],
  },
  {
    id: "branch",
    title: "Branch",
    note: "Do the work on a branch. Leave main clean so you can pull updates.",
    commands: [
      {
        command: "git checkout main",
        purpose: "Moves you onto the main branch.",
      },
      {
        command: "git checkout -b add-<username>",
        purpose: "Creates a new branch for your card and checks it out.",
      },
      {
        command: "git branch",
        purpose: "Lists local branches. The current one is marked with an asterisk.",
      },
    ],
  },
  {
    id: "sync",
    title: "Sync",
    note: "Pull before you start. Push when the commit exists. Then open the pull request on GitHub.",
    commands: [
      {
        command: "git pull",
        purpose: "Downloads new commits from the remote branch you are tracking.",
      },
      {
        command: "git push -u origin HEAD",
        purpose: "Uploads this branch and sets it to track origin. Use this the first time you push the branch.",
      },
      {
        command: "git push",
        purpose: "Uploads new commits after the branch is already tracking origin.",
      },
    ],
  },
  {
    id: "workshop",
    title: "This workshop",
    note: "The exact sequence for a card. Replace <username> with your GitHub username in lowercase. One new file. Do not edit anyone else's.",
    commands: [
      {
        command: "git checkout -b add-<username>",
        purpose: "Starts a branch named for your card.",
      },
      {
        command: "npm install",
        purpose: "Installs the project once, so the validate script can run.",
      },
      {
        command: "npm run validate",
        purpose: "Checks every card file against the schema before you commit.",
      },
      {
        command: "git add .",
        purpose: "Stages every change in this folder.",
      },
      {
        command: 'git commit -m "add: Your Name to the workshop wall"',
        purpose: "Saves the card. Use your real name in the message.",
      },
      {
        command: "git push -u origin HEAD",
        purpose: "Publishes the branch. Open a pull request to main on GitHub after this.",
      },
    ],
  },
  {
    id: "undo",
    title: "Undo",
    note: "Use these before the commit is on GitHub. If you already pushed, make a new commit instead of rewriting history.",
    commands: [
      {
        command: "git restore <file>",
        purpose: "Throws away unstaged edits in that file. The last committed version comes back.",
      },
      {
        command: "git restore --staged <file>",
        purpose: "Unstages a file. Your edits stay in the working folder.",
      },
      {
        command: "git commit --amend",
        purpose: "Rewrites the latest commit. Only do this if you have not pushed that commit.",
      },
    ],
  },
];
