import React from 'react';
import { Github, Linkedin, Twitter, User } from 'lucide-react';

export interface TeamCardProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
  github: string;
  twitter: string;
}

const socialLinks = [
  { key: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { key: 'github', label: 'GitHub', icon: Github },
  { key: 'twitter', label: 'Twitter', icon: Twitter },
] as const;

export const TeamCard: React.FC<TeamCardProps> = ({
  name,
  role,
  bio,
  image,
  linkedin,
  github,
  twitter,
}) => {
  const links = { linkedin, github, twitter };

  return (
    <article className="group h-full rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#4CAF7D]/40 hover:shadow-[0_18px_45px_rgba(76,175,125,0.16)]">
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[#4CAF7D]/20 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          {image ? (
            <img
              src={image}
              alt={name}
              className="relative h-24 w-24 rounded-full border-4 border-[#FFFFFF] object-cover shadow-md ring-1 ring-[#E2E8F0] transition duration-300 group-hover:ring-[#4CAF7D]/50"
            />
          ) : (
            <div
              aria-label={`${name} profile placeholder`}
              className="relative flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#FFFFFF] bg-[#F5F7F9] text-[#4CAF7D] shadow-md ring-1 ring-[#E2E8F0] transition duration-300 group-hover:ring-[#4CAF7D]/50"
            >
              <User className="h-10 w-10" />
            </div>
          )}
        </div>

        <div className="mt-5">
          <h3 className="text-lg font-semibold tracking-normal text-[#0F172A]">{name}</h3>
          <span className="mt-3 inline-flex rounded-full border border-[#4CAF7D]/20 bg-[#4CAF7D]/10 px-3 py-1 text-xs font-semibold text-[#4CAF7D]">
            {role}
          </span>
        </div>

        <p className="mt-4 text-sm leading-6 text-[#64748B]">{bio}</p>

        <div className="mt-6 flex items-center justify-center gap-3">
          {socialLinks.map(({ key, label, icon: Icon }) => (
            <a
              key={key}
              href={links[key]}
              aria-label={`${name} on ${label}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E2E8F0] bg-[#FFFFFF] text-[#64748B] transition-all duration-200 hover:border-[#4CAF7D] hover:bg-[#4CAF7D] hover:text-white hover:shadow-sm"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
};
