import { useState } from 'react';
import { BookOpen, Headphones, Play } from 'lucide-react';
import type { Product, Speaker } from '../data/catalog';

interface ProductArtworkProps {
  product: Product;
  speaker?: Speaker;
  className?: string;
}

export function ProductArtwork({ product, speaker, className = '' }: ProductArtworkProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const bgStyle =
    product.accentStyle === 'amber'
      ? 'radial-gradient(ellipse 80% 55% at 50% 18%, rgba(255,212,0,0.22), rgba(245,158,11,0.08) 45%, #0d0d0c 88%)'
      : product.accentStyle === 'steel'
        ? 'radial-gradient(ellipse 80% 55% at 50% 18%, rgba(236,235,230,0.16), rgba(141,140,134,0.06) 48%, #0c0c0b 88%)'
        : 'radial-gradient(ellipse 80% 55% at 50% 18%, rgba(236,235,230,0.12), transparent 60%), linear-gradient(165deg, #1b1b19 0%, #0b0b0a 100%)';

  const hasPhoto = Boolean(speaker?.portraitUrl) && !imgFailed;

  return (
    <div
      className={`relative aspect-[4/3] w-full overflow-hidden bg-[#10100f] sm:aspect-[3/4] ${className}`}
      style={{ background: bgStyle }}
    >
      {/* Subtle monochrome portrait or logo wash behind editorial cover frame */}
      {hasPhoto && speaker?.portraitUrl && (
        speaker.isLogo ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center p-10 opacity-30 transition-transform duration-500 group-hover:scale-105"
          >
            <img
              src={speaker.portraitUrl}
              alt=""
              referrerPolicy="no-referrer"
              onError={() => setImgFailed(true)}
              style={{
                WebkitMaskImage:
                  'radial-gradient(ellipse 68% 68% at 50% 52%, #000 58%, transparent 92%)',
                maskImage:
                  'radial-gradient(ellipse 68% 68% at 50% 52%, #000 58%, transparent 92%)',
              }}
              className="max-h-40 w-auto object-contain brightness-110 contrast-[2.2] mix-blend-lighten"
            />
          </div>
        ) : (
          <img
            src={speaker.portraitUrl}
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
            className={`pointer-events-none absolute inset-0 h-full w-full opacity-40 transition-transform duration-500 group-hover:scale-110 ${
              speaker.portraitCropClass ?? 'object-cover object-[center_20%] grayscale contrast-125'
            }`}
          />
        )
      )}

      {/* Halftone & contrast scrim */}
      <div aria-hidden="true" className="halftone-overlay pointer-events-none absolute inset-0 opacity-25" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/45 to-transparent"
      />

      {/* Top accent hairline */}
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-[2px] ${
          product.accentStyle === 'amber' ? 'bg-[#FFD400]' : 'bg-[rgba(236,235,230,0.3)]'
        }`}
      />

      {/* Editorial object motif per format */}
      <div className="relative z-10 flex h-full flex-col justify-between p-5 text-right">
        <div className="flex items-center justify-between text-[11px] font-medium text-[#ecebe6]/75">
          <span className="font-en tracking-[0.22em] text-[#ecebe6]/70">
            {speaker?.nameEn ?? 'LEVEL UP'}
          </span>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(236,235,230,0.25)] bg-[#080808]/55 text-[#FFD400]">
            {product.format === 'book' && <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />}
            {product.format === 'course' && <Play className="h-3.5 w-3.5" aria-hidden="true" />}
            {product.format === 'audio' && <Headphones className="h-3.5 w-3.5" aria-hidden="true" />}
          </span>
        </div>

        {/* Center subtle vinyl ring for audiobooks or book spine frame for books */}
        {product.format === 'audio' && (
          <div aria-hidden="true" className="mx-auto my-auto flex h-24 w-24 items-center justify-center rounded-full border border-[rgba(236,235,230,0.2)] bg-[#080808]/70">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#FFD400]/45">
              <div className="h-3 w-3 rounded-full bg-[#FFD400]" />
            </div>
          </div>
        )}

        <div className="mt-auto">
          <p className="font-en text-xs tracking-[0.22em] text-[#FFD400]/90">
            {product.titleEn}
          </p>
          <p className="font-disp mt-1 text-2xl leading-[1.18] text-[#ecebe6] [text-wrap:balance]">
            {product.titleFa}
          </p>
        </div>
      </div>
    </div>
  );
}
