import { Box, Typography } from "@mui/material";
import { useState } from "react";

interface Props {
  frontImg: string;
  backText: string;
  isFlipped: boolean;
  onClick: () => void;
}

export const AboutCard = ({ frontImg, backText, isFlipped, onClick }: Props) => {
  const getColor = (frontImg: String) => {
    console.log(frontImg)
    if (frontImg == '/assets/grumpy.png') {
      return '#D0E4EE'
    } else if (frontImg == '/assets/lovealot.png') {
      return '#FFD1D1'
    } else if (frontImg == '/assets/friend.png') {
      return '#FEF1AB'
    } else if (frontImg == '/assets/bedtime.png') {
      return '#CEEEF8'
    } else if (frontImg == '/assets/goodluck.png') {
      return '#DEFDE0'
    }
    return 'white'
  };

  return (
    <Box
      onClick={onClick}
      sx={{
        width: 250,
        height: 350,
        perspective: '1000px',
        cursor: 'pointer'
      }}
      display={'flex'}
      justifyContent={'center'}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.8s',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* front */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            borderRadius: '5%',
            backgroundColor: getColor(frontImg),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(0, 0, 0, 0.1)'
          }}
        >
          <img
            src={frontImg}
            alt="front img"
            style={{
              maxWidth: '80%',
              maxHeight: '80%',
              objectFit: 'contain',
            }}
          />
        </Box>

        {/* back */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            borderRadius: '10%',
            backgroundColor: getColor(frontImg),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'rotateY(180deg)'
          }}
        >
          <Box
            sx={{
              width: '80%',
            }}
          >
            <Typography fontFamily={'karla'}>{backText}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};