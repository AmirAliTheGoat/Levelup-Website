import { useMemo, useState } from 'react';
import { Eye, Play } from 'lucide-react';
import type { ClipItem, Speaker } from '../data/catalog';
import { toPersianDigits } from '../utils/catalog';
import { SpeakerPortrait } from './SpeakerPortrait';

interface ClipsSectionProps {
  clips: ClipItem[];
  speakers: Speaker[];
  activeSpeaker: Speaker;
  onOpenClip: (clip: ClipItem) => void;
}

export function ClipsSection({
  clips,
  speakers,
  activeSpeaker,
  onOpenClip,
}: ClipsSectionProps) {
  const [onlyActiveSpeaker, setOnlyActiveSpeaker] = useState(false);

  const speakerMap = useMemo(
    () =>
      speakers.reduce<Record<string, Speaker>>((acc, sp) => {
        acc[sp.id] = sp;
        return acc;
      }, {}),
    [speakers]
  );

  const visibleClips = useMemo(() => {
    if (!onlyActiveSpeaker) return clips;
    const matched = clips.filter((clip) => clip.speakerId === activeSpeaker.id);
    return matched.length > 0 ? matched : clips;
  }, [clips, onlyActiveSpeaker, activeSpeaker.id]);

  return (
    <section
      id="clips"
      aria-label="کلیپ‌های منتخب لول‌آپ فارسی"
      className="scroll-mt-14 border-t border-[rgba(236,235,230,0.09)] py-12 md:scroll-mt-16 md:py-24"
    >
      <div className="mx-auto max-w-[1360px] px-5 md:px-10">
        {/* Header & Active Speaker Toggle */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:mb-10 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium text-[#9a9890]">
              ۰۳. کلیپ‌های منتخب <span className="font-mono-ltr">@levelup.farsi</span>
            </p>
            <h2 className="font-disp mt-1 text-4xl leading-[1.15] text-[#ecebe6] md:text-5xl">
              از دهنِ خودش<span className="text-[#FFD400]">.</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="فیلتر کلیپ‌ها">
            <button
              type="button"
              onClick={() => setOnlyActiveSpeaker(false)}
              aria-pressed={!onlyActiveSpeaker}
              className={`min-h-[40px] whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-bold transition-colors ${
                !onlyActiveSpeaker
                  ? 'border-[#FFD400] bg-[#FFD400] text-[#080808]'
                  : 'border-[rgba(236,235,230,0.16)] text-[#ecebe6]/85 hover:border-[rgba(236,235,230,0.38)]'
              }`}
            >
              همهٔ کلیپ‌ها ({toPersianDigits(clips.length)})
            </button>
            <button
              type="button"
              onClick={() => setOnlyActiveSpeaker(true)}
              aria-pressed={onlyActiveSpeaker}
              className={`min-h-[40px] whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-bold transition-colors ${
                onlyActiveSpeaker
                  ? 'border-[#FFD400] bg-[#FFD400] text-[#080808]'
                  : 'border-[rgba(236,235,230,0.16)] text-[#ecebe6]/85 hover:border-[rgba(236,235,230,0.38)]'
              }`}
            >
              فقط {activeSpeaker.nameFa}
            </button>
          </div>
        </div>

        {/* Feed Poster Grid echoing @levelup.farsi Instagram Reels */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleClips.map((clip) => {
            const speaker = speakerMap[clip.speakerId];
            return (
              <button
                key={clip.id}
                type="button"
                onClick={() => onOpenClip(clip)}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-[rgba(236,235,230,0.14)] bg-[#10100f] text-right transition-all duration-200 hover:-translate-y-1 hover:border-[#FFD400]/65"
              >
                <div className="relative aspect-square w-full overflow-hidden sm:aspect-[4/5]">
                  {speaker && (
                    <SpeakerPortrait
                      speaker={speaker}
                      vignette={false}
                      className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                    />
                  )}

                  {/* Contrast Scrim & Halftone */}
                  <div
                    aria-hidden="true"
                    className="halftone-overlay pointer-events-none absolute inset-0 opacity-20"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-[#080808]/25"
                  />

                  {/* Top Gold Accent Bar */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 z-10 h-[2px] bg-[#FFD400]/80"
                  />

                  {/* Top Metadata Bar */}
                  <div className="absolute inset-x-4 top-4 z-10 flex items-center justify-between text-xs text-[#ecebe6]">
                    <span className="font-mono-ltr text-[11px] tracking-[0.14em] text-[#ecebe6]/80">
                      {toPersianDigits(clip.indexLabel)} · {clip.duration}
                    </span>
                    <span className="font-mono-ltr inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#FFD400]">
                      <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                      {clip.viewsLabel}
                    </span>
                  </div>

                  {/* Center Play Affordance */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 z-10 m-auto flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(236,235,230,0.45)] bg-[#080808]/45 text-[#ecebe6] backdrop-blur-xs transition-transform duration-300 group-hover:scale-110 group-hover:border-[#FFD400] group-hover:text-[#FFD400]"
                  >
                    <Play className="mr-0.5 h-5 w-5 fill-current" />
                  </span>

                  {/* Bottom Poster Title */}
                  <div className="absolute inset-x-5 bottom-5 z-10">
                    <p className="text-xs font-medium text-[#FFD400]">
                      {speaker?.nameFa ?? 'لول‌آپ فارسی'}
                    </p>
                    <h3 className="font-disp mt-1 text-2xl leading-[1.2] text-[#ecebe6] [text-wrap:balance]">
                      {clip.titleFa}
                    </h3>
                    <p className="font-en mt-1 text-xs tracking-[0.22em] text-[#9a9890]">
                      {clip.titleEn}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
