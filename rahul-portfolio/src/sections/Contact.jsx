import { lazy, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  FiAlertCircle,
  FiCheck,
  FiCheckCircle,
  FiClock,
  FiCopy,
  FiInfo,
  FiLoader,
  FiSend,
} from "react-icons/fi";
import LazyScene from "../components/LazyScene";
import SectionHeading from "../components/SectionHeading";
import { contact, profile, socials } from "../data/content";
import { contactChannelIcons, socialIcons } from "../data/socialIcons";
import useCanRender3D from "../hooks/useCanRender3D";

const ContactScene = lazy(() => import("../three/ContactScene"));

const easeOut = [0.22, 1, 0.36, 1];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const formFields = [
  {
    name: "name",
    type: "text",
    multiline: false,
    label: contact.fields.name.label,
    autoComplete: contact.fields.name.autoComplete,
    maxLength: contact.fields.name.maxLength,
  },
  {
    name: "email",
    type: "email",
    multiline: false,
    label: contact.fields.email.label,
    autoComplete: contact.fields.email.autoComplete,
    maxLength: contact.fields.email.maxLength,
  },
  {
    name: "message",
    type: "text",
    multiline: true,
    label: contact.fields.message.label,
    autoComplete: contact.fields.message.autoComplete,
    maxLength: contact.fields.message.maxLength,
  },
];

const initialValues = {
  name: "",
  email: "",
  message: "",
};

const emailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

async function copyToClipboard(value) {
  let clipboardWorked = false;

  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      clipboardWorked = true;
    } catch {
      clipboardWorked = false;
    }
  }

  if (clipboardWorked) {
    return true;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  document.body.removeChild(textarea);

  return copied;
}

function ContactStatus({ status }) {
  return (
    <div aria-live="polite" className="min-h-0">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: easeOut }}
            className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-200"
          >
            <FiCheckCircle className="mt-0.5 shrink-0 text-lg text-emerald-300" />
            <p className="leading-relaxed">{contact.successMessage}</p>
          </motion.div>
        ) : null}

        {status === "error" ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: easeOut }}
            className="mt-5 flex items-start gap-3 rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4 text-sm text-rose-200"
          >
            <FiAlertCircle className="mt-0.5 shrink-0 text-lg text-rose-300" />
            <p className="leading-relaxed">
              {contact.errorMessage}{" "}
              <a
                href={profile.emailHref}
                className="font-medium text-rose-100 underline decoration-rose-300/40 underline-offset-4 transition-colors hover:text-white"
              >
                {profile.email}
              </a>
            </p>
          </motion.div>
        ) : null}

        {status === "fallback" ? (
          <motion.div
            key="fallback"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: easeOut }}
            className="mt-5 flex items-start gap-3 rounded-2xl border border-cyan/20 bg-cyan/10 p-4 text-sm text-cyan-100"
          >
            <FiInfo className="mt-0.5 shrink-0 text-lg text-cyan" />
            <div className="leading-relaxed">
              <p>{contact.fallbackMessage}</p>
              <a
                href={profile.emailHref}
                className="mt-2 inline-block text-xs font-semibold text-cyan underline decoration-cyan/30 underline-offset-4 transition-colors hover:text-white"
              >
                {profile.email}
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const reduceMotion = useReducedMotion();
  const canRender3D = useCanRender3D();
  const copyTimer = useRef(null);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [copiedId, setCopiedId] = useState(null);

  useEffect(
    () => () => {
      if (copyTimer.current) {
        window.clearTimeout(copyTimer.current);
      }
    },
    [],
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) {
        return current;
      }

      const next = { ...current };
      delete next[name];
      return next;
    });

    if (status !== "idle" && status !== "sending") {
      setStatus("idle");
    }
  };

  const handleCopy = async (channel) => {
    const copied = await copyToClipboard(channel.copyValue);

    if (!copied) {
      return;
    }

    setCopiedId(channel.id);

    if (copyTimer.current) {
      window.clearTimeout(copyTimer.current);
    }

    copyTimer.current = window.setTimeout(() => setCopiedId(null), 2000);
  };

  const validateForm = () => {
    const nextErrors = {};
    const name = values.name.trim();
    const email = values.email.trim();
    const message = values.message.trim();

    if (!name) {
      nextErrors.name = contact.validation.nameRequired;
    } else if (name.length < 2) {
      nextErrors.name = contact.validation.nameShort;
    }

    if (!email) {
      nextErrors.email = contact.validation.emailRequired;
    } else if (!emailPattern.test(email)) {
      nextErrors.email = contact.validation.emailInvalid;
    }

    if (!message) {
      nextErrors.message = contact.validation.messageRequired;
    } else if (message.length < 10) {
      nextErrors.message = contact.validation.messageShort;
    }

    setErrors(nextErrors);
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (status === "sending") {
      return;
    }

    const nextErrors = validateForm();
    const firstInvalid = formFields.find((field) => nextErrors[field.name]);

    if (firstInvalid) {
      window.requestAnimationFrame(() => {
        document.getElementById(`contact-${firstInvalid.name}`)?.focus();
      });
      return;
    }

    const name = values.name.trim();
    const email = values.email.trim();
    const message = values.message.trim();

    if (
      !emailJsConfig.serviceId ||
      !emailJsConfig.templateId ||
      !emailJsConfig.publicKey
    ) {
      setStatus("fallback");

      const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\n${message}`,
      );

      window.location.href = `${profile.emailHref}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");

    try {
      const { default: emailjs } = await import("@emailjs/browser");

      await emailjs.send(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        {
          from_name: name,
          from_email: email,
          reply_to: email,
          to_name: profile.firstName,
          message,
        },
        { publicKey: emailJsConfig.publicKey },
      );

      setStatus("success");
      setValues(initialValues);
      setErrors({});
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-padding relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-36 top-1/4 h-80 w-80 rounded-full bg-violet/10 blur-[140px]"
      />

      {canRender3D ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-10 hidden h-[34rem] w-[34rem] opacity-45 lg:block"
        >
          <LazyScene scene={ContactScene} className="h-full w-full" />
        </div>
      ) : null}

      <div className="section-shell relative">
        <SectionHeading
          id="contact-heading"
          eyebrow={contact.eyebrow}
          title={contact.heading}
          description={contact.description}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: easeOut }}
          >
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3.5 py-1.5 text-xs font-medium text-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                {contact.availability}
              </span>

              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-slate-400">
                <FiClock className="text-cyan" />
                {contact.responseTime}
              </span>
            </div>

            <div className="mt-5 space-y-3">
              <p className="eyebrow text-[10px]">{contact.channelsLabel}</p>

              {contact.channels.map((channel) => {
                const Icon = contactChannelIcons[channel.icon];
                const copied = copiedId === channel.id;

                return (
                  <div
                    key={channel.id}
                    className="glass glass-hover flex items-center gap-4 rounded-2xl p-4"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-violet/25 to-cyan/10 text-cyan">
                      {Icon ? <Icon className="text-lg" /> : null}
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
                        {channel.label}
                      </p>
                      {channel.href ? (
                        <a
                          href={channel.href}
                          className="mt-0.5 block break-all text-sm font-medium text-white transition-colors hover:text-cyan"
                          data-cursor="hover"
                        >
                          {channel.value}
                        </a>
                      ) : (
                        <p className="mt-0.5 text-sm font-medium text-white">
                          {channel.value}
                        </p>
                      )}
                    </div>

                    {channel.copyValue ? (
                      <button
                        type="button"
                        onClick={() => handleCopy(channel)}
                        aria-label={
                          channel.id === "phone"
                            ? contact.copyPhoneLabel
                            : contact.copyEmailLabel
                        }
                        className={`inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-full border px-3 py-2 text-[10px] font-semibold transition-colors ${
                          copied
                            ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                            : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-white"
                        }`}
                        data-cursor="hover"
                      >
                        {copied ? (
                          <FiCheck className="text-sm" />
                        ) : (
                          <FiCopy className="text-sm" />
                        )}
                        <span className="hidden sm:inline">
                          {copied ? contact.copiedLabel : contact.copyLabel}
                        </span>
                      </button>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className="mt-7">
              <p className="eyebrow text-[10px]">{contact.socialLabel}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {socials.map((social) => {
                  const Icon = socialIcons[social.icon];
                  const external = social.href.startsWith("http");

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="glass glass-hover flex h-11 w-11 items-center justify-center rounded-full text-slate-300 transition-colors hover:text-cyan"
                      data-cursor="hover"
                    >
                      {Icon ? <Icon className="text-lg" /> : null}
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: 0.08, ease: easeOut }}
            className="glass relative overflow-hidden rounded-[2rem] p-5 sm:p-7 lg:p-8"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent"
            />

            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-2xl font-semibold text-white">
                  {contact.formTitle}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                  {contact.formHint}
                </p>
              </div>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-400">
                {profile.role}
              </span>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              aria-label={contact.formAriaLabel}
              aria-busy={status === "sending"}
              className="mt-7"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {formFields.map((field) => {
                  const hasError = Boolean(errors[field.name]);
                  const errorId = `contact-${field.name}-error`;
                  const sharedProps = {
                    id: `contact-${field.name}`,
                    name: field.name,
                    value: values[field.name],
                    onChange: handleChange,
                    placeholder: " ",
                    maxLength: field.maxLength,
                    required: true,
                    disabled: status === "sending",
                    "aria-invalid": hasError,
                    "aria-describedby": hasError ? errorId : undefined,
                  };

                  return (
                    <div
                      key={field.name}
                      className={field.multiline ? "sm:col-span-2" : ""}
                    >
                      <div className="relative">
                        {field.multiline ? (
                          <textarea
                            {...sharedProps}
                            rows={5}
                            autoComplete={field.autoComplete}
                            className={`peer min-h-[140px] w-full resize-none rounded-2xl border bg-white/[0.03] px-4 pb-3 pt-6 text-sm text-white outline-none transition-colors placeholder:text-transparent focus:ring-2 disabled:opacity-60 ${
                              hasError
                                ? "border-rose-400/50 focus:border-rose-300/60 focus:ring-rose-400/10"
                                : "border-white/10 focus:border-cyan/50 focus:ring-cyan/10"
                            }`}
                          />
                        ) : (
                          <input
                            {...sharedProps}
                            type={field.type}
                            autoComplete={field.autoComplete}
                            className={`peer h-[58px] w-full rounded-2xl border bg-white/[0.03] px-4 pb-2 pt-6 text-sm text-white outline-none transition-colors placeholder:text-transparent focus:ring-2 disabled:opacity-60 ${
                              hasError
                                ? "border-rose-400/50 focus:border-rose-300/60 focus:ring-rose-400/10"
                                : "border-white/10 focus:border-cyan/50 focus:ring-cyan/10"
                            }`}
                          />
                        )}

                        <label
                          htmlFor={`contact-${field.name}`}
                          className={`pointer-events-none absolute left-4 top-2 text-[10px] font-medium uppercase tracking-[0.16em] transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-slate-400 peer-focus:top-2 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.16em] peer-focus:text-cyan ${
                            hasError ? "text-rose-300" : "text-cyan"
                          }`}
                        >
                          {field.label}
                        </label>
                      </div>

                      <AnimatePresence initial={false}>
                        {hasError ? (
                          <motion.p
                            id={errorId}
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                            className="mt-1.5 text-xs text-rose-300"
                          >
                            {errors[field.name]}
                          </motion.p>
                        ) : null}
                      </AnimatePresence>

                      {field.multiline ? (
                        <div className="mt-1.5 flex justify-end">
                          <span className="text-[10px] tabular-nums text-slate-400">
                            {values.message.length}/{field.maxLength}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-mono group"
                  data-cursor="hover"
                >
                  {status === "sending" ? (
                    <>
                      <FiLoader className="animate-spin text-base" />
                      {contact.sendingLabel}
                    </>
                  ) : (
                    <>
                      {contact.submitLabel}
                      <FiSend className="text-base transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>

                <p className="text-xs text-slate-400">
                  {contact.directEmailLabel}{" "}
                  <a
                    href={profile.emailHref}
                    className="font-medium text-cyan transition-colors hover:text-cyan-light"
                    data-cursor="hover"
                  >
                    {profile.email}
                  </a>
                </p>
              </div>

              <ContactStatus status={status} />
            </form>
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex justify-center px-4">
        <AnimatePresence>
          {copiedId ? (
            <motion.div
              key="copy-toast"
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }}
              transition={{ duration: 0.25, ease: easeOut }}
              role="status"
              className="rounded-full border border-emerald-400/30 bg-ink/90 px-4 py-2 text-sm font-medium text-emerald-300 shadow-glow backdrop-blur"
            >
              {contact.copiedLabel}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
