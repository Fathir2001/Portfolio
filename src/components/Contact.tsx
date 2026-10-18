import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, User, Briefcase, Code2, Github, Linkedin, ArrowUpRight, MessageSquare, Users, Rocket } from "lucide-react";
import ContactForm from "./ContactForm";
import HolographicEnvelope from "./HolographicEnvelope";
import "./Contact.css";

const features = [
  { icon: MessageSquare, title: "Meaningful Conversations", text: "Let's discuss your ideas." },
  { icon: Code2, title: "Real Solutions", text: "Turn ideas into working software." },
  { icon: Users, title: "New Opportunities", text: "Open to meaningful collaborations." },
  { icon: Rocket, title: "Continuous Growth", text: "Build something better together." },
];
function ContactInformation() {
  return <aside className="ct-panel ct-information" aria-labelledby="ct-info-title">
    <div className="ct-panel-header"><span className="ct-header-icon"><User size={27} strokeWidth={1.5} aria-hidden="true" /></span><div><h3 id="ct-info-title">Contact Information</h3><p>Let's connect through your preferred channel.</p></div></div>
    <div className="ct-info-rows">
      <a className="ct-info-row" href="mailto:rifthanfathir33@gmail.com"><span className="ct-row-icon"><Mail aria-hidden="true" /></span><div><strong>rifthanfathir33@gmail.com</strong><p>Email me directly</p></div><ArrowUpRight size={18} aria-hidden="true" /></a>
      <div className="ct-info-row"><span className="ct-row-icon"><Briefcase aria-hidden="true" /></span><div><strong>Software Engineer</strong><p>Imara Software Solutions (Pvt) Ltd</p></div></div>
      <div className="ct-info-row"><span className="ct-row-icon"><Code2 aria-hidden="true" /></span><div><strong>Web, mobile &amp; enterprise software</strong><p>From approachable interfaces to reliable systems.</p></div></div>
    </div>
    <div className="ct-socials"><h4>Connect with me</h4><p>Find me on these platforms.</p><div>
      <a href="https://github.com/Fathir2001" target="_blank" rel="noopener noreferrer" aria-label="Rifthan Fathir on GitHub (opens in a new tab)"><Github size={20} aria-hidden="true" />GitHub<ArrowUpRight size={16} aria-hidden="true" /></a>
      <a href="https://www.linkedin.com/in/rifthan-fathir" target="_blank" rel="noopener noreferrer" aria-label="Rifthan Fathir on LinkedIn (opens in a new tab)"><Linkedin size={20} aria-hidden="true" />LinkedIn<ArrowUpRight size={16} aria-hidden="true" /></a>
    </div></div>
  </aside>;
}
export default function Contact() {
  const reduced = useReducedMotion();
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  useEffect(() => { const update = () => setPageVisible(!document.hidden); document.addEventListener("visibilitychange", update); return () => document.removeEventListener("visibilitychange", update); }, []);
  const reveal = (delay = 0) => ({ initial: { opacity: 0, y: reduced ? 0 : 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .15 }, transition: { duration: reduced ? 0 : .6, delay: reduced ? 0 : delay } });
  return <section id="contact" className="ct-section" aria-labelledby="ct-title"><div className="page-width">
    <div className="ct-heading"><div><motion.p className="ct-eyebrow" {...reveal()}>06 / START A CONVERSATION</motion.p>
      <h2 id="ct-title"><motion.span {...reveal(.05)}>Let's Build</motion.span><motion.span {...reveal(.12)}>Something <em>Useful.</em></motion.span></h2>
      <motion.p className="ct-intro" {...reveal(.18)}>Have a project in mind or want to discuss software development? Get in touch. I'm always open to meaningful conversations and new opportunities.</motion.p>
    </div><motion.div {...reveal(.15)}><HolographicEnvelope pageVisible={pageVisible} /></motion.div></div>
    <div className="ct-grid"><motion.div {...reveal()}><ContactForm /></motion.div><motion.div {...reveal(.1)}><ContactInformation /></motion.div></div>
    <motion.aside className="ct-features" aria-label="Let's work together" {...reveal(.1)}>{features.map(({ icon: Icon, title, text }) => <div key={title}><span className="ct-feature-icon"><Icon size={25} strokeWidth={1.5} aria-hidden="true" /></span><div><h3>{title}</h3><p>{text}</p></div></div>)}</motion.aside>
  </div></section>;
}
