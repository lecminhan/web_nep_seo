import { Box, IconButton, Typography } from "@mui/material";

const ContactButtons = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        right: { xs: 10, sm: 20 },
        bottom: { xs: 10, sm: 20 },
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        zIndex: 1000,
      }}
    >
      {[
        {
          label: "Liên hệ ngay",
          href: "https://www.facebook.com/messages/t/104626430946805",
          bgColor: "#1877f2",
          icon: "https://static.vecteezy.com/system/resources/previews/022/488/748/original/3d-render-meta-chat-messenger-facebook-messenger-icon-bubble-isolated-on-transparent-background-free-png.png",
          alt: "Messenger Icon",
        },
        {
          label: "Liên hệ ngay",
          href: "tel:+84968181807",
          bgColor: "#4caf50",
          icon: "https://cdn-icons-png.flaticon.com/512/724/724664.png",
          alt: "Phone Icon",
        },
        {
          label: "Liên hệ ngay",
          href: "https://zalo.me/0935128542",
          bgColor: "#0068ff",
          icon: "/images/iconbutton/zalo.png",
          alt: "Zalo Icon",
        },
      ].map((item, index) => (
        <Box
          key={index}
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            "&:hover .contact-label": {
              opacity: 1,
              transform: "translateX(0)",
            },
          }}
        >
          <Typography
            className="contact-label"
            sx={{
              position: "absolute",
              right: 50,
              bgcolor: item.bgColor,
              color: "#fff",
              px: 1.2,
              py: 0.5,
              borderRadius: 1,
              whiteSpace: "nowrap",
              opacity: 0,
              transform: "translateX(10px)",
              transition: "all 0.3s ease",
              fontSize: { xs: 12, sm: 14 },
            }}
          >
            {item.label}
          </Typography>

          <IconButton
            component="a"
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel="nofollow"
            aria-label={item.alt}
            sx={{ p: 0 }}
          >
            <Box
              component="img"
              src={item.icon}
              alt={item.alt}
              sx={{
                width: { xs: 28, sm: 40 },
                height: { xs: 28, sm: 40 },
                animation: "pulse 1.6s infinite",
                "@keyframes pulse": {
                  "0%": {
                    transform: "scale(1)",
                    opacity: 1,
                  },
                  "50%": {
                    transform: "scale(1.15)",
                    opacity: 0.75,
                  },
                  "100%": {
                    transform: "scale(1)",
                    opacity: 1,
                  },
                },
              }}
            />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
};

export default ContactButtons;
