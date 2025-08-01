// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import TopBar from "../Components/global/topbar";
import Header from "../Components/global/header";
import Navbar from "../Components/global/navbar";
import BreadcrumbsNav from "../Components/global/BreadcrumbsNav";
import Footer from "../Components/global/footer";
import ContactButtons from "../Components/global/contactbutton";
import ProductSidebar from "../Components/ProductSidebar";
import Loading from "../Components/global/loading";
import "../styles/ProductDetail.css";

const ProductDetail = () => {
  const { parentSlug, childSlug, productSlug } = useParams();

  const [categoryTree, setCategoryTree] = useState([]);
  const [parentCat, setParentCat] = useState(null);
  const [childCat, setChildCat] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lightbox
  const [previewSrc, setPreviewSrc] = useState(null);
  const openPreview = (src) => setPreviewSrc(src);
  const closePreview = () => setPreviewSrc(null);
  const API_URL = process.env.REACT_APP_API_URL;  
  useEffect(() => {
    if (!previewSrc) return;
    const onKey = (e) => e.key === "Escape" && closePreview();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [previewSrc]);

  useEffect(() => {
  let mounted = true;
  (async () => {
    try {
      const { data } = await axios.get(`${API_URL}/categories/tree-with-products`);
      if (!mounted) return;

      setCategoryTree(data || []);
      const cleanParent = decodeURIComponent((parentSlug || "").trim());
      const cleanChild = decodeURIComponent((childSlug || "").trim());
      const cleanProduct = decodeURIComponent((productSlug || "").trim());

      const parent = (data || []).find((cat) => cat.slug?.trim() === cleanParent);
      if (!parent) return;

      const child = parent.children?.find((c) => c.slug?.trim() === cleanChild);
      if (!child) return;

      const foundProduct =
        child.products?.find((p) => p.slug?.trim() === cleanProduct) || null;

      if (!foundProduct) return;

      // 🔁 Gọi API mới để lấy long_description theo ID
      const res = await axios.get(`${API_URL}/products/${foundProduct.id}/long-description`);
      foundProduct.long_description = res.data || [];

      setParentCat(parent);
      setChildCat(child);
      setProduct(foundProduct);
    } catch (err) {
      console.error("❌ Lỗi fetch product:", err);
    } finally {
      if (mounted) setLoading(false);
    }
  })();
  return () => {
    mounted = false;
  };
}, [parentSlug, childSlug, productSlug]);


  if (loading) return <Loading/>;

  if (!product)
    return (
      <>
        <TopBar />
        <Header />
        <Navbar />
        <BreadcrumbsNav
          links={[
            { label: "Trang chủ", href: "/" },
            { label: "Sản phẩm", href: "/san-pham" },
            parentCat && { label: parentCat?.name, href: `/san-pham/${parentCat?.slug}` },
            childCat && { label: childCat?.name, href: `/san-pham/${parentCat?.slug}/${childCat?.slug}` },
            { label: "Không tìm thấy" },
          ].filter(Boolean)}
        />
        <div className="pd-wrapper">
          <div className="pd-row">
            <aside className="pd-left">
              <ProductSidebar
                categories={categoryTree}
                parentSlug={parentSlug}
                activeChildSlug={childSlug}
              />
            </aside>
            <main className="pd-right">
              <div className="pd-notfound">
                <h2>Không tìm thấy sản phẩm.</h2>
                <Link to="/san-pham" className="pd-link-back">← Quay lại trang sản phẩm</Link>
              </div>
            </main>
          </div>
        </div>
        <Footer />
        <ContactButtons />
      </>
    );

  return (
    <>
      <TopBar />
      <Header />
      <Navbar />
      <BreadcrumbsNav
        links={[
          { label: "Trang chủ", href: "/" },
          { label: "Sản phẩm", href: "/san-pham" },
          parentCat && { label: parentCat?.name, href: `/san-pham/${parentCat?.slug}` },
          childCat && { label: childCat?.name, href: `/san-pham/${parentCat?.slug}/${childCat?.slug}` },
          { label: product.name },
        ].filter(Boolean)}
      />

      <div className="pd-wrapper">
        {/* Tầng 1: Sidebar | Khối phải */}
        <div className="pd-row">
          {/* Sidebar cố định rộng */}
          <aside className="pd-left">
            <ProductSidebar
              categories={categoryTree}
              parentSlug={parentSlug}
              activeChildSlug={childSlug}
            />
          </aside>

          {/* Khối phải: Tầng 2 và longdesc */}
          <main className="pd-right">
            {/* Tầng 2: Media | Info (2 cột, độc lập với chiều cao sidebar) */}
            <div className="pd-top">
              <section className="pd-media">
                {product.image_url ? (
                  <img
                    className="pd-image-main pd-zoomable"
                    src={`/images/sanpham/${product.image_url}`}
                    alt={product.name}
                    loading="lazy"
                    onError={(e) => (e.currentTarget.src = "/images/no-image.png")}
                    onClick={() => openPreview(`/images/${product.image_url}`)}
                  />
                ) : (
                  <div className="pd-image-placeholder">Không có ảnh</div>
                )}
              </section>

              <section className="pd-info">
                <h1 className="pd-title">{product.name}</h1>
                      <div className="custom-product-rating" aria-hidden="true">★★★★★</div>
                <div className="pd-badge">Liên hệ</div>
                <div className="pd-desc-card">
                  <div className="pd-desc-head">Mô tả sản phẩm</div>
                  <div className="pd-desc-body">
                    {product.description || "Chưa có mô tả."}
                  </div>
                </div>
              </section>
            </div>

            {/* Long description (không dính sidebar, chỉ nằm dưới Media+Info) */}
            <section className="pd-longdesc-container">
              <h2 className="pd-longdesc-heading">Mô tả chi tiết sản phẩm</h2>
              {(product.long_description || []).map((block, idx) => (
                <article className="pd-longdesc-block" key={idx}>
                  {block.paragraph_title && (
                    <h3 className="pd-longdesc-title">{block.paragraph_title}</h3>
                  )}

                  {/* Ảnh mỗi đoạn (nếu có) */}
                  {block.image_url && (
                    <img
                      className="pd-longdesc-image pd-zoomable"
                      src={block.image_url}
                      alt={block.paragraph_title || `Ảnh ${idx + 1}`}
                      loading="lazy"
                      onClick={() => openPreview(block.image_url)}
                    />
                  )}

                  {block.paragraph_text && (
                    <p className="pd-longdesc-text">{block.paragraph_text}</p>
                  )}
                </article>
              ))}
            </section>
          </main>
        </div>
      </div>

      {/* Lightbox */}
      {previewSrc && (
        <div
          className="pd-lightbox"
          onClick={closePreview}
          role="dialog"
          aria-modal="true"
        >
          <img
            src={previewSrc}
            alt="Preview"
            className="pd-lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="pd-lightbox-close"
            aria-label="Đóng"
            onClick={closePreview}
          >
            ✕
          </button>
        </div>
      )}

      <Footer />
      <ContactButtons />
    </>
  );
};

export default ProductDetail;
