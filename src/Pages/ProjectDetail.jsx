// src/pages/ProjectDetail.jsx
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
        <title>{project.title} | Dự án</title>
        <meta name="description" content={project.description?.slice(0, 150)} />
        <meta property="og:title" content={project.title} />
        <meta property="og:description" content={project.description?.slice(0, 150)} />
        <meta property="og:image" content={project.image_url} />
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

      <main className="project-detail-container">
        <article className="project-detail-content">
          <h1 className="project-title">{project.title}</h1>

          <img
            src={project.image_url}
            alt={project.title}
            className="project-main-image"
            loading="lazy"
          />

          {project.description && (
            <p className="project-description">{project.description}</p>
          )}

          <div
            className="project-html-content"
            dangerouslySetInnerHTML={{ __html: project.content }}
          />
        </article>

        <aside className="project-sidebar">
          <RecentPostsSidebar/>
        </aside>
      </main>

      <Footer />
    </>
  );
};

export default ProjectDetail;
