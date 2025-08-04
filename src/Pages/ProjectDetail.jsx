// src/pages/ProjectDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import ScrollToTopButton from "../Components/global/ScrollToTopButton";

import TopBar from "../Components/global/topbar";
import Header from "../Components/global/header";
import Navbar from "../Components/global/navbar";
import BreadcrumbsNav from "../Components/global/BreadcrumbsNav";
import Footer from "../Components/global/footer";
import ContactButtons from "../Components/global/contactbutton";
import RecentPostsSidebar from "../Components/RecentPostsSidebar";
import Loading from "../Components/global/loading";

import "../styles/ProjectDetail.css";

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [recentNews, setRecentNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        const res = await axios.get(`${API_URL}/projects/${slug}`);
        setProject(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy dữ án:", error);
        setLoading(false);
      }
    };

    fetchProjectDetail();
  }, [slug]);

  if (loading) return <Loading />;
  if (!project) return <p>Không tìm thấy dự án.</p>;

  return (
    <>
      <Helmet>
        <title>{`${project.title} | Dự Án Nẹp Luxinox Đà Nẵng`}</title>
        <meta name="description" content={project.description?.slice(0, 150)} />
        <meta property="og:title" content={project.title} />
        <meta
          property="og:description"
          content={project.description?.slice(0, 150)}
        />
        <meta property="og:image" content={project.image_url} />
        <meta
          property="og:url"
          content={`https://nepdanang.vn/projects/${slug}`}
        />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={project.title} />
        <meta
          name="twitter:description"
          content={project.description?.slice(0, 150)}
        />
        <meta name="twitter:image" content={project.image_url} />
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
              {
                "@type": "ListItem",
                position: 3,
                name: project.title,
                item: `https://nepdanang.vn/du-an/${slug}`,
              },
            ],
          })}
        </script>
      </Helmet>

      <TopBar />
      <Header />
      <Navbar />
      <BreadcrumbsNav
        links={[
          { label: "Trang chủ", href: "/" },
          { label: "Dự án", href: "/projects" },
          { label: project.title },
        ]}
      />
      <ContactButtons />
      <ScrollToTopButton />

      <main className="project-detail-container">
        <article className="project-detail-content">
          <h1 className="project-title">{project.title}</h1>

          <figure className="project-main-figure" style={{ margin: "20px 0" }}>
            <img
              src={project.image_url}
              alt={project.title}
              className="project-main-image"
              loading="lazy"
              style={{ width: "100%", borderRadius: 8, objectFit: "cover" }}
            />
            <figcaption
              className="project-image-caption"
              style={{
                textAlign: "center",
                fontSize: "14px",
                color: "#666",
                marginTop: 8,
                fontStyle: "italic",
              }}
            >
              {project.title}
            </figcaption>
          </figure>

          {project.description && (
            <p className="project-description">{project.description}</p>
          )}

          <div
            className="project-html-content"
            dangerouslySetInnerHTML={{ __html: project.content }}
          />
        </article>

        <aside className="project-sidebar">
          <RecentPostsSidebar />
        </aside>
      </main>

      <Footer />
    </>
  );
};

export default ProjectDetail;
