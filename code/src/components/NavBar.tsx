import { AppBar, Box, Button, Toolbar, Typography, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";

interface Props {
  onHeroClick: () => void;
  onAboutClick: () => void;
  onContactClick: () => void;
};

export const NavBar = ({ onHeroClick, onAboutClick, onContactClick }: Props) => {
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width:700px)');

  return (
    <Box
      sx={{
        flexGrow: 1,
        zIndex: 999,
      }}
      position="sticky"
    >
      <AppBar
        sx={{
          backgroundColor: '#FCF8ED',
          color: '#fa8799',
          boxShadow: 'none'
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            flexDirection: isMobile ? 'column' : 'row'

          }}
        >
          {!isMobile &&
          <Box
            sx={{
              flex: 2,
              display: 'flex',
              gap: 2,
              flexWrap: 'nowrap',
            }}
          >
            <Button onClick={onAboutClick}><Typography fontWeight={'bold'} color="#4F3B30">ABOUT</Typography></Button>
            <Button onClick={() => router.push('/chat')}><Typography fontWeight={'bold'} color="#4F3B30">CHAT</Typography></Button>
            <Button onClick={onContactClick}><Typography fontWeight={'bold'} color="#4F3B30">CONTACT</Typography></Button>
          </Box>}
          <Box flex={'1'}>
            <Typography
              textAlign={'center'}
              sx={{
                fontFamily: '"Playfair Display", serif',
                letterSpacing: 1,
                fontSize: '2rem',
                cursor: 'pointer',
                fontWeight: '900',
                fontStyle: 'italic',
              }}
              onClick={onHeroClick}
            >
              vivian
            </Typography>
          </Box>
          {isMobile &&
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              textAlign: 'center'
            }}
          >
            <Button onClick={onAboutClick}><Typography fontWeight={'bold'} color="#4F3B30">ABOUT</Typography></Button>
            <Button onClick={() => router.push('/chat')}><Typography fontWeight={'bold'} color="#4F3B30">CHAT</Typography></Button>
            <Button onClick={onContactClick}><Typography fontWeight={'bold'} color="#4F3B30">CONTACT</Typography></Button>
          </Box>}
          {!isMobile && <Box flex={'2'}/>}
        </Toolbar>
      </AppBar>
    </Box>
  );
};