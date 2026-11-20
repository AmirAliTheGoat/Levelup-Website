import { useMemo, useState } from 'react';
import { Check, RotateCcw, Search, ShoppingBag, X } from 'lucide-react';
import {
  FORMAT_LABELS,
  type Product,
  type ProductFormat,
  type Speaker,
} from '../data/catalog';
import {
  filterProducts,
  formatToman,
  toPersianDigits,
  type CatalogFilterState,
  type SortMode,
} from '../utils/catalog';
import { ProductArtwork } from './ProductArtwork';

interface CatalogHubProps {
  speakers: Speaker[];
  products: Product[];
  filter: CatalogFilterState;
  onChangeFilter: (next: CatalogFilterState) => void;
  onResetFilter: () => void;
  onOpenProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const FORMAT_OPTIONS: Array<ProductFormat | 'all'> = ['all', 'book', 'course', 'audio'];

export function CatalogHub({
  speakers,
  products,
  filter,
  onChangeFilter,
  onResetFilter,
  onOpenProduct,
  onAddToCart,
}: CatalogHubProps) {
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const speakerMap = useMemo(
    () =>
      speakers.reduce<Record<string, Speaker>>((acc, sp) => {
        acc[sp.id] = sp;
        return acc;
      }, {}),
    [speakers]
  );

  const filteredProducts = useMemo(
    () => filterProducts(products, filter, speakerMap),
    [products, filter, speakerMap]
  );

  const hasActiveFilters =
    filter.speakerId !== 'all' ||
    filter.format !== 'all' ||
    filter.query.trim() !== '' ||
    filter.sortBy !== 'featured';

  const handleQuickAdd = (product: Product) => {
    onAddToCart(product);
    setJustAddedId(product.id);
    window.setTimeout(() => {
      setJustAddedId((curr) => (curr === product.id ? null : curr));
    }, 1500);
  };

  return (
    <section
      id="catalog"
      aria-label="کاتالوگ فارسی کتاب‌ها، سمینارها و کتاب‌های صوتی"
      className="scroll-mt-14 border-t border-[rgba(236,235,230,0.09)] py-12 md:scroll-mt-16 md:py-24"
    >
      <div className="mx-auto max-w-[1360px] px-5 md:px-10">
        {/* Section Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:mb-10 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium text-[#9a9890]">۰۲. کاتالوگ فارسی و فیلتر هوشمند</p>
            <h2 className="font-disp mt-1 text-4xl leading-[1.15] text-[#ecebe6] md:text-5xl">
              کتاب‌ها، سمینارها و صوتی‌ها<span className="text-[#FFD400]">.</span>
            </h2>
          </div>
          <p className="tabular-fa text-sm font-medium text-[#9a9890]">
            نمایش{' '}
            <strong className="font-black text-[#ecebe6]">
              {toPersianDigits(filteredProducts.length)}
            </strong>{' '}
            از {toPersianDigits(products.length)} اثر بومی‌سازی‌شده
          </p>
        </div>

        {/* Filter Control Surface */}
        <div className="mb-10 space-y-4 rounded-2xl border border-[rgba(236,235,230,0.12)] bg-[#10100f] p-4 md:p-6">
          {/* Row 1: Speaker Filter Bar */}
          <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => onChangeFilter({ ...filter, speakerId: 'all' })}
              aria-pressed={filter.speakerId === 'all'}
              className={`min-h-[40px] shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-bold transition-colors md:text-sm ${
                filter.speakerId === 'all'
                  ? 'border-[#FFD400] bg-[#FFD400] text-[#080808]'
                  : 'border-[rgba(236,235,230,0.16)] bg-transparent text-[#ecebe6]/85 hover:border-[rgba(236,235,230,0.38)]'
              }`}
            >
              همهٔ سخنرانان
            </button>
            {speakers.map((speaker) => {
              const active = filter.speakerId === speaker.id;
              return (
                <button
                  key={speaker.id}
                  type="button"
                  onClick={() => onChangeFilter({ ...filter, speakerId: speaker.id })}
                  aria-pressed={active}
                  className={`min-h-[40px] shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-bold transition-colors md:text-sm ${
                    active
                      ? 'border-[#FFD400] bg-[#FFD400] text-[#080808]'
                      : 'border-[rgba(236,235,230,0.16)] bg-transparent text-[#ecebe6]/85 hover:border-[rgba(236,235,230,0.38)]'
                  }`}
                >
                  {speaker.nameFa}
                </button>
              );
            })}
          </div>

          {/* Row 2: Format Buttons + Search Input + Sort Select */}
          <div className="flex flex-col gap-3 border-t border-[rgba(236,235,230,0.08)] pt-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Format Segmented Buttons — single scrollable row on mobile so nothing wraps into an orphan */}
            <div
              className="no-scrollbar -mx-1 flex flex-nowrap items-center gap-2 overflow-x-auto px-1 pb-0.5 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0"
              role="group"
              aria-label="فیلتر فرمت"
            >
              {FORMAT_OPTIONS.map((fmt) => {
                const active = filter.format === fmt;
                return (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => onChangeFilter({ ...filter, format: fmt })}
                    aria-pressed={active}
                    className={`min-h-[40px] shrink-0 whitespace-nowrap rounded-lg border px-3.5 py-1.5 text-xs font-bold transition-colors active:scale-[0.98] ${
                      active
                        ? 'border-[#FFD400]/75 bg-[#FFD400]/15 text-[#FFD400]'
                        : 'border-[rgba(236,235,230,0.12)] bg-[#161614] text-[#9a9890] hover:text-[#ecebe6]'
                    }`}
                  >
                    {FORMAT_LABELS[fmt]}
                  </button>
                );
              })}
            </div>

            {/* Search & Sort Controls (16px on mobile prevents iOS Safari auto-zoom) */}
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3">
              <div className="relative flex-1 sm:min-w-[260px]">
                <Search
                  className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-[#9a9890]"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={filter.query}
                  onChange={(e) => onChangeFilter({ ...filter, query: e.target.value })}
                  placeholder="جستجو در عنوان، سخنران یا موضوع..."
                  aria-label="جستجو در کاتالوگ"
                  className="min-h-[44px] w-full rounded-lg border border-[rgba(236,235,230,0.16)] bg-[#0b0b0a] pr-10 pl-9 text-base text-[#ecebe6] placeholder:text-[#9a9890]/75 focus:border-[#FFD400] focus:outline-none sm:min-h-[42px] sm:text-sm"
                />
                {filter.query && (
                  <button
                    type="button"
                    onClick={() => onChangeFilter({ ...filter, query: '' })}
                    aria-label="پاک کردن عبارت جستجو"
                    className="absolute top-1/2 left-2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-[#9a9890] hover:bg-[rgba(236,235,230,0.1)] hover:text-[#ecebe6]"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <label htmlFor="catalog-sort" className="sr-only">
                  مرتب‌سازی
                </label>
                <select
                  id="catalog-sort"
                  value={filter.sortBy}
                  onChange={(e) =>
                    onChangeFilter({ ...filter, sortBy: e.target.value as SortMode })
                  }
                  className="min-h-[44px] flex-1 rounded-lg border border-[rgba(236,235,230,0.16)] bg-[#0b0b0a] px-3.5 text-sm font-bold text-[#ecebe6] focus:border-[#FFD400] focus:outline-none sm:min-h-[42px] sm:flex-none sm:text-xs"
                >
                  <option value="featured">مرتب‌سازی: پیشنهادی</option>
                  <option value="price-asc">ارزان‌ترین</option>
                  <option value="price-desc">گران‌ترین</option>
                </select>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={onResetFilter}
                    className="inline-flex min-h-[44px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border border-[rgba(236,235,230,0.16)] px-3.5 text-xs font-bold text-[#9a9890] transition-colors hover:border-[#FFD400] hover:text-[#FFD400] sm:min-h-[42px]"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>بازنشانی</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid or Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-[rgba(236,235,230,0.12)] bg-[#10100f] px-6 py-16 text-center">
            <p className="font-disp text-3xl text-[#ecebe6]">اثری با این فیلتر پیدا نشد.</p>
            <p className="mt-2 max-w-md text-sm text-[#9a9890]">
              فیلتر سخنران، فرمت یا عبارت جستجو را تغییر بده تا دوباره همهٔ آثار کاتالوگ نمایش داده
              شوند.
            </p>
            <button
              type="button"
              onClick={onResetFilter}
              className="mt-6 inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#FFD400] px-6 py-2.5 text-sm font-black text-[#080808] transition-colors hover:bg-[#ffe040]"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              <span>پاک کردن فیلترها</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => {
              const speaker = speakerMap[product.speakerId];
              const isAdded = justAddedId === product.id;

              return (
                <article
                  key={product.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[rgba(236,235,230,0.12)] bg-[#10100f] transition-colors duration-200 hover:border-[rgba(255,212,0,0.45)]"
                >
                  <button
                    type="button"
                    onClick={() => onOpenProduct(product)}
                    className="block w-full text-right focus-visible:outline-none"
                    aria-label={`مشاهده جزئیات ${product.titleFa}`}
                  >
                    <ProductArtwork product={product} speaker={speaker} />
                  </button>

                  <div className="flex flex-1 flex-col justify-between gap-5 p-5">
                    <div>
                      {/* Unboxed metadata line (zero static pills) */}
                      <p className="tabular-fa text-xs font-medium text-[#9a9890]">
                        {product.formatLabelFa} · {speaker?.nameFa ?? 'لول‌آپ'} · {product.metaText}
                      </p>

                      <h3 className="mt-2 text-lg font-black leading-snug text-[#ecebe6]">
                        <button
                          type="button"
                          onClick={() => onOpenProduct(product)}
                          className="text-right transition-colors hover:text-[#FFD400]"
                        >
                          {product.titleFa}
                        </button>
                      </h3>

                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#9a9890]">
                        {product.subtitleFa}
                      </p>
                    </div>

                    <div className="space-y-4 border-t border-[rgba(236,235,230,0.09)] pt-4">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-xs text-[#9a9890]">قیمت نسخهٔ فارسی</span>
                        <p className="tabular-fa text-lg font-black text-[#ecebe6]">
                          {formatToman(product.priceToman)}{' '}
                          <span className="text-xs font-medium text-[#9a9890]">تومان</span>
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={() => onOpenProduct(product)}
                          className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-[rgba(236,235,230,0.2)] px-3 py-2 text-xs font-bold text-[#ecebe6] transition-colors hover:border-[#ecebe6] hover:bg-[rgba(236,235,230,0.06)]"
                        >
                          جزئیات اثر
                        </button>
                        <button
                          type="button"
                          onClick={() => handleQuickAdd(product)}
                          className={`inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-black transition-colors ${
                            isAdded
                              ? 'bg-[#ecebe6] text-[#080808]'
                              : 'bg-[#FFD400] text-[#080808] hover:bg-[#ffe040]'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>اضافه شد</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>افزودن به سبد</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
