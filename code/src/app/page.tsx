'use client';
import { NavBar } from "@/components/NavBar";
import { Box } from "@mui/material";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { useRef } from "react";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      height={'100vh'}
      minWidth={'700px'}
    >
      <NavBar onHeroClick={() => scrollToRef(heroRef)} onAboutClick={() => scrollToRef(aboutRef)} onContactClick={() => scrollToRef(contactRef)}/>
      <div ref={heroRef} style={{ scrollMarginTop: '64px' }}>
        <HeroSection onArrowClick={() => scrollToRef(aboutRef)}/>
      </div>
      <div ref={aboutRef} style={{ scrollMarginTop: '64px' }}>
        <AboutSection />
      </div>
      <div ref={contactRef} style={{ scrollMarginTop: '64px' }}>
        <ContactSection />
      </div>
    </Box>
  );
}
