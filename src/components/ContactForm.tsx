import emailjs from "emailjs-com";
import { useRef, useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Send, User, MessageSquare, Check, Loader2 } from "lucide-react";

const empty = { name: "", email: "", message: "" };
const fields = [
  { key: "name", label: "Name", placeholder: "Your name", icon: User, limit: 100 },
  { key: "email", label: "Email", placeholder: "your.email@example.com", icon: Mail, limit: 254 },
  { key: "message", label: "Message", placeholder: "Tell me about your project, idea, or how I can help...", icon: MessageSquare, limit: 5000 },
] as const;

export default function ContactForm() {
  const [data, setData] = useState(empty);
  const [errors, setErrors] = useState(empty);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const busy = useRef(false);
  const form = useRef<HTMLFormElement>(null);
  const honey = useRef<HTMLInputElement>(null);
  const reduced = useReducedMotion();
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (busy.current) return;
    const clean = { name: data.name.trim(), email: data.email.trim(), message: data.message.trim() };
    const next = {
      name: clean.name.length < 2 ? "Please enter at least 2 characters for your name." : clean.name.length > 100 ? "Please keep your name to 100 characters or fewer." : "",
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email) && clean.email.length <= 254 ? "" : "Please enter a valid email address.",
      message: clean.message.length < 10 ? "Please write a message of at least 10 characters." : clean.message.length > 5000 ? "Please keep your message to 5,000 characters or fewer." : "",
    };
    setErrors(next); setStatus("idle");
    const invalid = (Object.keys(next) as (keyof typeof next)[]).find(key => next[key]);
    if (invalid) { (form.current?.elements.namedItem(invalid) as HTMLElement)?.focus(); return; }
    // A client-side honeypot supplements the existing provider's protections.
    if (honey.current?.value) { setStatus("error"); return; }
    busy.current = true; setStatus("sending");
    try {
      // Preserve the existing EmailJS service, template, parameters and public client ID.
      const result = await emailjs.send(
        "service_oyyto7g",
        "template_ewlzi49",
        clean,
        "Glai-R1daTW_8_mbt",
      );
      if (result.status !== 200) throw new Error("Provider did not confirm submission");
      setStatus("success"); setData(empty);
    } catch { setStatus("error"); }
    finally { busy.current = false; }
  }
  return (
    <form ref={form} onSubmit={submit} noValidate className="ct-panel ct-form" aria-labelledby="ct-form-title" aria-busy={status === "sending"}>
      <div className="ct-panel-header"><span className="ct-header-icon"><Mail size={27} strokeWidth={1.5} aria-hidden="true" /></span><div><h3 id="ct-form-title">Send a Message</h3><p>Tell me about your project, idea, or opportunity.</p></div></div>
      {status === "success" ? <motion.div className="ct-success" initial={{ opacity: 0, scale: reduced ? 1 : .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: reduced ? 0 : .35 }}>
        <span className="ct-success-icon"><Check size={35} aria-hidden="true" /></span><h4>Message sent.</h4><p>Thank you for getting in touch. I look forward to the conversation.</p>
        <button type="button" className="ct-send" onClick={() => { setStatus("idle"); requestAnimationFrame(() => (form.current?.elements.namedItem("name") as HTMLElement)?.focus()); }}>Send another message <Send size={17} aria-hidden="true" /></button>
      </motion.div> : <>
        <div className="ct-honeypot" aria-hidden="true"><label htmlFor="contact-website">Leave this field empty</label><input ref={honey} id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" /></div>
        <fieldset disabled={status === "sending"}>
          <legend className="sr-only">Your contact details and message</legend>
          {fields.map(({ key, label, placeholder, icon: Icon, limit }) => <div key={key} className="ct-field">
            <label htmlFor={`contact-${key}`}>{label}</label>
            <div className={`ct-input-wrap ${key === "message" ? "ct-message-wrap" : ""}`} data-invalid={!!errors[key]}>
              <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
              {key === "message" ? <textarea id={`contact-${key}`} name={key} placeholder={placeholder} value={data[key]} onChange={event => { setData({ ...data, [key]: event.target.value }); setErrors({ ...errors, [key]: "" }); }} required minLength={10} maxLength={limit} rows={5} aria-invalid={!!errors[key]} aria-describedby={`${errors[key] ? `${key}-error ` : ""}ct-message-count`} />
              : <input id={`contact-${key}`} name={key} type={key === "email" ? "email" : "text"} autoComplete={key} placeholder={placeholder} value={data[key]} onChange={event => { setData({ ...data, [key]: event.target.value }); setErrors({ ...errors, [key]: "" }); }} required maxLength={limit} aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `${key}-error` : undefined} />}
              {key === "message" && <span id="ct-message-count" className="ct-counter">{data.message.length} / 5000</span>}
            </div>
            {errors[key] && <p id={`${key}-error`} className="ct-field-error" role="alert">{errors[key]}</p>}
          </div>)}
          <button disabled={status === "sending"} type="submit" className="ct-send">{status === "sending" ? <Loader2 className="ct-spinner" size={19} aria-hidden="true" /> : <Send size={19} aria-hidden="true" />}{status === "sending" ? "Sending..." : "Send Message"}</button>
        </fieldset>
      </>}
      <div role="status" aria-live="polite" aria-atomic="true" className={status === "error" ? "ct-feedback ct-feedback-error" : "sr-only"}>
        {status === "sending" && "Sending your message. Please wait."}
        {status === "success" && "Thank you! Your message was sent successfully."}
        {status === "error" && <>Your message could not be sent. Please try again or <a href="mailto:rifthanfathir33@gmail.com">email me directly</a>. Your message is still here so you can retry.</>}
      </div>
    </form>
  );
}
