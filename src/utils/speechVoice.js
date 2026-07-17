const FEMALE_HINTS = [
  'female',
  'zira',
  'samantha',
  'hazel',
  'susan',
  'aria',
  'jenny',
  'sonia',
  'natasha',
  'emma',
  'linda',
  'heera',
  'priya',
  'neerja',
];

const MALE_PREFERENCES = [
  'Microsoft David Desktop',
  'Microsoft David',
  'Microsoft Mark',
  'Microsoft Guy',
  'Google UK English Male',
  'Google US English',
  'Daniel',
  'Alex',
  'Fred',
  'Tom',
  'David',
  'Mark',
  'Guy',
  'James',
  'Christopher',
  'Ryan',
  'Matthew',
];

export const SPEECH_SETTINGS = {
  rate: 0.86,
  pitch: 0.9,
  volume: 1,
  linePauseMs: 420,
};

function isFemaleVoice(voice) {
  const name = voice.name.toLowerCase();
  return FEMALE_HINTS.some((hint) => name.includes(hint));
}

function scoreVoice(voice) {
  const name = voice.name;
  let score = 0;

  if (voice.lang.startsWith('en')) score += 10;
  if (voice.lang === 'en-US' || voice.lang === 'en-GB') score += 6;
  if (voice.localService) score += 4;
  if (isFemaleVoice(voice)) score -= 100;

  const prefIndex = MALE_PREFERENCES.findIndex((pref) => name.includes(pref));
  if (prefIndex >= 0) score += 40 - prefIndex;

  if (name.toLowerCase().includes('male')) score += 8;
  if (name.toLowerCase().includes('natural')) score += 3;

  return score;
}

export function getPreferredMaleVoice() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;

  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  return [...voices].sort((a, b) => scoreVoice(b) - scoreVoice(a))[0] ?? null;
}

export function loadVoices() {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      resolve(null);
      return;
    }

    const pick = () => resolve(getPreferredMaleVoice());
    const voices = window.speechSynthesis.getVoices();
    if (voices.length) {
      pick();
      return;
    }

    window.speechSynthesis.onvoiceschanged = () => {
      pick();
      window.speechSynthesis.onvoiceschanged = null;
    };

    window.setTimeout(pick, 250);
  });
}

export function speakLineSequence({
  lines,
  voice,
  onLineStart,
  onLineEnd,
  onComplete,
  onError,
  settings = SPEECH_SETTINGS,
}) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return () => {};

  let index = 0;
  let cancelled = false;
  let pauseTimer = null;

  const cancel = () => {
    cancelled = true;
    if (pauseTimer) window.clearTimeout(pauseTimer);
    window.speechSynthesis.cancel();
  };

  const speakNext = () => {
    if (cancelled) return;

    if (index >= lines.length) {
      onComplete?.();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(lines[index]);
    utterance.rate = settings.rate;
    utterance.pitch = settings.pitch;
    utterance.volume = settings.volume;
    if (voice) utterance.voice = voice;

    utterance.onstart = () => onLineStart?.(index);
    utterance.onend = () => {
      onLineEnd?.(index);
      index += 1;
      pauseTimer = window.setTimeout(speakNext, settings.linePauseMs);
    };
    utterance.onerror = () => {
      onError?.();
      index += 1;
      pauseTimer = window.setTimeout(speakNext, settings.linePauseMs);
    };

    window.speechSynthesis.speak(utterance);
  };

  window.speechSynthesis.cancel();
  speakNext();

  return cancel;
}
