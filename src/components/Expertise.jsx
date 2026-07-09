import React from 'react';
import Reveal from './Reveal';

const SKILL_CATEGORIES = [
  {
    icon: 'code',
    title: 'Frontend Development',
    desc: 'Lập trình giao diện web hiện đại, tối ưu SEO, mượt mà và tương thích tốt trên mọi kích thước màn hình.',
    skills: ['React', 'Next.js', 'JavaScript (ES6+)', 'TypeScript', 'HTML5 & CSS3']
  },
  {
    icon: 'palette',
    title: 'UI/UX Design & Styling',
    desc: 'Chuyển đổi các bản thiết kế Figma thành giao diện thực tế với độ chính xác cao và trải nghiệm người dùng tối đa.',
    skills: ['Tailwind CSS', 'Vanilla CSS', 'Responsive Design', 'Figma to Code', 'CSS Modules']
  },
  {
    icon: 'construction',
    title: 'Workflow & Tools',
    desc: 'Quản lý phiên bản code, tối ưu quy trình xây dựng sản phẩm và tự động hóa quy trình phát triển.',
    skills: ['Git & GitHub', 'Vite', 'Webpack', 'npm / yarn', 'Chrome DevTools']
  }
];

export default function Expertise() {
  return (
    <section id="expertise" className="relative min-h-screen flex flex-col justify-center py-section-gap-mobile md:py-section-gap-desktop px-gutter max-w-container-max mx-auto">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        {/* Left Side: Skills Cards */}
        <div className="w-full lg:w-1/2 flex flex-col gap-8">
          <div>
            <Reveal>
              <span className="font-label-mono text-label-mono text-primary mb-2 block uppercase tracking-widest">
                Lĩnh vực chuyên môn
              </span>
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-6 font-bold tracking-tight">
                Kỹ Năng & Công Nghệ
              </h2>
            </Reveal>
          </div>

          <div className="flex flex-col gap-6">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <Reveal key={idx} delay={idx * 150}>
                <div className="glass-card skill-glow p-8 rounded-xl flex gap-6 items-start transition-all duration-300">
                  <div className="bg-primary/10 p-3 rounded-lg text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined">{cat.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-xl font-bold text-on-surface mb-2">
                      {cat.title}
                    </h3>
                    <p className="font-body-md text-on-surface-variant mb-4 text-sm leading-relaxed">
                      {cat.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill, sIdx) => (
                        <span 
                          key={sIdx} 
                          className="font-label-mono text-xs text-secondary bg-secondary/10 border border-secondary/20 px-3 py-1 rounded-full font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Right Side: Cyberpunk Terminal Code Block */}
        <div className="w-full lg:w-1/2">
          <Reveal delay={300}>
            <div className="glass-card rounded-xl overflow-hidden border border-white/10 shadow-2xl">
              {/* Header bar of editor */}
              <div className="flex justify-between items-center bg-surface-container px-6 py-4 border-b border-white/5">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                </div>
                <span className="font-label-mono text-xs text-on-surface-variant">developer.js</span>
                <div className="w-12"></div>
              </div>
              
              {/* Code editor content */}
              <div className="p-6 md:p-8 font-label-mono text-sm leading-relaxed overflow-x-auto text-on-surface bg-surface-container-lowest">
                <pre className="text-on-surface-variant">
                  <code>
  <span className="text-primary">const</span> developer = &#123;<br />
  &nbsp;&nbsp;name: <span className="text-secondary">'Frontend Developer'</span>,<br />
  &nbsp;&nbsp;coreStack: [<span className="text-secondary">'React'</span>, <span className="text-secondary">'Next.js'</span>, <span className="text-secondary">'TailwindCSS'</span>],<br />
  &nbsp;&nbsp;designSystem: <span className="text-secondary">'Cyber-Minimalist'</span>,<br />
  &nbsp;&nbsp;philosophy: <span className="text-secondary">'Clean code & Pixel perfect interfaces'</span>,<br />
  &nbsp;&nbsp;isProblemSolver: <span className="text-primary">true</span>,<br />
  &nbsp;&nbsp;getSkills: <span className="text-primary">function</span>() &#123;<br />
  &nbsp;&nbsp;&nbsp;&nbsp;return this.coreStack.map(stack =&gt; `Mastering $&#123;stack&#125;`);<br />
  &nbsp;&nbsp;&#125;<br />
  &#125;;<br />
  <br />
  <span className="text-on-surface-variant">// Console Output</span><br />
  console.log(developer.getSkills());<br />
  <span className="text-secondary">/*<br />
  [<br />
    'Mastering React',<br />
    'Mastering Next.js',<br />
    'Mastering TailwindCSS'<br />
  ]<br />
  */</span>
                  </code>
                </pre>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
