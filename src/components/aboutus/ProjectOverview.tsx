import React from 'react';
import { BarChart3, BrainCircuit, Leaf, RadioTower } from 'lucide-react';

const features = [
  {
    icon: BarChart3,
    title: 'Smart Analytics',
    description: 'Transforms mobility and emissions data into clear trends, benchmarks, and operational signals.',
  },
  {
    icon: Leaf,
    title: 'Sustainability Focus',
    description: 'Supports eco-friendly travel decisions by highlighting cleaner routes, patterns, and opportunities.',
  },
  {
    icon: RadioTower,
    title: 'Real-Time Insights',
    description: 'Monitors active transportation activity so teams can respond with timely, data-backed decisions.',
  },
  {
    icon: BrainCircuit,
    title: 'Intelligent Systems',
    description: 'Uses intelligent workflows to connect analytics, forecasting, and practical mobility optimization.',
  },
];

const stats = ['5 Team Members', 'Real-Time Monitoring', 'Eco-Driven Platform', 'AI-Powered Insights'];

export const ProjectOverview: React.FC = () => {
  return (
    <section className="bg-[#F5F7F9] px-0 py-16">
      <div className="mx-auto max-w-[92rem]">
        <div className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-6 shadow-sm sm:p-10 lg:p-12 xl:p-14">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center xl:gap-16">
            <div>
              <span className="inline-flex rounded-full border border-[#4CAF7D]/20 bg-[#4CAF7D]/10 px-4 py-1.5 text-sm font-semibold text-[#4CAF7D] shadow-sm">
                About The Project
              </span>

              <h2 className="mt-5 max-w-2xl text-3xl font-bold tracking-normal text-[#0F172A] sm:text-4xl">
                Building Smarter &amp; Sustainable Mobility
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-7 text-[#64748B]">
                EcoTrace analyzes transportation and sustainability data to help optimize mobility systems,
                encourage eco-friendly travel decisions, and turn complex movement patterns into actionable
                insights through analytics and intelligent systems.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {stats.map((stat) => (
                  <div
                    key={stat}
                    className="rounded-xl border border-[#E2E8F0] bg-[#F5F7F9] px-4 py-3 text-sm font-semibold text-[#0F172A]"
                  >
                    <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#4CAF7D]" />
                    {stat}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:gap-6">
              {features.map(({ icon: Icon, title, description }) => (
                <article
                  key={title}
                  className="group min-h-60 rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#4CAF7D]/40 hover:shadow-[0_18px_45px_rgba(76,175,125,0.14)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#4CAF7D]/20 bg-[#4CAF7D]/10 text-[#4CAF7D] transition-colors duration-300 group-hover:bg-[#4CAF7D] group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-[#0F172A]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#64748B]">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
