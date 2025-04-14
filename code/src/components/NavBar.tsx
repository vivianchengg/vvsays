import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

interface Props {
  onHeroClick: () => void;
  onAboutClick: () => void;
  onContactClick: () => void;
};

export const NavBar = ({ onHeroClick, onAboutClick, onContactClick }: Props) => {
  const router = useRouter();

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
        <Toolbar sx={{ justifyContent: "space-between" }}>
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
          </Box>
          <Box flex={'1'}>
            <Typography
              textAlign={'center'}
              sx={{
                fontFamily: '"Playfair Display", serif',
                letterSpacing: 1,
                fontSize: '2rem',
                cursor: 'pointer'
              }}
              onClick={onHeroClick}
            >
              vivian
            </Typography>
          </Box>
          <Box flex={'2'}/>
        </Toolbar>
      </AppBar>
    </Box>
  );
};