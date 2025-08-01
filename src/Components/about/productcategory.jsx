import { Box, Typography, Grid } from "@mui/material";

const ProductCategory = ({ id, title, content, items, image }) => (
  <Box
    id={id}
    component="section"
    sx={{ py: 5, borderBottom: "1px solid #eee" }}
  >
    <Grid container spacing={4} alignItems="center">
      <Grid item xs={12} md={6}>
        <img
          src={image.src}
          alt={image.alt}
          style={{ width: "100%", borderRadius: 8 }}
          loading="lazy"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h5" fontWeight={700} component="h2" mb={2}>
          {title}
        </Typography>

        <Typography variant="body1" sx={{ color: "#555" }} paragraph>
          {content}
        </Typography>

        {/* Duyệt từng item và hiển thị như đoạn văn */}
        {items.map((item, idx) => (
          <Typography
            key={idx}
            variant="body2"
            sx={{
              mb: 1.2,
              color: "#333",
              display: "flex",
              alignItems: "flex-start",
              gap: 1,
              lineHeight: 1.7,
            }}
          >
            <Box component="span" sx={{ color: "#666" }}>
              •
            </Box>
            <Box component="span">{item}</Box>
          </Typography>
        ))}
      </Grid>
    </Grid>
  </Box>
);

export default ProductCategory;
