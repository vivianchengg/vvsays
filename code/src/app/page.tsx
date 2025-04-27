'use client';
import { NavBar } from "@/components/NavBar";
import { Box, useMediaQuery } from "@mui/material";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { useRef } from "react";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery('(max-width:700px)');
  const scrollMT = isMobile ? '84px' : '64px'

  const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      height={'100vh'}
    >
      <NavBar onHeroClick={() => scrollToRef(heroRef)} onAboutClick={() => scrollToRef(aboutRef)} onContactClick={() => scrollToRef(contactRef)}/>
      <div ref={heroRef} style={{ scrollMarginTop: scrollMT}}>
        <HeroSection onArrowClick={() => scrollToRef(aboutRef)}/>
      </div>
      <div ref={aboutRef} style={{ scrollMarginTop: scrollMT }}>
        <AboutSection />
      </div>
      <div ref={contactRef} style={{ scrollMarginTop: scrollMT }}>
        <ContactSection />
      </div>
    </Box>
  );
}
