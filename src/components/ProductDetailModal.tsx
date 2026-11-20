import { Check, ExternalLink, ShieldCheck, ShoppingBag, X } from 'lucide-react';
import type { Product, Speaker } from '../data/catalog';
import { formatToman } from '../utils/catalog';
import { ProductArtwork } from './ProductArtwork';

interface ProductDetailModalProps {
  product: Product | null;
  speaker?: Speaker;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export function ProductDetailModal({
  product,
  speaker,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  if (!product) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-title"
      className="fixed inset-0 z-50 flex items-end justify-center p-0 md:items-center md:p-6"
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-xs"
      />

      {/* Modal Panel (Bottom sheet on mobile, centered card on desktop) */}
      <div className="relative z-10 flex max-h-[90svh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl border border-b-0 border-[rgba(236,235,230,0.16)] bg-[#10100f] shadow-2xl md:rounded-2xl md:border-b">
        {/* Mobile sheet header with grab handle & non-overlapping close button */}
        <div className="flex shrink-0 items-center justify-between border-b border-[rgba(236,235,230,0.08)] px-4 pt-2.5 pb-2.5 md:hidden">
          <span className="text-xs font-bold text-[#9a9890]">جزئیات اثر</span>
          <span
            aria-hidden="true"
            className="h-1 w-10 rounded-full bg-[rgba(236,235,230,0.22)]"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن جزئیات محصول"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(236,235,230,0.18)] bg-[#141412] text-[#ecebe6] active:scale-95"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop floating close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="بستن جزئیات محصول"
          className="absolute top-4 left-4 z-30 hidden h-10 w-10 items-center justify-center rounded-full border border-[rgba(236,235,230,0.22)] bg-[#080808]/90 text-[#ecebe6] transition-colors hover:border-[#FFD400] hover:text-[#FFD400] md:flex"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="grid flex-1 grid-cols-1 overflow-y-auto overscroll-contain md:grid-cols-12">
          {/* Artwork Column — compact landscape banner on mobile so details + buy CTA are immediately reachable */}
          <div className="md:col-span-5">
            <ProductArtwork
              product={product}
              speaker={speaker}
              className="!aspect-[16/9] md:!aspect-[3/4] md:h-full"
            />
          </div>

          {/* Details Column */}
          <div className="flex flex-col justify-between gap-5 p-5 md:col-span-7 md:gap-6 md:p-8">
            <div className="space-y-4">
              <p className="text-xs font-medium text-[#9a9890]">
                {product.formatLabelFa} · {speaker?.nameFa ?? 'لول‌آپ فارسی'} · {product.metaText}
              </p>

              <div>
                <h2
                  id="pdp-title"
                  className="font-disp text-3xl leading-[1.18] text-[#ecebe6] md:text-4xl"
                >
                  {product.titleFa}
                  <span className="text-[#FFD400]">.</span>
                </h2>
                <p className="font-en mt-1 text-xs tracking-[0.26em] text-[#9a9890]">
                  {product.titleEn}
                </p>
              </div>

              <p className="text-sm leading-7 text-[#ecebe6]/90">{product.descriptionFa}</p>

              {/* Highlights List */}
              <div className="border-t border-[rgba(236,235,230,0.1)] pt-4">
                <p className="mb-3 text-xs font-bold text-[#9a9890]">چه چیزهایی در این اثر می‌گیری:</p>
                <ul className="space-y-2.5 text-sm text-[#ecebe6]/90">
                  {product.highlightsFa.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <Check
                        className="mt-1 h-4 w-4 shrink-0 text-[#FFD400]"
                        aria-hidden="true"
                      />
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Curation & Approval Note */}
              <div className="flex items-start gap-2.5 rounded-xl border border-[rgba(236,235,230,0.1)] bg-[#0b0b0a] p-3.5 text-xs leading-relaxed text-[#9a9890]">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#FFD400]" aria-hidden="true" />
                <span>{product.curationNoteFa}</span>
              </div>
            </div>

            {/* Desktop Price & Primary Actions (mobile uses sticky bottom bar below) */}
            <div className="hidden flex-col gap-4 border-t border-[rgba(236,235,230,0.1)] pt-5 sm:flex-row sm:items-center sm:justify-between md:flex">
              <div>
                <p className="text-xs text-[#9a9890]">مبلغ نهایی</p>
                <p className="tabular-fa text-2xl font-black text-[#ecebe6]">
                  {formatToman(product.priceToman)}{' '}
                  <span className="text-xs font-medium text-[#9a9890]">تومان</span>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#FFD400] px-6 py-2.5 text-sm font-black text-[#080808] transition-colors hover:bg-[#ffe040] sm:flex-none"
                >
                  <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                  <span>افزودن به سبد خرید</span>
                </button>

                {product.externalBuyUrl && (
                  <a
                    href={product.externalBuyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[rgba(236,235,230,0.2)] px-4 py-2.5 text-xs font-bold text-[#ecebe6] transition-colors hover:border-[#FFD400] hover:text-[#FFD400]"
                  >
                    <span>خرید مستقیم</span>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Mobile Purchase Bar (always reachable in thumb zone) */}
        <div
          className="flex shrink-0 items-center justify-between gap-3 border-t border-[rgba(236,235,230,0.12)] bg-[#0c0c0b]/95 px-5 py-3.5 backdrop-blur-md md:hidden"
          style={{ paddingBottom: 'max(0.875rem, env(safe-area-inset-bottom))' }}
        >
          <div>
            <p className="text-[11px] text-[#9a9890]">مبلغ نهایی</p>
            <p className="tabular-fa text-lg font-black text-[#ecebe6]">
              {formatToman(product.priceToman)}{' '}
              <span className="text-[11px] font-medium text-[#9a9890]">تومان</span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            className="inline-flex min-h-[48px] flex-1 max-w-[210px] items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#FFD400] px-5 py-2.5 text-sm font-black text-[#080808] active:scale-[0.98]"
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            <span>افزودن به سبد خرید</span>
          </button>
        </div>
      </div>
    </div>
  );
}
