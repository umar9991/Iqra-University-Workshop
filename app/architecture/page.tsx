import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import DevWorkflow from "@/components/DevWorkflow";
import Mermaid from "@/components/Mermaid";

const ORG_CHART = `flowchart TB
  ORG["Iqra-University — GitHub Organization"]

  subgraph CS["Computer Science · Fall 2026"]
    direction TB
    subgraph CSR1["repo: Law app"]
      C1M1["Ayesha Khan"]
      C1M2["Faraz Ahmed"]
      C1M3["Abdul Rehman"]
      C1S["Supervisor"]
    end
    subgraph CSR2["repo: Medical app"]
      C2M1["Ali Hassan"]
      C2M2["Ahmed Ali"]
      C2M3["Hamza Ishtiaq"]
      C2S["Supervisor"]
    end
  end

  subgraph SE["Software Engineering · Fall 2026"]
    direction TB
    subgraph SER1["repo: Campus app"]
      S1M1["Ahmed Khan"]
      S1M2["Shehryar Ahmed"]
      S1M3["Tariq Jamil Khan"]
      S1S["Supervisor"]
    end
    subgraph SER2["repo: Exam app"]
      S2M1["Usman Aslam"]
      S2M2["Mohsin Ali"]
      S2M3["Umar Ahmad"]
      S2S["Supervisor"]
    end
  end

  ORG --> CS
  ORG --> SE`;

export const metadata: Metadata = {
  title: "Architecture",
  description: "How the Iqra workshop wall is built and deployed.",
};

export default function ArchitecturePage() {
  return (
    <article className="doc">
      <PageHeader
        kicker="System"
        title="Architecture"
        lede="A static Next.js site. There is no database and no server at runtime. Participant cards are markdown files, read once when the site is built."
      />

      <h2>GitHub organization structure</h2>
      <p>
        The organization is the root. Under it, each department cohort is a
        group of repositories. A repository is one final-year project: three
        members and one supervisor. This is the GitHub layout, separate from
        how this website is built.
      </p>
      <Mermaid chart={ORG_CHART} />

      <h2>How you work in a repo</h2>
      <p>
        Daily work happens on a branch cut from <code>develop</code>. A pull
        request merges back into <code>develop</code> after CI and the supervisor
        sign off. <code>main</code> changes only through a release pull request.
      </p>
      <DevWorkflow />

      <h2>Path of a card</h2>
      <pre className="pre">{`participants/<cohort>/<github-username>.md
        │
        ▼
lib/participants.ts          gray-matter reads the frontmatter
        │
        ▼
app/roster/page.tsx          passes the list into the roster
        │
        ▼
pull request                 .github/workflows/validate.yml
        │                    npm run validate
        ▼
merge to main                static export, then Vercel or GitHub Pages`}</pre>

      <h2>Why one file per person</h2>
      <p>
        A whole class can open pull requests at the same time. Separate files
        do not conflict. Editing a shared JSON list would. The schema check
        rejects a missing field, a wrong type, or a file that does not match
        the template.
      </p>

      <h2>Repository map</h2>
      <div className="table-wrap">
        <table className="people">
          <thead>
            <tr>
              <th>Path</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>app/layout.tsx</code></td>
              <td>Shell around every page: sidebar and content.</td>
            </tr>
            <tr>
              <td><code>app/page.tsx</code></td>
              <td>Overview: counts and links into the other sections.</td>
            </tr>
            <tr>
              <td><code>app/roster/page.tsx</code></td>
              <td>Searchable directory of cards.</td>
            </tr>
            <tr>
              <td><code>app/git/page.tsx</code></td>
              <td>Git command sheet. The rows live in <code>lib/git-commands.ts</code>.</td>
            </tr>
            <tr>
              <td><code>app/workflow/page.tsx</code></td>
              <td>The submit procedure.</td>
            </tr>
            <tr>
              <td><code>components/Mermaid.tsx</code></td>
              <td>Draws the organization diagram in the browser. Colors come from the CSS tokens.</td>
            </tr>
            <tr>
              <td><code>lib/nav.ts</code></td>
              <td>Sidebar groups. Add a page here when you add a route.</td>
            </tr>
            <tr>
              <td><code>lib/participants.ts</code></td>
              <td>Walks <code>participants/</code> at build time.</td>
            </tr>
            <tr>
              <td><code>participants/</code></td>
              <td>One markdown file per student, grouped by cohort folder.</td>
            </tr>
            <tr>
              <td><code>schema/</code> and <code>scripts/validate.mjs</code></td>
              <td>The check <code>npm run validate</code> runs, locally and in CI.</td>
            </tr>
            <tr>
              <td><code>next.config.mjs</code></td>
              <td>Static export. GitHub Pages sets <code>DEPLOY_TARGET=pages</code>.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>What is not in this system</h2>
      <p>
        No login, no write API, no client-side database. A card changes only
        when a pull request changes a file under <code>participants/</code> and
        that pull request merges. Search and filters on the{" "}
        <Link href="/roster">roster</Link> run in the browser on the list that
        was baked in at build time.
      </p>
    </article>
  );
}