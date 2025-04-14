import { Box, Typography } from "@mui/material";
import { chocolateWave } from "./AboutSection";

export const ContactSection = () => {
  return (
    <Box
      bgcolor={'#FFDCDB'}
      sx={{
        height: 'calc(100vh - 64px)'
      }}
    >
      <Box
        sx={{
          width: '100%',
          color: '#4F3B30',
        }}
        pt={'30px'}
        textAlign={'center'}
      >
        <Typography
          sx={{
            fontSize: '35px',
            fontWeight: 900,
            fontFamily: "'Playfair Display', serif",
            background: chocolateWave,
            backgroundSize: '400% 400%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'wave 6s ease-in-out infinite',
            display: 'inline-block',
          }}
        >
          Let's connect!
        </Typography>
      </Box>
      <Box
        sx={{
          height: 'calc(100vh - 64px - 82.5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h5">🚧 This section is under construction - stay tuned! 🚧</Typography>
      </Box>
    </Box>
  );
};