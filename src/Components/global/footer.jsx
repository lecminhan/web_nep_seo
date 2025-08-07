import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Link as MuiLink,
  IconButton,
} from "@mui/material";
import {
  FaYoutube,
  FaPinterestP,
  FaTumblr,
  FaMediumM,
  FaLinkedinIn,
  FaFacebookF,
} from "react-icons/fa";
const Footer = () => {
  useEffect(() => {
    if (!window.FB) {
      const script = document.createElement("script");
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      script.src =
        "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v19.0";
      document.body.appendChild(script);
    } else {
      window.FB.XFBML.parse();
    }
  }, []);
  const slugify = (text) =>
    text
      .toLowerCase()
      .normalize("NFD") // Tách dấu tiếng Việt
      .replace(/[\u0300-\u036f]/g, "") // Xóa dấu
      .replace(/\s+/g, "-") // Thay khoảng trắng bằng dấu gạch ngang
      .replace(/[^a-z0-9-]/g, "") // Xóa ký tự đặc biệt
      .replace(/-+/g, "-") // Gộp nhiều dấu - liên tiếp
      .replace(/^-+|-+$/g, ""); // Xóa dấu - ở đầu và cuối

  const categories = [
    "Nẹp Inox 304",
    "Nẹp Nhôm Cao Cấp",
    "Nẹp Đồng Thau",
    "Nẹp Nhựa PVC",
    "Nẹp Xây Dựng",
    "Nẹp Đèn LED",
  ];

  return (
    <Box component="footer" sx={{ bgcolor: "#f9f9f9", py: 5 }}>
      <Box sx={{ maxWidth: "1200px", mx: "auto", px: 2 }}>
        <Grid container spacing={4}>
          {/* Cột 1: Logo + giới thiệu + mạng xã hội */}
          <Grid item xs={12} md={3}>
            <Box mb={2}>
              <img
                src="/images/logo.png"
                alt="Logo Nẹp Luxinox"
                width={120}
                height={60}
                loading="lazy"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Box>
            <Typography
              fontWeight={700}
              sx={{
                mb: 1,
                textTransform: "uppercase",
                fontSize: 14,
                borderBottom: "2px solid #ccc",
                display: "inline-block",
                pb: 0.5,
              }}
            >
              Tổng Kho Nẹp Inox 304 Đà Nẵng
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#666", fontSize: 13, lineHeight: 1.5, mt: 1 }}
            >
              Tổng kho Nẹp Nhôm <br /> – Nẹp Inox Trang Trí Nội Thất Đà Nẵng.
              <br /> Chuyên cung cấp nẹp nhôm anode,
              <br /> nẹp inox 304, nẹp đồng thau, nẹp nội thất, <br />
              nẹp trang trí,nẹp chống trơn, nẹp xây dựng <br /> số lượng lớn
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "red", fontWeight: 600, mt: 1, fontSize: 13 }}
            >
              Lecongmanhtruong273@gmail.com
            </Typography>

            <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
              <IconButton
                component="a"
                href="https://youtube.com/@nepdanang"
                target="_blank"
                rel="noopener"
                title="YouTube"
                sx={{ color: "#333", fontSize: 20 }}
              >
                <FaYoutube />
              </IconButton>
              <IconButton
                component="a"
                href="https://pinterest.com/nepinoxdanang"
                target="_blank"
                rel="noopener"
                title="Pinterest"
                sx={{ color: "#333", fontSize: 20 }}
              >
                <FaPinterestP />
              </IconButton>
              <IconButton
                component="a"
                href="https://tumblr.com/nepinoxdanang"
                target="_blank"
                rel="noopener"
                title="Tumblr"
                sx={{ color: "#333", fontSize: 20 }}
              >
                <FaTumblr />
              </IconButton>
              <IconButton
                component="a"
                href="https://medium.com/@nepdanang"
                target="_blank"
                rel="noopener"
                title="Medium"
                sx={{ color: "#333", fontSize: 20 }}
              >
                <FaMediumM />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.linkedin.com/in/nep-nhom-nep-inox-da-nang/"
                target="_blank"
                rel="noopener"
                title="LinkedIn"
                sx={{ color: "#333", fontSize: 20 }}
              >
                <FaLinkedinIn />
              </IconButton>
              <IconButton
                component="a"
                href="https://facebook.com/nepinoxtaidanang"
                target="_blank"
                rel="noopener"
                title="Facebook"
                sx={{ color: "#333", fontSize: 20 }}
              >
                <FaFacebookF />
              </IconButton>
            </Box>
          </Grid>

          {/* Cột 2: Liên hệ */}
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              pl: { md: 5 },
              borderLeft: { md: "1px solid #ddd" },
            }}
          >
            <Typography
              fontWeight={700}
              fontSize="1.2rem"
              gutterBottom
              sx={{
                borderBottom: "2px solid #ccc",
                display: "inline-block",
                pb: 0.5,
              }}
            >
              LIÊN HỆ
            </Typography>
            <Typography variant="body2" sx={{ fontSize: 15, mb: 0.5 }}>
              Địa chỉ: 209 Cao Hồng Lãnh
              <br />
              Ngũ Hành Sơn, Đà Nẵng
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, fontSize: 15 }}>
              Hotline:{" "}
              <Box component="span" sx={{ color: "red" }}>
                0935.128.542
              </Box>
            </Typography>
            <Typography variant="body2" sx={{ fontSize: 15 }}>
              Email: Lecongmanhtruong273
              <br />
              @gmail.com
            </Typography>
          </Grid>

          {/* Cột 3: Sản phẩm */}
          <Grid item xs={12} md={3} sx={{ pl: { md: 5 } }}>
            <Typography
              fontWeight={700}
              fontSize="1.2rem"
              gutterBottom
              sx={{
                borderBottom: "2px solid #ccc",
                display: "inline-block",
                pb: 0.5,
              }}
            >
              SẢN PHẨM
            </Typography>
            {categories.map((text, index) => (
              <Typography
                variant="body2"
                key={index}
                sx={{ fontSize: 15, mb: 1.5 }}
              >
                <MuiLink
                  href={`/san-pham/${slugify(text)}`}
                  underline="hover"
                  color="inherit"
                >
                  {text}
                </MuiLink>
              </Typography>
            ))}
          </Grid>

          {/* Cột 4: Facebook fanpage */}
          <Grid item xs={12} md={3}>
   <iframe
  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fnepinoxtaidanang&tabs=timeline&width=320&height=280&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
  width="320"
  height="280"
  style={{ border: "none", overflow: "hidden" }}
  scrolling="no"
  frameBorder="0"
  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
/>

          </Grid>
        </Grid>
      </Box>

      {/* Copyright */}
      <Box
        sx={{
          textAlign: "center",
          mt: 3,
          pt: 2,
          borderTop: "1px solid #e0e0e0",
          px: 2,
        }}
      >
        <Typography variant="body2" sx={{ color: "#888", fontSize: 13 }}>
          &copy; 2025 nepdanang.vn. All rights reserved. Designed by
          nepdanang.vn
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
