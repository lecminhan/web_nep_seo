import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/SearchPage.css";
import ScrollToTopButton from "../Components/global/ScrollToTopButton";

import TopBar from "../Components/global/topbar";
import Header from "../Components/global/header";
import Navbar from "../Components/global/navbar";
import Footer from "../Components/global/footer";
import ContactButtons from "../Components/global/contactbutton";
import Loading from "../Components/global/loading";

const SearchPage = () => {
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;

  // Cập nhật query mỗi khi location.search thay đổi
  // Cập nhật query mỗi khi location.search thay đổi
  useEffect(() => {
    const q = new URLSearchParams(location.search).get("q") || "";
    setQuery(q);
    setLoading(true); // 👈 Bắt đầu loading ngay khi query từ URL thay đổi
    setResults([]); // 👈 Xoá kết quả cũ để tránh hiển thị sai
  }, [location.search]);

  // Gọi API mỗi khi query thay đổi
  useEffect(() => {
    if (query) {
      axios
        .get(`${API_URL}/search?q=${encodeURIComponent(query)}`)
        .then((res) => setResults(res.data))
        .catch((err) => {
          console.error(err);
          setResults([]); // 👈 Trong trường hợp lỗi cũng phải reset kết quả
        })
        .finally(() => setLoading(false));
    } else {
      setResults([]);
      setLoading(false); // 👈 Trường hợp query rỗng, tắt loading luôn
    }
  }, [query]);

  return (
    <>
      <TopBar />
      <Header />
      <Navbar />

      <div className="product-category-container">
        <main className="main-content">
          <div className="section-title-red-wrapper">
            <h1 className="section-title-red">Kết quả tìm kiếm: "{query}"</h1>
          </div>

          {loading ? (
            <Loading />
          ) : results.length > 0 ? (
            <div className="card-grid">
              {results.map((product) => (
                <article
                  className="card"
                  key={product.id}
                  aria-label={`Sản phẩm ${product.name}`}
                >
                  <Link
                    to={`/san-pham/${product.parent_slug}/${product.child_slug}/${product.slug}`}
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
                      <div className="stars" aria-hidden="true">
                        ★★★★★
                      </div>
                    </div>
                  </Link>
                  <Link
                    to={`/san-pham/${product.parent_slug}/${product.child_slug}/${product.slug}`}
                  >
                    <button
                      className="cta-button"
                      aria-label={`Liên hệ về sản phẩm ${product.name}`}
                    >
                      LIÊN HỆ
                    </button>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <p
              style={{
                padding: "20px",
                color: "#d71920",
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "bold",
                backgroundColor: "#fff0f0",
                border: "1px solid #f5c2c7",
                borderRadius: "8px",
                margin: "20px auto",
                maxWidth: "500px",
              }}
            >
              Không tìm thấy sản phẩm nào.
            </p>
          )}
        </main>
      </div>

      <Footer />
      <ContactButtons />
      <ScrollToTopButton />
    </>
  );
};

export default SearchPage;
