import { ArrowUpRight, Code2, Database, Smartphone } from "lucide-react";
export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="page-width">
        <div className="section-heading">
          <div>
            <p className="eyebrow">03 / THE PERSON BEHIND THE CODE</p>
            <h2 className="section-title">
              Curious by nature.
              <br />
              Engineer by craft.
            </h2>
          </div>
        </div>
        <div className="about-layout">
          <div className="about-portrait">
            <img
              src={`${import.meta.env.BASE_URL}images/profile.jpg`}
              alt="Rifthan Fathir"
              width={600}
              height={700}
              loading="lazy"
            />
            <div>
              <span>RIFTHAN FATHIR</span>
              <p>
                Software Engineer.
                <br />
                Always learning.
              </p>
            </div>
          </div>
          <div className="about-story">
            <p className="about-lead">
              Good software starts with understanding the people who use it.
            </p>
            <p className="section-copy">
              I'm a Software Engineer at{" "}
              <strong>Imara Software Solutions (Pvt) Ltd</strong>, building
              full-stack applications and enterprise software that supports
              everyday business operations.
            </p>
            <p className="section-copy">
              My experience spans ERPNext and Frappe development, Python, REST
              APIs, enterprise reporting, academic management, and HRMS. I
              connect reliable backend services with approachable interfaces,
              from databases through to production deployments.
            </p>
            <div className="overview">
              <h3>Quick Overview</h3>
              <div>
                <Code2 size={20} />
                <p>
                  <strong>Enterprise foundations</strong>
                  <span>Python, ERPNext, Frappe &amp; REST APIs</span>
                </p>
              </div>
              <div>
                <Smartphone size={20} />
                <p>
                  <strong>Across screens</strong>
                  <span>React web experiences &amp; Flutter applications</span>
                </p>
              </div>
              <div>
                <Database size={20} />
                <p>
                  <strong>Beyond the interface</strong>
                  <span>Databases, reporting &amp; production deployments</span>
                </p>
              </div>
            </div>
            <a className="text-link" href="mailto:rifthanfathir33@gmail.com">
              rifthanfathir33@gmail.com <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
