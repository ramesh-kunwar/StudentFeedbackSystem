require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/user");
const Teacher = require("./models/teacher");
const Semester = require("./models/semester");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
  console.log("MongoDB connected");
};

// ─── Users ────────────────────────────────────────────────────────────────────

const users = [
  {
    name: "Admin User",
    email: "admin@student.edu.np",
    password: "admin123",
    role: "admin",
  },
  {
    name: "Ramesh Kunwar",
    email: "ramesh@student.edu.np",
    password: "student123",
    role: "student",
  },
  {
    name: "Sita Thapa",
    email: "sita@student.edu.np",
    password: "student123",
    role: "student",
  },
  {
    name: "Hari Shrestha",
    email: "hari@student.edu.np",
    password: "student123",
    role: "student",
  },
  {
    name: "Anita Gurung",
    email: "anita@student.edu.np",
    password: "student123",
    role: "student",
  },
];

// ─── Teachers ─────────────────────────────────────────────────────────────────

const getTeachers = (adminId) => [
  {
    name: "Dr. Rajendra Prasad Sharma",
    image: "https://i.pravatar.cc/300?img=12",
    description:
      "Dr. Sharma has over 15 years of experience in Computer Science and specialises in algorithms and data structures. He completed his PhD from Tribhuvan University.",
    coursesTaught: ["Data Structures", "Algorithms", "Discrete Mathematics"],
    teachingSkill: 4.5,
    communicationSkill: 4.2,
    resourceProvided: 4.0,
    rating: 4.2,
    numOfReviews: 3,
    reviews: [],
    user: adminId,
  },
  {
    name: "Prof. Sunita Devi Acharya",
    image: "https://i.pravatar.cc/300?img=47",
    description:
      "Prof. Acharya is a renowned educator in the field of Database Systems and Software Engineering with 12 years of teaching experience.",
    coursesTaught: [
      "Database Management Systems",
      "Software Engineering",
      "Web Development",
    ],
    teachingSkill: 4.8,
    communicationSkill: 4.6,
    resourceProvided: 4.7,
    rating: 4.7,
    numOfReviews: 3,
    reviews: [],
    user: adminId,
  },
  {
    name: "Mr. Bikash Thapa Magar",
    image: "https://i.pravatar.cc/300?img=15",
    description:
      "Mr. Magar is an industry veteran turned educator with 8 years in software development before joining academia. He specialises in networking and system administration.",
    coursesTaught: [
      "Computer Networks",
      "Operating Systems",
      "Linux Administration",
    ],
    teachingSkill: 4.1,
    communicationSkill: 3.9,
    resourceProvided: 4.3,
    rating: 4.1,
    numOfReviews: 2,
    reviews: [],
    user: adminId,
  },
  {
    name: "Dr. Priya Pandey",
    image: "https://i.pravatar.cc/300?img=44",
    description:
      "Dr. Pandey holds a PhD in Artificial Intelligence and Machine Learning. She is passionate about research and actively publishes in international journals.",
    coursesTaught: [
      "Artificial Intelligence",
      "Machine Learning",
      "Python Programming",
    ],
    teachingSkill: 4.9,
    communicationSkill: 4.7,
    resourceProvided: 4.8,
    rating: 4.8,
    numOfReviews: 4,
    reviews: [],
    user: adminId,
  },
  {
    name: "Mr. Dipendra Karki",
    image: "https://i.pravatar.cc/300?img=8",
    description:
      "Mr. Karki is an experienced lecturer in Mathematics and Statistics with a focus on making complex topics accessible through real-world examples.",
    coursesTaught: ["Engineering Mathematics", "Statistics", "Calculus"],
    teachingSkill: 3.8,
    communicationSkill: 4.0,
    resourceProvided: 3.7,
    rating: 3.8,
    numOfReviews: 2,
    reviews: [],
    user: adminId,
  },
  {
    name: "Ms. Kabita Maharjan",
    image: "https://i.pravatar.cc/300?img=56",
    description:
      "Ms. Maharjan specialises in Object-Oriented Programming and Software Design Patterns. She has worked at several IT companies before transitioning to academia.",
    coursesTaught: [
      "Object Oriented Programming",
      "Java Programming",
      "Design Patterns",
    ],
    teachingSkill: 4.4,
    communicationSkill: 4.5,
    resourceProvided: 4.2,
    rating: 4.4,
    numOfReviews: 3,
    reviews: [],
    user: adminId,
  },
  {
    name: "Dr. Naresh Bajracharya",
    image: "https://i.pravatar.cc/300?img=33",
    description:
      "Dr. Bajracharya is a senior professor with 20+ years of experience in Electronics and Communication Engineering.",
    coursesTaught: [
      "Digital Electronics",
      "Microprocessors",
      "Embedded Systems",
    ],
    teachingSkill: 4.3,
    communicationSkill: 4.1,
    resourceProvided: 4.5,
    rating: 4.3,
    numOfReviews: 2,
    reviews: [],
    user: adminId,
  },
  {
    name: "Mr. Suresh Bhandari",
    image: "https://i.pravatar.cc/300?img=52",
    description:
      "Mr. Bhandari is a young and dynamic lecturer in Cloud Computing and DevOps, bringing cutting-edge industry practices into the classroom.",
    coursesTaught: ["Cloud Computing", "DevOps", "Docker & Kubernetes"],
    teachingSkill: 4.6,
    communicationSkill: 4.4,
    resourceProvided: 4.6,
    rating: 4.5,
    numOfReviews: 3,
    reviews: [],
    user: adminId,
  },
];

// ─── Semesters ────────────────────────────────────────────────────────────────

const getSemesters = (adminId) => [
  {
    name: "First Semester",
    description:
      "The foundation semester introducing students to core computing concepts, mathematics, and programming fundamentals.",
    coursesTaught: [
      "Introduction to Programming (C)",
      "Engineering Mathematics I",
      "Digital Logic",
      "Engineering Drawing",
      "English for Technical Communication",
    ],
    rating: 4.2,
    numOfReviews: 3,
    reviews: [],
    user: adminId,
  },
  {
    name: "Second Semester",
    description:
      "Building upon the first semester, students dive deeper into programming and computer organisation.",
    coursesTaught: [
      "Object Oriented Programming",
      "Engineering Mathematics II",
      "Computer Organisation & Architecture",
      "Electrical Engineering",
      "Statistics & Probability",
    ],
    rating: 4.0,
    numOfReviews: 3,
    reviews: [],
    user: adminId,
  },
  {
    name: "Third Semester",
    description:
      "Students explore data structures, algorithms, and the fundamentals of operating systems and networking.",
    coursesTaught: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Operating Systems",
      "Numerical Methods",
      "Electronics Devices",
    ],
    rating: 4.3,
    numOfReviews: 4,
    reviews: [],
    user: adminId,
  },
  {
    name: "Fourth Semester",
    description:
      "A semester focused on systems programming, networks, and the theory of computation.",
    coursesTaught: [
      "Theory of Computation",
      "Computer Networks",
      "Microprocessors",
      "Software Engineering",
      "Web Technology",
    ],
    rating: 4.1,
    numOfReviews: 3,
    reviews: [],
    user: adminId,
  },
  {
    name: "Fifth Semester",
    description:
      "Advanced topics including artificial intelligence, compiler design, and system security.",
    coursesTaught: [
      "Artificial Intelligence",
      "Compiler Design",
      "Distributed System",
      "Technical Writing",
      "Elective I",
    ],
    rating: 4.5,
    numOfReviews: 2,
    reviews: [],
    user: adminId,
  },
  {
    name: "Sixth Semester",
    description:
      "The final semester prepares students for the professional world with project work, internship, and advanced specialisation.",
    coursesTaught: [
      "Machine Learning",
      "Cloud Computing",
      "Project Work",
      "Internship",
      "Elective II",
    ],
    rating: 4.7,
    numOfReviews: 2,
    reviews: [],
    user: adminId,
  },
];

// ─── Seed / Destroy ───────────────────────────────────────────────────────────

const seedData = async () => {
  await connectDB();

  // Clear existing data
  await User.deleteMany();
  await Teacher.deleteMany();
  await Semester.deleteMany();
  console.log("Existing data cleared");

  // Create users (pre-save hook hashes the password automatically)
  const createdUsers = await User.insertMany(
    users.map((u) => ({ ...u }))
  );

  // insertMany bypasses pre-save hooks, so hash passwords manually
  // Re-create users one by one to trigger the pre-save hook
  await User.deleteMany();
  const createdUserDocs = [];
  for (const u of users) {
    const doc = await User.create(u);
    createdUserDocs.push(doc);
  }

  const adminUser = createdUserDocs.find((u) => u.role === "admin");
  const studentUsers = createdUserDocs.filter((u) => u.role === "student");

  console.log(`${createdUserDocs.length} users seeded`);

  // Create teachers
  const teachers = getTeachers(adminUser._id);
  const createdTeachers = await Teacher.insertMany(teachers);
  console.log(`${createdTeachers.length} teachers seeded`);

  // Create semesters
  const semesters = getSemesters(adminUser._id);
  const createdSemesters = await Semester.insertMany(semesters);
  console.log(`${createdSemesters.length} semesters seeded`);

  console.log("\nSeed complete!");
  console.log("─────────────────────────────────");
  console.log("Admin login:   admin@student.edu.np  /  admin123");
  console.log("Student login: ramesh@student.edu.np /  student123");
  console.log("─────────────────────────────────");

  process.exit(0);
};

const destroyData = async () => {
  await connectDB();
  await User.deleteMany();
  await Teacher.deleteMany();
  await Semester.deleteMany();
  console.log("All data destroyed");
  process.exit(0);
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  seedData();
}
