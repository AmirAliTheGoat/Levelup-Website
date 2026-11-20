import { ShoppingBag } from 'lucide-react';
import { toPersianDigits } from '../utils/catalog';

interface TopBarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
}

export function TopBar({ cartCount, onOpenCart, onNavigate }: TopBarProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[rgba(236,235,230,0.1)] bg-[#080808]/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1360px] items-center justify-between gap-4 px-5 md:h-16 md:gap-8 md:px-10">
        {/* Zone 1: Single-line brand wordmark matching @levelup.farsi */}
        <a
          href="#opening"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('opening');
          }}
          className="font-en shrink-0 whitespace-nowrap text-2xl tracking-[0.06em] text-[#ecebe6] transition-colors hover:text-[#FFD400]"
          aria-label="Level Up Farsi — خانه"
        >
          LEVEL UP
        </a>

        {/* Zone 2: 4 concise single-line navigation links */}
        <nav
          aria-label="ناوبری اصلی"
          className="hidden items-center gap-7 text-sm font-medium text-[#9a9890] md:flex"
        >
          <a
            href="#speakers"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('speakers');
            }}
            className="shrink-0 whitespace-nowrap py-1 transition-colors hover:text-[#ecebe6]"
          >
            سخنرانان
          </a>
          <a
            href="#catalog"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('catalog');
            }}
            className="shrink-0 whitespace-nowrap py-1 transition-colors hover:text-[#ecebe6]"
          >
            کاتالوگ
          </a>
          <a
            href="#clips"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('clips');
            }}
            className="shrink-0 whitespace-nowrap py-1 transition-colors hover:text-[#ecebe6]"
          >
            کلیپ‌ها
          </a>
          <a
            href="#closing"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('closing');
            }}
            className="shrink-0 whitespace-nowrap py-1 transition-colors hover:text-[#ecebe6]"
          >
            خبرنامه
          </a>
        </nav>

        {/* Zone 3: 1 primary action (Shopping Bag) */}
        <button
          type="button"
          onClick={onOpenCart}
          className="inline-flex min-h-[40px] shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-[#FFD400]/55 bg-[#FFD400]/12 px-4 py-1.5 text-sm font-bold text-[#FFD400] transition-colors hover:bg-[#FFD400] hover:text-[#080808]"
          aria-label={`باز کردن سبد خرید (${toPersianDigits(cartCount)} کالا)`}
        >
          <ShoppingBag className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>سبد خرید</span>
          {cartCount > 0 && (
            <span className="tabular-fa inline-flex min-w-[20px] items-center justify-center rounded-full bg-[#FFD400] px-1.5 py-0.5 text-xs font-black text-[#080808]">
              {toPersianDigits(cartCount)}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
