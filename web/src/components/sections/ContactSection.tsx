import Image from "next/image";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { profile } from "@/data/portfolio";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";

export default function ContactSection() {
  return (
    <section id="contact" className="section border-t border-white/5">
      <div className="wrap">
        <Reveal>
          <div className="card overflow-hidden">
            <div className="grid lg:grid-cols-[1fr_340px]">
              <div className="p-6 lg:p-10">
                <p className="section-label">Contact</p>
                <h2 className="display-lg uppercase tracking-tight">
                  Let&apos;s build something <span className="text-accent italic">amazing</span> together.
                </h2>
                <p className="body-lg mt-4 max-w-xl text-sm">
                  Open to full-time roles, internships, and collaborations in AI engineering and full-stack development.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
                    { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
                    { icon: MapPin, label: "Location", value: "Bengaluru, India", href: undefined },
                    { icon: Mail, label: "Availability", value: profile.availability, href: undefined },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="rounded-xl border border-white/5 bg-surface-2/40 p-4">
                      <div className="flex items-center gap-2 text-accent">
                        <Icon size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
                      </div>
                      {href ? (
                        <a href={href} className="mt-2 block text-sm hover:text-accent">{value}</a>
                      ) : (
                        <p className="mt-2 text-sm">{value}</p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <MagneticButton href={`mailto:${profile.email}`} className="btn-accent">
                    Let&apos;s Connect <ArrowRight size={16} />
                  </MagneticButton>
                  <a href={profile.github} target="_blank" rel="noreferrer" className="btn-ghost">
                    <FaGithub size={14} /> GitHub
                  </a>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn-ghost">
                    <FaLinkedin size={14} /> LinkedIn
                  </a>
                </div>
              </div>

              <div className="relative min-h-[280px] border-t border-white/5 lg:min-h-full lg:border-l lg:border-t-0">
                <Image
                  src={profile.animeContact}
                  alt="Anime contact illustration"
                  fill
                  className="object-cover object-top"
                  sizes="340px"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-bg/80 via-transparent to-transparent lg:bg-gradient-to-t lg:from-bg/60 lg:via-transparent" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
