/* ====================================================================
   ЛАБОРАТОРНАЯ РАБОТА №2: NoSQL / MongoDB
   Среда: Visual Studio Code (MongoDB Extension / Playground)
   Студент: Behruz (Возраст: 20)
   ==================================================================== */

use('universityDB');

// Очистка данных перед новым запуском
db.students.drop();
db.courses.drop();

db.createCollection('students');
db.createCollection('courses');

// --- ЗАДАНИЕ 3: Embedded Document (10 документов) ---
db.students.insertMany([
  {
    studentId: 1001,
    name: "Behruz",
    age: 20,
    group: "IS-24-21",
    gpa: 3.5,
    status: "active",
    contact: { 
      city: "Almaty", 
      email: "bekazuhurov00000@gmail.com", 
      phone: "+7 707 400 69 29" 
    },
    skills: ["Python", "Java", "MongoDB"]
  },
  {
    studentId: 1002,
    name: "Dana",
    age: 20,
    group: "IS-24-1",
    gpa: 3.8,
    status: "active",
    contact: { city: "Astana", email: "dana@example.com", phone: "+77022222222" },
    skills: ["Python", "SQL", "Data Analysis"]
  },
  {
    studentId: 1003,
    name: "Arman",
    age: 18,
    group: "IS-24-2",
    gpa: 2.9,
    status: "active",
    contact: { city: "Almaty", email: "arman@example.com", phone: "+77033333333" },
    skills: ["C++", "Linux", "Networking"]
  },
  {
    studentId: 1004,
    name: "Madina",
    age: 21,
    group: "CS-23-1",
    gpa: 3.9,
    status: "active",
    contact: { city: "Shymkent", email: "madina@example.com", phone: "+77044444444" },
    skills: ["Java", "Spring", "MongoDB"]
  },
  {
    studentId: 1005,
    name: "Sanzhar",
    age: 19,
    group: "IS-24-2",
    gpa: 3.1,
    status: "active",
    contact: { city: "Almaty", email: "sanzhar@example.com", phone: "+77055555555" },
    skills: ["HTML", "CSS", "JavaScript"]
  },
  {
    studentId: 1006,
    name: "Aliya",
    age: 20,
    group: "CS-23-1",
    gpa: 3.4,
    status: "academic_leave",
    contact: { city: "Karaganda", email: "aliya@example.com", phone: "+77066666666" },
    skills: ["Python", "MongoDB", "FastAPI"]
  },
  {
    studentId: 1007,
    name: "Kairat",
    age: 22,
    group: "IS-22-1",
    gpa: 2.7,
    status: "active",
    contact: { city: "Astana", email: "kairat@example.com", phone: "+77077777777" },
    skills: ["SQL", "PostgreSQL", "Docker"]
  },
  {
    studentId: 1008,
    name: "Diana",
    age: 19,
    group: "IS-24-1",
    gpa: 3.6,
    status: "active",
    contact: { city: "Almaty", email: "diana@example.com", phone: "+77088888888" },
    skills: ["Java", "Kotlin", "Android"]
  },
  {
    studentId: 1009,
    name: "Dias",
    age: 20,
    group: "CS-23-2",
    gpa: 3.2,
    status: "active",
    contact: { city: "Aktobe", email: "dias@example.com", phone: "+77099999999" },
    skills: ["C#", ".NET", "SQL"]
  },
  {
    studentId: 1010,
    name: "Zere",
    age: 18,
    group: "IS-24-2",
    gpa: 3.95,
    status: "active",
    contact: { city: "Almaty", email: "zere@example.com", phone: "+77000000000" },
    skills: ["Python", "Machine Learning", "MongoDB"]
  }
]);

// --- ЗАДАНИЕ 4: Массив вложенных документов (Grades) ---
db.students.updateOne(
  { studentId: 1001 },
  { $set: { grades: [ { course: "NoSQL", grade: 90 }, { course: "Algorithms", grade: 85 } ] } }
);

db.students.updateOne(
  { studentId: 1002 },
  { $set: { grades: [ { course: "NoSQL", grade: 95 }, { course: "Data Science", grade: 92 } ] } }
);

db.students.updateOne(
  { studentId: 1004 },
  { $set: { grades: [ { course: "Java", grade: 88 }, { course: "NoSQL", grade: 78 } ] } }
);

db.students.updateOne(
  { studentId: 1010 },
  { $set: { grades: [ { course: "NoSQL", grade: 100 }, { course: "Machine Learning", grade: 96 } ] } }
);

// --- ЗАДАНИЕ 6: $push в массив ---
db.students.updateOne(
  { studentId: 1001 },
  { $push: { skills: "Docker" } }
);

// --- ЗАДАНИЕ 7: Referencing (Вторая коллекция) ---
db.courses.insertMany([
  { _id: 501, name: "NoSQL Databases", credits: 5, department: "IT" },
  { _id: 502, name: "Algorithms and Data Structures", credits: 5, department: "IT" },
  { _id: 503, name: "Object-Oriented Programming", credits: 6, department: "IT" },
  { _id: 504, name: "Data Science Fundamentals", credits: 4, department: "Data" },
  { _id: 505, name: "Machine Learning Basics", credits: 5, department: "Data" }
]);

db.students.updateOne(
  { studentId: 1001 },
  { $set: { courseIds: [501, 502, 503] } }
);

db.students.updateOne(
  { studentId: 1002 },
  { $set: { courseIds: [501, 504] } }
);

db.students.updateOne(
  { studentId: 1010 },
  { $set: { courseIds: [501, 505] } }
);

// --- ЗАДАНИЕ 8: Демонстрация Embedding ---
db.students.updateOne(
  { studentId: 1001 },
  { 
    $set: { 
      embeddedCourses: [
        { courseId: 501, name: "NoSQL Databases", credits: 5 },
        { courseId: 502, name: "Algorithms and Data Structures", credits: 5 }
      ] 
    } 
  }
);

// Итоговая выборка для студента Behruz
db.students.aggregate([
  { $match: { studentId: 1001 } },
  {
    $lookup: {
      from: "courses",
      localField: "courseIds",
      foreignField: "_id",
      as: "referencedCoursesDetails"
    }
  }
]);
// Поиск всех студентов, у которых в навыках (skills) есть "MongoDB"
db.students.find(
  { skills: "MongoDB" },
  { name: 1, group: 1, skills: 1, _id: 1 } // Выводим только имя, группу и навыки
);