import { useState, type FormEvent } from 'react';
import {
  CheckCircle2,
  Minus,
  Plus,
  ReceiptText,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import type { Product, Speaker } from '../data/catalog';
import {
  calculateCartTotal,
  formatToman,
  generateOrderCode,
  toPersianDigits,
  validateCheckout,
  type CartItem,
  type CheckoutFormInput,
  type OrderRecord,
} from '../utils/catalog';

interface CartDrawerProps {
  open: boolean;
  cart: CartItem[];
  products: Product[];
  speakers: Speaker[];
  orders: OrderRecord[];
  onClose: () => void;
  onUpdateQty: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onCompleteOrder: (order: OrderRecord) => void;
  onExploreCatalog: () => void;
}

export function CartDrawer({
  open,
  cart,
  products,
  speakers,
  orders,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onCompleteOrder,
  onExploreCatalog,
}: CartDrawerProps) {
  const [view, setView] = useState<'bag' | 'orders'>('bag');
  const [form, setForm] = useState<CheckoutFormInput>({
    fullName: '',
    contact: '',
    email: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormInput, string>>>({});
  const [latestOrder, setLatestOrder] = useState<OrderRecord | null>(null);

  if (!open) return null;

  const productMap = new Map(products.map((p) => [p.id, p]));
  const speakerMap = new Map(speakers.map((s) => [s.id, s]));
  const subtotal = calculateCartTotal(cart, products);

  const handleCheckoutSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const validation = validateCheckout(form);
    if (!validation.ok) {
      setErrors(validation.errors);
      return;
    }

    const orderItems = cart
      .map((item) => {
        const prod = productMap.get(item.productId);
        if (!prod) return null;
        return {
          productId: prod.id,
          titleFa: prod.titleFa,
          quantity: item.quantity,
          priceToman: prod.priceToman,
        };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);

    const newOrder: OrderRecord = {
      orderCode: generateOrderCode(Date.now()),
      fullName: form.fullName.trim(),
      contact: form.contact.trim(),
      email: form.email.trim().toLowerCase(),
      items: orderItems,
      totalToman: subtotal,
      createdAt: new Date().toISOString(),
    };

    onCompleteOrder(newOrder);
    setLatestOrder(newOrder);
    setForm({ fullName: '', contact: '', email: '' });
    setErrors({});
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-xs"
      />

      {/* Drawer Panel (anchored to end/left in RTL) */}
      <div className="relative z-10 flex h-full w-full max-w-md flex-col border-r border-[rgba(236,235,230,0.14)] bg-[#0e0e0d] shadow-2xl">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-[rgba(236,235,230,0.1)] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-[#FFD400]" aria-hidden="true" />
            <h2 id="cart-drawer-title" className="text-base font-black text-[#ecebe6]">
              سبد خرید و ثبت سفارش
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="بستن سبد خرید"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(236,235,230,0.16)] text-[#9a9890] transition-colors hover:border-[#FFD400] hover:text-[#ecebe6]"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Sub-navigation when past orders exist */}
        {orders.length > 0 && (
          <div className="grid grid-cols-2 gap-2 border-b border-[rgba(236,235,230,0.08)] px-5 py-3">
            <button
              type="button"
              onClick={() => setView('bag')}
              className={`min-h-[38px] rounded-lg border text-xs font-bold transition-colors ${
                view === 'bag'
                  ? 'border-[#FFD400]/70 bg-[#FFD400]/15 text-[#FFD400]'
                  : 'border-[rgba(236,235,230,0.12)] text-[#9a9890] hover:text-[#ecebe6]'
              }`}
            >
              سبد فعلی ({toPersianDigits(cart.reduce((s, i) => s + i.quantity, 0))})
            </button>
            <button
              type="button"
              onClick={() => setView('orders')}
              className={`min-h-[38px] rounded-lg border text-xs font-bold transition-colors ${
                view === 'orders'
                  ? 'border-[#FFD400]/70 bg-[#FFD400]/15 text-[#FFD400]'
                  : 'border-[rgba(236,235,230,0.12)] text-[#9a9890] hover:text-[#ecebe6]'
              }`}
            >
              سفارش‌های ثبت‌شده ({toPersianDigits(orders.length)})
            </button>
          </div>
        )}

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          {view === 'orders' ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.orderCode}
                  className="rounded-xl border border-[rgba(236,235,230,0.12)] bg-[#141412] p-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono-ltr text-xs font-bold text-[#FFD400]">
                      #{order.orderCode}
                    </span>
                    <span className="tabular-fa text-xs font-bold text-[#ecebe6]">
                      {formatToman(order.totalToman)} تومان
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-[#9a9890]">
                    {order.fullName} · {order.contact}
                  </p>
                  <ul className="mt-3 space-y-1 border-t border-[rgba(236,235,230,0.08)] pt-2.5 text-xs text-[#ecebe6]/85">
                    {order.items.map((item) => (
                      <li key={item.productId} className="flex justify-between gap-2">
                        <span>
                          {item.titleFa} × {toPersianDigits(item.quantity)}
                        </span>
                        <span className="tabular-fa text-[#9a9890]">
                          {formatToman(item.priceToman * item.quantity)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : latestOrder && cart.length === 0 ? (
            <div className="flex flex-col items-center rounded-2xl border border-[#FFD400]/35 bg-[#141412] p-6 text-center">
              <CheckCircle2 className="h-11 w-11 text-[#FFD400]" aria-hidden="true" />
              <h3 className="font-disp mt-3 text-3xl text-[#ecebe6]">سفارش با موفقیت ثبت شد.</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#9a9890]">
                کد پیگیری سفارش تو آماده است. لینک دسترسی آثار و راهنمای دریافت به ایمیل و راه
                ارتباطی‌ات ارسال می‌شود.
              </p>

              <div className="mt-5 w-full rounded-xl border border-[rgba(236,235,230,0.12)] bg-[#0b0b0a] p-4 text-right">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#9a9890]">کد پیگیری</span>
                  <span className="font-mono-ltr font-bold text-[#FFD400]">
                    #{latestOrder.orderCode}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-[#9a9890]">جمع کل</span>
                  <span className="tabular-fa font-bold text-[#ecebe6]">
                    {formatToman(latestOrder.totalToman)} تومان
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-[#9a9890]">تحویل‌گیرنده</span>
                  <span className="text-[#ecebe6]">{latestOrder.fullName}</span>
                </div>
              </div>

              <div className="mt-6 flex w-full flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setLatestOrder(null);
                    setView('orders');
                  }}
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-[rgba(236,235,230,0.2)] text-xs font-bold text-[#ecebe6] hover:border-[#FFD400] hover:text-[#FFD400]"
                >
                  <ReceiptText className="h-4 w-4" aria-hidden="true" />
                  <span>مشاهده تاریخچه سفارش‌ها</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLatestOrder(null);
                    onClose();
                  }}
                  className="min-h-[44px] w-full rounded-full bg-[#FFD400] text-sm font-black text-[#080808] hover:bg-[#ffe040]"
                >
                  ادامهٔ مرور سایت
                </button>
              </div>
            </div>
          ) : cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(236,235,230,0.14)] bg-[#141412] text-[#9a9890]">
                <ShoppingBag className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="font-disp mt-4 text-3xl text-[#ecebe6]">سبد خریدت فعلاً خالیه.</p>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#9a9890]">
                از میان کتاب‌ها، سمینارها و کتاب‌های صوتی فارسی انتخاب کن تا همین‌جا سفارش ثبت شود.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onExploreCatalog();
                }}
                className="mt-6 inline-flex min-h-[46px] items-center justify-center rounded-full bg-[#FFD400] px-6 py-2.5 text-sm font-black text-[#080808] hover:bg-[#ffe040]"
              >
                مشاهده کاتالوگ
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Itemized List */}
              <ul className="space-y-3">
                {cart.map((item) => {
                  const product = productMap.get(item.productId);
                  if (!product) return null;
                  const speaker = speakerMap.get(product.speakerId);
                  return (
                    <li
                      key={item.productId}
                      className="rounded-xl border border-[rgba(236,235,230,0.12)] bg-[#141412] p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[11px] font-medium text-[#9a9890]">
                            {product.formatLabelFa} · {speaker?.nameFa ?? 'لول‌آپ'}
                          </p>
                          <h3 className="mt-0.5 text-sm font-black text-[#ecebe6]">
                            {product.titleFa}
                          </h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.productId)}
                          aria-label={`حذف ${product.titleFa} از سبد خرید`}
                          className="rounded-lg p-1.5 text-[#9a9890] transition-colors hover:bg-[rgba(255,123,123,0.12)] hover:text-[#ff7b7b]"
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between border-t border-[rgba(236,235,230,0.08)] pt-3">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(236,235,230,0.16)] bg-[#0b0b0a] p-1">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.productId, -1)}
                            aria-label={`کاهش تعداد ${product.titleFa}`}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-[#ecebe6] hover:bg-[rgba(236,235,230,0.1)] sm:h-7 sm:w-7"
                          >
                            <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                          <span className="tabular-fa min-w-[20px] text-center text-xs font-bold text-[#ecebe6]">
                            {toPersianDigits(item.quantity)}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.productId, 1)}
                            aria-label={`افزایش تعداد ${product.titleFa}`}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-[#ecebe6] hover:bg-[rgba(236,235,230,0.1)] sm:h-7 sm:w-7"
                          >
                            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                        </div>

                        <p className="tabular-fa text-sm font-black text-[#ecebe6]">
                          {formatToman(product.priceToman * item.quantity)}{' '}
                          <span className="text-[11px] font-medium text-[#9a9890]">تومان</span>
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Subtotal Summary */}
              <div className="flex items-center justify-between rounded-xl border border-[rgba(236,235,230,0.14)] bg-[#141412] px-4 py-3.5">
                <span className="text-sm font-bold text-[#9a9890]">جمع کل سفارش</span>
                <span className="tabular-fa text-lg font-black text-[#FFD400]">
                  {formatToman(subtotal)} <span className="text-xs font-medium text-[#9a9890]">تومان</span>
                </span>
              </div>

              {/* Order Request Checkout Form */}
              <form
                onSubmit={handleCheckoutSubmit}
                noValidate
                className="space-y-3.5 border-t border-[rgba(236,235,230,0.1)] pt-5"
              >
                <p className="text-xs font-bold text-[#ecebe6]">اطلاعات دریافت و ثبت سفارش</p>

                <div>
                  <label htmlFor="checkout-name" className="mb-1 block text-xs text-[#9a9890]">
                    نام و نام خانوادگی
                  </label>
                  <input
                    id="checkout-name"
                    type="text"
                    value={form.fullName}
                    onChange={(e) => {
                      setForm({ ...form, fullName: e.target.value });
                      if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                    }}
                    placeholder="مثلاً: علی رضایی"
                    aria-invalid={Boolean(errors.fullName)}
                    className={`min-h-[44px] w-full rounded-xl border bg-[#0b0b0a] px-3.5 text-base text-[#ecebe6] placeholder:text-[#9a9890]/60 focus:outline-none sm:text-sm ${
                      errors.fullName
                        ? 'border-[#ff7b7b]'
                        : 'border-[rgba(236,235,230,0.16)] focus:border-[#FFD400]'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-[#ff7b7b]" role="alert">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="checkout-contact" className="mb-1 block text-xs text-[#9a9890]">
                    شماره موبایل یا آیدی تلگرام
                  </label>
                  <input
                    id="checkout-contact"
                    type="text"
                    value={form.contact}
                    onChange={(e) => {
                      setForm({ ...form, contact: e.target.value });
                      if (errors.contact) setErrors({ ...errors, contact: undefined });
                    }}
                    placeholder="09123456789 / @username"
                    aria-invalid={Boolean(errors.contact)}
                    className={`font-mono-ltr min-h-[44px] w-full rounded-xl border bg-[#0b0b0a] px-3.5 text-left text-base text-[#ecebe6] placeholder:text-[#9a9890]/60 focus:outline-none sm:text-sm ${
                      errors.contact
                        ? 'border-[#ff7b7b]'
                        : 'border-[rgba(236,235,230,0.16)] focus:border-[#FFD400]'
                    }`}
                  />
                  {errors.contact && (
                    <p className="mt-1 text-xs text-[#ff7b7b]" role="alert">
                      {errors.contact}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="checkout-email" className="mb-1 block text-xs text-[#9a9890]">
                    ایمیل برای ارسال لینک دانلود و رسید
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    inputMode="email"
                    value={form.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    placeholder="you@example.com"
                    aria-invalid={Boolean(errors.email)}
                    className={`font-mono-ltr min-h-[44px] w-full rounded-xl border bg-[#0b0b0a] px-3.5 text-left text-base text-[#ecebe6] placeholder:text-[#9a9890]/60 focus:outline-none sm:text-sm ${
                      errors.email
                        ? 'border-[#ff7b7b]'
                        : 'border-[rgba(236,235,230,0.16)] focus:border-[#FFD400]'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-[#ff7b7b]" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="mt-2 min-h-[48px] w-full rounded-full bg-[#FFD400] px-6 py-3 text-sm font-black text-[#080808] transition-colors hover:bg-[#ffe040]"
                >
                  ثبت درخواست سفارش ({formatToman(subtotal)} تومان)
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
