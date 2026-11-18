import type { Metadata } from "next";
import Link from "next/link";
import { REPO_URL } from "@/lib/site";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Submit a card",
  description: "How to add a card to the Iqra workshop wall.",
};

export default function WorkflowPage() {
  return (
    <article className="doc">
      <PageHeader
        kicker="Reference"
        title="Submit a card"
        lede="One new file. Your GitHub username as the filename. A pull request into main. The check rejects a bad file before it can merge."
      />

      <h2>Rules</h2>
      <ul>
        <li>Add a file. Do not edit someone else's file.</li>
        <li>
          Path: <code>participants/2026-nov/&lt;github-username&gt;.md</code>
        </li>
        <li>Username in the filename is lowercase, so the avatar URL resolves.</li>
        <li>Keep the frontmatter keys: name, github, id, semester, department, skills.</li>
      </ul>

      <h2>With Cursor</h2>
      <ol>
        <li>Fork the repository and open your fork in Cursor.</li>
        <li>
          In chat, run <code>/do-task</code> and answer the questions.
        </li>
        <li>Cursor writes the file. You commit, push, and open the pull request.</li>
      </ol>

      <h2>By hand</h2>
      <ol>
        <li>
          Fork <a href={REPO_URL}>the repository</a> and clone your fork.
        </li>
        <li>
          Copy <code>template/participant.md</code> to{" "}
          <code>participants/2026-nov/&lt;username&gt;.md</code> and fill it in.
        </li>
        <li>Validate, commit, and push:</li>
      </ol>
      <pre className="pre">{`git checkout -b add-<username>
npm install
npm run validate
git add .
git commit -m "add: Your Name to the workshop wall"
git push -u origin HEAD`}</pre>
      <p>
        Open a pull request to <code>main</code>. After a maintainer merges it,
        the site rebuilds and the card is on the <Link href="/roster">roster</Link>.
      </p>
      <p>
        The command-by-command version is on the{" "}
        <Link href="/git#workshop">Git sheet</Link>.
      </p>
    </article>
  );
}
