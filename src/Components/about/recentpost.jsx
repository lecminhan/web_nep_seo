import React from "react";
import { Box, Typography, Divider, List, ListItem } from "@mui/material";

const recentPosts = [
  {
    title: "Ưu đãi nẹp trang trí 2023 cho khách hàng thân thiết",
    date: "01/10/2023",
    image: "/images/nep-trang-tri-2023.jpg",
    slug: "uu-dai-nep-trang-tri-2023",
  },
  {
    title: "Nẹp nhôm, inox cho công trình xây dựng",
    date: "01/10/2023",
    image: "/images/nep-nhom-inox.jpg",
    slug: "nep-nhom-inox-cong-trinh",
  },
  {
    title: "Khuyến mãi nẹp 2023 - Giảm giá tới 50%",
    date: "30/09/2023",
    image: "/images/khuyen-mai-nep-2023.jpg",
    slug: "khuyen-mai-nep-2023",
  },
];

const RecentPosts = () => {
  return (
    <Box>
      <Typography
        variant="h6"
        fontWeight="bold"
        gutterBottom
        sx={{ color: "#d82a1b", fontSize: "1.1rem" }}
      >
        Bài viết mới
      </Typography>
      <Divider sx={{ mb: 1 }} />

      <List dense sx={{ p: 0 }}>
        {recentPosts.map((post, index) => (
          <React.Fragment key={post.slug}>
            <ListItem
              disableGutters
              sx={{
                alignItems: "flex-start",
                gap: 1.5,
                px: 0,
                py: 1.2,
              }}
            >
              <Box
                component="img"
                src={post.image}
                alt={post.title}
                loading="lazy"
                sx={{
                  width: 55,
                  height: 55,
                  objectFit: "cover",
                  borderRadius: 1,
                  flexShrink: 0,
                }}
              />
              <Box sx={{ flex: 1, overflow: "hidden" }}>
                <Typography
                  variant="body2"
                  component="a"
                  href={`/bai-viet/${post.slug}`}
                  sx={{
                    fontWeight: 500,
                    color: "text.primary",
                    textDecoration: "none",
                    fontSize: "0.85rem",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    lineHeight: 1.3,
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {post.title}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ mt: 0.25, color: "text.secondary", fontSize: "0.7rem" }}
                >
                  {post.date}
                </Typography>
              </Box>
            </ListItem>
            {index < recentPosts.length - 1 && (
              <Divider sx={{ my: 0.5, borderColor: "#eee" }} />
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default RecentPosts;
