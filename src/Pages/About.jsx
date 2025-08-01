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

/** --- Table of Contents (Mục lục) --- */
const TableOfContents = memo(() => {
  const items = [
    { id: "products", text: "I. Danh mục sản phẩm nẹp trang trí của Nẹp Luxinox" },
    { id: "experience", text: "II. Kinh nghiệm và năng lực vượt trội" },
    { id: "commitments", text: "III. Cam kết chất lượng từ Nẹp Luxinox" },
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
    <h1>Giới thiệu về Nẹp Luxinox - Đơn vị cung cấp nẹp trang trí hàng đầu Việt Nam</h1>

    <p>
      <strong>Nẹp Luxinox</strong> là một trong những thương hiệu uy tín hàng đầu tại Việt Nam trong lĩnh vực 
      <strong> cung cấp nẹp trang trí nội thất và xây dựng</strong>. Chúng tôi xin gửi lời cảm ơn sâu sắc đến Quý Khách Hàng đã luôn 
      đồng hành và tin tưởng sử dụng các sản phẩm chất lượng cao của chúng tôi trong suốt nhiều năm qua.
    </p>

    <p>
      Một không gian sống hoàn hảo không chỉ đến từ kiến trúc tổng thể hay nội thất cao cấp, mà còn từ những chi tiết nhỏ nhưng 
      quan trọng như <strong>nẹp trang trí</strong>. Những đường nẹp sắc sảo không chỉ bảo vệ các mép tường, sàn, 
      góc cạnh mà còn góp phần tạo điểm nhấn thẩm mỹ, nâng tầm giá trị cho công trình. 
      Chính vì vậy, <strong>Nẹp Luxinox</strong> đã không ngừng cải tiến để mang đến các giải pháp nẹp tối ưu nhất.
    </p>

    <img
      src="/images/slide1.jpg"
      alt="Showroom Nẹp Luxinox trưng bày các mẫu nẹp trang trí nội thất cao cấp"
      className="about-image"
      loading="lazy"
    />

    <p>
      Với sứ mệnh mang lại sự hoàn hảo cho từng chi tiết công trình, <strong>Nẹp Luxinox</strong> tập trung vào:
    </p>
    <ul>
      <li>Sản xuất và phân phối <strong>nẹp trang trí chất lượng cao</strong> đáp ứng tiêu chuẩn quốc tế.</li>
      <li>Tối ưu hóa quá trình thi công với các mẫu nẹp dễ lắp đặt, tiết kiệm thời gian và chi phí.</li>
      <li>Bảo vệ môi trường bằng việc sử dụng nguyên liệu thân thiện và giảm thiểu chất thải.</li>
      <li>Đa dạng mẫu mã, kích thước, màu sắc cho dự án dân dụng & cao cấp.</li>
    </ul>

    <h2 id="products">I. Danh mục sản phẩm nẹp trang trí của Nẹp Luxinox</h2>
    <p>
      Hiện tại, <strong>Nẹp Luxinox</strong> cung cấp đầy đủ các dòng <strong>nẹp trang trí nội thất và xây dựng</strong> bao gồm:
    </p>
    <ul>
      <li><strong>Nẹp Inox 304 cao cấp</strong>: nẹp T/U/V, nẹp góc, len tường, chống trơn cầu thang.</li>
      <li><strong>Nẹp nhôm trang trí</strong>: T/V/U/La, chống trơn, viền LED; nhẹ, đa màu.</li>
      <li><strong>Nẹp đồng thau</strong>: T/U/V/La; sang trọng, phù hợp công trình cao cấp.</li>
      <li><strong>Nẹp nhựa PVC</strong>: bảo vệ góc, ron âm, kết thúc gạch, khe giãn nở, trần thạch cao.</li>
      <li><strong>Nẹp LED & đặc biệt</strong>: kết hợp chiếu sáng và trang trí tinh tế.</li>
    </ul>

    <h2 id="experience">II. Kinh nghiệm và năng lực vượt trội</h2>
    <p>Trên 10 năm hoạt động, phục vụ hàng ngàn khách hàng & đối tác toàn quốc:</p>
    <ul>
      <li><strong>Kinh nghiệm</strong>: dự án nhà ở, văn phòng, khách sạn, TTTM.</li>
      <li><strong>Phân phối toàn quốc</strong>: kho tại Hà Nội, TP.HCM, Đà Nẵng — giao nhanh.</li>
      <li><strong>Đội ngũ kỹ thuật</strong>: tư vấn giải pháp tối ưu, hỗ trợ tận tâm.</li>
      <li><strong>Đối tác uy tín</strong>: hợp tác cùng nhà thầu & kiến trúc sư hàng đầu.</li>
    </ul>

    <h2 id="commitments">III. Cam kết chất lượng từ Nẹp Luxinox</h2>
    <p>Chúng tôi luôn ưu tiên chất lượng sản phẩm và trải nghiệm dịch vụ:</p>
    <ul>
      <li><strong>Chuẩn quốc tế</strong>: quy trình sản xuất & kiểm tra nghiêm ngặt.</li>
      <li><strong>Dịch vụ chuyên nghiệp</strong>: tư vấn nhanh, bảo hành rõ ràng, giá hợp lý.</li>
      <li><strong>Chính sách đổi trả</strong>: linh hoạt, bảo vệ quyền lợi khách hàng.</li>
      <li><strong>Xanh & bền vững</strong>: công nghệ giảm thiểu chất thải & khí thải.</li>
    </ul>

    <p>
      Hãy <Link to="/lien-he">liên hệ với Nẹp Luxinox</Link> để được tư vấn miễn phí và nhận 
      giải pháp tối ưu cho mọi nhu cầu về <strong>nẹp trang trí nội thất & xây dựng</strong>.
    </p>
  </div>
));

const About = () => {
  useEffect(() => {
    document.title = "Về Chúng Tôi - Luxinox Chuyên Gia Nẹp Kim Loại Kiến Trúc Sang Trọng";
    const metas = [
      ["description","Nẹp Luxinox - Nhà cung cấp nẹp trang trí, nẹp inox, nẹp nhôm, nẹp đồng chất lượng cao, giá cạnh tranh, giao hàng toàn quốc."],
      ["keywords","nẹp trang trí, nẹp inox, nẹp nhôm, nẹp đồng, nẹp Luxinox, vật liệu xây dựng"]
    ];
    const created = [];
    metas.forEach(([name, content]) => {
      const tag = document.createElement("meta");
      tag.name = name; tag.content = content;
      document.head.appendChild(tag); created.push(tag);
    });
    return () => { created.forEach(t => document.head.removeChild(t)); };
  }, []);

  return (
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
          <TableOfContents />
          {/* BÀI VIẾT GẦN ĐÂY */}
          <RecentPostsSidebar />
        </aside>
      </div>

      <Footer />
      <ContactButtons />
    </div>
  );
};

export default memo(About);
