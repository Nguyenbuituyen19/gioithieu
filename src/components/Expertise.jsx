import React from 'react';
import Reveal from './Reveal';
import TiltCard from './TiltCard';
import TechBadge from './TechBadge';

const SKILL_CATEGORIES = [
  {
    icon: 'code',
    title: 'Frontend Engineering',
    desc: 'Lập trình ứng dụng web hiện đại với React, Next.js và TypeScript; tối ưu hóa hiệu năng, SEO On-page và chuẩn trải nghiệm người dùng.',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS', 'HTML5 & CSS3', 'Responsive Design', 'SEO']
  },
  {
    icon: 'database',
    title: 'Backend & Cloud Services',
    desc: 'Xây dựng RESTful API backend với Express.js, tích hợp cơ sở dữ liệu PostgreSQL và nền tảng Supabase (Auth, Storage, Database).',
    skills: ['Node.js', 'Express.js', 'REST API', 'PostgreSQL', 'Supabase', 'Zod', 'Multer']
  },
  {
    icon: 'terminal',
    title: 'Công cụ & Quy trình (Tools)',
    desc: 'Thành thạo công cụ kiểm soát phiên bản Git/GitHub, chuyển đổi giao diện từ Figma sang code pixel-perfect và triển khai CI/CD.',
    skills: ['Git & GitHub', 'VS Code', 'Postman', 'Figma to Code', 'Vercel', 'Vite', 'Chrome DevTools']
  },
  {
    icon: 'psychology',
    title: 'Kỹ Năng Mềm (Soft Skills)',
    desc: 'Tư duy phản biện giải quyết vấn đề, tinh thần làm việc nhóm cao, giao tiếp hiệu quả và luôn chủ động nghiên cứu công nghệ mới.',
    skills: ['Problem-solving', 'Teamwork', 'Communication', 'Continuous Learning', 'Time Management']
  }
];

export default function Expertise() {
  return (
    <section id="expertise" className="relative min-h-screen flex flex-col justify-center py-section-gap-mobile md:py-section-gap-desktop px-gutter max-w-container-max mx-auto">
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        {/* Left Side: Skills Cards */}
        <div className="w-full lg:w-1/2 flex flex-col gap-8">
          <div>
            <Reveal>
              <span className="font-label-mono text-label-mono text-primary mb-2 block uppercase tracking-widest">
                Lĩnh vực chuyên môn
              </span>
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-6 font-bold tracking-tight">
                Kỹ Năng &amp; Công Nghệ
              </h2>
            </Reveal>
          </div>

          <div className="flex flex-col gap-6 perspective-1000">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <Reveal key={idx} delay={idx * 150}>
                <TiltCard 
                  className="w-full"
                  innerClassName="glass-card skill-glow p-8 rounded-xl flex gap-6 items-start transition-all duration-300 border border-white/10"
                  maxTilt={7}
                  perspective={900}
                >
                  <div className="bg-primary/10 p-3.5 rounded-xl text-primary flex items-center justify-center border border-primary/20 translate-z-30 shadow-md">
                    <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
                  </div>
                  <div className="transform-style-3d">
                    <h3 className="font-headline-md text-xl font-bold text-on-surface mb-2 translate-z-20">
                      {cat.title}
                    </h3>
                    <p className="font-body-md text-on-surface-variant mb-4 text-sm leading-relaxed translate-z-10">
                      {cat.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 translate-z-30">
                      {cat.skills.map((skill, sIdx) => (
                        <TechBadge key={sIdx} name={skill} size="sm" />
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Right Side: Core Architecture Badges + Cyberpunk 3D Terminal */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          
          {/* Key Tech Stack Highlights with Official Logos */}
          <Reveal delay={200}>
            <div className="perspective-1200">
              <TiltCard
                className="w-full"
                innerClassName="glass-card rounded-2xl overflow-hidden border border-secondary/30 p-5 relative group shadow-[0_0_25px_rgba(0,238,252,0.1)] bg-surface-container-lowest/80 backdrop-blur-xl flex flex-col gap-3"
                maxTilt={8}
                perspective={1000}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-ping" />
                    <span className="font-label-mono text-xs uppercase tracking-wider text-secondary font-bold">
                      Hệ Sinh Thái Kỹ Thuật Trọng Tâm
                    </span>
                  </div>
                  <span className="text-[11px] font-label-mono text-on-surface-variant">Production Stack</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <TechBadge name="React 19" size="md" />
                  <TechBadge name="Next.js" size="md" />
                  <TechBadge name="TypeScript" size="md" />
                  <TechBadge name="Tailwind CSS" size="md" />
                  <TechBadge name="Three.js" size="md" />
                  <TechBadge name="Node.js" size="md" />
                  <TechBadge name="Supabase" size="md" />
                  <TechBadge name="PostgreSQL" size="md" />
                  <TechBadge name="Vite" size="md" />
                  <TechBadge name="Git & GitHub" size="md" />
                </div>
              </TiltCard>
            </div>
          </Reveal>

          {/* Cyberpunk 3D Terminal Code Block */}
          <div className="perspective-1200">
            <Reveal delay={300}>
              <TiltCard 
                className="w-full"
                innerClassName="glass-card rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-surface-container-lowest/80 backdrop-blur-xl"
                maxTilt={12}
                perspective={1100}
                scale={1.02}
              >
                {/* Header bar of editor */}
                <div className="flex justify-between items-center bg-surface-container px-6 py-4 border-b border-white/10 translate-z-20">
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  </div>
                  <div className="flex items-center gap-2 font-label-mono text-xs text-on-surface-variant">
                    <span className="material-symbols-outlined text-sm text-secondary">view_in_ar</span>
                    <span className="text-secondary font-semibold">candidate_profile.ts</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">3D Active</span>
                  </div>
                  <div className="w-12" />
                </div>
                
                {/* Code editor content with spatial 3D layers */}
                <div className="p-6 md:p-8 font-label-mono text-xs md:text-sm leading-relaxed overflow-x-auto text-on-surface bg-surface-container-lowest/90 transform-style-3d">
                  <pre className="text-on-surface-variant translate-z-20">
                    <code>
  <span className="text-primary">const</span> candidate = &#123;<br />
  &nbsp;&nbsp;name: <span className="text-secondary">'Nguyễn Bùi Tuyển'</span>,<br />
  &nbsp;&nbsp;role: <span className="text-secondary">'Intern / Fresher Frontend Developer'</span>,<br />
  &nbsp;&nbsp;education: &#123;<br />
  &nbsp;&nbsp;&nbsp;&nbsp;school: <span className="text-secondary">'Đại học Thăng Long'</span>,<br />
  &nbsp;&nbsp;&nbsp;&nbsp;major: <span className="text-secondary">'Information Technology'</span>,<br />
  &nbsp;&nbsp;&nbsp;&nbsp;gpa: <span className="text-primary">3.1</span> <span className="text-on-surface-variant/50">// thang 4.0</span><br />
  &nbsp;&nbsp;&#125;,<br />
  &nbsp;&nbsp;experience: [<br />
  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-secondary">'SGOData (Frontend Intern: CRM, ERP, POS)'</span>,<br />
  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-secondary">'TravelViet (Frontend Intern: Hotel Web)'</span>,<br />
  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-secondary">'NICE ART (Freelance Fullstack: CMS &amp; Web)'</span><br />
  &nbsp;&nbsp;],<br />
  &nbsp;&nbsp;coreStack: [<span className="text-secondary">'React'</span>, <span className="text-secondary">'Next.js'</span>, <span className="text-secondary">'TypeScript'</span>, <span className="text-secondary">'Tailwind'</span>],<br />
  &nbsp;&nbsp;interface3D: <span className="text-primary">true</span>,<br />
  &nbsp;&nbsp;isReadyToContribute: <span className="text-primary">true</span><br />
  &#125;;<br />
  <br />
  <span className="text-on-surface-variant">// Console Output</span><br />
  console.log(<span className="text-secondary">`Candidate: $&#123;candidate.name&#125; - Ready for work!`</span>);
                    </code>
                  </pre>
                </div>
              </TiltCard>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
