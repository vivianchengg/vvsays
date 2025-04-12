import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

type Props = {
  message: string;
  speed?: number;
}

export const TypingMessage = ({ message, speed = 40 }: Props) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    setDisplayed('');

    const chars = [...message];
    const interval = setInterval(() => {
      if (i <= chars.length) {
        setDisplayed(chars.slice(0, i).join(''));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [message, speed]);

  return (
    <Typography
      // sx={{
      //   fontFamily: 'monospace',
      //   whiteSpace: 'pre-wrap',
      //   mt: 2,
      //   textAlign: 'left',
      //   fontSize: '1rem',
      //   lineHeight: 1.6,
      // }}
    >
      {displayed}
    </Typography>
  );
};