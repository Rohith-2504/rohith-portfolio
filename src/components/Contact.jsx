import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { profile } from '../data/portfolio';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Contact() {
  return (
    <section id="contact" className="section-padding section-band-red">
      <div className="section-shell section-panel">
        <Reveal>
          <SectionHeading
            variant="red"
            eyebrow="Contact"
            title="Let's build something meaningful"
            description="Open to internships, collaborations, and AI/full-stack engineering opportunities."
          />
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            {[
              { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
              {
                icon: Phone,
                label: 'Phone',
                value: profile.phone,
                href: `tel:${profile.phone.replace(/\s/g, '')}`,
              },
              { icon: MapPin, label: 'Location', value: profile.location },
            ].map(({ icon: Icon, label, value, href }, index) => (
              <Reveal key={label} delay={index * 0.05}>
                <div className="glass-card p-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-chiffon/15 p-2.5 text-chiffon">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="eyebrow-red mb-1 text-[10px]">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm font-medium text-chiffon transition hover:text-white">
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-chiffon">{value}</p>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.08}>
            <form
              className="glass-card p-6 sm:p-8"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                window.location.href = `mailto:${profile.email}?subject=Portfolio Contact from ${encodeURIComponent(form.name.value)}&body=${encodeURIComponent(`From: ${form.email.value}\n\n${form.message.value}`)}`;
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-chiffon/90">Name</span>
                  <input
                    name="name"
                    required
                    className="w-full rounded-2xl border border-chiffon/20 bg-chiffon/10 px-4 py-3 text-sm text-chiffon outline-none transition placeholder:text-chiffon/40 focus:border-chiffon/45"
                    placeholder="Your name"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-chiffon/90">Email</span>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-2xl border border-chiffon/20 bg-chiffon/10 px-4 py-3 text-sm text-chiffon outline-none transition placeholder:text-chiffon/40 focus:border-chiffon/45"
                    placeholder="you@email.com"
                  />
                </label>
              </div>
              <label className="mt-5 block">
                <span className="mb-2 block text-sm font-medium text-chiffon/90">Message</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full rounded-2xl border border-chiffon/20 bg-chiffon/10 px-4 py-3 text-sm text-chiffon outline-none transition placeholder:text-chiffon/40 focus:border-chiffon/45"
                  placeholder="Tell me about your project or opportunity..."
                />
              </label>
              <button type="submit" className="btn-primary mt-6 inline-flex items-center gap-2">
                <Send size={16} />
                Send Message
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
