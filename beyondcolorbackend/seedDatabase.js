const mongoose = require("mongoose");
const dotenv = require("dotenv");
const IshiharaPlate = require("./models/IshiharaPlate");

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.log("❌ MongoDB Connection Error:", err));

const plates = [
    { plate_id: 1, correct_answer: "12", red_green_deficiency_answer: "12", deuteranopia_protanopia_answer: "12", options: ["12", "Cannot see any number"], description: "Everyone should see number 12." },
    { plate_id: 2, correct_answer: "8", red_green_deficiency_answer: "3", deuteranopia_protanopia_answer: null, options: ["8", "3", "Cannot see any number"], description: "Red-green deficiency sees 3." },
    { plate_id: 3, correct_answer: "29", red_green_deficiency_answer: "70", deuteranopia_protanopia_answer: null, options: ["29", "70", "Cannot see any number"], description: "Red-green deficiency sees 70." },
    { plate_id: 4, correct_answer: "5", red_green_deficiency_answer: "2", deuteranopia_protanopia_answer: null, options: ["5", "2", "Cannot see any number"], description: "Red-green deficiency sees 2." },
    { plate_id: 5, correct_answer: "3", red_green_deficiency_answer: "5", deuteranopia_protanopia_answer: null, options: ["3", "5", "Cannot see any number"], description: "Red-green deficiency sees 5." },
    { plate_id: 6, correct_answer: "15", red_green_deficiency_answer: "17", deuteranopia_protanopia_answer: null, options: ["15", "17", "Cannot see any number"], description: "Red-green deficiency sees 17." },
    { plate_id: 7, correct_answer: "74", red_green_deficiency_answer: "21", deuteranopia_protanopia_answer: null, options: ["74", "21", "Cannot see any number"], description: "Red-green deficiency sees 21." },
    { plate_id: 8, correct_answer: "6", red_green_deficiency_answer: "Cannot see anything", deuteranopia_protanopia_answer: "See something wrong", options: ["6", "Cannot see anything", "See something wrong"], description: "Most red-green deficient people don’t see anything or see something wrong." },
    { plate_id: 9, correct_answer: "45", red_green_deficiency_answer: "Cannot see anything", deuteranopia_protanopia_answer: "See something wrong", options: ["45", "Cannot see anything", "See something wrong"], description: "Most red-green deficient people don’t see anything or see something wrong." },
    { plate_id: 10, correct_answer: "5", red_green_deficiency_answer: "Cannot see anything", deuteranopia_protanopia_answer: "See something wrong", options: ["5", "Cannot see anything", "See something wrong"], description: "Most red-green deficient people don’t see anything or see something wrong." },
    { plate_id: 11, correct_answer: "7", red_green_deficiency_answer: "Cannot see anything", deuteranopia_protanopia_answer: "See something wrong", options: ["7", "Cannot see anything", "See something wrong"], description: "Most red-green deficient people don’t see anything or see something wrong." },
    { plate_id: 12, correct_answer: "16", red_green_deficiency_answer: "Cannot see anything", deuteranopia_protanopia_answer: "See something wrong", options: ["16", "Cannot see anything", "See something wrong"], description: "Most red-green deficient people don’t see anything or see something wrong." },
    { plate_id: 13, correct_answer: "73", red_green_deficiency_answer: "Cannot see anything", deuteranopia_protanopia_answer: "See something wrong", options: ["73", "Cannot see anything", "See something wrong"], description: "Most red-green deficient people don’t see anything or see something wrong." },
    { plate_id: 14, correct_answer: "None", red_green_deficiency_answer: "5", deuteranopia_protanopia_answer: null, options: ["None", "5", "Cannot see any number"], description: "Red-green deficiency sees 5." },
    { plate_id: 15, correct_answer: "None", red_green_deficiency_answer: "45", deuteranopia_protanopia_answer: null, options: ["None", "45", "Cannot see any number"], description: "Red-green deficiency sees 45." },
    { plate_id: 16, correct_answer: "26", red_green_deficiency_answer: "6", deuteranopia_protanopia_answer: "2", options: ["26", "6", "2", "Cannot see any number"], description: "Protanopia sees 6, Deuteranopia sees 2." },
    { plate_id: 17, correct_answer: "42", red_green_deficiency_answer: "2", deuteranopia_protanopia_answer: "4", options: ["42", "2", "4", "Cannot see any number"], description: "Protanopia sees 2, Deuteranopia sees 4." },
    { plate_id: 18, correct_answer: "I see both red and purple lines", red_green_deficiency_answer: "Only Purple Line", deuteranopia_protanopia_answer: "Only Red Line", options: ["Purple and Red Spots", "Only Purple Line", "Only Red Line", "Cannot see any number"], description: "Protanopia sees only the purple line, Deuteranopia sees only the red line." },
    { plate_id: 19, correct_answer: "I do not see any line", red_green_deficiency_answer: "I see a line", options: ["I see a line (Any color)", "I do not see any line"], description: "Red-green deficiency sees a line." },
    { plate_id: 20, correct_answer: "I see a blue/green line", red_green_deficiency_answer: "I do not see any line", options: ["I see an orange line", "I see a blue/green line", "I do not see any line"], description: "Red-green deficiency sees nothing." },
    { plate_id: 21, correct_answer: "I see an orange line", red_green_deficiency_answer: "I do not see any line", options: ["I see an orange line", "I see a blue/green line", "I do not see any line"], description: "Red-green deficiency may see nothing or a false line." },
    { plate_id: 22, correct_answer: "I see a blue/green line", red_green_deficiency_answer: "I do not see any line", options: ["I see an orange line", "I see a blue/green line", "I do not see any line"], description: "Red-green deficiency sees nothing." },
    { plate_id: 23, correct_answer: "I see an orange line", red_green_deficiency_answer: "I see a blue-green line", options: ["I see an orange line", "I see a blue-green line", "I do not see any line"], description: "Red-green deficiency sees a blue-green line." },
    { plate_id: 24, correct_answer: "I see an orange line", red_green_deficiency_answer: "I see an orange line", options: ["I see an orange line", "I do not see any line"], description: "Everyone should see the orange line." }
];

// Insert data into MongoDB
IshiharaPlate.insertMany(plates)
    .then(() => {
        console.log("✅ Database seeded successfully!");
        mongoose.connection.close();
    })
    .catch((err) => console.log("❌ Error seeding database:", err));