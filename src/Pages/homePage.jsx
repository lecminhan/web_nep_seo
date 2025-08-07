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
import ScrollToTopButton from "../Components/global/ScrollToTopButton";
import { Helmet } from "react-helmet";
const HomePage = () => {
  useEffect(() => {
    document.title = "Nẹp trang trí nội thất nhôm Luxinox - inox 304 Đà Nẵng";
  }, []);
  return (
    <>
      <Helmet>
        <title>Tổng kho Nẹp Nhôm – Nẹp Inox Trang Trí Nội Thất Đà Nẵng</title>
        <meta
          name="description"
          content="Luxinox chuyên cung cấp nẹp nhôm - nẹp inox trang trí nội thất tại Đà Nẵng. Chất lượng vượt trội, giao hàng toàn quốc. Liên hệ nhận báo giá tốt nhất."
        />
        <meta
          name="keywords"
          content="nẹp inox, nẹp nhôm, nẹp trang trí, nẹp tại Đà Nẵng, nẹp Đà Nẵng, nẹp nội thất, nẹp 304, nẹp T, nẹp U, nẹp V, nẹp L"
        />
        <meta
          property="og:title"
          content="Tổng kho nẹp nhôm - nẹp inox trang trí nội thất Đà Nẵng"
        />
        <meta
          property="og:description"
          content="Luxinox chuyên cung cấp nẹp nhôm, nẹp inox trang trí nội thất cao cấp tại Đà Nẵng. Giao hàng toàn quốc, báo giá nhanh."
        />
        <meta
          property="og:image"
          content="https://nepdanang.vn/images/logo-webseonep.png"
        />
        <meta property="og:url" content="https://nepdanang.vn/" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://nepdanang.vn/" />
      </Helmet>
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          overflowX: "hidden", // tránh scroll ngang
        }}
      >
        <TopBar />
        <Header />
        <Navbar />
        <IntroSlider />
        <Section3 />
        <Section4 />
        <ScrollToTopButton />
        {/* ✅ Banner Section Inline CSS */}
        <Box
          component="section"
          aria-label="Giới thiệu thông tin công ty nẹp Luxinox"
          sx={{
            width: "100%",
            mt: 4,
            mb: 4,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src="/images/slide4.webp"
            alt="Giới thiệu Nẹp Luxinox"
            sx={{
              width: "100%",
              maxWidth: "1200px",
              height: "auto",
              borderRadius: { xs: "0", md: "10px" },
              objectFit: "cover",
            }}
          />
        </Box>

        <Section5 />
        <Section6 />
        <Section7 />
        <Footer />
        <ContactButtons />
      </Box>
    </>
  );
};

export default HomePage;
