import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import TopBar from "../Components/global/topbar";
import Header from "../Components/global/header";
import Navbar from "../Components/global/navbar";
import BreadcrumbsNav from "../Components/global/BreadcrumbsNav";
import Footer from "../Components/global/footer";
import ContactButtons from "../Components/global/contactbutton";
import ProductSidebar from "../Components/ProductSidebar";
import { Link } from "react-router-dom";
import Loading from "../Components/global/loading";
import "../styles/ProductListPage.css";

const ProductListPage = () => {
  const { parentSlug, slug } = useParams();
  const [categoryTree, setCategoryTree] = useState([]);
  const [matchedParent, setMatchedParent] = useState(null);
  const [matchedChild, setMatchedChild] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL;  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/categories/tree-with-products`);
        const tree = res.data;
        setCategoryTree(tree);

        const cleanParentSlug = decodeURIComponent(parentSlug?.trim() || "");
        const cleanSlug = decodeURIComponent(slug?.trim() || "");

        const parent = tree.find(cat => cat.slug?.trim() === cleanParentSlug);
        if (!parent || !Array.isArray(parent.children)) {
          console.warn("⚠️ Không tìm thấy parent hoặc không có children.");
          setMatchedParent(null);
          setMatchedChild(null);
          setLoading(false);
          return;
        }

        const child = parent.children.find(c => c.slug?.trim() === cleanSlug);

        setMatchedParent(parent);
        setMatchedChild(child || null);
        setLoading(false);
      } catch (err) {
        console.error("❌ Lỗi khi fetch dữ liệu:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [parentSlug, slug]);

  if (loading) return  <Loading/>;
  if (!matchedChild) return <p>Không tìm thấy danh mục con phù hợp với slug: <strong>{slug}</strong></p>;

  return (
    <>
      <TopBar />
      <Header />
      <Navbar />
      <BreadcrumbsNav
        links={[
          { label: "Trang chủ", href: "/" },
          { label: "Sản phẩm", href: "/san-pham" },
          { label: matchedChild.name },
        ]}
      />

      <div className="custom-product-page">
        <aside className="custom-sidebar">
          <ProductSidebar
            categories={categoryTree}
            parentSlug={parentSlug}
            activeChildSlug={slug}
          />
        </aside>

        <main className="custom-product-content">
       <div className="custom-section-title-wrapper">
  <div className="line" />
  <h2 className="custom-section-title">
    GIỚI THIỆU VỀ {matchedChild.name.toUpperCase()}
  </h2>
  <div className="line" />
</div>

{matchedChild.description && (
  <p className="custom-category-description">
    {matchedChild.description}
  </p>
)}
    <div className="custom-section-title-wrapper">
  <div className="line" />
  <h2 className="custom-section-title">
    DANH MỤC SẢN PHẨM {matchedChild.name.toUpperCase()}
  </h2>
  <div className="line" />
</div>
          <div className="custom-product-grid">
  {(matchedChild.products || []).length > 0 ? (
    matchedChild.products.map((product) => (
      <article className="custom-product-card" key={product.id} aria-label={`Sản phẩm ${product.name}`}>
        <Link
          to={`/san-pham/${matchedParent.slug}/${matchedChild.slug}/${product.slug}`}
          className="card-link"
          aria-label={`Chi tiết sản phẩm ${product.name}`}
        >
          <img
            src={`/images/sanpham/${product.image_url}`}
            alt={product.name}
            title={product.name}
            loading="lazy"
            className="custom-product-image"
          />
          <div className="custom-product-info">
            <p className="custom-product-title">{product.name}</p>
            <div className="custom-product-rating" aria-hidden="true">★★★★★</div>
            <button className="custom-quote-button"> Liên Hệ</button>
          </div>
        </Link>
      </article>
    ))
  ) : (
    <p>Không có sản phẩm nào trong danh mục này.</p>
  )}
</div>

        </main>
        
      </div>

      <Footer />
      <ContactButtons />
    </>
  );
};

export default ProductListPage;
