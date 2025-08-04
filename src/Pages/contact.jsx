import React, { useEffect, useState } from "react";
import TopBar from "../Components/global/topbar";
import Header from "../Components/global/header";
import Navbar from "../Components/global/navbar";
import BreadcrumbsNav from "../Components/global/BreadcrumbsNav";
import Footer from "../Components/global/footer";
import ContactButtons from "../Components/global/contactbutton";
import { Helmet } from "react-helmet-async";
import ScrollToTopButton from "../Components/global/ScrollToTopButton";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    if (!window.FB) {
      const script = document.createElement("script");
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      script.src =
        "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v19.0";
      document.body.appendChild(script);
    } else {
      window.FB.XFBML.parse();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch(`${API_URL}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
      console.error("Lỗi gửi form:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Liên Hệ - Nẹp Luxinox Đà Nẵng | Tư Vấn & Hỗ Trợ 24/7</title>
        <meta
          name="description"
          content="Liên hệ với Nẹp Luxinox - Chuyên gia nẹp trang trí nội thất và xây dựng. Hotline: 0968 181 807 - Tư vấn miễn phí, giao hàng toàn quốc."
        />
        <meta
          name="keywords"
          content="liên hệ nẹp luxinox, tư vấn nẹp inox, nẹp nhôm, địa chỉ nẹp Đà Nẵng, liên hệ vật liệu trang trí"
        />
        <meta property="og:title" content="Liên Hệ - Nẹp Luxinox Đà Nẵng" />
        <meta
          property="og:description"
          content="Gửi yêu cầu hoặc liên hệ trực tiếp với Nẹp Luxinox. Chúng tôi luôn sẵn sàng hỗ trợ bạn với các giải pháp nẹp trang trí tối ưu nhất."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nepdanang.vn/lien-he" />
        <meta
          property="og:image"
          content="https://www.nepdanang.vn/images/logo-webseonep.png"
        />
        <link rel="canonical" href="https://www.nepdanang.vn/lien-he" />
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Trang chủ",
                "item": "https://www.nepdanang.vn"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Liên hệ",
                "item": "https://www.nepdanang.vn/lien-he"
              }
            ]
          }
        `}
        </script>
      </Helmet>

      <TopBar />
      <Header />
      <Navbar />
      <BreadcrumbsNav
        links={[{ label: "Trang chủ", href: "/" }, { label: "Liên hệ" }]}
      />
      <ScrollToTopButton />

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
        <section style={{ flex: 9, minWidth: 300 }}>
          <h1 style={{ fontSize: 24, marginBottom: 20 }}>
            Liên hệ với chúng tôi
          </h1>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 15,
              maxWidth: 600,
            }}
          >
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Họ và tên"
              required
              style={inputStyle}
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Email"
              required
              style={inputStyle}
            />
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="tel"
              placeholder="Số điện thoại"
              style={inputStyle}
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Nội dung"
              rows="5"
              required
              style={inputStyle}
            />
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
            {status === "loading" && <p>Đang gửi...</p>}
            {status === "success" && (
              <p style={{ color: "green" }}>Gửi thành công!</p>
            )}
            {status === "error" && (
              <p style={{ color: "red" }}>
                Đã có lỗi xảy ra. Vui lòng thử lại.
              </p>
            )}
          </form>
        </section>

        <aside style={{ flex: 6, minWidth: 260 }}>
          <h2 style={{ fontSize: 20, marginBottom: 15 }}>Thông tin liên hệ</h2>
          <ul style={{ lineHeight: 1.8, color: "#444", marginBottom: 20 }}>
            <li>
              <strong>Công ty:</strong> Nẹp Nhôm Luxinox – Nẹp Inox Trang Trí
              Nội Thất Đà Nẵng
            </li>
            <li>
              <strong>Hotline:</strong>0935.128.542
            </li>
            <li>
              <strong>Email:</strong> Lecongmanhtruong273@gmail.com
            </li>
            <li>
              <strong>Địa chỉ:</strong> 209 Cao Hồng Lãnh, Hoà Quý, Ngũ Hành
              Sơn, Đà Nẵng
            </li>
          </ul>

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
