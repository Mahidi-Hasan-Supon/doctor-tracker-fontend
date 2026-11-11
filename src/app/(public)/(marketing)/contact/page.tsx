"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { motion } from "motion/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  ArrowRight,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Address",
    value: "care@guide.com",
    href: "care@guide.com",
    description: "Send me an email anytime.",
  },
  {
    icon: Phone,
    title: "Phone Number",
    value: "+880 1770-473000",
    href: "+880 1770-473000",
    description: "Available for direct calls.",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Bangladesh",
    href: "https://maps.google.com/?q=Bangladesh",
    description: "Based in Bangladesh.",
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const recipient = "your-email@example.com";

    const body = `
Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}
    `;

    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(
      formData.subject,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-white py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-green-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-emerald-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
            <MessageSquare size={16} />
            Get In Touch
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Let's Start a<span className="text-green-600"> Conversation</span>
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            Have questions, suggestions, or need assistance with Doctor Tracker?
            Feel free to reach out. I'd love to hear from you.
          </p>
        </motion.div>

        {/* Contact Content */}
        <div className="mt-14 grid gap-10 lg:grid-cols-5 lg:gap-12">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-7 lg:col-span-2"
          >
            <div>
              <h3 className="text-2xl font-bold text-slate-900">
                Contact Information
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                Choose your preferred way to connect. You can also send a
                message using the contact form.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.title}
                    href={item.href}
                    target={item.title === "Location" ? "_blank" : undefined}
                    rel={
                      item.title === "Location"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:-translate-y-1 hover:border-green-200 hover:shadow-lg hover:shadow-green-100/50"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600 transition-colors group-hover:bg-green-600 group-hover:text-white">
                      <Icon size={21} />
                    </div>

                    <div className="min-w-0">
                      <h4 className="font-semibold text-slate-900">
                        {item.title}
                      </h4>
                      <p className="truncate text-sm font-medium text-green-700">
                        {item.value}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {item.description}
                      </p>
                    </div>

                    <ArrowRight
                      size={18}
                      className="ml-auto shrink-0 text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-green-600"
                    />
                  </a>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="border-t border-slate-200 pt-6">
              <h4 className="font-semibold text-slate-900">Connect With Me</h4>

              <div className="mt-4 flex gap-3">
                <a
                  href="https://github.com/Mahidi-Hasan-Supon"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-all hover:border-green-600 hover:bg-green-600 hover:text-white"
                >
                  <FaGithub size={21} />
                </a>

                <a
                  href="https://www.linkedin.com/in/mahidi-hasan-supon"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-all hover:border-green-600 hover:bg-green-600 hover:text-white"
                >
                  <FaLinkedin size={21} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-100 sm:p-8 lg:col-span-3"
          >
            <div className="mb-7">
              <h3 className="text-2xl font-bold text-slate-900">
                Send Me a Message
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Fill out the form below and send your message directly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    minLength={2}
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  placeholder="What is this about?"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  minLength={10}
                  rows={5}
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                />
              </div>

              <button
                type="submit"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 font-semibold text-white shadow-md shadow-green-200 transition-all hover:bg-green-700 hover:shadow-lg sm:w-auto"
              >
                Send Message
                <Send size={17} />
              </button>

              <p className="text-xs leading-5 text-slate-500">
                Your default email application will open with your message
                prepared. You can review and send it from there.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
