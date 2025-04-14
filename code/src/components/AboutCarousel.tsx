import { Box } from "@mui/material";
import { useRef, useState } from "react";
import { AboutCard } from "./AboutCard";

const cards = [
  {
    frontImg: '/assets/grumpy.png',
    backText: 'Grumpy on the outside, soft on the inside 💙',
  },
  {
    frontImg: '/assets/lovealot.png',
    backText: 'Spreading love one hug at a time 💖',
  },
  {
    frontImg: '/assets/friend.png',
    backText: 'Always here when you need a friend 🤗',
  },
  {
    frontImg: '/assets/bedtime.png',
    backText: 'Bringing sweet dreams and starlight 🌙✨',
  },
  {
    frontImg: '/assets/goodluck.png',
    backText: 'Lucky charm activated 🍀💫',
  },
];

export const AboutCarousel = () => {
  const [centreIndex, setCentreIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const angleStep = 360 / cards.length;
  const radius = 250;

  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const scrollLocked = useRef(false);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (scrollLocked.current) return;

    scrollLocked.current = true;
    setIsFlipped(false);

    // Scroll down
    if (e.deltaY > 0) {
      setRotation((prev) => prev - angleStep);
      setCentreIndex((prev) => (prev + 1) % cards.length);
    }
    // Scroll up
    else if (e.deltaY < 0) {
      setRotation((prev) => prev + angleStep);
      setCentreIndex((prev) =>
        prev === 0 ? cards.length - 1 : prev - 1
      );
    }

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    // Unlock scroll after delay
    scrollTimeout.current = setTimeout(() => {
      scrollLocked.current = false;
    }, 500);
  };

  const handleClick = (index: number) => {
    if (index === centreIndex) {
      // flip centre
      setIsFlipped((prev) => !prev);
      return;
    }

    // trans to side cards
    const total = cards.length;
    const forwardSteps = (index - centreIndex + total) % total;
    const backwardSteps = (centreIndex - index + total) % total;
    const stepDiff = forwardSteps <= backwardSteps ? forwardSteps : -backwardSteps;
    setRotation((prev) => prev - stepDiff * angleStep);
    setCentreIndex(index);
    setIsFlipped(false);
  };

  return (
    <Box
      sx={{
        perspective: '1200px',
        width: '100%',
        height: '80%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
      onWheel={(e) => handleWheel(e)}
    >
      <Box
        sx={{
          position: 'relative',
          width: 250,
          height: 350,
          transformStyle: 'preserve-3d',
          // transform: `rotateY(${-centreIndex * angleStep}deg)`,
          transform: `rotateY(${rotation}deg)`,
          transition: 'transform 1s ease',
        }}
      >
        {cards.map((card, index) => {
          const angle = index * angleStep;

          return (
            <Box
              key={index}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                transform: `
                  rotateY(${angle}deg)
                  translateZ(${radius}px)
                `,
                transition: 'transform 1s ease',
              }}
            >
              <AboutCard
                frontImg={card.frontImg}
                backText={card.backText}
                isFlipped={index === centreIndex && isFlipped}
                onClick={() => handleClick(index)}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};