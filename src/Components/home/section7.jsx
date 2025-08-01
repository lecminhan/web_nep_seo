import React, { useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Rating,
  useTheme,
  useMediaQuery,
  Paper,
} from "@mui/material";

const feedbacks = [
  {
    name: "Anh Khanh - KS Đông Nam",
    rating: 5,
    comment:
      "Sản phẩm của các bạn rất tuyệt vời, khách hàng đến Khách sạn đều khen ngợi.",
  },
  {
    name: "Anh Hoàng - ĐL Thái Bình",
    rating: 5,
    comment:
      "Nguyễn Phát hỗ trợ về mẫu mã, tư vấn tốt, khách hàng yên tâm sử dụng.",
  },
  {
    name: "Chú Hải - KĐT Gamuda",
    rating: 5,
    comment:
      "Sản phẩm chất lượng cao, màu sắc đẹp. Tôi rất hài lòng và sẽ giới thiệu thêm.",
  },
  {
    name: "Anh Tuấn - Showroom Hà Nội",
    rating: 5,
    comment:
      "Giá cả hợp lý, mẫu mã đa dạng, rất đáng để đầu tư cho các dự án cao cấp.",
  },
];

const Section7 = () => {
  const theme = useTheme();
  const scrollRef = useRef(null);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = 320;
    const interval = setInterval(() => {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box component="section" sx={{ py: 5, bgcolor: "#fff", px: 0, mx: 0 }}>
      <Typography
        component="h2"
        variant="h6"
        fontWeight={700}
        sx={{
          textTransform: "uppercase",
          borderBottom: "2px solid #d32f2f",
          display: "inline-block",
          mb: 3,
          fontSize: { xs: 16, sm: 18,md:33.6 },
          ml: { xs: 2, md: 4 },
        }}
      >
        Đánh giá của khách hàng
      </Typography>

      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          gap: 2.5,
          px: { xs: 2, sm: 4 },
          pb: 1,
          pr: 1,
          "&::-webkit-scrollbar": { display: "none" },
          scrollBehavior: "smooth",
        }}
      >
        {feedbacks.map((fb, idx) => (
          <Paper
            key={idx}
            elevation={2}
            sx={{
              flex: "0 0 auto",
              width: { xs: 260, sm: 280, md: 360 },
              maxWidth: 360,
              minHeight: 160,
              borderRadius: 2,
              p: 2.5,
              bgcolor: "#fff",
              scrollSnapAlign: "start",
              boxShadow: "none",
            }}
          >
            <Box display="flex" alignItems="flex-start" gap={1} mb={1}>
              <Avatar sx={{ bgcolor: "#ccc", width: 50, height: 50 }}>
                {fb.name.charAt(0)}
              </Avatar>
              <Box>
                <Typography fontWeight={700} fontSize={14}>
                  {fb.name}
                </Typography>
                <Rating value={fb.rating} size="small" readOnly />
                <Typography
                  fontSize={13}
                  color="text.secondary"
                  sx={{ mt: 0.5, lineHeight: 1.5 }}
                >
                  “{fb.comment}”
                </Typography>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default Section7;
