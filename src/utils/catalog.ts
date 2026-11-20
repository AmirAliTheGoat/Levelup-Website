import type { Product, ProductFormat } from '../data/catalog';

export type SortMode = 'featured' | 'price-asc' | 'price-desc';

export interface CatalogFilterState {
  speakerId: string; // 'all' or speaker id
  format: ProductFormat | 'all';
  query: string;
  sortBy: SortMode;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CheckoutFormInput {
  fullName: string;
  contact: string;
  email: string;
}

export interface OrderRecord {
  orderCode: string;
  fullName: string;
  contact: string;
  email: string;
  items: Array<{ productId: string; titleFa: string; quantity: number; priceToman: number }>;
  totalToman: number;
  createdAt: string;
}

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export function toPersianDigits(input: string | number): string {
  return String(input).replace(/\d/g, (d) => PERSIAN_DIGITS[Number(d)]);
}

export function formatToman(amount: number): string {
  const formatted = Math.max(0, Math.round(amount)).toLocaleString('en-US').replace(/,/g, '٬');
  return toPersianDigits(formatted);
}

export function filterProducts(
  products: Product[],
  filter: CatalogFilterState,
  speakerLookup?: Record<string, { nameFa: string; nameEn: string }>
): Product[] {
  const q = filter.query.trim().toLowerCase();

  const filtered = products.filter((p) => {
    if (filter.speakerId !== 'all' && p.speakerId !== filter.speakerId) {
      return false;
    }
    if (filter.format !== 'all' && p.format !== filter.format) {
      return false;
    }
    if (q) {
      const sp = speakerLookup?.[p.speakerId];
      const haystack = [
        p.titleFa,
        p.titleEn,
        p.subtitleFa,
        p.formatLabelFa,
        sp?.nameFa ?? '',
        sp?.nameEn ?? '',
      ]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(q)) {
        return false;
      }
    }
    return true;
  });

  return [...filtered].sort((a, b) => {
    if (filter.sortBy === 'price-asc') return a.priceToman - b.priceToman;
    if (filter.sortBy === 'price-desc') return b.priceToman - a.priceToman;
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return 0;
  });
}

export function addToCart(cart: CartItem[], productId: string): CartItem[] {
  const existing = cart.find((item) => item.productId === productId);
  if (existing) {
    return cart.map((item) =>
      item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
  }
  return [...cart, { productId, quantity: 1 }];
}

export function updateCartQty(cart: CartItem[], productId: string, delta: number): CartItem[] {
  return cart
    .map((item) =>
      item.productId === productId ? { ...item, quantity: item.quantity + delta } : item
    )
    .filter((item) => item.quantity > 0);
}

export function removeFromCart(cart: CartItem[], productId: string): CartItem[] {
  return cart.filter((item) => item.productId !== productId);
}

export function calculateCartCount(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

export function calculateCartTotal(cart: CartItem[], products: Product[]): number {
  const priceMap = new Map(products.map((p) => [p.id, p.priceToman]));
  return cart.reduce((sum, item) => sum + (priceMap.get(item.productId) ?? 0) * item.quantity, 0);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEmail(raw: string): { ok: boolean; normalized: string; error?: string } {
  const normalized = raw.trim().toLowerCase();
  if (!normalized) {
    return { ok: false, normalized, error: 'لطفاً آدرس ایمیلت رو وارد کن.' };
  }
  if (!EMAIL_RE.test(normalized)) {
    return { ok: false, normalized, error: 'فرمت ایمیل معتبر نیست؛ دوباره بررسی کن.' };
  }
  return { ok: true, normalized };
}

export function validateCheckout(input: CheckoutFormInput): {
  ok: boolean;
  errors: Partial<Record<keyof CheckoutFormInput, string>>;
} {
  const errors: Partial<Record<keyof CheckoutFormInput, string>> = {};
  if (input.fullName.trim().length < 2) {
    errors.fullName = 'لطفاً نام و نام خانوادگی را وارد کن.';
  }
  if (input.contact.trim().length < 4) {
    errors.contact = 'شماره تماس یا آیدی تلگرام معتبر وارد کن.';
  }
  const emailRes = validateEmail(input.email);
  if (!emailRes.ok) {
    errors.email = emailRes.error;
  }
  return { ok: Object.keys(errors).length === 0, errors };
}

export function generateOrderCode(seed = Date.now()): string {
  const num = 1000 + (Math.abs(seed) % 9000);
  return `LU-${num}`;
}

export function parseSpeakerHash(hash: string): string | null {
  const match = hash.match(/^#speaker\/([a-z0-9-]+)$/i);
  return match ? match[1].toLowerCase() : null;
}
