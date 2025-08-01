import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaUserAlt, FaComment } from "react-icons/fa";

import TopBar from "../Components/global/topbar";
import Header from "../Components/global/header";
import Navbar from "../Components/global/navbar";
import BreadcrumbsNav from "../Components/global/BreadcrumbsNav";
import Footer from "../Components/global/footer";
import ContactButtons from "../Components/global/contactbutton";
import RecentPostsSidebar from "../Components/RecentPostsSidebar";

const NewsPage = () => {
  const [posts, setPosts] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    fetch(`${API_URL}/news`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Lỗi tải tin tức:", err));
  }, []);

  const recentPosts = posts.slice(0, 5);

  return (
    <>
      <TopBar />
      <Header />
      <Navbar />
      <BreadcrumbsNav
        links={[
          { label: "Trang chủ", href: "/" },
          { label: "Tin tức" },
        ]}
      />

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
        <section style={{ flex: 9,borderRight:  "1px solid #eee" }}>
          {posts.map((post) => (
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
                <h2 style={{ fontSize: 18, fontWeight: "bold", margin: "0 0 10px" }}>
                  <a href={`/tin-tuc/${post.slug}`} style={{ color: "#000", textDecoration: "none" }}>
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
