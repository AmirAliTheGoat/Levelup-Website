import { useState, type FormEvent } from 'react';
import { ArrowUp } from 'lucide-react';
import { validateEmail } from '../utils/catalog';

interface ClosingLeadSceneProps {
  onGoToCatalog: () => void;
  onGoToSpeakers: () => void;
  onBackToTop: () => void;
  leadEndpoint?: string;
}

const LEADS_STORAGE_KEY = 'lu_leads';

export function ClosingLeadScene({
  onGoToCatalog,
  onGoToSpeakers,
  onBackToTop,
  leadEndpoint = '',
}: ClosingLeadSceneProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'ok' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = validateEmail(email);
    if (!res.ok) {
      setStatus('error');
      setMessage(res.error ?? 'فرمت ایمیل معتبر نیست.');
      return;
    }

    let existing: string[] = [];
    try {
      const raw = window.localStorage.getItem(LEADS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          existing = parsed.map((v) => String(v).toLowerCase());
        }
      }
    } catch {
      existing = [];
    }

    if (existing.includes(res.normalized)) {
      setStatus('ok');
      setMessage('این ایمیل قبلاً در خبرنامه ثبت شده؛ از بودنت خوشحالیم.');
      setEmail('');
      return;
    }

    setStatus('submitting');
    setMessage('');

    try {
      if (leadEndpoint) {
        const resp = await fetch(leadEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ email: res.normalized, source: 'levelup.farsi' }),
        });
        if (!resp.ok) {
          throw new Error('Failed to post lead');
        }
      }

      const updated = [...existing, res.normalized];
      try {
        window.localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        /* ignore storage quota errors */
      }

      setStatus('ok');
      setMessage('ثبت شد. نکته‌های هفتگی و خبر آثار جدید به ایمیلت میاد.');
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('خطا در ارسال؛ لطفاً یک لحظه بعد دوباره تلاش کن.');
    }
  };

  return (
    <section
      id="closing"
      aria-label="قدم آخر و عضویت در خبرنامه"
      className="relative scroll-mt-14 overflow-hidden border-t border-[rgba(236,235,230,0.09)] py-14 md:scroll-mt-16 md:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 42% 48% at 50% 42%, rgba(255,212,0,0.07), rgba(255,255,255,0.05) 40%, transparent 72%)',
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-5 text-center md:px-10">
        <p className="text-sm font-medium text-[#9a9890]">۰۴. قدمِ آخر</p>

        <h2 className="font-disp mt-2 text-5xl leading-[1.12] text-[#ecebe6] md:text-7xl">
          حالا نوبتِ توئه<span className="text-[#FFD400]">.</span>
        </h2>

        <p className="mt-4 max-w-md text-base leading-relaxed text-[#9a9890]">
          یکی از سخنرانان یا آثار فارسی رو انتخاب کن؛ بقیه‌ش با استمرارِ هرروزهٔ خودته.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={onGoToCatalog}
            className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-[#FFD400] px-7 py-2.5 text-sm font-black text-[#080808] transition-colors hover:bg-[#ffe040]"
          >
            شروع از کاتالوگ ←
          </button>
          <button
            type="button"
            onClick={onGoToSpeakers}
            className="border-b border-[rgba(236,235,230,0.28)] py-2 text-sm font-bold text-[#9a9890] transition-colors hover:border-[#FFD400] hover:text-[#ecebe6]"
          >
            انتخاب سخنران دیگر
          </button>
        </div>

        {/* Email Lead Capture Form */}
        <div className="mt-10 w-full max-w-md border-t border-[rgba(236,235,230,0.12)] pt-8">
          <p id="lead-desc" className="text-sm leading-relaxed text-[#9a9890]">
            ایمیلت رو بگذار تا نکته‌های هفتگی و زمان انتشار کتاب‌ها و سمینارهای جدید رو اول از همه
            بگیری.
          </p>

          <form
            id="lead-form"
            onSubmit={handleSubmit}
            noValidate
            data-endpoint={leadEndpoint}
            aria-describedby="lead-desc lead-msg"
            className={`mt-4 flex flex-col gap-2 rounded-2xl border p-2 transition-colors sm:flex-row sm:items-stretch sm:rounded-full sm:p-1.5 ${
              status === 'error'
                ? 'border-[#ff7b7b]/75 bg-[rgba(255,123,123,0.06)]'
                : status === 'ok'
                  ? 'border-[#FFD400]/55 bg-[rgba(255,212,0,0.05)]'
                  : 'border-[rgba(236,235,230,0.18)] bg-[rgba(236,235,230,0.04)] focus-within:border-[#FFD400]/75'
            }`}
          >
            <label htmlFor="lead-email" className="sr-only">
              آدرس ایمیل
            </label>
            <input
              id="lead-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') {
                  setStatus('idle');
                  setMessage('');
                }
              }}
              placeholder="you@example.com"
              aria-invalid={status === 'error'}
              required
              className="font-mono-ltr min-h-[44px] flex-1 bg-transparent px-4 text-center text-base text-[#ecebe6] placeholder:text-[#9a9890]/75 focus:outline-none sm:text-left sm:text-sm"
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="min-h-[44px] shrink-0 rounded-xl border border-[#FFD400]/55 bg-[#FFD400]/14 px-6 text-sm font-bold text-[#FFD400] transition-colors hover:bg-[#FFD400] hover:text-[#080808] disabled:opacity-60 sm:rounded-full"
            >
              {status === 'submitting' ? 'در حال ثبت...' : 'عضویت'}
            </button>
          </form>

          <p
            id="lead-msg"
            role="status"
            aria-live="polite"
            className={`mt-3 min-h-[1.4em] text-xs font-medium ${
              status === 'error'
                ? 'text-[#ff7b7b]'
                : status === 'ok'
                  ? 'text-[#FFD400]'
                  : 'text-[#9a9890]'
            }`}
          >
            {message}
          </p>
        </div>

        <button
          type="button"
          onClick={onBackToTop}
          className="mt-10 inline-flex items-center gap-2 text-xs font-medium text-[#9a9890] transition-colors hover:text-[#ecebe6]"
        >
          <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          <span>برگرد به بالا</span>
        </button>
      </div>
    </section>
  );
}
