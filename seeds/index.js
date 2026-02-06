const mongoose = require("mongoose");
const Campground = require("../models/campground");
const User = require("../models/user"); // ✅ IMPORTANT
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

// ================== DB CONNECTION ==================
mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("✅ Database connected");
});

// ================== HELPER ==================
const sample = (array) => array[Math.floor(Math.random() * array.length)];

// ================== SEED FUNCTION ==================
const seedDB = async () => {
  // 1️⃣ Delete old campgrounds
  await Campground.deleteMany({});
  console.log("🗑 Campgrounds deleted");

  // 2️⃣ Find user
  const user = await User.findOne({ username: "hoi" });

  if (!user) {
    console.log("❌ User 'dakshu' not found. Create user first.");
    return;
  }

  console.log("👤 User found:", user.username);

  // 3️⃣ Create campgrounds
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const imageSeed = `${random1000}-${i}`;

    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
       images: [
        {
          url: `https://picsum.photos/seed/${imageSeed}/600/400`,
          filename: `picsum-${imageSeed}`
        }
      ],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime autem odio at eveniet magnam.",
      price: 23,
      author: user._id, // ✅ FIXED
    });

    await camp.save();
  }

  console.log("🌱 Database seeded");
};

// ================== RUN SEED ==================
seedDB().then(() => {
  mongoose.connection.close();
  console.log("🔒 Connection closed");
});
