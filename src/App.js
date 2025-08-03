import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "@fontsource/be-vietnam-pro"; 
import "@fontsource/be-vietnam-pro/500.css";
import "@fontsource/be-vietnam-pro/700.css";
import HomePage from './Pages/homePage';
import About from './Pages/About';
import NewsPage from './Pages/News';
import NewsDetail from './Pages/NewsDetail';
import ProductCategoryPage from "./Pages/ProductCategoryPage";
import ProductListPage from "./Pages/ProductListPage";
import { HelmetProvider } from 'react-helmet-async';
import ProductDetail from './Pages/ProductDetail';
import ProjectPage from './Pages/Project';
import ContactPage from './Pages/contact';
import ProjectDetail from './Pages/ProjectDetail';
import SearchPage from './Pages/Search';
function App() {
  return (
    <HelmetProvider>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gioi-thieu" element={<About />} />
        <Route path="/tin-tuc" element={<NewsPage/>} />
        <Route path="/tin-tuc/:slug" element={<NewsDetail/>} />
        <Route path="/san-pham/:parentSlug" element={<ProductCategoryPage />} />
        <Route path="/san-pham/:parentSlug/:slug" element={<ProductListPage />} />
        <Route path="/san-pham/:parentSlug/:childSlug/:productSlug" element={<ProductDetail />} />
        <Route path="/du-an" element={<ProjectPage/>} />
        <Route path="/du-an/:slug" element={<ProjectDetail/>} />
        <Route path="/lien-he" element={<ContactPage/>} />
          <Route path="/tim-kiem" element={<SearchPage />} />
        </Routes>
    </Router>
    </HelmetProvider>
  );
}

export default App;
