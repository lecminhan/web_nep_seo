import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ScrollToTopButton from "../Components/global/ScrollToTopButton";

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
import { Helmet } from "react-helmet";
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
        const parent = tree.find((cat) => cat.slug?.trim() === cleanParentSlug);
        if (!parent || !Array.isArray(parent.children)) {
          console.warn("⚠️ Không tìm thấy parent hoặc không có children.");
          setMatchedParent(null);
          setMatchedChild(null);
          setLoading(false);
          return;
        }

        const child = parent.children.find((c) => c.slug?.trim() === cleanSlug);

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

  if (loading) return <Loading />;
  if (!matchedChild)
    return (
      <p>
        Không tìm thấy danh mục con phù hợp với slug: <strong>{slug}</strong>
      </p>
    );

  return (
    <>
      <Helmet>
        <title>{`${matchedChild.name} |${matchedParent.name} | Nẹp Trang Trí Nội Thất Đà Nẵng`}</title>
        <meta
          name="description"
          content={`Khám phá danh mục ${matchedChild.name} thuộc nhóm ${matchedParent.name}. Sản phẩm chất lượng cao, mẫu mã đa dạng từ Nẹp Đà Nẵng.`}
        />
        <meta
          property="og:title"
          content={`${matchedChild.name} | ${matchedParent.name} | Nẹp Đà Nẵng`}
        />
        <meta
          property="og:description"
          content={`Khám phá danh mục ${matchedChild.name} thuộc nhóm ${matchedParent.name}.`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://nepdanang.vn/san-pham/${matchedParent.slug}/${matchedChild.slug}`}
        />

        {/* JSON-LD Breadcrumb */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Trang chủ",
                item: "https://nepdanang.vn/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Sản phẩm",
                item: "https://nepdanang.vn/san-pham",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: matchedChild.name,
                item: `https://nepdanang.vn/san-pham/${matchedParent.slug}/${matchedChild.slug}`,
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
          { label: "Sản phẩm", href: "/san-pham" },
          { label: matchedChild.name },
        ]}
      />
      <ScrollToTopButton />

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
            <h1 className="custom-section-title">
              GIỚI THIỆU VỀ {matchedChild.name.toUpperCase()}
            </h1>
            <div className="line" />
          </div>

          {matchedChild.description && (
            <p
              dangerouslySetInnerHTML={{ __html: matchedChild.description }}
              className="custom-category-description"
            ></p>
          )}
          <div className="custom-section-title-wrapper">
            <div className="line" />
            <h2 className="custom-section-title">
              DANH MỤC SẢN PHẨM {matchedChild.name.toUpperCase()}
            </h2>
            <div className="line" />
          </div>
          <div className="custom-product-grid">
            {(matchedChild?.products?.length || 0) > 0 ? (
              <>
                {(matchedChild?.products || []).map((product) => (
                  <article
                    className="custom-product-card"
                    key={product.id}
                    aria-label={`Sản phẩm ${product.name}`}
                  >
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
                        <div
                          className="custom-product-rating"
                          aria-hidden="true"
                        >
                          ★★★★★
                        </div>
                        <button className="custom-quote-button">Liên Hệ</button>
                      </div>
                    </Link>
                  </article>
                ))}

                {/* Thêm placeholder nếu < 4 sản phẩm */}
                {Array.from({
                  length: (4 - (matchedChild.products.length % 4)) % 4,
                }).map((_, index) => (
                  <article
                    key={`placeholder-${index}`}
                    className="placeholder"
                    aria-hidden="true"
                  />
                ))}
              </>
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
