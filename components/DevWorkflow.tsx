const W = 168;
const H = 96;
const GAP = 26;
const X0 = 20;
const Y1 = 58;
const Y2 = 300;

function col(index: number) {
  return X0 + index * (W + GAP);
}

function center(index: number) {
  return col(index) + W / 2;
}

const BRANCH: { lines: string[] }[] = [
  { lines: ["1 · Clone the repo", "git clone"] },
  { lines: ["2 · Switch to develop", "git checkout develop", "git pull"] },
  { lines: ["3 · Branch off develop", "git checkout -b", "feature-x"] },
  { lines: ["4 · Build and commit", "git add · git commit"] },
  { lines: ["5 · Push the branch", "git push origin", "feature-x"] },
];

// Second row runs back toward the left, so step 6 sits under step 5
// and the review loop is a short line up to step 4.
const RELEASE: { lines: string[]; marked?: boolean }[] = [
  { lines: ["main · protected", "permanent record"], marked: true },
  { lines: ["9 · Release PR", "develop into main", "supervisor approves"] },
  { lines: ["8 · Merge into develop", "integration branch"] },
  { lines: ["7 · CI checks +", "Supervisor review"] },
  { lines: ["6 · Open Pull Request", "into develop"] },
];

function Step({
  x,
  y,
  lines,
  marked,
}: {
  x: number;
  y: number;
  lines: string[];
  marked?: boolean;
}) {
  const lineHeight = 16;
  const firstBaseline = y + (H - lines.length * lineHeight) / 2 + 13;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={W}
        height={H}
        rx={10}
        fill={marked ? "var(--mist)" : "var(--card)"}
        stroke="var(--navy)"
        strokeWidth={marked ? 1.75 : 1}
      />
      <text textAnchor="middle" fontSize={13}>
        {lines.map((line, index) => (
          <tspan
            key={line}
            x={x + W / 2}
            y={firstBaseline + index * lineHeight}
            fill={index === 0 ? "var(--ink)" : "var(--ink-soft)"}
            fontWeight={index === 0 ? 600 : 400}
          >
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

export default function DevWorkflow() {
  const mid = Y2 + H / 2;
  return (
    <div className="diagram-scroll" role="img" aria-label="Workflow from clone through develop to main">
      <svg className="flow-figure" viewBox="0 0 984 424" role="presentation">
        <defs>
          <marker id="dev-flow-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0 0 L8 4 L0 8 Z" fill="var(--navy-600)" />
          </marker>
        </defs>

        <rect x="8" y="8" width="968" height="164" rx="12" fill="var(--paper)" stroke="var(--navy)" />
        <text x="24" y="34" fill="var(--navy)" fontSize="14" fontWeight={600}>
          On your branch
        </text>
        {BRANCH.map((step, index) => (
          <Step key={step.lines[0]} x={col(index)} y={Y1} lines={step.lines} />
        ))}
        {[0, 1, 2, 3].map((index) => (
          <line
            key={index}
            x1={col(index) + W + 2}
            y1={Y1 + H / 2}
            x2={col(index + 1) - 8}
            y2={Y1 + H / 2}
            stroke="var(--navy-600)"
            strokeWidth={1.5}
            markerEnd="url(#dev-flow-arrow)"
          />
        ))}

        <rect x="8" y="252" width="968" height="164" rx="12" fill="var(--paper)" stroke="var(--navy)" />
        <text x="24" y="278" fill="var(--navy)" fontSize="14" fontWeight={600}>
          Review and release
        </text>
        {RELEASE.map((step, index) => (
          <Step key={step.lines[0]} x={col(index)} y={Y2} lines={step.lines} marked={step.marked} />
        ))}
        {[4, 3, 2, 1].map((from) => (
          <line
            key={from}
            x1={col(from) - 2}
            y1={mid}
            x2={col(from - 1) + W + 8}
            y2={mid}
            stroke="var(--navy-600)"
            strokeWidth={1.5}
            markerEnd="url(#dev-flow-arrow)"
          />
        ))}
        <text
          x={(col(3) + col(2) + W) / 2}
          y={mid - 8}
          fill="var(--ink-soft)"
          fontSize={11}
          textAnchor="middle"
        >
          approved
        </text>

        <line
          x1={center(4)}
          y1={Y1 + H}
          x2={center(4)}
          y2={Y2 - 8}
          stroke="var(--navy-600)"
          strokeWidth={1.5}
          markerEnd="url(#dev-flow-arrow)"
        />
        <line
          x1={center(3)}
          y1={Y2}
          x2={center(3)}
          y2={Y1 + H + 8}
          stroke="var(--navy-600)"
          strokeWidth={1.5}
          markerEnd="url(#dev-flow-arrow)"
        />
        <text x={center(3) - 10} y={(Y1 + H + Y2) / 2} fill="var(--ink-soft)" fontSize={12} textAnchor="end">
          changes requested
        </text>
      </svg>
      <ol className="flow-list">
        {BRANCH.map((step) => (
          <li key={step.lines[0]}>
            <strong>{step.lines[0]}</strong>
            <span>{step.lines.slice(1).join(" · ")}</span>
          </li>
        ))}
        {[4, 3, 2, 1, 0].map((index) => {
          const step = RELEASE[index];
          const note =
            index === 3
              ? "Changes requested go back to step 4. Approved continues."
              : null;
          return (
            <li key={step.lines[0]} className={step.marked ? "flow-step-final" : undefined}>
              <strong>{step.lines[0]}</strong>
              <span>{step.lines.slice(1).join(" · ")}</span>
              {note && <span>{note}</span>}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
