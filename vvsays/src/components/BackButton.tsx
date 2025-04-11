import { Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useRouter } from 'next/navigation';

export const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      disableRipple
      sx={{
        backgroundColor: 'transparent'
      }}
      onClick={() => router.push('/')}
    >
      <ArrowBackIosIcon/>
    </Button>
  );
};