import type { Participant } from "@/lib/types";
import { labelCohort, semesterShort } from "@/lib/format";

export default function ParticipantCard({
  p,
  index,
}: {
  p: Participant;
  index: number;
}) {
  const delay = `${Math.min(index * 40, 480)}ms`;
  const semester = semesterShort(p.semester);

  return (
    <li style={{ animationDelay: delay }}>
      <article className="card">
        {semester && <span className="sem-pill">{semester}</span>}
        <div className="card-top">
          <div className="card-name">
            <p className="card-cohort">{labelCohort(p.cohort)}</p>
            <h3>{p.name || p.username}</h3>
            <p className="handle">@{p.username}</p>
          </div>
        </div>

        {p.bio && <p className="bio">{p.bio}</p>}

        <dl className="card-meta">
          {p.studentId && (
            <div>
              <dt>ID</dt>
              <dd>{p.studentId}</dd>
            </div>
          )}
          {p.department && (
            <div>
              <dt>Department</dt>
              <dd>{p.department}</dd>
            </div>
          )}
        </dl>

        {p.skills.length > 0 && (
          <ul className="skills">
            {p.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        )}

        <a
          className="card-link"
          href={`https://github.com/${encodeURIComponent(p.username)}`}
          target="_blank"
          rel="noreferrer"
        >
          GitHub profile
          <span aria-hidden="true">→</span>
        </a>
      </article>
    </li>
  );
}
