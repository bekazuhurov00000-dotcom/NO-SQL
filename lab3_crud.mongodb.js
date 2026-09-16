// ==========================================
// 4. СОЗДАНИЕ И ВЫБОР БАЗЫ
// ==========================================
use("universityDB");
db.students.drop(); // Очистка для перезапуска

// ==========================================
// 5. insertOne() — Добавление одного документа
// ==========================================
db.students.insertOne({
  studentId: 1001,
  name: "Aibek",
  age: 20,
  group: "IS-24-21",
  gpa: 3.5,
  active: true,
  contact: { city: "Almaty", email: "aibek@example.com" },
  skills: ["Java", "MongoDB"]
});

// ==========================================
// 6. insertMany() — Доведение до 10+ документов
// ==========================================
db.students.insertMany([
  { studentId: 1002, name: "Aliya", age: 19, group: "IS-24-21", gpa: 3.8, active: true, contact: { city: "Almaty", email: "aliya@example.com" }, skills: ["Python", "MongoDB"] },
  { studentId: 1003, name: "Damir", age: 21, group: "IS-24-22", gpa: 2.9, active: false, contact: { city: "Astana", email: "damir@example.com" }, skills: ["Java", "Docker"] },
  { studentId: 1004, name: "Dina", age: 20, group: "IS-24-21", gpa: 3.9, active: true, contact: { city: "Almaty", email: "dina@example.com" }, skills: ["Python", "SQL", "MongoDB"] },
  { studentId: 1005, name: "Arman", age: 22, group: "IS-24-22", gpa: 2.7, active: false, contact: { city: "Shymkent", email: "arman@example.com" }, skills: ["C++", "Linux"] },
  { studentId: 1006, name: "Madina", age: 19, group: "IS-24-21", gpa: 3.6, active: true, contact: { city: "Almaty", email: "madina@example.com" }, skills: ["Java", "Spring", "MongoDB"] },
  { studentId: 1007, name: "Sultan", age: 21, group: "IS-24-23", gpa: 3.1, active: true, contact: { city: "Astana", email: "sultan@example.com" }, skills: ["JavaScript", "React"] },
  { studentId: 1008, name: "Elena", age: 20, group: "IS-24-22", gpa: 3.4, active: true, contact: { city: "Almaty", email: "elena@example.com" }, skills: ["Python", "Docker"] },
  { studentId: 1009, name: "Nurlan", age: 23, group: "IS-24-23", gpa: 2.5, active: false, contact: { city: "Karaganda", email: "nurlan@example.com" }, skills: ["HTML", "CSS"] },
  { studentId: 1010, name: "Kira", age: 18, group: "IS-24-21", gpa: 3.2, active: false, contact: { city: "Almaty", email: "kira@example.com" }, skills: ["Java", "MongoDB"] }
]);

// ==========================================
// 7. find() и findOne()
// ==========================================
db.students.find();
db.students.findOne({ studentId: 1001 });
db.students.findOne({ name: "Aliya" });

// ==========================================
// 8. ФИЛЬТРАЦИЯ (Равенство и операторы сравнения)
// ==========================================
// 3 запроса с равенством:
db.students.find({ group: "IS-24-21" });
db.students.find({ active: true });
db.students.find({ age: 20 });

// 4 запроса с операторами ($gt, $gte, $lt, $lte):
db.students.find({ gpa: { $gt: 3.5 } });
db.students.find({ age: { $gte: 21 } });
db.students.find({ gpa: { $lt: 3.0 } });
db.students.find({ gpa: { $gte: 3.0, $lte: 3.8 } });

// ==========================================
// 9. НЕСКОЛЬКО УСЛОВИЙ И $or
// ==========================================
db.students.find({ group: "IS-24-21", gpa: { $gte: 3.0 } });
db.students.find({ active: true, age: { $lt: 21 } });
db.students.find({ $or: [{ group: "IS-24-21" }, { group: "IS-24-22" }] });

// ==========================================
// 10. ВЛОЖЕННЫЕ ДОКУМЕНТЫ (Dot Notation)
// ==========================================
db.students.find({ "contact.city": "Almaty" });
db.students.find({ "contact.email": "aibek@example.com" });

// ==========================================
// 11. МАССИВЫ И $all
// ==========================================
db.students.find({ skills: "MongoDB" });
db.students.find({ skills: { $all: ["Java", "MongoDB"] } });

// ==========================================
// 12. ПРОЕКЦИЯ
// ==========================================
db.students.find({}, { _id: 0, name: 1, gpa: 1 });
db.students.find({}, { _id: 0, name: 1, group: 1, "contact.city": 1 });

// ==========================================
// 13. СОРТИРОВКА И limit()
// ==========================================
db.students.find().sort({ age: 1 }); // по возрастанию
db.students.find().sort({ gpa: -1 }).limit(3); // 3 с наибольшим GPA

// ==========================================
// 14–17. ОБНОВЛЕНИЯ (updateOne, updateMany, $inc, $push)
// ==========================================
db.students.updateOne({ studentId: 1001 }, { $set: { gpa: 3.8, active: true } });
db.students.updateMany({ group: "IS-24-21" }, { $set: { status: "active" } });
db.students.updateOne({ studentId: 1001 }, { $inc: { age: 1 } });
db.students.updateOne({ studentId: 1001 }, { $push: { skills: "Docker" } });

// ==========================================
// 18–19. УДАЛЕНИЕ (deleteOne, deleteMany)
// ==========================================
db.students.deleteOne({ studentId: 1010 });
db.students.deleteMany({ active: false });

// ==========================================
// 22. ДОПОЛНИТЕЛЬНОЕ ЗАДАНИЕ (Комбинированный запрос)
// ==========================================
db.students.find(
  { "contact.city": "Almaty", gpa: { $gte: 3.0 } },
  { _id: 0, name: 1, group: 1, gpa: 1 }
).sort({ gpa: -1 }).limit(3);

// ==========================================
// 23. ИТОГОВЫЙ МИНИ-СЦЕНАРИЙ (Жизненный цикл)
// ==========================================
db.students.insertOne({ studentId: 9999, name: "Test Student", gpa: 2.0 });
db.students.findOne({ studentId: 9999 });
db.students.updateOne({ studentId: 9999 }, { $set: { gpa: 4.0 } });
db.students.findOne({ studentId: 9999 });
db.students.deleteOne({ studentId: 9999 });

// ==========================================
// 20. ИТОГОВАЯ ПРОВЕРКА (Показывает результат в VS Code)
// ==========================================
db.students.find();