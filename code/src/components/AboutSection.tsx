import { Box, Typography } from "@mui/material";
import { AboutCarousel } from "./AboutCarousel";

export const chocolateWave = `
  linear-gradient(
    270deg,
    #2E1B12,
    #4F3B30,
    #7A4E35,
    #4F3B30,
    #2E1B12
  )
`;

export const AboutSection = () => {

  return (
    <Box
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
        pl={'30px'}
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
          about me...
        </Typography>
      </Box>
      <AboutCarousel />
    </Box>
  );
};