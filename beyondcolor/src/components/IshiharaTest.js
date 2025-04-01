import React, { useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const testImages = [
  ...Array.from({ length: 17 }, (_, i) => ({
    id: i + 1,
    src: `${i + 1}.png`,
    type: "number",
    options: ["Cannot see any number"], // ✅ Added option for number plates
  })),
  { id: 18, src: "18.png", type: "mcq", correct_answer: "I see both red and purple lines", red_green_deficiency_answer: "I see a purple line", deuteranopia_protanopia_answer: "I see a red line", options: ["I see a purple line", "I see a red line", "I see both red and purple lines", "I do not see any line"], description: "Protanopia sees only the purple line, Deuteranopia sees only the red line." },
  { id: 19, src: "19.png", type: "mcq", correct_answer: "None", red_green_deficiency_answer: "I see a line", options: ["I see a line (Any color)", "I do not see any line"], description: "Red-green deficiency sees a line." },
  { id: 20, src: "20.png", type: "mcq", correct_answer: "I see a blue/green line", red_green_deficiency_answer: "I do not see any line", options: ["I see an orange line", "I see a blue/green line", "I do not see any line"], description: "Red-green deficiency sees nothing." },
  { id: 21, src: "21.png", type: "mcq", correct_answer: "I see an orange line", red_green_deficiency_answer: "I do not see any line", options: ["I see an orange line", "I see a blue/green line", "I do not see any line"], description: "Red-green deficiency may see nothing or a false line." },
  { id: 22, src: "22.png", type: "mcq", correct_answer: "I see a blue/green line", red_green_deficiency_answer: "I do not see any line", options: ["I see an orange line", "I see a blue/green line", "I do not see any line"], description: "Red-green deficiency sees nothing." },
  { id: 23, src: "23.png", type: "mcq", correct_answer: "I see an orange line", red_green_deficiency_answer: "I see a blue/green line", options: ["I see an orange line", "I see a blue/green line", "I do not see any line"], description: "Red-green deficiency sees a blue-green line." },
  { id: 24, src: "24.png", type: "mcq", correct_answer: "I see an orange line", red_green_deficiency_answer: "I see an orange line", options: ["I see an orange line", "I do not see any line"], description: "Everyone should see the orange line." }
];

export default function IshiharaTest() {
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleChange = (id, value) => {
    setUserAnswers((prev) => {
      const updatedAnswers = { ...prev, [id]: value };
      console.log("📊 Updated User Answers:", updatedAnswers);
      return updatedAnswers;
    });
  };

  const calculateScore = async () => {
    console.log("🚀 Submitting User Answers:", userAnswers);

    try {
      const response = await axios.post("http://localhost:5001/api/ishihara/submit-test", {
        userAnswers,
      });

      console.log("✅ Backend Response:", response.data);

      setScore(response.data.score);
      alert(`Your score: ${response.data.score} / 24\nDiagnosis: ${response.data.diagnosis}`);
    } catch (error) {
      console.error("❌ Error submitting test:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[600px] p-6 border shadow-lg rounded-lg text-center bg-white">
        <h2 className="text-xl font-bold mb-4">Ishihara Color Blindness Test</h2>

        <Swiper modules={[Navigation, Keyboard]} spaceBetween={30} slidesPerView={1} navigation keyboard={{ enabled: true }} className="relative w-full">
          {testImages.map(({ id, src, type, options }) => (
            <SwiperSlide key={`plate-${id}`}>
              <div className="p-4 flex flex-col items-center">
                <img src={src} alt={`Test ${id}`} className="mb-4 w-80 mx-auto rounded-lg" />
                
                {type === "number" ? (
                  <div className="flex flex-col space-y-3 mt-3 w-full">
                    {/* ✅ Text input for user-entered number */}
                    <input
                      type="text"
                      placeholder="Enter the number you see"
                      className="border px-3 py-2 rounded w-full text-center"
                      onChange={(e) => handleChange(id, e.target.value)}
                    />
                    {/* ✅ Radio option for 'Cannot see any number' */}
                    <label className="flex items-center space-x-2 p-2 bg-gray-50 rounded-md">
                      <input
                        type="radio"
                        name={`plate-${id}`}
                        value="Cannot see any number"
                        onChange={(e) => handleChange(id, e.target.value)}
                        className="mr-2"
                      />
                      <span>Cannot see any number</span>
                    </label>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-3 mt-3 w-full">
                    {options.map((option, index) => (
                      <label key={`plate-${id}-option-${index}`} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-md">
                        <input
                          type="radio"
                          name={`plate-${id}`}
                          value={option}
                          onChange={(e) => handleChange(id, e.target.value)}
                          className="mr-2"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button className="bg-blue-500 text-white px-5 py-2 mt-5 rounded w-full text-lg" onClick={calculateScore}>
          Submit Answers
        </button>
        {score !== null && <p className="mt-3 text-md font-semibold">Your score: {score} / {testImages.length}</p>}
      </div>
    </div>
  );
}
