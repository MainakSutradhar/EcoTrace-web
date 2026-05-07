import {
  ArrowRight,
  Clock3,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send,
  Twitter,
} from 'lucide-react';

const contactCards = [
  {
    title: 'Email',
    description: 'team@ecotrace.com',
    icon: Mail,
  },
  {
    title: 'Location',
    description: 'Kolkata, India',
    icon: MapPin,
  },
  {
    title: 'Response Time',
    description: 'Within 24 Hours',
    icon: Clock3,
  },
];

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com',
    icon: Github,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: Linkedin,
  },
  {
    label: 'Twitter/X',
    href: 'https://x.com',
    icon: Twitter,
  },
];

const inputClassName =
  'w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm text-[#0F172A] outline-none transition-all duration-200 placeholder:text-[#94A3B8] focus:border-[#4CAF7D] focus:ring-4 focus:ring-[#4CAF7D]/10';

export function ContactSection() {
  return (
    <section className="w-full bg-[#F5F7F9] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-[#4CAF7D]/20 bg-[#4CAF7D]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#2F8F61]">
            Get In Touch
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
            Let&apos;s build cleaner sustainability intelligence together
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#64748B] sm:text-lg">
            We&apos;re always open to collaborations, feedback, and innovative
            sustainability ideas.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {contactCards.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="group rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#4CAF7D]/35 hover:shadow-[0_18px_45px_rgba(76,175,125,0.16)]"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-[#4CAF7D]/10 p-3 text-[#4CAF7D] transition-colors duration-200 group-hover:bg-[#4CAF7D] group-hover:text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#0F172A]">{title}</h3>
                  <p className="mt-1 text-sm text-[#64748B]">{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <form className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#0F172A]">
                  Name
                </span>
                <input className={inputClassName} type="text" placeholder="Your name" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#0F172A]">
                  Email
                </span>
                <input
                  className={inputClassName}
                  type="email"
                  placeholder="you@example.com"
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-medium text-[#0F172A]">
                Subject
              </span>
              <input
                className={inputClassName}
                type="text"
                placeholder="Partnership, feedback, or product inquiry"
              />
            </label>

            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-medium text-[#0F172A]">
                Message
              </span>
              <textarea
                className={`${inputClassName} min-h-36 resize-none`}
                placeholder="Tell us what you are working on..."
              />
            </label>

            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#4CAF7D] px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-[#4CAF7D]/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#3F9C6D] hover:shadow-lg hover:shadow-[#4CAF7D]/25 focus:outline-none focus:ring-4 focus:ring-[#4CAF7D]/20 sm:w-auto"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              Send Message
            </button>
          </form>

          <aside className="flex flex-col justify-between rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8">
            <div>
              <div className="inline-flex rounded-2xl bg-[#4CAF7D]/10 p-3 text-[#4CAF7D]">
                <ArrowRight className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-2xl font-bold tracking-tight text-[#0F172A]">
                Connect with EcoTrace
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#64748B]">
                Follow our work, explore the platform, or reach out through the
                channels where sustainability builders gather.
              </p>
            </div>

            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                Social Links
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white text-[#64748B] shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#4CAF7D]/40 hover:text-[#4CAF7D] hover:shadow-[0_14px_34px_rgba(76,175,125,0.16)]"
                  >
                    <Icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
