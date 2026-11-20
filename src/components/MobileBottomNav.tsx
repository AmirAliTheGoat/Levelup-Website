import { BookOpen, Film, Mail, Users } from 'lucide-react';

interface MobileBottomNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const ITEMS = [
  { id: 'speakers', label: 'سخنرانان', icon: Users },
  { id: 'catalog', label: 'کاتالوگ', icon: BookOpen },
  { id: 'clips', label: 'کلیپ‌ها', icon: Film },
  { id: 'closing', label: 'خبرنامه', icon: Mail },
] as const;

export function MobileBottomNav({ activeSection, onNavigate }: MobileBottomNavProps) {
  return (
    <nav
      aria-label="ناوبری سریع موبایل"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[rgba(236,235,230,0.12)] bg-[#080808]/92 backdrop-blur-md md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="grid h-16 grid-cols-4 items-center px-2">
        {ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              aria-current={isActive ? 'location' : undefined}
              className={`relative flex min-h-[48px] flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-bold transition-colors active:scale-95 ${
                isActive ? 'text-[#FFD400]' : 'text-[#9a9890]'
              }`}
            >
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute top-0 h-[2px] w-8 rounded-full bg-[#FFD400]"
                />
              )}
              <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
