import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RecentPostsSidebar from "./RecentPostsSidebar";

const ProductSidebar = ({ categories, parentSlug }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    // Ẩn hoàn toàn sidebar trên mobile (có thể đổi sang toggle sau)
    return null;
  }

  return (
    <aside
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: 300,
        width: "100%",
        boxSizing: "border-box",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "0 10px",
      }}
      aria-label="Sidebar ngành hàng"
    >
      {/* Ngành hàng */}
      <nav aria-label="Ngành hàng">
        <h2
          style={{
            fontSize: 18,
            fontWeight: "bold",
            paddingBottom: 10,
            borderBottom: "2px solid #d71920",
            marginBottom: 16,
            color: "#222",
          }}
        >
          Ngành hàng
        </h2>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link
                to={`/san-pham/${cat.slug}`}
                style={{
                  display: "block",
                  padding: "12px 14px",
                  border: "1px solid #ddd",
                  backgroundColor:
                    cat.slug === parentSlug ? "#f9f9f9" : "#fff",
                  color: "#222",
                  textDecoration: "none",
                  fontSize: 15,
                  transition: "transform 0.2s ease, background-color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f0f0f0";
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    cat.slug === parentSlug ? "#f9f9f9" : "#fff";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bài viết gần đây */}
      <section
        aria-label="Bài viết gần đây"
        style={{
          marginTop: 40,
          borderTop: "1px solid #eee",
          paddingTop: 20,
        }}
      >
        <RecentPostsSidebar />
      </section>
    </aside>
  );
};

export default ProductSidebar;
