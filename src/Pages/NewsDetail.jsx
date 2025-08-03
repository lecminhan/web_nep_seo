import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";

import TopBar from "../Components/global/topbar";
import Header from "../Components/global/header";
import Navbar from "../Components/global/navbar";
import BreadcrumbsNav from "../Components/global/BreadcrumbsNav";
import Footer from "../Components/global/footer";
import ContactButtons from "../Components/global/contactbutton";
import RecentPostsSidebar from "../Components/RecentPostsSidebar";
import Loading from "../Components/global/loading";

const NewsDetail = () => {
  const { slug } = useParams();
  const [newsData, setNewsData] = useState(null);
  const [recentNews, setRecentNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const res = await axios.get(`${API_URL}/news/slug/${slug}`);
        setNewsData(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy bài viết:", error);
        setLoading(false);
      }
    };

    const fetchRecentNews = async () => {
      try {
        const res = await axios.get(`${API_URL}/news`);
        setRecentNews(res.data.slice(0, 5));
      } catch (error) {
        console.error("Lỗi khi tải bài viết gần đây:", error);
      }
    };

    fetchNewsDetail();
    fetchRecentNews();
  }, [slug]);

  if (loading) return <Loading />;
  if (!newsData) return <p>Không tìm thấy bài viết.</p>;

  const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

  return (
    <>
  <Helmet>
  <title>{newsData.title} | Tin tức</title>
  <meta name="description" content={newsData.content[0]?.paragraph_text.slice(0, 160)} />
  <meta name="keywords" content="nẹp inox, nẹp nhôm, nẹp trang trí, tin tức vật liệu xây dựng, ứng dụng nẹp nội thất, Luxinox" />
  <meta name="robots" content="index, follow" />
  <meta property="og:title" content={newsData.title} />
  <meta property="og:description" content={newsData.content[0]?.paragraph_text.slice(0, 160)} />
  <meta property="og:type" content="article" />
  <meta property="og:image" content={newsData.content.find(c => c.image_url)?.image_url || "/default-thumbnail.jpg"} />
  <meta property="og:url" content={`https://nepdanang.vn/news/${slug}`} />
  <link rel="canonical" href={`https://nepdanang.vn/news/${slug}`} />
  </Helmet>
<script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        position: 1,
        name: "Trang chủ",
        item: "https://nepdanang.vn"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tin tức",
        item: "https://nepdanang.vn/tin-tuc"
      },
      {
        "@type": "ListItem",
        position: 3,
        name: newsData.title,
        item: `https://nepdanang.vn/news/${slug}`
      }
    ]
  })}
</script>
      <TopBar />
      <Header />
      <Navbar />
      <BreadcrumbsNav
        links={[
          { label: "Trang chủ", href: "/" },
          { label: "Tin tức", href: "/news" },
          { label: newsData.title },
        ]}
      />
      <ContactButtons />

      <main
        style={{
          display: "flex",
          flexWrap: "wrap",
          maxWidth: 1200,
          margin: "20px auto",
          gap: "30px",
          padding: "0 15px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* Nội dung bài viết */}
        <article style={{ flex: "4 1 680px", minWidth: 300 }}>
          <h1
            style={{
              fontSize: "28px",
              marginBottom: 30,
              textAlign: "center",
              color: "#d71920",
            }}
          >
            {newsData.title}
          </h1>

          {newsData.content.map((section, index) => {
            const isTitled = !!section.paragraph_title;
            const sectionId = `section-${index}`;

            return (
             <section key={section.content_id || sectionId} style={{ marginBottom: 40 }}>
  {isTitled && (
    <h2 style={{ fontSize: "20px", marginBottom: 10, fontWeight: "bold", color: "#d71920" }}>
      {romanNumerals[index] || index + 1}. {section.paragraph_title}
    </h2>
  )}

  <div
    style={{
      fontSize: 16,
      lineHeight: 1.7,
      whiteSpace: "pre-line",
      textAlign: "justify",
      color: "#333",
    }}
    dangerouslySetInnerHTML={{ __html: section.paragraph_text }}
  />

  {section.image_url && (
  <figure style={{ marginTop: 15 }}>
    <img
      src={section.image_url}
      alt={section.paragraph_title || `Ảnh minh họa ${index + 1}`}
      style={{
        width: "100%",
        borderRadius: 5,
        objectFit: "cover",
      }}
      loading="lazy"
    />
    <figcaption style={{ fontSize: 14, color: "#666", marginTop: 5, fontStyle: "italic", textAlign: "center" }}>
      {section.paragraph_title || `Hình ảnh minh họa`}
    </figcaption>
  </figure>
)}

</section>

            );
          })}
        </article>

        {/* Sidebar */}
        <aside style={{ flex: "1 1 250px", minWidth: 260 }}>
          <RecentPostsSidebar posts={recentNews} />
        </aside>
      </main>

      <Footer />
    </>
  );
};

export default NewsDetail;
