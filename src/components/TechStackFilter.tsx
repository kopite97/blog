'use client';

import { useState } from 'react';

const techStacks = [
  { name: 'Java', category: 'Languages' },
  { name: 'C#', category: 'Languages' },
  { name: 'TypeScript', category: 'Languages' },
  { name: 'JavaScript', category: 'Languages' },
  { name: 'Spring Boot', category: 'Frameworks' },
  { name: 'Next.js', category: 'Frameworks' },
  { name: 'Unity', category: 'Frameworks' },
  { name: 'Three.js', category: 'Tools' },
  { name: 'Blender', category: 'Tools' },
  { name: 'Git', category: 'Tools' },
  { name: 'Notion', category: 'Tools' },
];

const categories = ['All', 'Languages', 'Frameworks', 'Tools'];

export default function TechStackFilter() {
  const [activeTab, setActiveTab] = useState('All');

  const filteredStacks = activeTab === 'All' ? techStacks : techStacks.filter((stack) => stack.category === activeTab);

  return (
    <div className="mt-10 space-y-5">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 rounded-3xl border border-slate-200/70 bg-white/85 px-4 py-4 shadow-lg shadow-slate-200/40 backdrop-blur dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-black/20">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400 dark:text-slate-500">
          Stack Categories
        </p>

        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => {
            const stackCount = cat === 'All' ? techStacks.length : techStacks.filter((stack) => stack.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                  activeTab === cat
                    ? 'border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                    activeTab === cat ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-200'
                  }`}
                >
                  {stackCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-slate-400 dark:text-slate-500">
          {activeTab === 'All' ? 'All Stacks' : `${activeTab} Stacks`}
        </p>

        <div className="flex min-h-[40px] flex-wrap justify-center gap-2">
          {filteredStacks.map((stack) => (
            <span
              key={stack.name}
              className="rounded-full border border-slate-200/80 bg-slate-100/90 px-3 py-1.5 text-sm font-medium text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800"
            >
              {stack.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
