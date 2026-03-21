// src/components/TechStackFilter.tsx
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

  const filteredStacks =
    activeTab === 'All'
      ? techStacks
      : techStacks.filter((stack) => stack.category === activeTab);

  return (
    <div className="mt-10">
      <div className="mb-6 flex justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold shadow-sm transition-all ${
              activeTab === cat
                ? 'bg-blue-600 text-white shadow-blue-200'
                : 'border border-gray-200 bg-white text-gray-500 hover:bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex min-h-[40px] flex-wrap justify-center gap-2">
        {filteredStacks.map((stack) => (
          <span
            key={stack.name}
            className="rounded-lg border border-gray-100 bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-sm transition-all"
          >
            {stack.name}
          </span>
        ))}
      </div>
    </div>
  );
}
