import React from 'react';

/**
 * Registry of 100% OFFICIAL tech logos and brand color schemes.
 * Assets are stored as authentic SVGs directly in /public/tech/.
 */
const TECH_REGISTRY = {
  react: {
    name: 'React 19',
    file: 'react.svg',
    color: '#00eefc',
    bg: 'rgba(0, 238, 252, 0.08)',
    border: 'rgba(0, 238, 252, 0.25)',
  },
  nextjs: {
    name: 'Next.js',
    file: 'nextjs.svg',
    color: '#ffffff',
    bg: 'rgba(255, 255, 255, 0.08)',
    border: 'rgba(255, 255, 255, 0.25)',
  },
  typescript: {
    name: 'TypeScript',
    file: 'typescript.svg',
    color: '#3178c6',
    bg: 'rgba(49, 120, 198, 0.1)',
    border: 'rgba(49, 120, 198, 0.3)',
  },
  javascript: {
    name: 'JavaScript (ES6+)',
    file: 'javascript.svg',
    color: '#f7df1e',
    bg: 'rgba(247, 223, 30, 0.08)',
    border: 'rgba(247, 223, 30, 0.25)',
  },
  tailwind: {
    name: 'Tailwind CSS',
    file: 'tailwindcss.svg',
    color: '#38bdf8',
    bg: 'rgba(56, 189, 248, 0.08)',
    border: 'rgba(56, 189, 248, 0.25)',
  },
  threejs: {
    name: 'Three.js',
    file: 'threejs.svg',
    color: '#c1c1ff',
    bg: 'rgba(193, 193, 255, 0.08)',
    border: 'rgba(193, 193, 255, 0.25)',
  },
  supabase: {
    name: 'Supabase',
    file: 'supabase.svg',
    color: '#3ecf8e',
    bg: 'rgba(62, 207, 142, 0.08)',
    border: 'rgba(62, 207, 142, 0.25)',
  },
  nodejs: {
    name: 'Node.js',
    file: 'nodejs.svg',
    color: '#22c55e',
    bg: 'rgba(34, 197, 94, 0.08)',
    border: 'rgba(34, 197, 94, 0.25)',
  },
  postgresql: {
    name: 'PostgreSQL',
    file: 'postgresql.svg',
    color: '#4ea1d3',
    bg: 'rgba(51, 103, 145, 0.12)',
    border: 'rgba(51, 103, 145, 0.3)',
  },
  vite: {
    name: 'Vite',
    file: 'vite.svg',
    color: '#bd34fe',
    bg: 'rgba(189, 52, 254, 0.08)',
    border: 'rgba(189, 52, 254, 0.25)',
  },
  figma: {
    name: 'Figma',
    file: 'figma.svg',
    color: '#a259ff',
    bg: 'rgba(162, 89, 255, 0.08)',
    border: 'rgba(162, 89, 255, 0.25)',
  },
  git: {
    name: 'Git & GitHub',
    file: 'git.svg',
    color: '#f05032',
    bg: 'rgba(240, 80, 50, 0.08)',
    border: 'rgba(240, 80, 50, 0.25)',
  },
  github: {
    name: 'GitHub',
    file: 'github.svg',
    color: '#ffffff',
    bg: 'rgba(255, 255, 255, 0.08)',
    border: 'rgba(255, 255, 255, 0.2)',
  },
  vietqr: {
    name: 'VietQR',
    file: 'vietqr.svg',
    color: '#005baa',
    bg: 'rgba(0, 91, 170, 0.12)',
    border: 'rgba(0, 91, 170, 0.3)',
  },
  express: {
    name: 'Express.js',
    file: 'express.svg',
    color: '#ffffff',
    bg: 'rgba(255, 255, 255, 0.08)',
    border: 'rgba(255, 255, 255, 0.2)',
  },
  htmlcss: {
    name: 'HTML5 & CSS3',
    file: 'html5.svg',
    color: '#e34f26',
    bg: 'rgba(227, 79, 38, 0.08)',
    border: 'rgba(227, 79, 38, 0.25)',
  },
  vscode: {
    name: 'VS Code',
    file: 'vscode.svg',
    color: '#007acc',
    bg: 'rgba(0, 122, 204, 0.08)',
    border: 'rgba(0, 122, 204, 0.25)',
  },
  postman: {
    name: 'Postman',
    file: 'postman.svg',
    color: '#ff6c37',
    bg: 'rgba(255, 108, 55, 0.08)',
    border: 'rgba(255, 108, 55, 0.25)',
  },
  vercel: {
    name: 'Vercel',
    file: 'vercel.svg',
    color: '#ffffff',
    bg: 'rgba(255, 255, 255, 0.08)',
    border: 'rgba(255, 255, 255, 0.2)',
  },
  zod: {
    name: 'Zod',
    file: 'zod.svg',
    color: '#3068b7',
    bg: 'rgba(48, 104, 183, 0.08)',
    border: 'rgba(48, 104, 183, 0.25)',
  }
};

/**
 * Normalize lookup for any tech string
 */
function resolveTech(name) {
  if (!name) return null;
  const n = name.toLowerCase().replace(/[^a-z0-9]/g, '');

  if (n.includes('react')) return TECH_REGISTRY.react;
  if (n.includes('next')) return TECH_REGISTRY.nextjs;
  if (n.includes('typescript') || n === 'ts') return TECH_REGISTRY.typescript;
  if (n.includes('javascript') || n === 'js' || n.includes('es6')) return TECH_REGISTRY.javascript;
  if (n.includes('tailwind')) return TECH_REGISTRY.tailwind;
  if (n.includes('three')) return TECH_REGISTRY.threejs;
  if (n.includes('supabase')) return TECH_REGISTRY.supabase;
  if (n.includes('node')) return TECH_REGISTRY.nodejs;
  if (n.includes('postgres') || n.includes('sql') || n.includes('database')) return TECH_REGISTRY.postgresql;
  if (n.includes('vietqr')) return TECH_REGISTRY.vietqr;
  if (n.includes('express')) return TECH_REGISTRY.express;
  if (n.includes('vite')) return TECH_REGISTRY.vite;
  if (n.includes('figma')) return TECH_REGISTRY.figma;
  if (n.includes('github') && !n.includes('git')) return TECH_REGISTRY.github;
  if (n.includes('git')) return TECH_REGISTRY.git;
  if (n.includes('vscode')) return TECH_REGISTRY.vscode;
  if (n.includes('postman')) return TECH_REGISTRY.postman;
  if (n.includes('vercel')) return TECH_REGISTRY.vercel;
  if (n.includes('zod')) return TECH_REGISTRY.zod;
  if (n.includes('html') || n.includes('css')) return TECH_REGISTRY.htmlcss;

  return null;
}

export default function TechBadge({
  name,
  size = 'md',
  showLabel = true,
  className = '',
  ...props
}) {
  const tech = resolveTech(name);

  // Generic fallback if tech is not recognized
  if (!tech) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-label-mono text-xs bg-white/5 border border-white/10 text-on-surface-variant pill-3d ${className}`}
        {...props}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
        <span>{name}</span>
      </span>
    );
  }

  const logoUrl = `${import.meta.env.BASE_URL}tech/${tech.file}`;

  const sizeClasses = {
    sm: {
      box: 'px-2 py-0.5 text-[11px] gap-1.5 rounded-md',
      icon: 'w-3.5 h-3.5'
    },
    md: {
      box: 'px-3 py-1.5 text-xs gap-2 rounded-xl',
      icon: 'w-4 h-4'
    },
    lg: {
      box: 'px-4 py-2 text-sm gap-2.5 rounded-2xl',
      icon: 'w-5 h-5'
    }
  }[size] || {
    box: 'px-3 py-1.5 text-xs gap-2 rounded-xl',
    icon: 'w-4 h-4'
  };

  return (
    <div
      className={`inline-flex items-center font-label-mono font-medium pill-3d backdrop-blur-md transition-all duration-300 select-none group/badge ${sizeClasses.box} ${className}`}
      style={{
        backgroundColor: tech.bg,
        borderColor: tech.border,
        borderWidth: '1px',
        borderStyle: 'solid',
        color: tech.color,
        boxShadow: `0 2px 10px -2px ${tech.bg}`
      }}
      title={name}
      {...props}
    >
      <img
        src={logoUrl}
        alt={name}
        className={`shrink-0 object-contain transition-transform duration-300 group-hover/badge:scale-125 ${sizeClasses.icon}`}
        loading="lazy"
        onError={(e) => {
          // If image fails to load, gracefully hide img tag
          e.target.style.display = 'none';
        }}
      />
      {showLabel && (
        <span className="font-semibold tracking-wide whitespace-nowrap">
          {name}
        </span>
      )}
    </div>
  );
}
