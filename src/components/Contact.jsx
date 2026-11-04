import React, { useState } from 'react';
import Reveal from './Reveal';
import TiltCard from './TiltCard';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setIsSubmitting(true);
      setSubmitError(null);
      try {
        const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE";
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: accessKey,
            name: formData.name,
            email: formData.email,
            message: formData.message
          })
        });
        
        const data = await response.json();
        if (data.success === "true" || data.success === true) {
          setSubmitted(true);
          setFormData({ name: '', email: '', message: '' });
          setTimeout(() => setSubmitted(false), 5000);
        } else {
          setSubmitError(data.message || "Đã có lỗi xảy ra trong quá trình gửi. Vui lòng thử lại!");
        }
      } catch (error) {
        console.error("Form submission error:", error);
        setSubmitError("Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng!");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="relative min-h-screen flex flex-col justify-center py-16 md:py-section-gap-desktop px-4 sm:px-gutter max-w-container-max mx-auto scroll-mt-20 sm:scroll-mt-24">
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-primary/10 blur-[130px] pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
        
        {/* Left Side: Contact Info */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <Reveal>
            <span className="font-label-mono text-label-mono text-primary mb-2 block uppercase tracking-widest text-xs sm:text-sm">
              Liên hệ với mình
            </span>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-2xl sm:text-3xl md:text-4xl text-on-surface mb-4 sm:mb-6 font-bold tracking-tight">
              Cùng Tạo Nên Những Dự Án Tuyệt Vời
            </h2>
            <p className="font-body-md text-on-surface-variant mb-8 sm:mb-10 leading-relaxed max-w-lg text-xs sm:text-sm md:text-base">
              Bạn đang tìm kiếm một Frontend Developer chuyên nghiệp, có tư duy thiết kế tốt và khả năng giải quyết vấn đề? Đừng ngần ngại liên hệ với mình để cùng bàn luận về ý tưởng của bạn.
            </p>
          </Reveal>

          <div className="flex flex-col gap-3.5 sm:gap-4">
            <Reveal delay={150}>
              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-xl pill-3d bg-white/[0.02] border border-white/5 hover:border-secondary/40 transition-all">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 shadow-md">
                  <span className="material-symbols-outlined text-lg sm:text-xl">call</span>
                </div>
                <div>
                  <div className="text-[10px] sm:text-[11px] text-on-surface-variant font-label-mono uppercase">Điện thoại / Zalo</div>
                  <a href="tel:0814582282" className="text-on-surface hover:text-primary transition-colors font-body-md font-medium text-xs sm:text-sm md:text-base">
                    0814 582 282
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={250}>
              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-xl pill-3d bg-white/[0.02] border border-white/5 hover:border-secondary/40 transition-all">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary shrink-0 shadow-md">
                  <span className="material-symbols-outlined text-lg sm:text-xl">mail</span>
                </div>
                <div>
                  <div className="text-[10px] sm:text-[11px] text-on-surface-variant font-label-mono uppercase">Email cá nhân</div>
                  <a href="mailto:nguytuyen19@gmail.com" className="text-on-surface hover:text-secondary transition-colors font-body-md font-medium text-xs sm:text-sm md:text-base break-all">
                    nguytuyen19@gmail.com
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={350}>
              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-xl pill-3d bg-white/[0.02] border border-white/5 hover:border-secondary/40 transition-all">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 shadow-md">
                  <span className="material-symbols-outlined text-lg sm:text-xl">location_on</span>
                </div>
                <div>
                  <div className="text-[10px] sm:text-[11px] text-on-surface-variant font-label-mono uppercase">Địa chỉ</div>
                  <div className="text-on-surface font-body-md text-xs sm:text-sm md:text-base">
                    Số 94, Phố Bắc Cầu, Phường Bồ Đề, Hà Nội
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={450}>
              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-xl pill-3d bg-white/[0.02] border border-white/5 hover:border-secondary/40 transition-all">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary shrink-0 shadow-md">
                  <span className="material-symbols-outlined text-lg sm:text-xl">share</span>
                </div>
                <div>
                  <div className="text-[10px] sm:text-[11px] text-on-surface-variant font-label-mono uppercase">Mạng xã hội</div>
                  <div className="flex flex-wrap gap-2 sm:gap-3 mt-1.5">
                    <a 
                      href="https://github.com/Nguyenbuituyen19" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-on-surface hover:text-secondary hover:border-secondary/40 hover:bg-secondary/10 transition-all text-[11px] sm:text-xs font-label-mono flex items-center gap-1 pill-3d px-2.5 py-1 rounded-md bg-white/5 border border-white/10 cursor-pointer"
                    >
                      GitHub ↗
                    </a>
                    <a 
                      href="https://www.facebook.com/tuyennguyenbui19?locale=vi_VN" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-on-surface hover:text-secondary hover:border-secondary/40 hover:bg-secondary/10 transition-all text-[11px] sm:text-xs font-label-mono flex items-center gap-1 pill-3d px-2.5 py-1 rounded-md bg-white/5 border border-white/10 cursor-pointer"
                    >
                      Facebook ↗
                    </a>
                    <a 
                      href={`${import.meta.env.BASE_URL}CV.pdf`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-secondary hover:text-white hover:bg-secondary/20 hover:border-secondary/50 transition-all text-[11px] sm:text-xs font-label-mono font-semibold flex items-center gap-1 pill-3d px-2.5 py-1 rounded-md bg-secondary/10 border border-secondary/20 cursor-pointer"
                    >
                      Tải CV ↗
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Right Side: 3D Floating Form */}
        <div className="w-full lg:w-1/2 perspective-1000 mt-2 lg:mt-0">
          <Reveal delay={200}>
            <TiltCard
              className="w-full"
              innerClassName="glass-card p-5 sm:p-8 md:p-10 rounded-2xl border border-white/15 shadow-2xl backdrop-blur-xl"
              maxTilt={7}
              perspective={900}
            >
              <h3 className="font-headline-md text-lg sm:text-xl font-bold text-on-surface mb-5 sm:mb-6 flex items-center gap-2 translate-z-20">
                <span className="material-symbols-outlined text-secondary">mark_chat_unread</span>
                Gửi Tin Nhắn Trực Tiếp
              </h3>

              {submitted && (
                <div className="bg-secondary/10 border border-secondary/20 text-secondary p-4 sm:p-5 rounded-xl font-body-md mb-5 animate-fadeIn translate-z-20 shadow-lg text-xs sm:text-sm">
                  Cảm ơn bạn! Tin nhắn của bạn đã được gửi thành công. Mình sẽ liên hệ lại sớm nhất có thể.
                </div>
              )}

              {submitError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 sm:p-5 rounded-xl font-body-md mb-5 animate-fadeIn translate-z-20 shadow-lg text-xs sm:text-sm">
                  {submitError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5 translate-z-10">
                <div>
                  <label className="block font-label-mono text-[11px] sm:text-xs text-on-surface-variant mb-1.5 uppercase tracking-wider">
                    Họ và Tên
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nhập họ và tên..."
                    required
                    className="w-full px-3.5 sm:px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary/50 text-on-surface placeholder:text-on-surface-variant/40 transition-colors text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block font-label-mono text-[11px] sm:text-xs text-on-surface-variant mb-1.5 uppercase tracking-wider">
                    Email của bạn
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@domain.com"
                    required
                    className="w-full px-3.5 sm:px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary/50 text-on-surface placeholder:text-on-surface-variant/40 transition-colors text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block font-label-mono text-[11px] sm:text-xs text-on-surface-variant mb-1.5 uppercase tracking-wider">
                    Nội dung tin nhắn
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Chia sẻ về dự án hoặc vị trí công việc bạn đang tìm kiếm..."
                    required
                    rows="4"
                    className="w-full px-3.5 sm:px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary/50 text-on-surface placeholder:text-on-surface-variant/40 transition-colors text-xs sm:text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 sm:py-4 rounded-xl bg-primary text-on-primary-container font-bold btn-3d shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-xs sm:text-sm mt-1"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-background/20 border-t-background rounded-full animate-spin" />
                      <span>Đang gửi tin nhắn...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-base sm:text-lg">send</span>
                      <span>Gửi Tin Nhắn Ngay</span>
                    </>
                  )}
                </button>
              </form>
            </TiltCard>
          </Reveal>
        </div>

      </div>
    </section>
  );
}