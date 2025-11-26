import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiDribbble,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiTwitter,
} from "react-icons/fi";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import SectionHeading from "../components/SectionHeading";
import { personal, socials } from "../data/content";
import sendContactEmail from "../lib/email/sendContactEmail";

const iconMap = {
  GitHub: FiGithub,
  LinkedIn: FiLinkedin,
  Twitter: FiTwitter,
  Dribbble: FiDribbble,
  Instagram: FaInstagram,
  Whatsapp: FaWhatsapp,
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/.netlify/functions/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        // await sendContactEmail({ name: formData.name, email: formData.email, message: formData.message });
        setTimeout(() => {
          setSubmitted({
            success: true,
            message: "Thanks! Your message has been captured.",
          });
          setFormData({ name: "", email: "", message: "" });
        }, 1000);
      } else {
        setTimeout(() => {
          setSubmitted({
            error: true,
            message: "Failed to send message. Please try again later.",
          });
          setFormData({ name: "", email: "", message: "" });
        }, 1000);
      }
    } catch (error) {
      console.error("Error sending contact email:", error);
    } finally {
      setSubmitted({});
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <SectionHeading
          eyebrow="Contact"
          title="Let’s create something extraordinary together."
          subtitle="Open to collaborations, remote roles, and creative partnerships."
        />

        <div className="grid gap-12 lg:grid-cols-[0.55fr,0.45fr]">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card rounded-3xl p-8 shadow-2xl">
            <div className="grid gap-6 md:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-[0.35em] text-slate-400">
                  Name
                </span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Jane Doe"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-[0.35em] text-slate-400">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="hello@example.com"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
                />
              </label>
            </div>
            <label className="mt-6 flex flex-col gap-2">
              <span className="text-xs uppercase tracking-[0.35em] text-slate-400">
                Message
              </span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Tell me about your project..."
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
              />
            </label>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-8 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r  from-brand-500 via-indigo-500 to-sky-400 px-8 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white shadow-lg shadow-indigo-900/40">
              {loading ? "Sending..." : "Send Message"}
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: submitted ? 1 : 0, y: submitted ? 0 : 20 }}
              className={`mt-4 text-sm ${
                submitted.success ? "text-green-500" : "text-red-500"
              }`}>
              {submitted.success ? submitted.success : submitted.error}
            </motion.div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-8">
            <motion.div
              className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-500/20 via-black/0 to-sky-400/10"
              animate={{ opacity: [0.35, 0.6, 0.35] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -left-16 -top-24 h-52 w-52 rounded-full bg-gradient-to-br from-indigo-500/40 to-transparent blur-3xl"
              animate={{ y: [-15, 15, -15] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-16 right-0 h-48 w-48 rounded-full bg-gradient-to-tl from-sky-500/30 to-transparent blur-3xl"
              animate={{ y: [12, -12, 12] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative space-y-6">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                  Email
                </p>
                <div className="flex items-center gap-3 text-sm font-semibold text-white">
                  <FiMail />
                  {personal.contact.email}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                  Phone
                </p>
                <div className="flex items-center gap-3 text-sm font-semibold text-white">
                  <FiPhone />
                  {personal.contact.phone}
                </div>
              </div>

              <div className="pt-6">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                  Social Reach
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {socials.map((social) => {
                    const Icon = iconMap[social.label] ?? FiLinkedin;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-2 py-3 text-sm font-medium text-white transition hover:border-brand-500/40 hover:text-brand-300">
                        <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-lg text-brand-300 transition group-hover:border-brand-500/40 group-hover:text-brand-200">
                          <Icon />
                        </span>
                        <div>
                          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                            {social.label}
                          </p>
                          <p className="text-sm font-semibold text-white">
                            {social.handle}
                          </p>
                        </div>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
