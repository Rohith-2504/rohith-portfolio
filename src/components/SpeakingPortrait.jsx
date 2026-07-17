import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { profile, recruiterIntro } from '../data/portfolio';
import { useSpeakingIntro } from '../hooks/useSpeakingIntro';

function PortraitMotion({ isSpeaking }) {
  return (
    <div className="relative">
      <motion.img
        src={profile.heroPortrait}
        alt={profile.name}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: isSpeaking ? 2.8 : 5.5, repeat: Infinity, ease: 'easeInOut' }}
        className="aspect-[9/16] w-full object-cover object-top"
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        animate={{ opacity: [0, 0, 0.75, 0, 0, 0, 0.65, 0] }}
        transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute left-[27%] top-[33%] h-2 w-[13%] rounded-full bg-milano-red-dark/80" />
        <div className="absolute right-[27%] top-[33%] h-2 w-[13%] rounded-full bg-milano-red-dark/80" />
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[42%] top-[57%] z-10 h-2 w-[16%] rounded-full bg-black/25"
        animate={
          isSpeaking
            ? {
                scaleX: [1, 1.18, 0.82, 1.12, 1],
                scaleY: [1, 1.4, 0.72, 1.25, 1],
                opacity: [0.3, 0.8, 0.45, 0.85, 0.3],
              }
            : { opacity: 0.15, scaleX: 1, scaleY: 1 }
        }
        transition={{ duration: 0.4, repeat: isSpeaking ? Infinity : 0, ease: 'easeInOut' }}
      />
    </div>
  );
}

export default function SpeakingPortrait() {
  const intro = useSpeakingIntro({ lines: recruiterIntro, autoStart: true });
  const [voiceOn, setVoiceOn] = useState(false);

  const enableVoice = () => {
    setVoiceOn(true);
    intro.startIntro(true);
  };

  return (
    <div className="relative mx-auto w-full max-w-[390px]">
      <div className="absolute -inset-3 rounded-[2rem] bg-chiffon/10 blur-2xl" />

      <div className="relative overflow-hidden rounded-[1.75rem] border-2 border-chiffon/25 bg-milano-red shadow-glow">
        <PortraitMotion isSpeaking={intro.isSpeaking} />

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-milano-red-dark/95 via-milano-red/60 to-transparent px-4 pb-4 pt-24">
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <p className="font-sans text-base font-semibold text-chiffon">{profile.shortName}</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-chiffon/75">
                Live intro
              </p>
            </div>

            <div className="flex gap-2">
              {[
                {
                  label: voiceOn ? 'Replay with voice' : 'Enable voice',
                  icon: voiceOn ? Volume2 : VolumeX,
                  onClick: voiceOn ? () => intro.startIntro(true) : enableVoice,
                },
                {
                  label: 'Replay intro',
                  icon: Play,
                  onClick: () => intro.startIntro(voiceOn),
                },
                {
                  label: intro.isPaused ? 'Resume intro' : 'Pause intro',
                  icon: intro.isPaused ? Play : Pause,
                  onClick: intro.isPaused ? intro.resumeIntro : intro.pauseIntro,
                },
              ].map(({ label, icon: Icon, onClick }) => (
                <button
                  key={label}
                  type="button"
                  onClick={onClick}
                  aria-label={label}
                  className="rounded-xl border border-chiffon/25 bg-chiffon/10 p-2.5 text-chiffon backdrop-blur-md transition duration-300 hover:bg-chiffon/20"
                >
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[1.25rem] border border-chiffon/20 bg-milano-red-dark/55 p-4 backdrop-blur-md">
            <div className="mb-2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-chiffon">
                <Mic size={11} className={intro.isSpeaking ? 'animate-pulse' : ''} />
                {intro.isSpeaking ? 'Speaking' : intro.isPaused ? 'Paused' : 'Introducing'}
              </div>
              <span className="text-[10px] text-chiffon/50">Tap speaker for voice</span>
            </div>

            <p className="min-h-[58px] text-[13px] leading-7 text-chiffon/95">{intro.displayedText}</p>

            <div className="mt-3 flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-chiffon/15">
                <div
                  className="h-full rounded-full bg-chiffon transition-all duration-300 ease-out"
                  style={{ width: `${Math.max(5, intro.progress * 100)}%` }}
                />
              </div>
              {voiceOn && intro.voiceName && (
                <span className="max-w-[38%] truncate text-[10px] text-chiffon/45">{intro.voiceName}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
