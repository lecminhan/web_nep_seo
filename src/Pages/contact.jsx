import React, { useEffect } from "react";
import TopBar from "../Components/global/topbar";
import Header from "../Components/global/header";
import Navbar from "../Components/global/navbar";
import BreadcrumbsNav from "../Components/global/BreadcrumbsNav";
import Footer from "../Components/global/footer";
import ContactButtons from "../Components/global/contactbutton";

const ContactPage = () => {
  useEffect(() => {
    // Nhúng Facebook SDK
    if (!window.FB) {
      const script = document.createElement("script");
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      script.src =
        "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v19.0";
      document.body.appendChild(script);
    } else {
      window.FB.XFBML.parse(); // Parse lại nếu FB SDK đã load
    }
  }, []);

  return (
    <>
      <TopBar />
      <Header />
      <Navbar />
      <BreadcrumbsNav
        links={[
          { label: "Trang chủ", href: "/" },
          { label: "Liên hệ" },
        ]}
      />

      <main
        style={{
          display: "flex",
          maxWidth: 1200,
          margin: "0 auto",
          gap: "30px",
          fontFamily: "Arial, sans-serif",
          flexWrap: "wrap",
          paddingBottom: "30px",
          paddingInline: "15px",
        }}
      >
        {/* Left: Contact Form */}
        <section style={{ flex: 9, minWidth: 300 }}>
          <h1 style={{ fontSize: 24, marginBottom: 20 }}>Liên hệ với chúng tôi</h1>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 15,
              maxWidth: 600,
            }}
          >
            <input type="text" placeholder="Họ và tên" required style={inputStyle} />
            <input type="email" placeholder="Email" required style={inputStyle} />
            <input type="tel" placeholder="Số điện thoại" style={inputStyle} />
            <textarea placeholder="Nội dung" rows="5" required style={inputStyle}></textarea>
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                backgroundColor: "#d71920",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                fontWeight: "bold",
                cursor: "pointer",
                width: "fit-content",
              }}
            >
              Gửi liên hệ
            </button>
          </form>
        </section>

        {/* Right: Info + Map + Facebook */}
        <aside style={{ flex: 6, minWidth: 260 }}>
          <h2 style={{ fontSize: 20, marginBottom: 15 }}>Thông tin liên hệ</h2>
          <ul style={{ lineHeight: 1.8, color: "#444", marginBottom: 20 }}>
            <li><strong>Công ty:</strong> Nẹp Nhôm Luxinox – Nẹp Inox Trang Trí Nội Thất Đà Nẵng</li>
            <li><strong>Hotline:</strong> 0968 181 807</li>
            <li><strong>Email:</strong> lecminhan1811@gmail.com</li>
            <li><strong>Địa chỉ:</strong> 209 Cao Hồng Lãnh, Hoà Quý, Ngũ Hành Sơn, Đà Nẵng</li>
          </ul>

          {/* Google Map */}
          <div style={{ width: "100%", height: 300 }}>
            <iframe
              title="Bản đồ"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.507298031456!2d108.23325977365383!3d15.987086141634606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421b670ee39983%3A0x89a8de14e5f106c1!2zTuG6uXAgTmjDtG0g4oCTIE7hurlwIElub3ggVHJhbmcgVHLDrSBO4buZaSBUaOG6pXQgxJDDoCBO4bq1bmc!5e0!3m2!1svi!2s!4v1753952572385!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </aside>
      </main>

      <Footer />
      <ContactButtons />
    </>
  );
};

const inputStyle = {
  padding: "10px",
  fontSize: "14px",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

export default ContactPage;
