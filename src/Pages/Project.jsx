import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaUserAlt, FaComment } from "react-icons/fa";
import { Helmet } from "react-helmet";

import TopBar from "../Components/global/topbar";
import Header from "../Components/global/header";
import Navbar from "../Components/global/navbar";
import BreadcrumbsNav from "../Components/global/BreadcrumbsNav";
import Footer from "../Components/global/footer";
import ContactButtons from "../Components/global/contactbutton";
import RecentPostsSidebar from "../Components/RecentPostsSidebar";
import ScrollToTopButton from "../Components/global/ScrollToTopButton";

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Phân trang
  const projectsPerPage = 8; // 8 bài / trang

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/projects`)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Lỗi tải dự án:", err));
  }, []);

  // Tạo dữ liệu phân trang
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(
    indexOfFirstProject,
    indexOfLastProject,
  );

  const totalPages = Math.ceil(projects.length / projectsPerPage);

  // Lấy 5 bài mới nhất cho RecentPostsSidebar
  const recentProjects = projects.slice(0, 5);

  return (
    <>
      <Helmet>
        <title>
          Các Dự Án Thi Công Nẹp Inox - Nhôm - Đồng | Nẹp Đà Nẵng | Luxinox
        </title>
        <meta
          name="description"
          content="Tổng hợp các dự án sử dụng nẹp trang trí chất lượng cao tại Đà Nẵng và các tỉnh thành. Nẹp Luxinox thi công chuyên nghiệp, uy tín."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Dự án đã thực hiện | Nẹp Đà Nẵng" />
        <meta
          property="og:description"
          content="Khám phá các công trình đã thi công nẹp của chúng tôi tại Nẹp Đà Nẵng. Uy tín – Chất lượng – Giá tốt."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://nepdanang.vn/images/logo-webseonep.png"
        />
        <meta property="og:url" content="https://nepdanang.vn/du-an" />
        <link rel="canonical" href="https://nepdanang.vn/du-an" />

        {/* Breadcrumb Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Trang chủ",
                item: "https://nepdanang.vn",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Dự án",
                item: "https://nepdanang.vn/du-an",
              },
            ],
          })}
        </script>
        <meta
          name="keywords"
          content="dự án nẹp inox, thi công nẹp nhôm, nẹp trang trí, nẹp công trình"
        />
      </Helmet>

      <TopBar />
      <Header />
      <Navbar />
      <BreadcrumbsNav
        links={[{ label: "Trang chủ", href: "/" }, { label: "Dự án" }]}
      />
      <ScrollToTopButton />

      <main
        style={{
          display: "flex",
          maxWidth: 1200,
          margin: "0 auto",
          gap: "30px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* Left: Main Content */}
        <section style={{ flex: 9, borderRight: "1px solid #eee" }}>
          {currentProjects.map((project) => (
            <article
              key={project.id}
              style={{
                display: "flex",
                gap: 20,
                marginBottom: 30,
                borderBottom: "1px solid #eee",
                paddingBottom: 20,
              }}
            >
              <a href={`/du-an/${project.slug}`}>
                <img
                  src={project.image_url}
                  alt={project.title}
                  loading="lazy"
                  style={{
                    width: 200,
                    height: 130,
                    objectFit: "cover",
                    borderRadius: 4,
                  }}
                />
              </a>
              <div>
                <h2
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    margin: "0 0 10px",
                  }}
                >
                  <a
                    href={`/du-an/${project.slug}`}
                    style={{ color: "#000", textDecoration: "none" }}
                  >
                    {project.title}
                  </a>
                </h2>
                <div
                  style={{
                    display: "flex",
                    gap: 15,
                    fontSize: 13,
                    color: "#d71920",
                    marginBottom: 8,
                  }}
                >
                  <span>
                    <FaCalendarAlt />{" "}
                    {new Date(project.created_at).toLocaleDateString("vi-VN")}
                  </span>
                  <span>
                    <FaUserAlt /> Admin
                  </span>
                  <span>
                    <FaComment /> 0
                  </span>
                </div>
                <p style={{ fontSize: 14, color: "#444", marginBottom: 10 }}>
                  {project.description}
                </p>
                <a
                  href={`/du-an/${project.slug}`}
                  style={{ color: "#d71920", fontWeight: "bold", fontSize: 14 }}
                >
                  Xem chi tiết →
                </a>
              </div>
            </article>
          ))}

          {/* Pagination */}
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (number) => (
                <button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  style={{
                    margin: "0 5px",
                    padding: "8px 12px",
                    borderRadius: 4,
                    border: "1px solid #ccc",
                    backgroundColor:
                      currentPage === number ? "#d71920" : "#fff",
                    color: currentPage === number ? "#fff" : "#000",
                    cursor: "pointer",
                    marginBottom: "15px",
                  }}
                >
                  {number}
                </button>
              ),
            )}
          </div>
        </section>

        {/* Right: Sidebar as Component */}
        <RecentPostsSidebar posts={recentProjects} />
      </main>

      <Footer />
      <ContactButtons />
    </>
  );
};

export default ProjectPage;
