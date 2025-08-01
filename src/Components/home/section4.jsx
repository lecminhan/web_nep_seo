import React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent
} from "@mui/material";
import { Link } from "react-router-dom";

const productCategories = [
  {
    title: "Nẹp Inox 304",
    image: "/images/anh-intro/nep-inox-304-v-5-bac-xuoc.jpg",
    to: "/san-pham/nep-inox-304"
  },
  {
    title: "Nẹp Nhôm Cao cấp",
    image: "/images/anh-intro/nep-v-nhom-v-10-bac-guong.jpg",
    to: "/san-pham/nep-nhom-cao-cap"
  },
  {
    title: "Nẹp Đồng Thau",
    image: "/images/anh-intro/nep-la-dong-dong-thau.jpg",
    to: "/san-pham/nep-dong-thau"
  },
  {
    title: "Nẹp Nhựa PVC",
    image: "/images/anh-intro/chi-ngat-nuoc-pvc.jpg",
    to: "/san-pham/nep-nhua-pvc"
  },
  {
    title: "Nẹp Xây Dựng",
    image: "/images/anh-intro/nep-xay-dung.jpg",
    to: "/san-pham/nep-xay-dung"
  },
  {
    title: "Nẹp Đèn LED",
    image: "/images/anh-intro/nep-led-chong-tron-inox-cao-cap.jpg",
    to: "/san-pham/nep-den-led"
  }
];

const Section4 = () => {
  return (
    <Box
      component="section"
      aria-label="Danh mục sản phẩm"
      sx={{
        width: "100%",
        bgcolor: "#fefefe",
        py: { xs: 5, md: 8 },
        px: 2
      }}
    >
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 2, md: 3 }
        }}
      >
        <Typography
          component="h2"
          variant="h3"
          fontWeight={600}
          textAlign="center"
          sx={{
            borderBottom: "3px solid #d32f2f",
            display: "inline-block",
            pb: 1,
            mb: { xs: 5, md: 6 },
            fontSize: { xs: "1.6rem", md: "2.1rem" },
            color: "#222",
          }}
        >
          DANH MỤC SẢN PHẨM
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(6, 1fr)"
            },
            gap: { xs: 2.5, md: 3 }
          }}
        >
          {productCategories.map((cat, index) => (
            <Link
              key={index}
              to={cat.to}
              title={`Xem danh mục ${cat.title}`}
              style={{ textDecoration: "none" }}
            >
              <Card
                elevation={2}
                sx={{
                  width: "100%",
                  aspectRatio: "1",
                  borderRadius: 2,
                  border: "1px solid #e5e5e5",
                  overflow: "hidden",
                  position: "relative",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.1)"
                  }
                }}
              >
                <CardMedia
                  component="img"
                  src={cat.image}
                  alt={`Danh mục ${cat.title}`}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
                <CardContent
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    textAlign: "left",
                    bgcolor: "rgba(0,0,0,0.5)",
                    color: "#fff",
                    width: "100%",
                    py: 1,
                    px: 1.5
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    fontSize={15}
                  >
                    {cat.title}
                  </Typography>
                  <Typography variant="caption">
                  <div className="custom-product-rating" aria-hidden="true">★★★★★</div>
                    <div> Xem tất cả</div>
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Section4;
