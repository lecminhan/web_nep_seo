import React from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";

const sliderImages = [
  {
    src: "./images/slide1.webp",
    alt: "Nẹp trang trí cao cấp",
    caption: "Chất lượng và thẩm mỹ",
  },
  {
    src: "./images/slide2.webp",
    alt: "Ứng dụng nội thất sang trọng",
    caption: "Giải pháp hoàn thiện không gian",
  },
  {
    src: "./images/slide3.webp",
    alt: "Thi công uy tín",
    caption: "Dự án lớn - giá tốt",
  },
];

const IntroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: false, // ❌ Tắt tự động trượt
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // ✅ Hiện mũi tên điều hướng
    pauseOnHover: true, // ✅ Tạm dừng khi hover (không bắt buộc nếu autoplay = false)
    swipeToSlide: true, // ✅ Cho phép kéo/trượt bằng chuột hoặc cảm ứng
  };

  return (
    <Box
      component="section"
      aria-label="Giới thiệu"
      sx={{
        width: "100%",
        bgcolor: "#fff",
        position: "relative",
        zIndex: 1,
        overflow: "hidden",
        pb: { xs: 2, md: 5 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          mx: "auto",
          "& .slick-arrow": {
            display: "none !important",
          },
          "&:hover .slick-arrow": {
            display: "block !important",
          },
        }}
      >
        <Slider {...settings}>
          {sliderImages.map((item, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                width: "100%",
                height: {
                  xs: "180px", // mobile
                  sm: "280px", // tablet
                  md: "400px", // small desktop / iPad Pro
                  lg: "460px", // large desktop
                },
              }}
            >
              <Box
                component="img"
                src={item.src}
                alt={item.alt}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain", // cover để ảnh lấp đầy khung mà không bị méo
                  display: "block",
                }}
              />

              {/* Caption */}
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default IntroSlider;
