import React, { useState } from 'react';
import Reveal from './Reveal';

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
    <section id="contact" className="relative min-h-screen flex flex-col justify-center py-section-gap-mobile md:py-section-gap-desktop px-gutter max-w-container-max mx-auto">
      {/* Background glow light leak */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row gap-16">
        
        {/* Left Side: Contact Info */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <Reveal>
            <span className="font-label-mono text-label-mono text-primary mb-2 block uppercase tracking-widest">
              Liên hệ với mình
            </span>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-6 font-bold tracking-tight">
              Cùng Tạo Nên Những Dự Án Tuyệt Vời
            </h2>
            <p className="font-body-md text-on-surface-variant mb-12 leading-relaxed max-w-lg">
              Bạn đang tìm kiếm một Frontend Developer chuyên nghiệp, có tư duy thiết kế tốt và khả năng giải quyết vấn đề? Đừng ngần ngại liên hệ với mình để cùng bàn luận về ý tưởng của bạn.
            </p>
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal delay={150}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <div>
                  <div className="text-xs text-on-surface-variant font-label-mono uppercase">Điện thoại / Zalo</div>
                  <a href="tel:0814582282" className="text-on-surface hover:text-primary transition-colors font-body-md font-medium">
                    0814 582 282
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={250}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <div className="text-xs text-on-surface-variant font-label-mono uppercase">Email cá nhân</div>
                  <a href="mailto:nguytuyen19@gmail.com" className="text-on-surface hover:text-primary transition-colors font-body-md font-medium">
                    nguytuyen19@gmail.com
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={350}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <div className="text-xs text-on-surface-variant font-label-mono uppercase">Địa chỉ</div>
                  <div className="text-on-surface font-body-md text-sm md:text-base">
                    Số 94, Phố Bắc Cầu, Phường Bồ Đề, Hà Nội
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={450}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined">share</span>
                </div>
                <div>
                  <div className="text-xs text-on-surface-variant font-label-mono uppercase">Liên kết mạng xã hội</div>
                  <div className="flex flex-wrap gap-4 mt-1.5">
                    <a 
                      href="https://github.com/Nguyenbuituyen19" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-on-surface hover:text-primary transition-colors text-sm font-label-mono flex items-center gap-1"
                    >
                      GitHub ↗
                    </a>
                    <a 
                      href="https://www.facebook.com/tuyennguyenbui19?locale=vi_VN" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-on-surface hover:text-primary transition-colors text-sm font-label-mono flex items-center gap-1"
                    >
                      Facebook ↗
                    </a>
                    <a 
                      href={`${import.meta.env.BASE_URL}CV.pdf`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-secondary hover:text-primary transition-colors text-sm font-label-mono font-semibold flex items-center gap-1"
                    >
                      Tải CV PDF ↗
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Right Side: Message Form */}
        <div className="w-full lg:w-1/2">
          <Reveal delay={200}>
            <div className="glass-card p-8 md:p-10 rounded-xl">
              <h3 className="font-headline-md text-xl font-bold text-on-surface mb-6">
                Gửi Tin Nhắn Cho Mình
              </h3>

              {submitted ? (
                <div className="bg-secondary/10 border border-secondary/20 text-secondary p-6 rounded-lg font-body-md mb-6 animate-fadeIn">
                  Cảm ơn bạn! Tin nhắn của bạn đã được gửi thành công. Mình sẽ liên hệ lại sớm nhất có thể.
                </div>
              ) : null}

              {submitError ? (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-lg font-body-md mb-6 animate-fadeIn">
                  {submitError}
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="relative group">
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Họ và tên của bạn"
                    className="w-full bg-surface-container-lowest/50 border border-white/10 text-on-surface px-4 py-4 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 placeholder-on-surface-variant/40"
                  />
                </div>

                <div className="relative group">
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Địa chỉ Email"
                    className="w-full bg-surface-container-lowest/50 border border-white/10 text-on-surface px-4 py-4 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 placeholder-on-surface-variant/40"
                  />
                </div>

                <div className="relative group">
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    placeholder="Nội dung lời nhắn..."
                    className="w-full bg-surface-container-lowest/50 border border-white/10 text-on-surface px-4 py-4 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 placeholder-on-surface-variant/40 resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-on-primary-container font-bold py-4 rounded-lg interactive-btn hover:opacity-90 transition-all duration-300 text-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Đang gửi...' : 'Gửi Tin Nhắn'}
                </button>
              </form>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
