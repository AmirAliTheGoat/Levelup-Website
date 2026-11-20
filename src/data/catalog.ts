export type ProductFormat = 'book' | 'course' | 'audio';

export interface Speaker {
  id: string;
  slug: string;
  nameFa: string;
  nameEn: string;
  roleFa: string;
  taglineFa: string;
  quoteFa: string;
  bioFa: string;
  portraitUrl: string | null;
  isOriginal: boolean;
  isLogo?: boolean;
  portraitCropClass?: string;
  yearsOrTag: string;
  instagramPostViews: string;
}

export interface Product {
  id: string;
  speakerId: string;
  format: ProductFormat;
  formatLabelFa: string;
  titleFa: string;
  titleEn: string;
  subtitleFa: string;
  descriptionFa: string;
  highlightsFa: string[];
  metaText: string;
  priceToman: number;
  featured: boolean;
  curationNoteFa: string;
  accentStyle: 'obsidian' | 'amber' | 'steel';
  externalBuyUrl?: string;
}

export interface ClipItem {
  id: string;
  speakerId: string;
  indexLabel: string;
  titleFa: string;
  titleEn: string;
  duration: string;
  viewsLabel: string;
  takeawayFa: string;
  relatedProductId: string;
  instagramUrl: string;
}

export const FORMAT_LABELS: Record<ProductFormat | 'all', string> = {
  all: 'همهٔ فرمت‌ها',
  book: 'کتاب',
  course: 'دوره و سمینار',
  audio: 'کتاب صوتی',
};

export const SPEAKERS: Speaker[] = [
  {
    id: 'goggins',
    slug: 'goggins',
    nameFa: 'دیوید گاگینز',
    nameEn: 'DAVID GOGGINS',
    roleFa: 'ورزشکار فوق‌استقامت و نویسنده',
    taglineFa: 'پوست‌کلفت کردن ذهن',
    quoteFa: '«وقتی ذهنت می‌گه تموم شدی، تازه به ۴۰ درصد توانت رسیدی.»',
    bioFa: 'قانون ۴۰ درصد، مقابلهٔ بی‌تعارف با بهانه‌ها و ساختن استقامت ذهنی در سخت‌ترین لحظه‌ها؛ ترجمه و تدوین اختصاصی برای مخاطب فارسی.',
    portraitUrl: '/assets/aistudio/image_382a53cd.png',
    isOriginal: false,
    portraitCropClass: 'object-cover object-[center_20%] grayscale contrast-115',
    yearsOrTag: 'استقامت ذهنی',
    instagramPostViews: '۲۱۰K',
  },
  {
    id: 'jocko',
    slug: 'jocko',
    nameFa: 'جاکو ویلینک',
    nameEn: 'JOCKO WILLINK',
    roleFa: 'فرمانده سابق و مدرس رهبری',
    taglineFa: 'نظم مساوی است با آزادی',
    quoteFa: '«نظم، آزادی می‌آورد؛ از چهار و نیم صبح بازی شروع می‌شود.»',
    bioFa: 'اصول مالکیت مطلق، تصمیم‌گیری تحت فشار و نظم روزانه؛ مجموعه‌ای از کتاب‌ها و کارگاه‌های برگزیده با بومی‌سازی کامل فارسی.',
    portraitUrl: '/assets/aistudio/image_314c8935.png',
    isOriginal: false,
    portraitCropClass: 'object-cover object-[center_18%] grayscale contrast-115',
    yearsOrTag: 'نظم و رهبری',
    instagramPostViews: '۱۸۵K',
  },
  {
    id: 'bruce-lee',
    slug: 'bruce-lee',
    nameFa: 'بروس لی',
    nameEn: 'BRUCE LEE',
    roleFa: 'استاد هنرهای رزمی و فیلسوف',
    taglineFa: 'بی‌شکل و سازگار مثل آب',
    quoteFa: '«مثل آب باش رفیق؛ هر ظرفی می‌ریزی شکل همون رو بگیر و جریان پیدا کن.»',
    bioFa: 'فلسفهٔ تمرکز، خودشناسی و تسلط بر ذهن و بدن از پرمخاطب‌ترین چهرهٔ صفحهٔ @levelup.farsi با بیش از یک میلیون بازدید.',
    portraitUrl: '/assets/aistudio/image_896d9571.png',
    isOriginal: false,
    portraitCropClass: 'object-cover object-[center_14%] scale-[1.12] grayscale contrast-125',
    yearsOrTag: 'فلسفه و تسلط',
    instagramPostViews: '1M',
  },
  {
    id: 'brian-tracy',
    slug: 'brian-tracy',
    nameFa: 'برایان تریسی',
    nameEn: 'BRIAN TRACY',
    roleFa: 'مشاور بهره‌وری و نویسنده',
    taglineFa: 'سیستم‌های عملی رشد و هدف‌گذاری',
    quoteFa: '«بهانه‌ای در کار نیست؛ کلید موفقیت، انجام کار سخت‌ترین در اول صبح است.»',
    bioFa: 'چارچوب‌های امتحان‌پس‌داده برای مدیریت زمان، فروش، تمرکز عمیق و ساخت عادت‌های ماندگار به زبان ساده و کاربردی.',
    portraitUrl: '/assets/aistudio/image_52c62762.png',
    isOriginal: false,
    portraitCropClass: 'object-cover object-[center_16%] grayscale contrast-115',
    yearsOrTag: 'بهره‌وری و هدف',
    instagramPostViews: '۱۵۹K',
  },
  {
    id: 'denzel',
    slug: 'denzel',
    nameFa: 'دنزل واشینگتن',
    nameEn: 'DENZEL WASHINGTON',
    roleFa: 'بازیگر و سخنران الهام‌بخش',
    taglineFa: 'رو به جلو زمین بخور',
    quoteFa: '«رویا بدون هدف فقط آرزوست؛ تعهدِ هرروزه است که تو را می‌سازد.»',
    bioFa: 'سخنرانی‌های ماندگار دربارهٔ شجاعت شکست، ثبات قدم و مسئولیت‌پذیری شخصی؛ تدوین‌شده در قالب کتابچه و مجموعهٔ صوتی فارسی.',
    portraitUrl: '/assets/aistudio/image_38556906.png',
    isOriginal: false,
    portraitCropClass: 'object-cover object-[22%_14%] scale-[1.16] grayscale contrast-115',
    yearsOrTag: 'تعهد و شخصیت',
    instagramPostViews: '۱۲۰K',
  },
  {
    id: 'originals',
    slug: 'originals',
    nameFa: 'اورجینال‌های لول‌آپ',
    nameEn: 'LEVEL UP ORIGINALS',
    roleFa: 'مجموعهٔ اختصاصی تیم @levelup.farsi',
    taglineFa: 'سیستمی برای رشد واقعی',
    quoteFa: '«فقط خوب بودن کافی نیست؛ باید سیستمی بسازی که در روزهای سخت هم نگهت دارد.»',
    bioFa: 'کتاب‌ها، دفترچه‌های اجرایی و دوره‌های ویدیویی تولیدشده توسط تیم لول‌آپ فارسی — طراحی‌شده از پایه برای سبک زندگی و چالش‌های مخاطب ایرانی.',
    portraitUrl: '/assets/aistudio/image_4e81c6ee.png',
    isOriginal: true,
    isLogo: true,
    yearsOrTag: 'تولید اختصاصی',
    instagramPostViews: '۱۸۵K',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'goggins-book-1',
    speakerId: 'goggins',
    format: 'book',
    formatLabelFa: 'کتاب',
    titleFa: 'نمی‌تونی به من آسیب بزنی',
    titleEn: "CAN'T HURT ME",
    subtitleFa: 'چطور ذهنِ خودت را رام کنی و سقفِ نامرئی‌ات را بشکنی.',
    descriptionFa: 'نسخهٔ ویراسته‌شده و بومی‌سازی‌شدهٔ فارسی با ۱۰ چالش عملیِ پایان هر فصل، تمرین‌های آینهٔ مسئولیت‌پذیری و خلاصهٔ اجرایی قانون ۴۰ درصد.',
    highlightsFa: [
      '۱۰ چالش عملی گام‌به‌گام برای شکستن منطقهٔ امن',
      'فصل ویژهٔ «آینهٔ حقیقت» برای حذف بهانه‌تراشی',
      'ویرایش روان فارسی همراه با کاربرگ‌های قابل چاپ',
    ],
    metaText: '۳۶۰ صفحه · نسخهٔ دیجیتال و چاپی',
    priceToman: 329000,
    featured: true,
    curationNoteFa: 'نسخهٔ فارسی ویراسته‌شده با راهنمای اجرایی لول‌آپ',
    accentStyle: 'obsidian',
  },
  {
    id: 'goggins-audio-1',
    speakerId: 'goggins',
    format: 'audio',
    formatLabelFa: 'کتاب صوتی',
    titleFa: 'هرگز تمام نشو',
    titleEn: 'NEVER FINISHED',
    subtitleFa: 'روایت صوتیِ پرانرژی برای تمرین، پیاده‌روی و صبح‌های سخت.',
    descriptionFa: 'کتاب صوتی کامل با اجرای راوی حرفه‌ای و صدابرداری استودیویی؛ همراه با مکث‌های تحلیلی برای پیاده‌سازی در زندگی روزمره.',
    highlightsFa: [
      '۷ ساعت و ۴۰ دقیقه روایت استودیویی بی‌وقفه',
      'فصل‌بندی دقیق برای گوش دادن هنگام تمرین ورزشی',
      'دسترسی همیشگی و قابلیت دانلود آفلاین',
    ],
    metaText: '۷ ساعت و ۴۰ دقیقه · صوتی',
    priceToman: 219000,
    featured: false,
    curationNoteFa: 'تولید صوتی اختصاصی با استاندارد استودیویی',
    accentStyle: 'steel',
  },
  {
    id: 'jocko-book-1',
    speakerId: 'jocko',
    format: 'book',
    formatLabelFa: 'کتاب',
    titleFa: 'مالکیت مطلق',
    titleEn: 'EXTREME OWNERSHIP',
    subtitleFa: 'مسئولیتِ صددرصدِ نتایج را بپذیر؛ بهانه را برای همیشه خط بزن.',
    descriptionFa: 'چارچوب عملی رهبری فردی و تیمی بر پایهٔ تجربیات واقعی؛ یاد می‌گیری چطور بدون سرزنش شرایط، کنترل کامل مسیرت را به دست بگیری.',
    highlightsFa: [
      '۱۲ اصل کلیدی مسئولیت‌پذیری و رهبری خود',
      'مثال‌های کاربردی در کسب‌وکار و نظم شخصی',
      'خلاصهٔ یک‌صفحه‌ای در پایان هر فصل برای مرور سریع',
    ],
    metaText: '۳۱۰ صفحه · جلد سخت و PDF',
    priceToman: 315000,
    featured: true,
    curationNoteFa: 'ترجمه و تدوین اختصاصی برای مخاطب فارسی',
    accentStyle: 'obsidian',
  },
  {
    id: 'jocko-course-1',
    speakerId: 'jocko',
    format: 'course',
    formatLabelFa: 'دوره و سمینار',
    titleFa: 'سمینار نظمِ ۴:۳۰ صبح',
    titleEn: 'DISCIPLINE EQUALS FREEDOM',
    subtitleFa: 'کارگاه عملی ساخت روتین بی‌نقص و تصمیم‌گیری بدون تردید.',
    descriptionFa: 'مجموعهٔ ۱۰ جلسهٔ ویدیویی با زیرنویس و دوبلهٔ تخصصی فارسی، شامل نقشهٔ ۳۰ روزهٔ ساخت عادت‌های پایدار بدون تکیه بر انگیزهٔ لحظه‌ای.',
    highlightsFa: [
      '۱۰ جلسهٔ ویدیویی فشرده و بدون حاشیه',
      'برنامهٔ ۳۰ روزهٔ بیداری، تمرین و کار عمیق',
      'دسترسی مادام‌العمر از موبایل و دسکتاپ',
    ],
    metaText: '۱۰ ویدیو · دسترسی همیشگی',
    priceToman: 540000,
    featured: false,
    curationNoteFa: 'دورهٔ منتخب با بومی‌سازی و تمرین‌های فارسی',
    accentStyle: 'amber',
  },
  {
    id: 'bruce-book-1',
    speakerId: 'bruce-lee',
    format: 'book',
    formatLabelFa: 'کتاب',
    titleFa: 'مثل آب باش',
    titleEn: 'BE WATER, MY FRIEND',
    subtitleFa: 'فلسفهٔ انعطاف، حضور ذهن و قدرتِ آرام از یادداشت‌های بروس لی.',
    descriptionFa: 'مجموعه‌ای ماندگار از آموزه‌های ذهنی و فلسفی بروس لی برای رسیدن به آرامش در عین قدرت؛ مناسب کسانی که به دنبال تمرکز عمیق و تسلط بر خود هستند.',
    highlightsFa: [
      'گزیدهٔ یادداشت‌های شخصی و فلسفهٔ جیت‌کاندو',
      'تمرین‌های روزانه برای آرامش ذهن زیر فشار',
      'طراحی تایپوگرافی اختصاصی نسخهٔ کلکسیونی لول‌آپ',
    ],
    metaText: '۲۵۶ صفحه · نسخهٔ کلکسیونی',
    priceToman: 289000,
    featured: true,
    curationNoteFa: 'تدوین کلکسیونی فارسی با یادداشت‌های تحلیلی',
    accentStyle: 'amber',
  },
  {
    id: 'bruce-audio-1',
    speakerId: 'bruce-lee',
    format: 'audio',
    formatLabelFa: 'کتاب صوتی',
    titleFa: 'هنرِ بیانِ بدن و ذهن',
    titleEn: 'ART OF EXPRESSING THE BODY',
    subtitleFa: 'مجموعهٔ صوتی تمرکز، تنفس و آمادگی ذهنی قبل از هر چالش.',
    descriptionFa: 'پنج ساعت روایت عمیق از روش‌های تمرینی و ذهنی بروس لی؛ طراحی‌شده برای گوش دادن پیش از شروع کارهای مهم یا جلسات تمرین.',
    highlightsFa: [
      '۵ ساعت و ۱۵ دقیقه محتوای صوتی برگزیده',
      '۱۵ قطعهٔ کوتاه ۳ دقیقه‌ای برای بازتنظیم تمرکز',
      'همراه با فایل PDF خلاصهٔ نقل‌قول‌های کلیدی',
    ],
    metaText: '۵ ساعت و ۱۵ دقیقه · صوتی',
    priceToman: 199000,
    featured: false,
    curationNoteFa: 'تولید صوتی فارسی اختصاصی لول‌آپ',
    accentStyle: 'obsidian',
  },
  {
    id: 'tracy-book-1',
    speakerId: 'brian-tracy',
    format: 'book',
    formatLabelFa: 'کتاب',
    titleFa: 'قورباغه‌ات را قورت بده',
    titleEn: 'EAT THAT FROG',
    subtitleFa: '۲۱ روش ساده و سریع برای غلبه بر اهمال‌کاری و دو برابر کردن خروجی.',
    descriptionFa: 'کلاسیک بی‌رقیب مدیریت زمان با ویرایش مدرن فارسی و کاربرگ اولویت‌بندی روزانه؛ مخصوص افرادی که می‌خواهند از فردا واقعاً کارهای مهم را تمام کنند.',
    highlightsFa: [
      '۲۱ تکنیک فوری ضد اهمال‌کاری و حواس‌پرتی',
      'جدول اولویت‌بندی ABCDE برای برنامه‌ریزی روزانه',
      'قابل مطالعه و اجرا در یک آخر هفته',
    ],
    metaText: '۱۹۰ صفحه · نسخهٔ کاربردی',
    priceToman: 245000,
    featured: false,
    curationNoteFa: 'ویرایش مدرن فارسی با کاربرگ‌های اجرایی',
    accentStyle: 'steel',
  },
  {
    id: 'tracy-course-1',
    speakerId: 'brian-tracy',
    format: 'course',
    formatLabelFa: 'دوره و سمینار',
    titleFa: 'سمینار هدف‌گذاریِ بی‌بهانه',
    titleEn: 'NO EXCUSES SEMINAR',
    subtitleFa: 'سیستم ۱۲ مرحله‌ای تبدیل هدف‌های روی کاغذ به برنامهٔ هفتگی.',
    descriptionFa: 'سمینار جامع مدیریت زمان و هدف‌گذاری با دوبله و زیرنویس دقیق فارسی؛ شامل قالب‌های آمادهٔ برنامه‌ریزی فصلی و هفتگی.',
    highlightsFa: [
      '۸ جلسهٔ سمینار تصویری با کیفیت HD',
      'سیستم ۱۲ مرحله‌ای طراحی نقشهٔ سالانه',
      'چک‌لیست هفتگی ارزیابی پیشرفت شخصی',
    ],
    metaText: '۸ ویدیو · همراه با کاربرگ',
    priceToman: 460000,
    featured: false,
    curationNoteFa: 'سمینار برگزیده با بومی‌سازی کامل فارسی',
    accentStyle: 'obsidian',
  },
  {
    id: 'denzel-audio-1',
    speakerId: 'denzel',
    format: 'audio',
    formatLabelFa: 'کتاب صوتی',
    titleFa: 'رو به جلو زمین بخور',
    titleEn: 'FALL FORWARD',
    subtitleFa: 'مجموعهٔ صوتی سخنرانی‌های ماندگار دربارهٔ شجاعت، ایمان و تداوم.',
    descriptionFa: 'گزیدهٔ بهترین سخنرانی‌ها و گفت‌وگوهای دنزل واشینگتن با ترجمهٔ ادبی، روایت گرم فارسی و تحلیل کاربردی هر بخش.',
    highlightsFa: [
      '۳ ساعت و ۵۰ دقیقه روایت سینمایی با موسیقی مینیمال',
      'شامل سخنرانی مشهور دانشگاه پنسیلوانیا با تحلیل کامل',
      'مناسب برای شروع روز با ذهنیت آرام و مصمم',
    ],
    metaText: '۳ ساعت و ۵۰ دقیقه · صوتی',
    priceToman: 185000,
    featured: false,
    curationNoteFa: 'تدوین و روایت اختصاصی تیم لول‌آپ فارسی',
    accentStyle: 'steel',
  },
  {
    id: 'originals-course-1',
    speakerId: 'originals',
    format: 'course',
    formatLabelFa: 'دوره و سمینار',
    titleFa: 'سیستمِ رشدِ ۹۰ روزه',
    titleEn: '90-DAY GROWTH SYSTEM',
    subtitleFa: 'دورهٔ پرچم‌دار @levelup.farsi برای ساختن نسخهٔ برترِ خودت.',
    descriptionFa: 'چکیدهٔ ده‌ها کتاب، سمینار و تجربهٔ واقعی در یک سیستم ساده و قابل اجرا؛ بدون شعارهای توخالی، با تمرین‌های هفتگیِ واقعی برای نظم، تمرکز و انرژی.',
    highlightsFa: [
      '۱۲ جلسهٔ ویدیویی اختصاصی به زبان فارسی',
      'قالب آمادهٔ پیگیری عادت‌ها و روتین صبحگاهی',
      'نقشهٔ عملی خروج از سردرگمی در ۹۰ روز',
    ],
    metaText: '۱۲ ویدیو · دسترسی همیشگی',
    priceToman: 490000,
    featured: true,
    curationNoteFa: 'تولید اورجینال و انحصاری تیم @levelup.farsi',
    accentStyle: 'amber',
  },
  {
    id: 'originals-book-1',
    speakerId: 'originals',
    format: 'book',
    formatLabelFa: 'کتاب',
    titleFa: 'آتشِ خاموش',
    titleEn: 'THE QUIET FIRE',
    subtitleFa: 'چطور بدون داد زدن و هیاهو، آرام اما شکست‌ناپذیر پیش بروی.',
    descriptionFa: 'کتابچهٔ مانیفست لول‌آپ فارسی: دربارهٔ قدرتِ سکوت، پیشرفتِ آرامِ هرروزه و ساختن ثباتی که به تایید دیگران وابسته نیست.',
    highlightsFa: [
      '۲۴۰ صفحه متن کوتاه، ضرباهنگ‌دار و بی‌حاشیه',
      '۴۰ اصل عملی برای روزهای بی‌انگیزگی و فشار',
      'همراه با نسخهٔ دیجیتال برای مطالعه در موبایل',
    ],
    metaText: '۲۴۰ صفحه · اورجینال لول‌آپ',
    priceToman: 279000,
    featured: true,
    curationNoteFa: 'نوشته و طراحی اختصاصی @levelup.farsi',
    accentStyle: 'obsidian',
  },
  {
    id: 'originals-audio-1',
    speakerId: 'originals',
    format: 'audio',
    formatLabelFa: 'کتاب صوتی',
    titleFa: 'آرام‌تر پیش برو',
    titleEn: 'GO SLOWER, MOVE FORWARD',
    subtitleFa: '۱۰ گفتار صوتی کوتاه برای شب‌هایی که ذهنت شلوغ است.',
    descriptionFa: 'الهام‌گرفته از یکی از پربازدیدترین پست‌های صفحهٔ @levelup.farsi؛ ده گفتار صوتی عمیق دربارهٔ عجله نکردن، تمرکز بر یک قدم بعدی و حفظ آرامش.',
    highlightsFa: [
      '۱۰ اپیزود ۱۵ دقیقه‌ای با کیفیت استودیویی',
      'طراحی‌شده برای گوش دادن قبل از خواب یا در مسیر',
      'شامل متن کامل همهٔ گفتارها در فایل ضمیمه',
    ],
    metaText: '۲ ساعت و ۳۰ دقیقه · صوتی',
    priceToman: 169000,
    featured: false,
    curationNoteFa: 'تولید اورجینال و اختصاصی @levelup.farsi',
    accentStyle: 'amber',
  },
];

export const CLIPS: ClipItem[] = [
  {
    id: 'clip-bruce-1',
    speakerId: 'bruce-lee',
    indexLabel: '01',
    titleFa: 'مثل آب باش؛ انعطاف در اوج قدرت',
    titleEn: 'BE WATER, MY FRIEND',
    duration: '0:54',
    viewsLabel: '1M',
    takeawayFa: 'سخت‌ترین درخت در طوفان می‌شکند، اما آب راهش را پیدا می‌کند. به جای جنگیدن با شرایط غیرقابل تغییر، انرژی‌ات را صرف سازگاری هوشمندانه و حرکت مداوم کن.',
    relatedProductId: 'bruce-book-1',
    instagramUrl: 'https://instagram.com/levelup.farsi',
  },
  {
    id: 'clip-originals-1',
    speakerId: 'originals',
    indexLabel: '02',
    titleFa: 'آرام‌تر پیش برو، اما هرگز متوقف نشو',
    titleEn: 'GO SLOWER, MOVE FORWARD',
    duration: '0:42',
    viewsLabel: '185.7K',
    takeawayFa: 'عجله باعث فرسودگی می‌شود؛ تداومِ آرام اما هرروزه تو را از ۹۹ درصد بقیه جلو می‌اندازد. امروز فقط یک کار مهم را با کیفیت کامل تمام کن.',
    relatedProductId: 'originals-audio-1',
    instagramUrl: 'https://instagram.com/levelup.farsi',
  },
  {
    id: 'clip-goggins-1',
    speakerId: 'goggins',
    indexLabel: '03',
    titleFa: 'هیچ محدودیتی وجود ندارد',
    titleEn: 'THE 40% RULE',
    duration: '1:08',
    viewsLabel: '85.5K',
    takeawayFa: 'مغز برای محافظت از تو زودتر از موعد آلارم خستگی می‌دهد. وقتی فکر می‌کنی دیگر توانی نداری، یک قدمِ دیگر بردار؛ همان‌جا هویت جدیدت ساخته می‌شود.',
    relatedProductId: 'goggins-book-1',
    instagramUrl: 'https://instagram.com/levelup.farsi',
  },
  {
    id: 'clip-jocko-1',
    speakerId: 'jocko',
    indexLabel: '04',
    titleFa: 'نظم در روزهایی که حسش نیست',
    titleEn: 'DISCIPLINE OVER MOOD',
    duration: '0:56',
    viewsLabel: '52K',
    takeawayFa: 'منتظر انگیزه نمان؛ انگیزه مهمانِ غیرقابل‌اعتماد است. سیستمی بچین که حتی در بی‌حال‌ترین صبحِ هفته، کارِ ضروری روی زمین نماند.',
    relatedProductId: 'jocko-course-1',
    instagramUrl: 'https://instagram.com/levelup.farsi',
  },
  {
    id: 'clip-tracy-1',
    speakerId: 'brian-tracy',
    indexLabel: '05',
    titleFa: 'قانون اولین ساعتِ روز',
    titleEn: 'OWN THE FIRST HOUR',
    duration: '1:18',
    viewsLabel: '44K',
    takeawayFa: 'اگر سخت‌ترین و اثرگذارترین کار روزت را در همان ۹۰ دقیقهٔ اول صبح انجام دهی، باقی روز با آرامش و اعتمادبه‌نفس پیش می‌رود.',
    relatedProductId: 'tracy-book-1',
    instagramUrl: 'https://instagram.com/levelup.farsi',
  },
  {
    id: 'clip-denzel-1',
    speakerId: 'denzel',
    indexLabel: '06',
    titleFa: 'رو به جلو زمین بخور و دوباره بلند شو',
    titleEn: 'FALL FORWARD',
    duration: '1:04',
    viewsLabel: '38K',
    takeawayFa: 'شکست خوردن نشانهٔ ضعف نیست؛ نشانهٔ این است که وارد میدان شده‌ای. هر بار که زمین می‌خوری، رو به جلو بیفت و با تجربهٔ بیشتر بلند شو.',
    relatedProductId: 'denzel-audio-1',
    instagramUrl: 'https://instagram.com/levelup.farsi',
  },
];

export function getSpeakerById(id: string): Speaker | undefined {
  return SPEAKERS.find((s) => s.id === id);
}

export function getSpeakerBySlug(slug: string): Speaker | undefined {
  return SPEAKERS.find((s) => s.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
