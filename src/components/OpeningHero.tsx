import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDownLeft } from 'lucide-react';
import { toPersianDigits } from '../utils/catalog';

interface OpeningHeroProps {
  speakerCount: number;
  productCount: number;
  reducedMotion: boolean;
  onExploreSpeakers: () => void;
  onExploreCatalog: () => void;
}

export function OpeningHero({
  speakerCount,
  productCount,
  reducedMotion,
  onExploreSpeakers,
  onExploreCatalog,
}: OpeningHeroProps) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reducedMotion || !rootRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.fromTo('.hero-spot', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1.5 }, 0)
        .fromTo('.hero-mark', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, 0.1)
        .fromTo('.hero-setup', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7 }, 0.25)
        .fromTo(
          '.hero-punch',
          { opacity: 0, scale: 1.18, y: -6 },
          { opacity: 1, scale: 1, y: 0, duration: 0.75, ease: 'back.out(1.7)' },
          0.42
        )
        .fromTo('.hero-sub', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, 0.65)
        .fromTo('.hero-actions', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.65 }, 0.8);
    }, rootRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="opening"
      ref={rootRef}
      aria-label="معرفی لول‌آپ فارسی"
      className="relative flex min-h-[calc(100svh-3.5rem)] scroll-mt-14 flex-col items-center justify-center overflow-hidden px-5 pt-20 pb-12 text-center md:min-h-[calc(100svh-4rem)] md:scroll-mt-16 md:px-10 md:pt-28 md:pb-16"
    >
      {/* Subtle monochrome spotlight & dark vignette */}
      <div
        aria-hidden="true"
        className="hero-spot pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 46% 42% at 50% 38%, rgba(255,212,0,0.08), rgba(255,255,255,0.07) 38%, transparent 72%)',
        }}
      />

      {/* Minimal cinema viewfinder corner brackets */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-5 top-20 hidden md:block lg:inset-8 lg:top-24"
      >
        <span className="absolute top-0 right-0 h-3.5 w-3.5 border-t border-r border-[rgba(236,235,230,0.28)]" />
        <span className="absolute top-0 left-0 h-3.5 w-3.5 border-t border-l border-[rgba(236,235,230,0.28)]" />
        <span className="absolute bottom-0 right-0 h-3.5 w-3.5 border-b border-r border-[rgba(236,235,230,0.28)]" />
        <span className="absolute bottom-0 left-0 h-3.5 w-3.5 border-b border-l border-[rgba(236,235,230,0.28)]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center">
        {/* Stepped LEVEL UP | FARSI brand lockup echoing the @levelup.farsi avatar */}
        <div className="hero-mark mb-7 flex flex-col items-center gap-2">
          <div className="font-en flex items-baseline gap-2.5 text-2xl tracking-[0.08em] text-[#ecebe6] md:text-3xl">
            <span>LEVEL UP</span>
            <span className="text-sm tracking-[0.28em] text-[#9a9890]">| FARSI</span>
          </div>
          <p className="tabular-fa flex items-center gap-2 text-xs font-medium text-[#9a9890]">
            <span className="font-mono-ltr tracking-[0.12em]">@levelup.farsi</span>
            <span aria-hidden="true">·</span>
            <span>۵٬۶۴۰+ دنبال‌کننده</span>
          </p>
        </div>

        <h1 className="max-w-full">
          <span className="hero-setup block text-xl font-bold leading-relaxed text-[#ecebe6]/90 [text-wrap:balance] md:text-3xl">
            فقط خوب بودن کافی نیست
          </span>
          <span className="hero-punch font-disp mt-1 block whitespace-nowrap text-[clamp(3.6rem,15.5vw,9.5rem)] leading-[1.06] text-[#ecebe6]">
            قوی باش<span className="text-[#FFD400]">.</span>
          </span>
        </h1>

        <p className="hero-sub mt-6 max-w-xl text-base leading-relaxed font-medium text-[#9a9890] [text-wrap:balance] md:text-lg">
          ساختن نسخهٔ برتر خودت — سیستمی برای رشد. کتاب‌ها، سمینارها و کتاب‌های صوتیِ سخنرانان برتر
          دنیا و اورجینال‌های لول‌آپ، اختصاصی و بومی‌سازی‌شده به زبان فارسی.
        </p>

        {/* Primary & Secondary Actions */}
        <div className="hero-actions mt-8 flex w-full max-w-[300px] flex-col items-stretch justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:gap-4 md:mt-9">
          <button
            type="button"
            onClick={onExploreSpeakers}
            className="inline-flex min-h-[52px] items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-[#FFD400] px-7 py-3 text-base font-black text-[#080808] transition-transform hover:scale-[1.02] hover:bg-[#ffe040] active:scale-[0.98]"
          >
            <span>انتخاب سخنران و آثار</span>
            <ArrowDownLeft className="h-4 w-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={onExploreCatalog}
            className="inline-flex min-h-[50px] items-center justify-center whitespace-nowrap rounded-full border border-[rgba(236,235,230,0.22)] px-6 py-3 text-sm font-bold text-[#ecebe6] transition-colors hover:border-[#FFD400] hover:text-[#FFD400] active:scale-[0.98]"
          >
            مرور همهٔ آثار ({toPersianDigits(productCount)})
          </button>
        </div>

        {/* Clean unboxed proof metadata line (zero pills) */}
        <div className="hero-actions mt-10 flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-[#9a9890] md:text-sm">
          <span className="tabular-fa">{toPersianDigits(speakerCount)} سخنران و مجموعه</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-fa">{toPersianDigits(productCount)} کتاب، سمینار و کتاب صوتی</span>
          <span aria-hidden="true">·</span>
          <span>ویراست و بومی‌سازی فارسی</span>
        </div>
      </div>
    </section>
  );
}
