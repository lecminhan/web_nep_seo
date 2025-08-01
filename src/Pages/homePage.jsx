import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Header from "../Components/global/header";
import TopBar from "../Components/global/topbar";
import Navbar from "../Components/global/navbar";
import IntroSlider from "../Components/home/introslider";
import Section3 from "../Components/home/section3";
import Section4 from "../Components/home/section4";
import Section5 from "../Components/home/section5";
import Section6 from "../Components/home/section6";
import Section7 from "../Components/home/section7";
import Footer from "../Components/global/footer";
import ContactButtons from "../Components/global/contactbutton";
import '../styles/Home.css'
const HomePage = () => {
  useEffect(() => {
    document.title = "Nẹp trang trí nội thất nhôm Luxinox - inox 304 Đà Nẵng"; // ✅ Đặt tiêu đề trang tại đây
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh", // ✅ giữ độ cao tối thiểu
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TopBar />
      <Header />
      <Navbar />
      <IntroSlider />
      <Section3 />
      <Section4 />
    <section className="homepage-banner-section" aria-label="Ảnh giới thiệu trang web">
  <div className="homepage-banner-container">
    <img
      src="/images/tong-kho-nep-nhom-nep-inox-trang-tri-noi-that-da-nang-nepdanang.vn-4.jpg"
      alt="Giới thiệu Nẹp Luxinox"
      className="homepage-banner-image"
    />
  </div>
</section>

      <Section5 />
      <Section6 />
      <Section7 />
      <Footer />
      <ContactButtons />
    </Box>
  );
};

export default HomePage;
