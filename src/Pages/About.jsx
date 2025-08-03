import React, { useEffect, memo } from "react";
import { Link } from "react-router-dom";
import BreadcrumbsNav from "../Components/global/BreadcrumbsNav";
import TopBar from "../Components/global/topbar";
import Header from "../Components/global/header";
import Navbar from "../Components/global/navbar";
import Footer from "../Components/global/footer";
import ContactButtons from "../Components/global/contactbutton";
import RecentPostsSidebar from "../Components/RecentPostsSidebar";
import "../styles/AboutPage.css";
import { Helmet } from "react-helmet";
/** --- Table of Contents (Mục lục) --- */
const TableOfContents = memo(() => {
const items = [
  { id: "gioi-thieu", text: "Giới thiệu về LuxInox" },
  { id: "danh-muc", text: "Danh mục nẹp nổi bật" },
  { id: "vi-sao", text: "Vì sao chọn LuxInox?" },
  { id: "ung-dung", text: "Ứng dụng thực tế" },
  { id: "danh-gia", text: "Đánh giá khách hàng" },
  { id: "lien-he", text: "Kết nối với LuxInox" },
];
  const onClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="toc" aria-label="Mục lục nội dung">
      <h2 className="toc-title">Mục lục</h2>
      <ul className="toc-list">
        {items.map(item => (
          <li key={item.id} className="toc-item">
            <a href={`#${item.id}`} onClick={(e) => onClick(e, item.id)}>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
});

/** --- Nội dung chính --- */
const AboutContent = memo(() => (
  <div className="about-content">
  <h1 id="gioi-thieu">
    TỔNG KHO NẸP NHÔM - NẸP INOX TRANG TRÍ NỘI THẤT LUXINOX – GIẢI PHÁP TOÀN DIỆN CHO CÔNG TRÌNH TẠI ĐÀ NẴNG
  </h1>

  <p>
   Nếu bạn đang tìm nẹp trang trí nội thất tại Đà Nẵng, cần nẹp nhôm chất lượng, nẹp inox thẩm mỹ cao, hãy đến ngay tổng kho LuxInox. Giải pháp đồng bộ – sản phẩm đạt chuẩn – hỗ trợ thi công là lý do khiến LuxInox trở thành lựa chọn hàng đầu của giới thi công nội thất tại miền Trung.
  </p>

  <p>
    ✨ <strong>LuxInox</strong> là tổng kho chuyên cung cấp nẹp nhôm, nẹp inox, nẹp trang trí nội thất tại Đà Nẵng, đáp ứng nhanh nhu cầu vật tư hoàn thiện cho hàng trăm công trình lớn nhỏ trên địa bàn. Đa dạng mẫu mã – sẵn hàng số lượng lớn – hỗ trợ thi công tận nơi.
  </p>

  <h2 id="gioi-thieu">🏢 LuxInox – Tổng kho nẹp nội thất hàng đầu tại Đà Nẵng</h2>
  <p>
    Tọa lạc ngay trung tâm Đà Nẵng, LuxInox xây dựng hệ thống phân phối vật tư nẹp trang trí nội thất với kho hàng quy mô, đáp ứng tức thì các dòng nẹp dùng trong thi công nội thất, xây dựng hoàn thiện, từ nhà dân, căn hộ, khách sạn đến showroom và resort cao cấp.
  </p>
  <p>
    LuxInox cung cấp hơn 200 mẫu nẹp nhôm, nẹp inox, nẹp kỹ thuật, với thiết kế chuẩn kích thước, độ dày, màu sắc, đạt tiêu chuẩn thi công chuyên nghiệp.
  </p>
    <img
      src="/images/slide1.jpg"
      alt="Showroom Nẹp Luxinox trưng bày các mẫu nẹp trang trí nội thất cao cấp"
      className="about-image"
      loading="lazy"
    />
  <h2  id="danh-muc">📦 Danh mục nẹp nổi bật tại LuxInox</h2>
  <ul>
    <li>✅ Nẹp nhôm: T, L, U, V – mạ anode cao cấp, chịu lực tốt, không phai màu.</li>
    <li>✅ Nẹp inox 304: mạ PVD màu vàng bóng, vàng xước, đen gương, inox mờ…</li>
    <li>✅ Nẹp bo cạnh – chống trượt – khe giãn: dùng cho cầu thang, nền sàn, viền gạch.</li>
    <li>✅ Nẹp đèn LED – nẹp viền gỗ – nẹp vách: ứng dụng trong showroom, khách sạn.</li>
    <li>✅ Nẹp theo yêu cầu: cắt theo bản vẽ, mạ màu theo thiết kế.</li>
  </ul>

  <h2 id="vi-sao">💡 Vì sao LuxInox được thợ thi công và công trình Đà Nẵng lựa chọn?</h2>
  <ul>
    <li>🔹 Sản phẩm chất lượng chuẩn thi công nội thất</li>
    <li>🔹 Kho sẵn hàng số lượng lớn – giao ngay trong ngày</li>
    <li>🔹 Hỗ trợ tư vấn vật tư từ bản vẽ kỹ thuật</li>
    <li>🔹 Giá sỉ tốt – chính sách chiết khấu rõ ràng cho xưởng & thầu</li>
    <li>🔹 Chế độ bảo hành màu và bề mặt nẹp</li>
  </ul>

  <h2 id="ung-dung">🏗️ Ứng dụng trong hàng trăm công trình tại Đà Nẵng</h2>
  <p>
    LuxInox là đối tác cung cấp nẹp cho nhiều dự án nổi bật: căn hộ cao cấp ven sông Hàn, biệt thự Nam Hòa Xuân, showroom đá ốp lát, spa và nhà hàng khu vực trung tâm thành phố. Các dòng nẹp inox, nẹp nhôm trang trí giúp hoàn thiện nội thất tinh tế, tăng tính thẩm mỹ và đồng bộ cho không gian.
  </p>

  <h2  id="danh-gia">💬 Đánh giá khách hàng</h2>
  <blockquote>
    “Nẹp nhôm và inox ở LuxInox đúng chuẩn kỹ thuật, dễ thi công, giá lại hợp lý. Giao hàng nhanh, có tư vấn bản vẽ tận tình” – Anh Tùng (thầu hoàn thiện nội thất tại Hải Châu, Đà Nẵng).
  </blockquote>

  <h2 id="lien-he">📲 Kết nối với tổng kho LuxInox</h2>
  <ul>
    <li>🌐 Website: <a href="https://nepdanang.vn" target="_blank" rel="noopener noreferrer">nepdanang.vn</a></li>
    <li>📞 Zalo / Hotline: <a href="tel:0935128542">0935.128.542</a></li>
    <li>📍 Fanpage: <a href="https://facebook.com/nepinoxtaidanang" target="_blank" rel="noopener noreferrer">facebook.com/nepinoxtaidanang</a></li>
    <li>🏠 Tổng kho tại Đà Nẵng – giao hàng toàn quốc</li>
  </ul>

  <p><strong>🎯 Lời kết:</strong> LuxInox cam kết đồng hành cùng các công trình nội thất bằng sản phẩm chất lượng và dịch vụ chuyên nghiệp nhất.</p>
</div>

));

const About = () => {
  return (
    <>
    <Helmet>
        <title>Về Chúng Tôi - Luxinox Chuyên Gia Nẹp Kim Loại Kiến Trúc Sang Trọng</title>
        <meta
          name="description"
          content="Nẹp Luxinox - Nhà cung cấp nẹp trang trí, nẹp inox, nẹp nhôm, nẹp đồng chất lượng cao, giá cạnh tranh, giao hàng toàn quốc."
        />
        <meta
          name="keywords"
          content="nẹp trang trí, nẹp inox, nẹp nhôm, nẹp đồng, nẹp Luxinox, vật liệu xây dựng"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://nepdanang.vn/gioi-thieu" />

        {/* Mạng xã hội (Facebook, Zalo,...) */}
        <meta property="og:title" content="Về Chúng Tôi - Nẹp Luxinox" />
        <meta property="og:description" content="Luxinox cung cấp nẹp kim loại trang trí cao cấp trên toàn quốc." />
        <meta property="og:image" content="https://nepdanang.vn/images/logo-webseonep.png" />
        <meta property="og:url" content="https://nepdanang.vn/gioi-thieu" />
      </Helmet>
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
      "item": "https://nepdanang.vn"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Giới thiệu",
      "item": "https://nepdanang.vn/gioi-thieu"
    }
  ]
}
`}
</script>
    <div className="about-page">
      <TopBar />
      <Header />
      <Navbar />
      <BreadcrumbsNav links={[{ label: "Trang chủ", href: "/" }, { label: "Giới thiệu" }]} />

      <div className="about-container">

        <main className="about-main" role="main">
          <AboutContent />
        </main>

<aside className="about-sidebar" aria-label="Thanh bên phải">
  {/* MỤC LỤC */}
  <div className="toc-desktop">
    <TableOfContents />
  </div>

  {/* BÀI VIẾT GẦN ĐÂY */}
  <RecentPostsSidebar />
</aside>
      </div>

      <Footer />
      <ContactButtons />
    </div>
    </>
  );
};

export default memo(About);
