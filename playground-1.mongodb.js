// ==========================================
// ЛАБОРАТОРНАЯ РАБОТА №4: MongoDB Aggregation & Indexes
// Вариант 1: Интернет-магазин (ecommerce_lab4)
// ==========================================

// 1. ИНИЦИАЛИЗАЦИЯ И ОЧИСТКА БАЗЫ ДАННЫХ
use("ecommerce_lab4");

db.products.drop();
db.customers.drop();
db.orders.drop();

// ==========================================
// 2. ЗАПОЛНЕНИЕ ТЕСТОВЫМИ ДАННЫМИ (30+ документов)
// ==========================================

// 2.1 Вспомогательные коллекции
db.customers.insertMany([
  { customerId: 501, name: "Aidar", city: "Almaty" },
  { customerId: 502, name: "Dana", city: "Astana" },
  { customerId: 503, name: "Miras", city: "Shymkent" }
]);

db.orders.insertMany([
  { orderId: "ORD-1", customerId: 501, productId: 101, total: 420000, status: "paid" },
  { orderId: "ORD-2", customerId: 501, productId: 103, total: 310000, status: "paid" },
  { orderId: "ORD-3", customerId: 502, productId: 104, total: 650000, status: "new" },
  { orderId: "ORD-4", customerId: 503, productId: 110, total: 180000, status: "paid" }
]);

// 2.2 Основная коллекция products (30 документов)
db.products.insertMany([
  { productId: 101, name: "Laptop Lenovo Legion", category: "Notebook", price: 420000, stock: 15, rating: 4.7, tags: ["office", "gaming"] },
  { productId: 102, name: "Laptop ASUS ROG", category: "Notebook", price: 520000, stock: 8, rating: 4.8, tags: ["gaming", "programming"] },
  { productId: 103, name: "Phone Samsung S23", category: "Smartphone", price: 310000, stock: 25, rating: 4.6, tags: ["mobile", "android"] },
  { productId: 104, name: "Phone Apple iPhone 15", category: "Smartphone", price: 650000, stock: 12, rating: 4.9, tags: ["mobile", "ios"] },
  { productId: 105, name: "Laptop HP Pavilion", category: "Notebook", price: 280000, stock: 20, rating: 4.3, tags: ["office"] },
  { productId: 106, name: "Phone Xiaomi 13 Pro", category: "Smartphone", price: 220000, stock: 30, rating: 4.5, tags: ["mobile", "android"] },
  { productId: 107, name: "Tablet Apple iPad Air", category: "Tablet", price: 350000, stock: 10, rating: 4.8, tags: ["mobile", "design"] },
  { productId: 108, name: "Tablet Samsung Galaxy Tab", category: "Tablet", price: 210000, stock: 14, rating: 4.4, tags: ["mobile", "android"] },
  { productId: 109, name: "Watch Apple Watch 9", category: "Gadgets", price: 190000, stock: 18, rating: 4.7, tags: ["gadgets", "ios"] },
  { productId: 110, name: "Watch Samsung Galaxy Watch", category: "Gadgets", price: 120000, stock: 22, rating: 4.2, tags: ["gadgets", "android"] },
  { productId: 111, name: "Laptop MacBook Air M2", category: "Notebook", price: 580000, stock: 7, rating: 4.9, tags: ["office", "programming", "ios"] },
  { productId: 112, name: "Laptop Dell XPS 13", category: "Notebook", price: 610000, stock: 5, rating: 4.6, tags: ["office", "programming"] },
  { productId: 113, name: "Phone Google Pixel 8", category: "Smartphone", price: 340000, stock: 11, rating: 4.5, tags: ["mobile", "android"] },
  { productId: 114, name: "Monitor LG UltraGear", category: "Accessories", price: 150000, stock: 16, rating: 4.7, tags: ["gaming", "office"] },
  { productId: 115, name: "Monitor Samsung Odyssey", category: "Accessories", price: 230000, stock: 9, rating: 4.8, tags: ["gaming"] },
  { productId: 116, name: "Keyboard Logitech MX Keys", category: "Accessories", price: 55000, stock: 40, rating: 4.9, tags: ["office", "programming"] },
  { productId: 117, name: "Mouse Razer DeathAdder", category: "Accessories", price: 35000, stock: 50, rating: 4.6, tags: ["gaming"] },
  { productId: 118, name: "Headphones Sony WH-1000XM5", category: "Audio", price: 180000, stock: 15, rating: 4.9, tags: ["audio", "gadgets"] },
  { productId: 119, name: "Headphones AirPods Pro 2", category: "Audio", price: 130000, stock: 25, rating: 4.8, tags: ["audio", "ios"] },
  { productId: 120, name: "Speaker JBL Charge 5", category: "Audio", price: 75000, stock: 28, rating: 4.6, tags: ["audio"] },
  { productId: 121, name: "Laptop Acer Nitro 5", category: "Notebook", price: 390000, stock: 12, rating: 4.4, tags: ["gaming"] },
  { productId: 122, name: "Phone OnePlus 11", category: "Smartphone", price: 290000, stock: 13, rating: 4.5, tags: ["mobile", "android"] },
  { productId: 123, name: "Tablet Xiaomi Pad 6", category: "Tablet", price: 160000, stock: 19, rating: 4.3, tags: ["mobile", "android"] },
  { productId: 124, name: "SSD Samsung 980 Pro 1TB", category: "Components", price: 65000, stock: 35, rating: 4.9, tags: ["programming", "office"] },
  { productId: 125, name: "RAM Kingston Fury 16GB", category: "Components", price: 30000, stock: 60, rating: 4.7, tags: ["office"] },
  { productId: 126, name: "GPU RTX 4070", category: "Components", price: 380000, stock: 6, rating: 4.9, tags: ["gaming"] },
  { productId: 127, name: "PowerBank Anker 20000", category: "Gadgets", price: 25000, stock: 45, rating: 4.6, tags: ["gadgets", "mobile"] },
  { productId: 128, name: "Webcam Logitech C920", category: "Accessories", price: 42000, stock: 21, rating: 4.5, tags: ["office"] },
  { productId: 129, name: "Microphone Blue Yeti", category: "Audio", price: 68000, stock: 14, rating: 4.7, tags: ["audio", "office"] },
  { productId: 130, name: "Router TP-Link Archer", category: "Accessories", price: 28000, stock: 33, rating: 4.3, tags: ["office"] }
]);

// ==========================================
// 3. AGGREGATION PIPELINE (10 ЗАПРОСОВ)
// ==========================================

// Запрос 1 ($match): Фильтрация по строковому полю и диапазону цен
db.products.aggregate([
  { $match: { category: "Notebook", price: { $gte: 300000, $lte: 500000 } } }
]);

// Запрос 2 ($match): Фильтрация с $or и $in
db.products.aggregate([
  { $match: { $or: [{ category: "Tablet" }, { tags: { $in: ["ios"] } }] } }
]);

// Запрос 3 ($project): Проекция и создание вычисляемого поля inventoryValue
db.products.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      price: 1,
      stock: 1,
      inventoryValue: { $multiply: ["$price", "$stock"] }
    }
  }
]);

// Запрос 4 ($project): Преобразование данных и форматирование
db.products.aggregate([
  {
    $project: {
      _id: 0,
      item: "$name",
      categoryUpper: { $toUpper: "$category" },
      isAvailable: { $gt: ["$stock", 0] }
    }
  }
]);

// Запрос 5 ($group): Группировка по категориям с агрегатными функциями
db.products.aggregate([
  {
    $group: {
      _id: "$category",
      totalProducts: { $sum: 1 },
      avgPrice: { $avg: "$price" },
      minPrice: { $min: "$price" },
      maxPrice: { $max: "$price" },
      totalStock: { $sum: "$stock" }
    }
  }
]);

// Запрос 6 ($sort, $limit): Топ-5 самых дорогих товаров в наличии
db.products.aggregate([
  { $match: { stock: { $gt: 0 } } },
  { $sort: { price: -1 } },
  { $limit: 5 },
  { $project: { _id: 0, name: 1, price: 1, category: 1 } }
]);

// Запрос 7 ($unwind): Подсчет количества товаров по тегам
db.products.aggregate([
  { $unwind: "$tags" },
  { $group: { _id: "$tags", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]);

// Запрос 8 ($lookup): Соединение заказов с информацией о клиентах и продуктах
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "customerId",
      as: "customerInfo"
    }
  },
  { $unwind: "$customerInfo" },
  {
    $project: {
      _id: 0,
      orderId: 1,
      total: 1,
      status: 1,
      customerName: "$customerInfo.name",
      city: "$customerInfo.city"
    }
  }
]);

// Запрос 9 (Многоэтапный Pipeline - 5 этапов): Анализ дорогой электроники
db.products.aggregate([
  { $match: { price: { $gte: 100000 } } },
  { $group: { _id: "$category", avgRating: { $avg: "$rating" }, count: { $sum: 1 } } },
  { $match: { count: { $gte: 2 } } },
  { $sort: { avgRating: -1 } },
  { $limit: 3 }
]);

// Запрос 10 (Многоэтапный Pipeline): Поиск популярных тегов среди товаров с высоким рейтингом
db.products.aggregate([
  { $match: { rating: { $gte: 4.7 } } },
  { $unwind: "$tags" },
  { $group: { _id: "$tags", totalItems: { $sum: 1 } } },
  { $sort: { totalItems: -1 } },
  { $limit: 5 }
]);

// ==========================================
// 4. ИНДЕКСЫ И АНАЛИЗ ПРОИЗВОДИТЕЛЬНОСТИ (EXPLAIN)
// ==========================================

// --- Эксперимент 1: Запрос без индексов (COLLSCAN) ---
db.products.find({ category: "Notebook" }).explain("executionStats");

// --- Эксперимент 2: Создание и проверка простого индекса ---
db.products.createIndex({ category: 1 });
db.products.find({ category: "Notebook" }).explain("executionStats");

// --- Эксперимент 3: Создание и проверка составного индекса (ESR: Equality, Sort) ---
db.products.createIndex({ category: 1, price: 1 });
db.products.find({ category: "Notebook" }).sort({ price: 1 }).explain("executionStats");

// --- Эксперимент 4: Эксперимент с принципом ESR (Equality, Sort, Range) ---
// Создаем альтернативный индекс для сравнения порядков
db.products.createIndex({ category: 1, price: 1, rating: 1 }); // Оптимальный порядок ESR: Equality (category) -> Sort (price) -> Range (rating)
db.products.createIndex({ category: 1, rating: 1, price: 1 }); // Нарушенный порядок ESR

// Проверка оптимального составного индекса с равенством, сортировкой и диапазоном
db.products
  .find({ category: "Notebook", rating: { $gte: 4.5 } })
  .sort({ price: 1 })
  .explain("executionStats");