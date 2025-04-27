import { Box, useMediaQuery } from "@mui/material";
import { useRef, useState } from "react";
import { AboutCard } from "./AboutCard";

const cards = [
  {
    frontImg: '/assets/grumpy.png',
    backText: '🧠 I’m a curious mind - I love figuring out how things work — whether it’s AI, a new API, or a weird frontend bug at 2am.',
  },
  {
    frontImg: '/assets/lovealot.png',
    backText: '👩🏻‍💻 My go-to stack: Python, Typescript, React + more, and always exploring for sure!',
  },
  {
    frontImg: '/assets/friend.png',
    backText: '🏎️ I’ve worked on real-world projects - From racecar dashboards with Redback Racing to AI investing models — I like mixing code with purpose.',
  },
  {
    frontImg: '/assets/bedtime.png',
    backText: '💬 I speak three languages - English, Cantonese, and Mandarin, and I love blending different perspectives wherever I go.',
  },
  {
    frontImg: '/assets/goodluck.png',
    backText: '🎀 Beyond coding, I care deeply about user experience and team flow. I often take initiative to coordinate projects — organizing sprints in Jira, facilitating Scrum standups, and keeping Agile workflows smooth. I love connecting ideas to execution.',
  },
];

export const AboutCarousel = () => {
  const [centreIndex, setCentreIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const isMobile = useMediaQuery('(max-width:700px)');

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
          width: isMobile ? 200 : 250,
          height: isMobile ? 300 : 350,
          transformStyle: 'preserve-3d',
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