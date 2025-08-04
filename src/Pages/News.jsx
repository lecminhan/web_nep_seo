import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaUserAlt, FaComment } from "react-icons/fa";

import TopBar from "../Components/global/topbar";
import Header from "../Components/global/header";
import Navbar from "../Components/global/navbar";
import BreadcrumbsNav from "../Components/global/BreadcrumbsNav";
import Footer from "../Components/global/footer";
import ContactButtons from "../Components/global/contactbutton";
import RecentPostsSidebar from "../Components/RecentPostsSidebar";
import "../styles/NewPage.css";
import { Helmet } from "react-helmet-async";
import ScrollToTopButton from "../Components/global/ScrollToTopButton";

const NewsPage = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/news`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Lỗi tải tin tức:", err));
  }, []);

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const recentPosts = posts.slice(0, 5);

  return (
    <>
      <Helmet>
        <title>Tin Tức Nẹp Trang Trí Nội Thất | Luxinox Đà Nẵng</title>
        <meta
          name="description"
          content="Cập nhật tin tức mới nhất về sản phẩm nẹp inox, nẹp nhôm trang trí nội thất và các xu hướng thiết kế hiện đại cùng Luxinox Đà Nẵng."
        />
        <meta
          name="keywords"
          content="tin tức nẹp, tin tức vật liệu xây dựng, nẹp inox, nẹp nhôm, nẹp trang trí nội thất, tin tức Luxinox"
        />
        <meta property="og:title" content="Tin Tức - Luxinox Đà Nẵng" />
        <meta
          property="og:description"
          content="Tin tức mới nhất từ Nẹp Luxinox - Xu hướng thiết kế, ứng dụng nẹp trong nội thất hiện đại. Cập nhật thường xuyên!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nepdanang.vn/tin-tuc" />
        <meta
          property="og:image"
          content="https://www.nepdanang.vn/images/og-image.jpg"
        />
        <link rel="canonical" href="https://www.nepdanang.vn/tin-tuc" />
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
            "name": "Tin tức",
            "item": "https://www.nepdanang.vn/tin-tuc"
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
        links={[{ label: "Trang chủ", href: "/" }, { label: "Tin tức" }]}
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
          {currentPosts.map((post) => (
            <article
              key={post.id}
              style={{
                display: "flex",
                gap: 20,
                marginBottom: 30,
                borderBottom: "1px solid #eee",
                paddingBottom: 20,
              }}
            >
              <a href={`/tin-tuc/${post.slug}`}>
                <img
                  src={post.image_url}
                  alt={post.title}
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
                    href={`/tin-tuc/${post.slug}`}
                    style={{ color: "#000", textDecoration: "none" }}
                  >
                    {post.title}
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
                    {new Date(post.published_at).toLocaleDateString("vi-VN")}
                  </span>
                  <span>
                    <FaUserAlt /> Admin
                  </span>
                  <span>
                    <FaComment /> 0
                  </span>
                </div>
                <p style={{ fontSize: 14, color: "#444", marginBottom: 10 }}>
                  {post.description}
                </p>
                <a
                  href={`/tin-tuc/${post.slug}`}
                  style={{ color: "#d71920", fontWeight: "bold", fontSize: 14 }}
                >
                  Tìm hiểu thêm →
                </a>
              </div>
            </article>
          ))}

          {/* Pagination */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 20,
              gap: 10,
            }}
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  padding: "6px 12px",
                  border: "1px solid #ccc",
                  backgroundColor: page === currentPage ? "#d71920" : "#fff",
                  color: page === currentPage ? "#fff" : "#444",
                  cursor: "pointer",
                  borderRadius: 4,
                  fontWeight: "bold",
                  marginBottom: "15px",
                }}
              >
                {page}
              </button>
            ))}
          </div>
        </section>

        {/* Right: Sidebar as Component */}
        <RecentPostsSidebar posts={recentPosts} />
      </main>

      <Footer />
      <ContactButtons />
    </>
  );
};

export default NewsPage;
