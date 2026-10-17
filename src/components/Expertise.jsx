import React from 'react';
import Reveal from './Reveal';

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
                <div className="flex items-center gap-1.5 font-label-mono text-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm text-secondary">terminal</span>
                  <span>candidate_profile.ts</span>
                </div>
                <div className="w-12"></div>
              </div>
              
              {/* Code editor content */}
              <div className="p-6 md:p-8 font-label-mono text-xs md:text-sm leading-relaxed overflow-x-auto text-on-surface bg-surface-container-lowest">
                <pre className="text-on-surface-variant">
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
  &nbsp;&nbsp;isReadyToContribute: <span className="text-primary">true</span><br />
  &#125;;<br />
  <br />
  <span className="text-on-surface-variant">// Console Output</span><br />
  console.log(<span className="text-secondary">`Candidate: $&#123;candidate.name&#125; - Ready for work!`</span>);
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
