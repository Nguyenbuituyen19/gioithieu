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
    <section id="contact" className="w-full bg-canvas py-16 sm:py-20 md:py-section px-4 sm:px-6 md:px-8 border-b border-hairline">
      <div className="w-full max-w-[1024px] mx-auto">
        
        {/* Section Header (Apple Display-lg: 40px / 600) */}
        <div className="text-center sm:text-left mb-12 sm:mb-16">
          <Reveal>
            <span className="text-[13px] font-semibold text-primary uppercase tracking-wider block mb-2">
              Kết nối &amp; Hợp tác
            </span>
            <h2 className="font-display text-[32px] sm:text-[40px] font-semibold text-ink leading-[1.10] tracking-[-0.015em] mb-3">
              Liên hệ với mình.
            </h2>
            <p className="font-display text-[20px] sm:text-[24px] md:text-[28px] text-ink-muted-80 font-normal leading-[1.25] max-w-2xl">
              Bạn đang tìm kiếm Frontend Developer nhiệt huyết? Hãy gửi tin nhắn trực tiếp để cùng trò chuyện.
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">
          
          {/* Left Side: Contact Cards (Apple Store Utility Style) */}
          <div className="w-full lg:w-5/12 flex flex-col gap-4">
            <Reveal delay={100}>
              <div className="bg-canvas-parchment rounded-[18px] border border-hairline p-5 sm:p-6">
                <span className="text-[12px] font-medium text-ink-muted-48 uppercase tracking-wider block mb-1">
                  Điện thoại &amp; Zalo
                </span>
                <a href="tel:0814582282" className="text-[18px] font-semibold text-ink hover:text-primary transition-colors">
                  0814 582 282
                </a>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-canvas-parchment rounded-[18px] border border-hairline p-5 sm:p-6">
                <span className="text-[12px] font-medium text-ink-muted-48 uppercase tracking-wider block mb-1">
                  Email cá nhân
                </span>
                <a href="mailto:nguytuyen19@gmail.com" className="text-[17px] font-semibold text-ink hover:text-primary transition-colors break-all">
                  nguytuyen19@gmail.com
                </a>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="bg-canvas-parchment rounded-[18px] border border-hairline p-5 sm:p-6">
                <span className="text-[12px] font-medium text-ink-muted-48 uppercase tracking-wider block mb-1">
                  Địa điểm làm việc
                </span>
                <div className="text-[16px] font-medium text-ink">
                  Hà Nội, Việt Nam (Sẵn sàng On-site / Hybrid)
                </div>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="bg-canvas-parchment rounded-[18px] border border-hairline p-5 sm:p-6 flex items-center justify-between">
                <div>
                  <span className="text-[12px] font-medium text-ink-muted-48 uppercase tracking-wider block mb-1">
                    Mạng xã hội
                  </span>
                  <div className="text-[15px] font-semibold text-ink">
                    GitHub &amp; Facebook
                  </div>
                </div>
                <div className="flex gap-2">
                  <a 
                    href="https://github.com/Nguyenbuituyen19" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-pill text-[13px] bg-white border border-hairline px-3 py-1 hover:border-black/30"
                  >
                    GitHub ↗
                  </a>
                  <a 
                    href="https://www.facebook.com/tuyennguyenbui19?locale=vi_VN" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-pill text-[13px] bg-white border border-hairline px-3 py-1 hover:border-black/30"
                  >
                    Facebook ↗
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Side: Clean Apple Form (Pill inputs, Action Blue CTA) */}
          <div className="w-full lg:w-7/12">
            <Reveal delay={200}>
              <div className="bg-white rounded-[18px] border border-hairline p-6 sm:p-8 shadow-sm">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="name" className="block text-[13px] font-medium text-ink mb-1.5 pl-1">
                      Họ và tên
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Nguyễn Văn A"
                      required
                      className="w-full apple-input-pill"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-[13px] font-medium text-ink mb-1.5 pl-1">
                      Địa chỉ Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@domain.com"
                      required
                      className="w-full apple-input-pill"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-[13px] font-medium text-ink mb-1.5 pl-1">
                      Nội dung tin nhắn
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Chào Tuyển, mình muốn trao đổi về cơ hội hợp tác..."
                      required
                      rows={4}
                      className="w-full rounded-[18px] border border-black/12 p-4 text-[16px] text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none transition-all"
                    />
                  </div>

                  {submitError && (
                    <div className="text-[13px] text-red-500 bg-red-50 p-3 rounded-lg border border-red-200">
                      {submitError}
                    </div>
                  )}

                  {submitted && (
                    <div className="text-[14px] text-green-700 bg-green-50 p-3.5 rounded-lg border border-green-200 font-medium">
                      ✓ Cảm ơn bạn! Tin nhắn đã được gửi thành công. Mình sẽ phản hồi sớm nhất!
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-pill btn-primary w-full text-[16px] py-3 font-normal"
                    >
                      {isSubmitting ? 'Đang gửi tin nhắn...' : 'Gửi tin nhắn'}
                    </button>
                  </div>
                </form>
              </div>
            </Reveal>
          </div>

        </div>

      </div>
    </section>
  );
}
