import { useCallback, useEffect, useRef, useState } from 'react';
import { loadVoices, speakLineSequence, SPEECH_SETTINGS } from '../utils/speechVoice';

export function useSpeakingIntro({ lines, autoStart = true }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [voiceName, setVoiceName] = useState('');
  const timerRef = useRef(null);
  const cancelSpeechRef = useRef(null);
  const voiceRef = useRef(null);

  const currentLine = lines[lineIndex] ?? '';
  const displayedText = voiceEnabled ? currentLine : currentLine.slice(0, charIndex);
  const totalChars = lines.reduce((sum, line) => sum + line.length, 0);
  const spokenChars =
    lines.slice(0, lineIndex).reduce((sum, line) => sum + line.length, 0) +
    (voiceEnabled ? currentLine.length : charIndex);
  const progress = totalChars ? spokenChars / totalChars : 0;

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const stopSpeech = useCallback(() => {
    cancelSpeechRef.current?.();
    cancelSpeechRef.current = null;
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  useEffect(() => {
    loadVoices().then((voice) => {
      voiceRef.current = voice;
      setVoiceName(voice?.name ?? 'System voice');
    });
  }, []);

  const runVoiceSequence = useCallback(() => {
    stopSpeech();
    setLineIndex(0);
    setIsSpeaking(true);
    setIsComplete(false);

    cancelSpeechRef.current = speakLineSequence({
      lines,
      voice: voiceRef.current,
      settings: SPEECH_SETTINGS,
      onLineStart: (index) => {
        setLineIndex(index);
        setIsSpeaking(true);
      },
      onComplete: () => {
        setIsComplete(true);
        setIsSpeaking(false);
        setLineIndex(lines.length - 1);
      },
      onError: () => setIsSpeaking(false),
    });
  }, [lines, stopSpeech]);

  const startIntro = useCallback(
    (withVoice = false) => {
      clearTimer();
      stopSpeech();
      setLineIndex(0);
      setCharIndex(0);
      setIsComplete(false);
      setIsPaused(false);
      setHasStarted(true);
      setVoiceEnabled(withVoice);
      setIsSpeaking(true);

      if (withVoice) {
        runVoiceSequence();
      }
    },
    [clearTimer, runVoiceSequence, stopSpeech],
  );

  const pauseIntro = useCallback(() => {
    clearTimer();
    stopSpeech();
    setIsPaused(true);
    setIsSpeaking(false);
  }, [clearTimer, stopSpeech]);

  const resumeIntro = useCallback(() => {
    if (isComplete) {
      startIntro(voiceEnabled);
      return;
    }
    setIsPaused(false);
    setIsSpeaking(true);
    if (voiceEnabled) runVoiceSequence();
  }, [isComplete, voiceEnabled, runVoiceSequence, startIntro]);

  useEffect(() => {
    if (!hasStarted || isPaused || isComplete || voiceEnabled) return undefined;

    timerRef.current = setInterval(() => {
      setCharIndex((prev) => {
        if (prev >= currentLine.length) {
          if (lineIndex >= lines.length - 1) {
            setIsComplete(true);
            setIsSpeaking(false);
            clearTimer();
            return prev;
          }
          setLineIndex((i) => i + 1);
          return 0;
        }
        return prev + 1;
      });
    }, 26);

    return clearTimer;
  }, [
    hasStarted,
    isPaused,
    isComplete,
    voiceEnabled,
    lineIndex,
    currentLine.length,
    lines.length,
    clearTimer,
  ]);

  useEffect(() => {
    if (!autoStart) return undefined;
    const id = window.setTimeout(() => {
      setHasStarted(true);
      setIsSpeaking(true);
    }, 600);
    return () => window.clearTimeout(id);
  }, [autoStart]);

  useEffect(
    () => () => {
      clearTimer();
      stopSpeech();
    },
    [clearTimer, stopSpeech],
  );

  return {
    displayedText,
    isSpeaking,
    isComplete,
    isPaused,
    progress,
    voiceName,
    startIntro,
    pauseIntro,
    resumeIntro,
  };
}
