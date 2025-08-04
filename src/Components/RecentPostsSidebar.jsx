// src/Components/news/RecentPostsSidebar.jsx
import React, { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";

const RecentPostsSidebar = () => {
  const [posts, setPosts] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/news`)
      .then((res) => res.json())
      .then((data) => {
        // Sắp xếp theo published_at mới nhất
        const sorted = data.sort(
          (a, b) => new Date(b.published_at) - new Date(a.published_at),
        );
        setPosts(sorted.slice(0, 5)); // Lấy 5 bài mới nhất
      })
      .catch((err) => console.error("Lỗi tải tin tức:", err));
  }, []);

  return (
    <aside style={{ flex: 3 }}>
      <h3
        style={{
          fontSize: 18,
          fontWeight: "bold",
          borderBottom: "2px solid #d71920",
          paddingBottom: 5,
          marginBottom: 15,
          display: "inline-block",
        }}
      >
        BÀI VIẾT GẦN ĐÂY
      </h3>

      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 15,
            overflow: "hidden",
            textOverflow: "ellipsis",
            borderBottom: "1px solid #eee",
          }}
        >
          <a href={`/tin-tuc/${post.slug}`}>
            <img
              src={post.image_url}
              alt={post.title}
              loading="lazy"
              style={{
                width: 80,
                height: 60,
                objectFit: "cover",
                borderRadius: 3,
              }}
            />
          </a>
          <div>
            <a
              href={`/tin-tuc/${post.slug}`}
              style={{
                fontSize: 14,
                color: "#000",
                textDecoration: "none",
              }}
            >
              {post.title.length > 45
                ? post.title.slice(0, 42) + "..."
                : post.title}
            </a>
            <div style={{ fontSize: 12, color: "#333", marginTop: 5 }}>
              <FaCalendarAlt style={{ marginRight: 5 }} />
              {new Date(post.published_at).toLocaleDateString("vi-VN")}
            </div>
          </div>
        </div>
      ))}
    </aside>
  );
};

export default RecentPostsSidebar;
