// beyondcolorbackend/routes/HueScoreRoutes.js
const express = require("express");
const router = express.Router();

const correctRows = {
  row1: [
    "#B2766F", "#B17466", "#AE725F", "#A8745A", "#A87452",
    "#A8794E", "#A97E4C", "#A78244", "#A28946", "#9D8E48"
  ],
  row2: [
    "#97914b", "#8d9352", "#86955c", "#7e9760", "#7c9567",
    "#699a71", "#649a76", "#5b947a", "#589480", "#529687"
  ],
  row3: [
    "#4e9689", "#4c9691", "#4a9696", "#4a9698", "#52949f",
    "#6090a5", "#688fa7", "#6c8aa6", "#7489a7", "#7b84a3"
  ],
  row4: [
    "#8484a3", "#8d85a3", "#9483a0", "#99819d", "#9f7f98",
    "#a9798b", "#ae7787", "#b1757f", "#b3757a", "#b37673"
  ]
};

const calculateDisplacementError = (userRow, correctRow) => {
  let error = 0;
  for (let i = 1; i < userRow.length - 1; i++) {
    const correctIndex = correctRow.indexOf(userRow[i]);
    const displacement = Math.abs(i - correctIndex);
    error += displacement;
  }
  return error;
};

router.post("/score", (req, res) => {
  const { row1, row2, row3, row4 } = req.body;

  if (!row1 || !row2 || !row3 || !row4) {
    return res.status(400).json({ error: "All 4 rows must be submitted" });
  }

  let totalError = 0;
  let maxError = 0;

  for (const key of ["row1", "row2", "row3", "row4"]) {
    totalError += calculateDisplacementError(req.body[key], correctRows[key]);
    maxError += (correctRows[key].length - 2) * (correctRows[key].length - 1);
  }

  const score = 100 - Math.round((totalError / maxError) * 100);
  return res.json({ score, totalError, maxError });
});

module.exports = router;
