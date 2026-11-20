import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  CLIPS,
  PRODUCTS,
  SPEAKERS,
  getProductById,
  getSpeakerById,
  getSpeakerBySlug,
  type ClipItem,
  type Product,
} from './data/catalog';
import {
  addToCart,
  calculateCartCount,
  parseSpeakerHash,
  removeFromCart,
  updateCartQty,
  type CartItem,
  type CatalogFilterState,
  type OrderRecord,
} from './utils/catalog';
import { TopBar } from './components/TopBar';
import { OpeningHero } from './components/OpeningHero';
import { SpeakerShowcase } from './components/SpeakerShowcase';
import { CatalogHub } from './components/CatalogHub';
import { ClipsSection } from './components/ClipsSection';
import { ClosingLeadScene } from './components/ClosingLeadScene';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { ClipModal } from './components/ClipModal';
import { MobileBottomNav } from './components/MobileBottomNav';

const CART_STORAGE_KEY = 'lu_cart';
const ORDERS_STORAGE_KEY = 'lu_orders';

const DEFAULT_FILTER: CatalogFilterState = {
  speakerId: 'all',
  format: 'all',
  query: '',
  sortBy: 'featured',
};

function readInitialReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  const queryRm = /[?&]rm=1(?:&|$)/.test(window.location.search);
  const mediaRm = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  return queryRm || mediaRm;
}

function readInitialSpeakerId(): string {
  if (typeof window === 'undefined') return SPEAKERS[0].id;
  const slug = parseSpeakerHash(window.location.hash);
  if (slug) {
    const found = getSpeakerBySlug(slug);
    if (found) return found.id;
  }
  return SPEAKERS[0].id;
}

function readStoredCart(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CartItem =>
        typeof item?.productId === 'string' &&
        typeof item?.quantity === 'number' &&
        item.quantity > 0 &&
        Boolean(getProductById(item.productId))
    );
  } catch {
    return [];
  }
}

function readStoredOrders(): OrderRecord[] {
  try {
    const raw = window.localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as OrderRecord[]) : [];
  } catch {
    return [];
  }
}

export function App() {
  const [reducedMotion] = useState<boolean>(readInitialReducedMotion);
  const [activeSpeakerId, setActiveSpeakerId] = useState<string>(readInitialSpeakerId);
  const [catalogFilter, setCatalogFilter] = useState<CatalogFilterState>(DEFAULT_FILTER);
  const [cart, setCart] = useState<CartItem[]>(readStoredCart);
  const [orders, setOrders] = useState<OrderRecord[]>(readStoredOrders);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedClip, setSelectedClip] = useState<ClipItem | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('opening');

  // Sync reduced motion class on <html>
  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.classList.add('rm');
    } else {
      document.documentElement.classList.remove('rm');
    }
  }, [reducedMotion]);

  // Persist cart & orders to localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      /* ignore storage errors */
    }
  }, [cart]);

  useEffect(() => {
    try {
      window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      /* ignore storage errors */
    }
  }, [orders]);

  // Listen for #speaker/<slug> hash navigation
  useEffect(() => {
    const onHashChange = () => {
      const slug = parseSpeakerHash(window.location.hash);
      if (!slug) return;
      const found = getSpeakerBySlug(slug);
      if (found) {
        setActiveSpeakerId(found.id);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Global Escape handler for modals and drawer
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (cartOpen) setCartOpen(false);
      else if (selectedProduct) setSelectedProduct(null);
      else if (selectedClip) setSelectedClip(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [cartOpen, selectedProduct, selectedClip]);

  // Lock background page scroll while any modal or slide-over drawer is open
  const hasOverlayOpen = cartOpen || Boolean(selectedProduct) || Boolean(selectedClip);
  useEffect(() => {
    if (!hasOverlayOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [hasOverlayOpen]);

  // Track active section in viewport for mobile bottom navigation highlight
  useEffect(() => {
    const ids = ['opening', 'speakers', 'catalog', 'clips', 'closing'];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0 || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0, 0.25, 0.5] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const activeSpeaker = useMemo(
    () => getSpeakerById(activeSpeakerId) ?? SPEAKERS[0],
    [activeSpeakerId]
  );

  const cartCount = useMemo(() => calculateCartCount(cart), [cart]);

  const scrollToSection = useCallback(
    (sectionId: string) => {
      setActiveSection(sectionId);
      const el = document.getElementById(sectionId);
      if (!el) return;
      el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    },
    [reducedMotion]
  );

  const handleSelectSpeaker = useCallback((speakerId: string) => {
    setActiveSpeakerId(speakerId);
    const sp = getSpeakerById(speakerId);
    if (sp && typeof window !== 'undefined') {
      const nextHash = `#speaker/${sp.slug}`;
      if (window.location.hash !== nextHash) {
        window.history.replaceState(null, '', nextHash);
      }
    }
  }, []);

  const handleFilterCatalogBySpeaker = useCallback(
    (speakerId: string) => {
      setCatalogFilter((prev) => ({ ...prev, speakerId }));
      scrollToSection('catalog');
    },
    [scrollToSection]
  );

  const handleAddToCart = useCallback((product: Product) => {
    setCart((prev) => addToCart(prev, product.id));
    setToastMsg(`«${product.titleFa}» به سبد خرید اضافه شد.`);
  }, []);

  useEffect(() => {
    if (!toastMsg) return;
    const timer = window.setTimeout(() => setToastMsg(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toastMsg]);

  const handleUpdateQty = useCallback((productId: string, delta: number) => {
    setCart((prev) => updateCartQty(prev, productId, delta));
  }, []);

  const handleRemoveItem = useCallback((productId: string) => {
    setCart((prev) => removeFromCart(prev, productId));
  }, []);

  const handleCompleteOrder = useCallback((order: OrderRecord) => {
    setOrders((prev) => [order, ...prev]);
    setCart([]);
  }, []);

  return (
    <div className="min-h-svh bg-[#080808] text-[#ecebe6]">
      <div className="film-grain" aria-hidden="true" />

      <TopBar
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
        onNavigate={scrollToSection}
      />

      <main id="page">
        <OpeningHero
          speakerCount={SPEAKERS.length}
          productCount={PRODUCTS.length}
          reducedMotion={reducedMotion}
          onExploreSpeakers={() => scrollToSection('speakers')}
          onExploreCatalog={() => scrollToSection('catalog')}
        />

        <SpeakerShowcase
          speakers={SPEAKERS}
          products={PRODUCTS}
          activeSpeaker={activeSpeaker}
          reducedMotion={reducedMotion}
          onSelectSpeaker={handleSelectSpeaker}
          onFilterCatalogBySpeaker={handleFilterCatalogBySpeaker}
        />

        <CatalogHub
          speakers={SPEAKERS}
          products={PRODUCTS}
          filter={catalogFilter}
          onChangeFilter={setCatalogFilter}
          onResetFilter={() => setCatalogFilter(DEFAULT_FILTER)}
          onOpenProduct={setSelectedProduct}
          onAddToCart={handleAddToCart}
        />

        <ClipsSection
          clips={CLIPS}
          speakers={SPEAKERS}
          activeSpeaker={activeSpeaker}
          onOpenClip={setSelectedClip}
        />

        <ClosingLeadScene
          onGoToCatalog={() => scrollToSection('catalog')}
          onGoToSpeakers={() => scrollToSection('speakers')}
          onBackToTop={() => scrollToSection('opening')}
        />
      </main>

      {/* Proper contentinfo landmark outside <main> */}
      <footer
        aria-label="فوتر سایت"
        className="border-t border-[rgba(236,235,230,0.1)] bg-[#080808] px-5 pt-12 pb-24 text-center md:px-10 md:py-12"
      >
        <div className="mx-auto flex max-w-[1360px] flex-col items-center gap-6">
          <div className="font-en flex items-baseline gap-2.5 text-2xl tracking-[0.06em] text-[#ecebe6]">
            <span>LEVEL UP</span>
            <span className="text-xs tracking-[0.28em] text-[#9a9890]">| FARSI</span>
          </div>

          <nav
            aria-label="پیوندهای فوتر"
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#9a9890]"
          >
            <a
              href="#opening"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('opening');
              }}
              className="transition-colors hover:text-[#ecebe6]"
            >
              خانه
            </a>
            <a
              href="#speakers"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('speakers');
              }}
              className="transition-colors hover:text-[#ecebe6]"
            >
              سخنرانان
            </a>
            <a
              href="#catalog"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('catalog');
              }}
              className="transition-colors hover:text-[#ecebe6]"
            >
              کاتالوگ
            </a>
            <a
              href="#clips"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('clips');
              }}
              className="transition-colors hover:text-[#ecebe6]"
            >
              کلیپ‌ها
            </a>
            <a
              href="https://instagram.com/levelup.farsi"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-ltr text-xs transition-colors hover:text-[#FFD400]"
            >
              @levelup.farsi
            </a>
          </nav>

          <p className="font-mono-ltr text-xs tracking-[0.12em] text-[#9a9890]/70">
            © LEVEL UP | FARSI — ALL RIGHTS RESERVED
          </p>
        </div>
      </footer>

      {/* Modals & Slide-Over Shopping Bag */}
      <ProductDetailModal
        product={selectedProduct}
        speaker={selectedProduct ? getSpeakerById(selectedProduct.speakerId) : undefined}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <ClipModal
        clip={selectedClip}
        speaker={selectedClip ? getSpeakerById(selectedClip.speakerId) : undefined}
        relatedProduct={selectedClip ? getProductById(selectedClip.relatedProductId) : undefined}
        onClose={() => setSelectedClip(null)}
        onOpenRelatedProduct={setSelectedProduct}
      />

      <CartDrawer
        open={cartOpen}
        cart={cart}
        products={PRODUCTS}
        speakers={SPEAKERS}
        orders={orders}
        onClose={() => setCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onCompleteOrder={handleCompleteOrder}
        onExploreCatalog={() => scrollToSection('catalog')}
      />

      <MobileBottomNav activeSection={activeSection} onNavigate={scrollToSection} />

      {/* Non-intrusive live toast on cart add */}
      {toastMsg && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-x-4 bottom-20 z-50 flex items-center justify-between gap-3 rounded-2xl border border-[#FFD400]/55 bg-[#121210]/95 px-4 py-3 text-xs font-bold text-[#ecebe6] shadow-xl backdrop-blur-md md:inset-x-auto md:right-5 md:bottom-5 md:justify-start md:rounded-full md:px-5"
        >
          <span className="truncate">{toastMsg}</span>
          <button
            type="button"
            onClick={() => {
              setToastMsg(null);
              setCartOpen(true);
            }}
            className="shrink-0 text-[#FFD400] underline underline-offset-4 hover:text-[#ffe040]"
          >
            مشاهده سبد
          </button>
        </div>
      )}
    </div>
  );
}
export default App;
