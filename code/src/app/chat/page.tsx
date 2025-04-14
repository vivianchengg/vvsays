/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useRef, useState } from 'react';
import { Typography, Box, Avatar, Button, keyframes } from '@mui/material';
import { BackButton } from '@/components/BackButton';
import { TypingMessage } from '@/components/TypingMessage';

// avatar animation
const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

export default function Vvchat() {
  const [subtitle, setSubtitle] = useState('🎤 Ask me anything about Vivian!');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isResetSubtitle, setIsResetSubtitle] = useState(false);
  const [isAvatarAnimate, setIsAvatarAnimate] = useState(false);

  const [time, setTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (!subtitle || !isSpeaking) {
      return;
    }

    // settings
    const utterance = new SpeechSynthesisUtterance(subtitle);
    utterance.lang = 'en-US';
    utterance.rate = .8;
    utterance.pitch = 1.2;
    utterance.volume = 1;

    utterance.onstart = () => {
      setIsAvatarAnimate(true);
    };

    utterance.onend = () => {
      setIsAvatarAnimate(false);
    };

    // stop any existing msg and play this msg
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(false);
  }, [subtitle, isSpeaking]);

  const updateSubtitle = (text: string, speak: boolean = false, reset: boolean = false) => {
    setSubtitle(text);
    setIsSpeaking(speak);
    setIsResetSubtitle(reset);
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTime(0);
  };

  const handleChat = () => {
    if (isListening) {
      (window as any).recognitionInstance?.stop();
      setIsListening(false);
      updateSubtitle("⏹️ Stopped. Processing...");
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    // start timer
    recognition.onstart = () => {
      setIsListening(true);
      updateSubtitle("🎙️ Listening...");
      startTimer();
    };

    // when recording stop
    recognition.onresult = async (event: any) => {
      const userText = event.results[0][0].transcript;

      // send text to backend
      try {
        console.log(`sending to backend: ${userText}`)
        updateSubtitle("Processing...");
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userMessage: userText }),
        });

        const data = await res.json();
        updateSubtitle(data.reply || "✅ Message sent!", true);
      } catch (err) {
        console.error(err);
        updateSubtitle("❌ Failed to send.", false, true);
      }
    };

    recognition.onerror = (e: any) => {
      console.error('Speech error:', e);
      updateSubtitle("❌ Error recognizing speech", false, true);
      setIsListening(false);
      stopTimer();
    };

    recognition.onend = () => {
      setIsListening(false);
      stopTimer();

      if (isResetSubtitle) {
        updateSubtitle("🎙️ Start Talking");
      }
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };


  return (
    <>
      <Box mt={1.5}>
        <BackButton/>
      </Box>
      <Box display={'flex'} height={'100vh'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
        <Box>
          <Typography>🧸 Vivian&apos;s AI assistant</Typography>
        </Box>
        <Box my={3}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              mx: 'auto',
              bgcolor: '#2F2E2D',
              fontSize: 40,
              animation: isAvatarAnimate ? `${pulse} 0.8s infinite` : 'none',
            }}
          >
            🐰
          </Avatar>
          <Box mt={2} mb={2} textAlign={'center'} width={'50vw'}>
            <TypingMessage message={subtitle}/>
          </Box>
          <Box textAlign={'center'}>
            <Button
              onClick={handleChat}
              variant='contained'
              color={isListening ? 'error' : 'primary'}
              sx={{ fontWeight: 'bold' }}
            >
              {isListening ? "🛑 Stop Listening" : "🎙️ Start Talking"}
            </Button>
            <Typography variant="body1" color="textSecondary" mt={1}>
              {formatTime(time)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}