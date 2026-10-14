import emailjs from "emailjs-com";
import { useRef, useState, type FormEvent } from "react";
import { Mail, Send } from "lucide-react";
const empty = { name: "", email: "", message: "" };
export default function Contact() {
  const [data, setData] = useState(empty);
  const [errors, setErrors] = useState(empty);
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const busy = useRef(false);
  const form = useRef<HTMLFormElement>(null);
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (busy.current) return;
    const clean = {
      name: data.name.trim(),
      email: data.email.trim(),
      message: data.message.trim(),
    };
    const next = {
      name:
        clean.name.length < 2
          ? "Please enter at least 2 characters for your name."
          : "",
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email)
        ? ""
        : "Please enter a valid email address.",
      message:
        clean.message.length < 10
          ? "Please write a message of at least 10 characters."
          : "",
    };
    setErrors(next);
    setStatus("");
    const invalid = (Object.keys(next) as (keyof typeof next)[]).find(
      (key) => next[key],
    );
    if (invalid) {
      (form.current?.elements.namedItem(invalid) as HTMLElement)?.focus();
      return;
    }
    busy.current = true;
    setSending(true);
    try {
      await emailjs.send(
        "service_oyyto7g",
        "template_ewlzi49",
        clean,
        "Glai-R1daTW_8_mbt",
      );
      setStatus("Thank you! Your message was sent successfully.");
      setData(empty);
    } catch {
      setStatus(
        "Your message could not be sent. Please try again or email me directly using the link below.",
      );
    } finally {
      busy.current = false;
      setSending(false);
    }
  }
  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-primary-900 dark:to-primary-800"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">Let’s Build Something Useful</h2>
          <p className="section-copy">
            Have a project in mind or want to discuss software development? Get
            in touch.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <form
            ref={form}
            onSubmit={submit}
            noValidate
            className="panel space-y-5"
          >
            {(["name", "email", "message"] as const).map((key) => (
              <div key={key}>
                <label
                  className="block font-medium mb-2 capitalize"
                  htmlFor={`contact-${key}`}
                >
                  {key}
                </label>
                {key === "message" ? (
                  <textarea
                    id={`contact-${key}`}
                    name={key}
                    value={data[key]}
                    onChange={(e) => {
                      setData({ ...data, [key]: e.target.value });
                      setErrors({ ...errors, [key]: "" });
                    }}
                    required
                    rows={5}
                    maxLength={5000}
                    aria-invalid={!!errors[key]}
                    aria-describedby={errors[key] ? `${key}-error` : undefined}
                    className="form-input"
                  />
                ) : (
                  <input
                    id={`contact-${key}`}
                    name={key}
                    type={key === "email" ? "email" : "text"}
                    autoComplete={key}
                    value={data[key]}
                    onChange={(e) => {
                      setData({ ...data, [key]: e.target.value });
                      setErrors({ ...errors, [key]: "" });
                    }}
                    required
                    maxLength={key === "name" ? 100 : 254}
                    aria-invalid={!!errors[key]}
                    aria-describedby={errors[key] ? `${key}-error` : undefined}
                    className="form-input"
                  />
                )}
                {errors[key] && (
                  <p
                    id={`${key}-error`}
                    className="text-red-700 dark:text-red-300 text-sm mt-2"
                  >
                    {errors[key]}
                  </p>
                )}
              </div>
            ))}
            <button
              disabled={sending}
              className="primary-button w-full disabled:opacity-60 disabled:cursor-wait"
              type="submit"
            >
              <Send size={18} aria-hidden="true" />
              {sending ? "Sending..." : "Send message"}
            </button>
            <p role="status" aria-live="polite" className="text-sm">
              {status}
            </p>
          </form>
          <div className="space-y-6">
            <article className="panel">
              <Mail className="text-blue-600 mb-4" aria-hidden="true" />
              <h3 className="text-xl font-bold mb-3">Contact Information</h3>
              <a
                className="text-blue-700 dark:text-blue-300 break-all underline underline-offset-4"
                href="mailto:rifthanfathir33@gmail.com"
              >
                rifthanfathir33@gmail.com
              </a>
              <p className="section-copy mt-5">
                Software Engineer at Imara Software Solutions (Pvt) Ltd
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <a
                  className="secondary-button"
                  href="https://github.com/Fathir2001"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a
                  className="secondary-button"
                  href="https://www.linkedin.com/in/rifthan-fathir"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
