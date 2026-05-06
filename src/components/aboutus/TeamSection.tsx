import React from 'react';
import { TeamCard, TeamCardProps } from './TeamCard';
import { ProjectOverview } from './ProjectOverview';

const teamMembers: TeamCardProps[] = [
  {
    name: 'Aarav Mehta',
    role: 'Carbon Data Lead',
    bio: 'Builds reliable emissions models that turn complex operational data into clear sustainability decisions.',
    image: '',
    linkedin: 'https://www.linkedin.com',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
  },
  {
    name: 'Priya Nair',
    role: 'Product Strategist',
    bio: 'Shapes analytics workflows for teams tracking impact, compliance, and measurable decarbonization progress.',
    image: '',
    linkedin: 'https://www.linkedin.com',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
  },
  {
    name: 'Kabir Rao',
    role: 'Full Stack Engineer',
    bio: 'Designs fast dashboard experiences with clean data pipelines, accessible interfaces, and resilient APIs.',
    image: '',
    linkedin: 'https://www.linkedin.com',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
  },
  {
    name: 'Maya Iyer',
    role: 'UX Researcher',
    bio: 'Translates sustainability goals into calm, focused product journeys for analysts and operations teams.',
    image: '',
    linkedin: 'https://www.linkedin.com',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
  },
  {
    name: 'Rohan Sen',
    role: 'Climate Analyst',
    bio: 'Connects lifecycle insights, reporting standards, and fleet data to reveal practical reduction opportunities.',
    image: '',
    linkedin: 'https://www.linkedin.com',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
  },
];

export const TeamSection: React.FC = () => {
  return (
    <section className="bg-[#F5F7F9] px-4 py-16 sm:px-6 lg:px-4 xl:px-6">
      <div className="mx-auto max-w-[92rem]">
        <ProjectOverview />
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-[#4CAF7D]/20 bg-[#4CAF7D]/10 px-4 py-1.5 text-sm font-semibold text-[#4CAF7D] shadow-sm">
            Meet Our Team
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-normal text-[#0F172A] sm:text-4xl">
            The people behind smarter{' '}
            <span className="text-[#4CAF7D]">sustainability analytics</span>
          </h2>
          <p className="mt-4 text-base leading-7 text-[#64748B]">
            A focused team of climate analysts, engineers, and product thinkers helping organizations measure,
            understand, and reduce environmental impact with confidence.
          </p>
        </div>
        
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className={`lg:col-span-2 ${index === 3 ? 'lg:col-start-2' : ''}`}
            >

              <TeamCard {...member} />

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
