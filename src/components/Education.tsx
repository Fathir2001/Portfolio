import { GraduationCap, ArrowUpRight } from "lucide-react";
const education = [
  {
    degree: "BSc (Hons) Computing (Top-Up)",
    institution: "Wrexham University",
    date: "2026 (September)",
    status: "In Progress",
  },
  {
    degree: "National Diploma in Technology (IT)",
    institution: "University of Moratuwa",
    date: "2022–2025",
    status: "Completed",
  },
];
export default function Education() {
  return (
    <section id="education" className="education-section">
      <div className="page-width">
        <div className="section-heading">
          <div>
            <p className="eyebrow">05 / KEEP LEARNING</p>
            <h2 className="section-title">A foundation to build on.</h2>
          </div>
          <p className="section-copy">
            Formal study, practical experience, and the curiosity to keep moving
            forward.
          </p>
        </div>
        <div className="education-grid">
          {education.map((item, index) => (
            <article className="education-card" key={item.degree}>
              <div className="education-top">
                <GraduationCap size={25} />
                <span
                  className={
                    index === 0 ? "study-status current" : "study-status"
                  }
                >
                  {item.status}
                </span>
              </div>
              <h3>{item.degree}</h3>
              <p>{item.institution}</p>
              <div className="education-date">
                <span>
                  {index === 0 ? "Academic reference" : "Study period"}
                </span>
                <strong>{item.date}</strong>
                <ArrowUpRight size={18} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
