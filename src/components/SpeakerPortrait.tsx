import { useState } from 'react';
import type { Speaker } from '../data/catalog';

interface SpeakerPortraitProps {
  speaker: Speaker;
  className?: string;
  vignette?: boolean;
}

export function SpeakerPortrait({
  speaker,
  className = '',
  vignette = true,
}: SpeakerPortraitProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = Boolean(speaker.portraitUrl) && !imgFailed;

  if (showImage && speaker.portraitUrl) {
    if (speaker.isLogo) {
      return (
        <div
          className={`relative isolate flex items-center justify-center overflow-hidden bg-[#060606] ${className}`}
          style={{
            background:
              'radial-gradient(ellipse 75% 65% at 50% 48%, rgba(255,212,0,0.12), #060606 72%)',
          }}
        >
          <div className="relative flex aspect-square w-[74%] max-w-[250px] items-center justify-center overflow-hidden rounded-full border border-[#FFD400]/30 bg-black p-4 shadow-[0_0_50px_rgba(255,212,0,0.09)]">
            <img
              src={speaker.portraitUrl}
              alt={`لوگوی ${speaker.nameFa}`}
              referrerPolicy="no-referrer"
              onError={() => setImgFailed(true)}
              style={{
                WebkitMaskImage:
                  'radial-gradient(ellipse 68% 68% at 50% 52%, #000 58%, transparent 92%)',
                maskImage:
                  'radial-gradient(ellipse 68% 68% at 50% 52%, #000 58%, transparent 92%)',
              }}
              className="h-auto w-[96%] object-contain brightness-110 contrast-[2.2] mix-blend-lighten"
            />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-70"
          />
        </div>
      );
    }

    return (
      <div className={`relative isolate overflow-hidden bg-[#0c0c0b] ${className}`}>
        <img
          src={speaker.portraitUrl}
          alt={`پرتره ${speaker.nameFa}`}
          referrerPolicy="no-referrer"
          onError={() => setImgFailed(true)}
          className={`h-full w-full ${
            speaker.portraitCropClass ?? 'object-cover object-[center_18%] grayscale contrast-115'
          } ${vignette ? 'portrait-vignette' : ''}`}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80"
        />
      </div>
    );
  }

  /* Bespoke high-contrast monochrome + gold graphic fallback */
  return (
    <div
      role="img"
      aria-label={`تصویر گرافیکی ${speaker.nameFa}`}
      className={`relative isolate flex items-end justify-center overflow-hidden bg-[#0c0c0b] ${className}`}
      style={{
        background:
          'radial-gradient(ellipse 75% 58% at 50% 34%, rgba(255,212,0,0.16), rgba(255,255,255,0.08) 45%, #080808 88%)',
      }}
    >
      <div className="halftone-overlay pointer-events-none absolute inset-0 opacity-35" />
      <svg
        viewBox="0 0 360 480"
        className="relative z-0 h-[92%] w-auto max-w-full"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id={`sp-grad-${speaker.id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f4f3ee" />
            <stop offset="48%" stopColor="#8f8e88" />
            <stop offset="100%" stopColor="#141412" />
          </linearGradient>
          <linearGradient id={`sp-rim-${speaker.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFD400" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FFD400" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Dramatic golden diagonal slash echoing classic martial-arts cinema posters */}
        <path d="M278 46L302 46L228 434L204 434Z" fill={`url(#sp-rim-${speaker.id})`} opacity="0.28" />
        {/* Sculptural martial silhouette */}
        <path
          d="M52 480V404C52 350 96 312 152 296L164 244H202L216 296C272 312 316 350 316 404V480Z"
          fill={`url(#sp-grad-${speaker.id})`}
        />
        <ellipse cx="183" cy="166" rx="54" ry="70" fill={`url(#sp-grad-${speaker.id})`} />
        {/* Hair & sharp brow silhouette */}
        <path
          d="M128 154C126 108 152 84 188 86C222 88 242 110 238 156C226 132 208 118 182 118C156 118 139 130 128 154Z"
          fill="#0a0a09"
        />
        {/* Rim highlight along jaw and shoulder */}
        <path
          d="M232 130C240 162 234 206 206 232"
          fill="none"
          stroke="#FFD400"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M222 302C264 316 298 344 308 386"
          fill="none"
          stroke="#ecebe6"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.35"
        />
      </svg>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-transparent"
      />
    </div>
  );
}
