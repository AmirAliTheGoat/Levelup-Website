import { ArrowDownLeft, ExternalLink, Eye, X } from 'lucide-react';
import type { ClipItem, Product, Speaker } from '../data/catalog';
import { toPersianDigits } from '../utils/catalog';
import { SpeakerPortrait } from './SpeakerPortrait';

interface ClipModalProps {
  clip: ClipItem | null;
  speaker?: Speaker;
  relatedProduct?: Product;
  onClose: () => void;
  onOpenRelatedProduct: (product: Product) => void;
}

export function ClipModal({
  clip,
  speaker,
  relatedProduct,
  onClose,
  onOpenRelatedProduct,
}: ClipModalProps) {
  if (!clip) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="clip-modal-title"
      className="fixed inset-0 z-50 flex items-end justify-center p-0 md:items-center md:p-6"
    >
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-xs"
      />

      <div
        className="relative z-10 max-h-[90svh] w-full max-w-2xl overflow-y-auto overscroll-contain rounded-t-3xl border border-b-0 border-[rgba(236,235,230,0.16)] bg-[#10100f] shadow-2xl md:rounded-2xl md:border-b"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div aria-hidden="true" className="flex justify-center pt-2.5 pb-1 md:hidden">
          <span className="h-1 w-10 rounded-full bg-[rgba(236,235,230,0.22)]" />
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="بستن پنجره کلیپ"
          className="absolute top-3.5 left-3.5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(236,235,230,0.22)] bg-[#080808]/90 text-[#ecebe6] transition-colors hover:border-[#FFD400] hover:text-[#FFD400] md:top-4 md:left-4"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        {/* Visual Header */}
        <div className="relative h-56 w-full overflow-hidden border-b border-[rgba(236,235,230,0.1)] md:h-64">
          {speaker && <SpeakerPortrait speaker={speaker} vignette={false} className="h-full w-full" />}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#10100f] via-[#10100f]/45 to-transparent"
          />
          <div className="absolute right-5 bottom-4 left-5 z-10 md:right-6 md:bottom-5 md:left-6">
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#9a9890]">
              <span className="font-bold text-[#FFD400]">{speaker?.nameFa ?? 'لول‌آپ فارسی'}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-ltr">
                {toPersianDigits(clip.indexLabel)} / {clip.duration}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-ltr inline-flex items-center gap-1 text-[#ecebe6]">
                <Eye className="h-3.5 w-3.5 text-[#FFD400]" aria-hidden="true" />
                {clip.viewsLabel}
              </span>
            </div>
            <h2
              id="clip-modal-title"
              className="font-disp mt-1.5 text-2xl leading-[1.2] text-[#ecebe6] md:text-4xl"
            >
              {clip.titleFa}
              <span className="text-[#FFD400]">.</span>
            </h2>
            <p className="font-en mt-1 text-xs tracking-[0.24em] text-[#9a9890]">{clip.titleEn}</p>
          </div>
        </div>

        {/* Body & Related Product Link */}
        <div className="space-y-5 p-5 md:space-y-6 md:p-7">
          <div>
            <p className="text-xs font-bold text-[#9a9890]">خلاصه و نکتهٔ کلیدی این کلیپ</p>
            <p className="mt-2.5 text-sm leading-8 text-[#ecebe6] md:text-base">{clip.takeawayFa}</p>
          </div>

          <div className="flex flex-col gap-2.5 border-t border-[rgba(236,235,230,0.1)] pt-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
            {relatedProduct && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenRelatedProduct(relatedProduct);
                }}
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#FFD400] px-6 py-2.5 text-sm font-black text-[#080808] transition-colors hover:bg-[#ffe040] active:scale-[0.98] sm:min-h-[46px] sm:w-auto"
              >
                <span>مشاهده اثر مرتبط: {relatedProduct.titleFa}</span>
                <ArrowDownLeft className="h-4 w-4" aria-hidden="true" />
              </button>
            )}

            <a
              href={clip.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full border border-[rgba(236,235,230,0.2)] px-5 py-2.5 text-xs font-bold text-[#ecebe6] transition-colors hover:border-[#FFD400] hover:text-[#FFD400] sm:w-auto"
            >
              <span className="font-mono-ltr">@levelup.farsi</span>
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
