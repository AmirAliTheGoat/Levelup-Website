import test from 'node:test';
import assert from 'node:assert/strict';
import {
  toPersianDigits,
  formatToman,
  filterProducts,
  addToCart,
  updateCartQty,
  removeFromCart,
  calculateCartCount,
  calculateCartTotal,
  validateEmail,
  validateCheckout,
  generateOrderCode,
  parseSpeakerHash,
} from './catalog';
import type { Product } from '../data/catalog';

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'p1',
    speakerId: 'goggins',
    format: 'book',
    formatLabelFa: 'کتاب',
    titleFa: 'نمی‌تونی به من آسیب بزنی',
    titleEn: "CAN'T HURT ME",
    subtitleFa: 'استقامت ذهنی',
    descriptionFa: 'desc',
    highlightsFa: [],
    metaText: '360p',
    priceToman: 329000,
    featured: true,
    curationNoteFa: 'note',
    accentStyle: 'obsidian',
  },
  {
    id: 'p2',
    speakerId: 'jocko',
    format: 'course',
    formatLabelFa: 'دوره و سمینار',
    titleFa: 'سمینار نظم',
    titleEn: 'DISCIPLINE',
    subtitleFa: 'نظم روزانه',
    descriptionFa: 'desc',
    highlightsFa: [],
    metaText: '10v',
    priceToman: 540000,
    featured: false,
    curationNoteFa: 'note',
    accentStyle: 'amber',
  },
  {
    id: 'p3',
    speakerId: 'goggins',
    format: 'audio',
    formatLabelFa: 'کتاب صوتی',
    titleFa: 'هرگز تمام نشو',
    titleEn: 'NEVER FINISHED',
    subtitleFa: 'روایت صوتی',
    descriptionFa: 'desc',
    highlightsFa: [],
    metaText: '7h',
    priceToman: 219000,
    featured: false,
    curationNoteFa: 'note',
    accentStyle: 'steel',
  },
];

test('Persian digit and Toman formatting', () => {
  assert.equal(toPersianDigits('01 / 05'), '۰۱ / ۰۵');
  assert.equal(formatToman(329000), '۳۲۹٬۰۰۰');
  assert.equal(formatToman(0), '۰');
});

test('filterProducts filters by speaker, format, search query, and sort order', () => {
  const bySpeaker = filterProducts(SAMPLE_PRODUCTS, {
    speakerId: 'goggins',
    format: 'all',
    query: '',
    sortBy: 'featured',
  });
  assert.deepEqual(bySpeaker.map((p) => p.id), ['p1', 'p3']);

  const byFormat = filterProducts(SAMPLE_PRODUCTS, {
    speakerId: 'all',
    format: 'course',
    query: '',
    sortBy: 'featured',
  });
  assert.deepEqual(byFormat.map((p) => p.id), ['p2']);

  const byQuery = filterProducts(SAMPLE_PRODUCTS, {
    speakerId: 'all',
    format: 'all',
    query: 'never finished',
    sortBy: 'featured',
  });
  assert.deepEqual(byQuery.map((p) => p.id), ['p3']);

  const sortedAsc = filterProducts(SAMPLE_PRODUCTS, {
    speakerId: 'all',
    format: 'all',
    query: '',
    sortBy: 'price-asc',
  });
  assert.deepEqual(sortedAsc.map((p) => p.id), ['p3', 'p1', 'p2']);

  const sortedDesc = filterProducts(SAMPLE_PRODUCTS, {
    speakerId: 'all',
    format: 'all',
    query: '',
    sortBy: 'price-desc',
  });
  assert.deepEqual(sortedDesc.map((p) => p.id), ['p2', 'p1', 'p3']);
});

test('cart state transitions and totals', () => {
  let cart = addToCart([], 'p1');
  cart = addToCart(cart, 'p1');
  cart = addToCart(cart, 'p3');
  assert.equal(calculateCartCount(cart), 3);
  assert.equal(calculateCartTotal(cart, SAMPLE_PRODUCTS), 329000 * 2 + 219000);

  cart = updateCartQty(cart, 'p1', -1);
  assert.equal(calculateCartCount(cart), 2);
  cart = updateCartQty(cart, 'p3', -1);
  assert.deepEqual(cart, [{ productId: 'p1', quantity: 1 }]);

  cart = removeFromCart(cart, 'p1');
  assert.equal(cart.length, 0);
});

test('email and checkout validation', () => {
  assert.equal(validateEmail('').ok, false);
  assert.equal(validateEmail('bad-email').ok, false);
  assert.deepEqual(validateEmail(' Ali@Example.com '), { ok: true, normalized: 'ali@example.com' });

  const badCheckout = validateCheckout({ fullName: 'a', contact: '12', email: 'nope' });
  assert.equal(badCheckout.ok, false);
  assert.ok(badCheckout.errors.fullName);
  assert.ok(badCheckout.errors.contact);
  assert.ok(badCheckout.errors.email);

  const goodCheckout = validateCheckout({
    fullName: 'علی رضایی',
    contact: '@ali_rezaei',
    email: 'ali@example.com',
  });
  assert.equal(goodCheckout.ok, true);
});

test('order code and speaker hash parsing', () => {
  assert.match(generateOrderCode(123456), /^LU-\d{4}$/);
  assert.equal(parseSpeakerHash('#speaker/bruce-lee'), 'bruce-lee');
  assert.equal(parseSpeakerHash('#speaker/GOGGINS'), 'goggins');
  assert.equal(parseSpeakerHash('#catalog'), null);
});
