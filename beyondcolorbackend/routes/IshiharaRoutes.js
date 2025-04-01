const express = require("express");
const router = express.Router();
const IshiharaPlate = require("../models/IshiharaPlate");

router.post("/submit-test", async (req, res) => {
    try {
        console.log("🛠️ Received User Answers:", req.body.userAnswers); // Log incoming data

        const { userAnswers } = req.body;
        if (!userAnswers || Object.keys(userAnswers).length === 0) {
            console.log("❌ Error: No user answers received!");
            return res.status(400).json({ error: "No answers provided." });
        }

        let totalScore = 0;
        let redGreenCount = 0;
        let blueYellowCount = 0;
        let missedCount = 0;
        let randomWrongCount = 0;

        for (const plate_id in userAnswers) {
            const userAnswer = userAnswers[plate_id]?.trim().toLowerCase();
            console.log(`🔍 Checking Plate ${plate_id}: User Answer = "${userAnswer}"`);

            const plate = await IshiharaPlate.findOne({ plate_id: Number(plate_id) });
            if (!plate) {
            console.log(`❌ Plate ${plate_id} not found!`);
            } else {
            console.log(`✅ Plate ${plate_id} found:`, plate);
}

            if (!plate) {
                console.log(`⚠️ Plate ${plate_id} NOT FOUND in database.`);
                continue;
            }

            console.log(`✅ Found Plate ${plate_id}: Correct Answer = "${plate.correct_answer}"`);

            // Normalize answers for accurate comparison
            const correctAnswer = plate.correct_answer?.trim().toLowerCase() || "";
            const redGreenAnswer = plate.red_green_deficiency_answer?.trim().toLowerCase() || "";
            const blueYellowAnswer = plate.deuteranopia_protanopia_answer?.trim().toLowerCase() || "";

            if (userAnswer === correctAnswer) {
                console.log(`✅ Plate ${plate_id}: Correct!`);
                totalScore++;
            } else if (userAnswer === redGreenAnswer) {
                console.log(`❌ Plate ${plate_id}: Red-Green Deficiency detected.`);
                redGreenCount++;
            } else if (userAnswer === blueYellowAnswer) {
                console.log(`❌ Plate ${plate_id}: Blue-Yellow Deficiency detected.`);
                blueYellowCount++;
            } else if (userAnswer === "i do not see any line" || userAnswer === "cannot see any number") {
                console.log(`❌ Plate ${plate_id}: User couldn't see the number.`);
                missedCount++;
            } else {
                console.log(`❌ Plate ${plate_id}: Wrong Answer.`);
                randomWrongCount++;
            }
        }

        // **Diagnosis Logic**
        let diagnosis = "Normal Vision";
        if (redGreenCount > 5) diagnosis = "Red-Green Color Deficiency";
        if (blueYellowCount > 3) diagnosis = "Blue-Yellow Color Deficiency";
        if (missedCount > 10) diagnosis = "Potential Severe CVD";
        if (randomWrongCount > 5) diagnosis += " (Unexpected wrong responses detected)";

        console.log(`📊 Final Score: ${totalScore}, Diagnosis: ${diagnosis}`);
        
        res.json({ score: totalScore, diagnosis });

    } catch (error) {
        console.error("❌ Error processing test submission:", error);
        res.status(500).json({ error: "Server Error" });
    }
});


module.exports = router;
