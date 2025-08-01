import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Loading from "../Components/global/loading";
import TopBar from "../Components/global/topbar";
import Header from "../Components/global/header";
import Navbar from "../Components/global/navbar";
import BreadcrumbsNav from "../Components/global/BreadcrumbsNav";
import Footer from "../Components/global/footer";
import ContactButtons from "../Components/global/contactbutton";
import ProductSidebar from "../Components/ProductSidebar";
import "../styles/ProductCategoryPage.css";

const ProductCategoryPage = () => {
  const { parentSlug } = useParams();
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL; 
 useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true); // Bắt đầu loading
        const res = await fetch(`${API_URL}/categories/tree-with-products`);
        const data = await res.json();
        setCategories(data);
        const found = data.find((cat) => cat.slug === parentSlug);
        setCurrentCategory(found);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      } finally {
        setIsLoading(false); // Kết thúc loading dù có lỗi hay không
      }
    };
    fetchCategories();
  }, [parentSlug]);

  if (isLoading) {
    return <Loading />; // Hiển thị component Loading khi đang tải
  }

  if (!currentCategory) {
    return (
      <div className="container">
        <h2>Không tìm thấy danh mục sản phẩm.</h2>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Danh mục ${currentCategory.name} - Nẹp luxinox`}</title>
        <meta
          name="description"
          content={`Khám phá các sản phẩm thuộc danh mục ${currentCategory.name}. Đầy đủ mẫu mã, chất lượng cao, giá cả cạnh tranh.`}
        />
        <link rel="canonical" href={`https://www.yourwebsite.com/san-pham/${parentSlug}`} />
        <meta property="og:title" content={`Danh mục ${currentCategory.name}`} />
        <meta property="og:description" content={currentCategory.description?.substring(0, 150)} />
        <meta property="og:type" content="website" />
        {currentCategory.image_url && (
          <meta property="og:image" content={`https://www.yourwebsite.com/images/${currentCategory.image_url}`} />
        )}
      </Helmet>

      <TopBar />
      <Header />
      <Navbar />
      <BreadcrumbsNav
        links={[
          { label: "Trang chủ", href: "/" },
          { label: "Sản phẩm", href: "/san-pham" },
          { label: currentCategory.name },
        ]}
      />

      <div className="product-category-container">
        <aside className="sidebar" aria-label="Danh mục sản phẩm phụ">
          <ProductSidebar categories={categories} />
        </aside>

        <main className="main-content" role="main">
          <section>
            <div  style={{ display: "flex", alignItems: "center", textAlign: "center", margin: "20px 0"}}>
              <div style={{ flex: 1, height: "1px", backgroundColor: "#e0e0e0" }}></div>
              <h1 style={{
                color: "#d71920",
                margin: "0 20px",
                padding: "10px 20px",
                border: "1px solid #e0e0e0",
                fontWeight: "bold",
                fontSize: "24px",
                whiteSpace: "nowrap"
              }}>
                GIỚI THIỆU VỀ {currentCategory.name.toUpperCase()}
              </h1>
              <div style={{ flex: 1, height: "1px", backgroundColor: "#e0e0e0" }}></div>
            </div>

            {currentCategory.description && (
              <p style={{
                textAlign: "justify",
                color: "#000",
                fontSize: "16px",
                lineHeight: 1.6,
                maxWidth: 900,
                margin: "0 auto"
              }}>
                {currentCategory.description}
              </p>
            )}

            {currentCategory.image_url && (
              <div style={{ textAlign: "center", marginTop: 20 }}>
                <img
                  src={`/images/${currentCategory.image_url}`}
                  alt={`Hình ảnh danh mục ${currentCategory.name}`}
                  title={`Hình ảnh danh mục ${currentCategory.name}`}
                  style={{ maxWidth: "100%", height: "auto", border: "1px solid #ccc", padding: 8 }}
                />
              </div>
            )}
          </section>

          <section style={{ marginTop: 40 }}>
            <div style={{ display: "flex", alignItems: "center", textAlign: "center" }}>
              <div style={{ flex: 1, height: "1px", backgroundColor: "#e0e0e0" }}></div>
              <h2 style={{
                color: "#d71920",
                margin: "0 20px",
                padding: "10px 20px",
                border: "1px solid #e0e0e0",
                fontWeight: "bold",
                fontSize: "24px",
                whiteSpace: "nowrap"
              }}>
                DANH MỤC {currentCategory.name.toUpperCase()}
              </h2>
              <div style={{ flex: 1, height: "1px", backgroundColor: "#e0e0e0" }}></div>
            </div>

            {currentCategory.children.map((childCategory) => (
              <div key={childCategory.id} style={{ marginBottom: 50 }}>
              <div style={{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "2px solid #d71920",
  marginBottom: 20,
  paddingBottom: 6
}}>
  <h3 style={{
    fontSize: "22px",
    color: "#222",
    margin: 0
  }}>
    {childCategory.name}
  </h3>
  <Link
    to={`/san-pham/${parentSlug}/${childCategory.slug}`}
    style={{
      fontSize: "16px",
      color: "#d71920",
      textDecoration: "none",
      fontWeight: "500"
    }}
  >
    Xem tất cả &raquo;
  </Link>
</div>


           <div className="card-grid">
  {(childCategory.products || []).map((product) => (
    <article className="card" key={product.id} aria-label={`Sản phẩm ${product.name}`}>
      <Link
        to={`/san-pham/${parentSlug}/${childCategory.slug}/${product.slug}`}
        className="card-link"
        aria-label={`Chi tiết sản phẩm ${product.name}`}
      >
        <img
          src={`/images/sanpham/${product.image_url}`}
          alt={product.name}
          title={product.name}
          loading="lazy"
        />
        <div className="card-info">
          <h3 className="product-title">{product.name}</h3>
          <div className="stars" aria-hidden="true">★★★★★</div>
        </div>
      </Link>
      <Link to={`/san-pham/${parentSlug}/${childCategory.slug}/${product.slug}`}>
        <button className="cta-button" aria-label={`Liên hệ về sản phẩm ${product.name}`}>
          LIÊN HỆ
        </button>
      </Link>
    </article>
  ))}
</div>

              </div>
            ))}
          </section>
        </main>
      </div>

      <Footer />
      <ContactButtons />
    </>
  );
};

export default ProductCategoryPage;
