import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowDownLeft, Check, Link2 } from 'lucide-react';
import type { Product, Speaker } from '../data/catalog';
import { toPersianDigits } from '../utils/catalog';
import { SpeakerPortrait } from './SpeakerPortrait';

interface SpeakerShowcaseProps {
  speakers: Speaker[];
  products: Product[];
  activeSpeaker: Speaker;
  reducedMotion: boolean;
  onSelectSpeaker: (speakerId: string) => void;
  onFilterCatalogBySpeaker: (speakerId: string) => void;
}

export function SpeakerShowcase({
  speakers,
  products,
  activeSpeaker,
  reducedMotion,
  onSelectSpeaker,
  onFilterCatalogBySpeaker,
}: SpeakerShowcaseProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const speakerProducts = products.filter((p) => p.speakerId === activeSpeaker.id);
  const booksCount = speakerProducts.filter((p) => p.format === 'book').length;
  const coursesCount = speakerProducts.filter((p) => p.format === 'course').length;
  const audioCount = speakerProducts.filter((p) => p.format === 'audio').length;

  useEffect(() => {
    if (reducedMotion || !stageRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stage-anim',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: 'expo.out' }
      );
      gsap.fromTo(
        '.stage-portrait',
        { opacity: 0, scale: 1.04 },
        { opacity: 1, scale: 1, duration: 0.55, ease: 'expo.out' }
      );
    }, stageRef);
    return () => ctx.revert();
  }, [activeSpeaker.id, reducedMotion]);

  const handleCopyLink = async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#speaker/${activeSpeaker.slug}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedSlug(activeSpeaker.slug);
      setTimeout(() => setCopiedSlug(null), 2200);
    } catch {
      window.location.hash = `speaker/${activeSpeaker.slug}`;
      setCopiedSlug(activeSpeaker.slug);
      setTimeout(() => setCopiedSlug(null), 2200);
    }
  };

  return (
    <section
      id="speakers"
      aria-label="انتخاب سخنران و صحنهٔ نمایش"
      className="scroll-mt-14 border-t border-[rgba(236,235,230,0.09)] py-12 md:scroll-mt-16 md:py-24"
    >
      <div className="mx-auto max-w-[1360px] px-5 md:px-10">
        {/* Section Heading */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:mb-10 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium text-[#9a9890]">
              ۰۱. داشبورد انتخاب سخنران
            </p>
            <h2 className="font-disp mt-1 text-4xl leading-[1.15] text-[#ecebe6] md:text-5xl">
              سخنرانت رو انتخاب کن<span className="text-[#FFD400]">.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#9a9890]">
            هر سخنران صفحهٔ اختصاصی و لینک مستقیم برای پست‌های اینستاگرام دارد. روی هر چهره کلیک کن تا
            آثار و فضای فکری‌اش باز شود.
          </p>
        </div>

        {/* Mobile swipe affordance cue */}
        <p className="mb-2.5 text-xs font-medium text-[#9a9890] md:hidden">
          برای دیدن همهٔ سخنرانان به چپ بکش ←
        </p>

        {/* Interactive Speaker Roster (Snap horizontal scroll on mobile, 6-col grid on desktop) */}
        <div
          role="tablist"
          aria-label="فهرست سخنرانان"
          className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-3 md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-6"
        >
          {speakers.map((speaker) => {
            const isActive = speaker.id === activeSpeaker.id;
            const count = products.filter((p) => p.speakerId === speaker.id).length;
            return (
              <button
                key={speaker.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectSpeaker(speaker.id)}
                className={`group relative flex w-[142px] shrink-0 snap-start flex-col overflow-hidden rounded-xl border text-right transition-all duration-200 active:scale-[0.98] md:w-auto ${
                  isActive
                    ? 'border-[#FFD400] bg-[#151513] shadow-[0_0_0_1px_rgba(255,212,0,0.35)]'
                    : 'border-[rgba(236,235,230,0.12)] bg-[#111110] hover:border-[rgba(236,235,230,0.32)]'
                }`}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <SpeakerPortrait
                    speaker={speaker}
                    vignette={false}
                    className="h-full w-full transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <div
                    aria-hidden="true"
                    className={`absolute inset-x-0 top-0 h-[2px] transition-opacity ${
                      isActive ? 'bg-[#FFD400] opacity-100' : 'bg-[#FFD400]/60 opacity-0 group-hover:opacity-100'
                    }`}
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between p-3.5">
                  <div>
                    <p
                      className={`text-sm font-bold leading-snug ${
                        isActive ? 'text-[#FFD400]' : 'text-[#ecebe6]'
                      }`}
                    >
                      {speaker.nameFa}
                    </p>
                    <p className="font-en mt-0.5 text-[11px] tracking-[0.16em] text-[#9a9890]">
                      {speaker.nameEn}
                    </p>
                  </div>
                  <p className="tabular-fa mt-2.5 text-xs text-[#9a9890]">
                    {toPersianDigits(count)} اثر · {speaker.yearsOrTag}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Speaker Cinematic Spotlight Stage */}
        <div
          ref={stageRef}
          role="tabpanel"
          aria-label={`صحنهٔ اختصاصی ${activeSpeaker.nameFa}`}
          className="mt-6 scroll-mt-16 overflow-hidden rounded-2xl border border-[rgba(236,235,230,0.12)] bg-[#10100f] md:mt-10"
        >
          <div className="grid grid-cols-1 items-stretch lg:grid-cols-12">
            {/* Portrait Column — compact on mobile so narrative & CTA stay in view */}
            <div className="stage-portrait relative aspect-[4/3] max-h-[260px] w-full sm:max-h-[320px] lg:col-span-5 lg:aspect-auto lg:max-h-none lg:min-h-[480px]">
              <SpeakerPortrait
                speaker={activeSpeaker}
                className="h-full w-full lg:min-h-[480px]"
              />
              <div className="pointer-events-none absolute right-4 bottom-3 left-4 flex items-center justify-between text-[11px] text-[#ecebe6]/80 md:right-5 md:bottom-5 md:left-5 md:text-xs">
                <span className="font-mono-ltr tracking-[0.12em]">
                  #speaker/{activeSpeaker.slug}
                </span>
                <span className="tabular-fa">
                  بازدید ریلز: {activeSpeaker.instagramPostViews}
                </span>
              </div>
            </div>

            {/* Editorial Narrative & Actions Column */}
            <div className="flex flex-col justify-between gap-6 p-6 md:p-10 lg:col-span-7 lg:p-12">
              <div className="space-y-4">
                <div className="stage-anim flex flex-wrap items-center gap-2 text-xs font-medium text-[#9a9890]">
                  <span>{activeSpeaker.isOriginal ? 'مجموعهٔ اورجینال لول‌آپ' : 'سخنران برگزیده'}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeSpeaker.roleFa}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeSpeaker.taglineFa}</span>
                </div>

                <div className="stage-anim">
                  <h3 className="font-disp text-4xl leading-[1.12] text-[#ecebe6] md:text-6xl">
                    {activeSpeaker.nameFa}
                    <span className="text-[#FFD400]">.</span>
                  </h3>
                  <p className="font-en mt-1 text-sm tracking-[0.34em] text-[#9a9890]">
                    {activeSpeaker.nameEn}
                  </p>
                </div>

                <blockquote className="stage-anim border-t border-[rgba(236,235,230,0.1)] pt-5 text-lg leading-relaxed font-bold text-[#ecebe6] [text-wrap:balance] md:text-2xl">
                  {activeSpeaker.quoteFa}
                </blockquote>

                <p className="stage-anim max-w-2xl text-sm leading-7 font-medium text-[#9a9890] md:text-base">
                  {activeSpeaker.bioFa}
                </p>
              </div>

              {/* Stats & Action Footer */}
              <div className="stage-anim flex flex-col gap-5 border-t border-[rgba(236,235,230,0.1)] pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="tabular-fa flex flex-wrap items-center gap-3 text-sm text-[#9a9890]">
                  {booksCount > 0 && (
                    <span>
                      <strong className="font-black text-[#ecebe6]">{toPersianDigits(booksCount)}</strong> کتاب
                    </span>
                  )}
                  {coursesCount > 0 && (
                    <>
                      {booksCount > 0 && <span aria-hidden="true">·</span>}
                      <span>
                        <strong className="font-black text-[#ecebe6]">{toPersianDigits(coursesCount)}</strong> سمینار و دوره
                      </span>
                    </>
                  )}
                  {audioCount > 0 && (
                    <>
                      {(booksCount > 0 || coursesCount > 0) && <span aria-hidden="true">·</span>}
                      <span>
                        <strong className="font-black text-[#ecebe6]">{toPersianDigits(audioCount)}</strong> کتاب صوتی
                      </span>
                    </>
                  )}
                </div>

                <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                  <button
                    type="button"
                    onClick={() => onFilterCatalogBySpeaker(activeSpeaker.id)}
                    className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#FFD400] px-6 py-2.5 text-sm font-black text-[#080808] transition-colors hover:bg-[#ffe040] active:scale-[0.98] sm:min-h-[46px] sm:w-auto"
                  >
                    <span>مشاهده آثار {activeSpeaker.nameFa}</span>
                    <ArrowDownLeft className="h-4 w-4" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[rgba(236,235,230,0.2)] px-4 py-2.5 text-xs font-bold text-[#ecebe6] transition-colors hover:border-[#FFD400] hover:text-[#FFD400] active:scale-[0.98] sm:min-h-[46px] sm:w-auto"
                  >
                    {copiedSlug === activeSpeaker.slug ? (
                      <>
                        <Check className="h-4 w-4 text-[#FFD400]" aria-hidden="true" />
                        <span>لینک کپی شد</span>
                      </>
                    ) : (
                      <>
                        <Link2 className="h-4 w-4" aria-hidden="true" />
                        <span>کپی لینک اینستاگرام</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
