import { useState, useEffect } from "react";
import { useQuizContext } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';
import decodeHtmlEntities from '../utils/decodeHtmlEntities';

export default function Quiz() {
  const { questions, score, incrementScore, quizStarted } = useQuizContext();
  const navigate = useNavigate();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

const [allAnswers, setAllAnswers] = useState([]);

useEffect(() => {
  if (!questions || !questions[currentIndex]) return;
  
  const currentQuestion = questions[currentIndex];
  const shuffled = [
    currentQuestion.correct_answer, 
    ...currentQuestion.incorrect_answers
  ].sort(() => Math.random() - 0.5);
  
  setAllAnswers(shuffled);
}, [currentIndex, questions]);

  if (!quizStarted || !questions || questions.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-xl mb-4">No quiz loaded, please try again</p>
        <button
          onClick={() => navigate('/custom')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold"
        >
          Create a custom quiz
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

const handleAnswerClick = (answer) => {
  if (showResult) return; 
  
  setSelectedAnswer(answer);
  setShowResult(true);
  
  const isCorrect = answer === currentQuestion.correct_answer;
  
  incrementScore(isCorrect, {
    question: currentQuestion.question,
    category: currentQuestion.category,
    difficulty: currentQuestion.difficulty,
    correct_answer: currentQuestion.correct_answer,
    userAnswer: answer
  });
};

const handleNext = () => {
  const isLastQuestion = currentIndex === questions.length - 1;
  
  if (isLastQuestion) {
    navigate('/results', { replace: true }); // To make sure the player can't go back after he finished the quiz
  } else {
    setSelectedAnswer(null);
    setShowResult(false);
    setCurrentIndex(prev => prev + 1);
  }
};

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-6 flex justify-between items-center bg-white p-4 rounded-lg shadow">
        <div>
          <span className="font-bold text-lg">
            Question {currentIndex + 1}/{questions.length}
          </span>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Score</p>
          <p className="font-bold text-xl">
            {score.correct}/{score.total}
          </p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="flex gap-2 mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {decodeHtmlEntities(currentQuestion.category)}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm ${
            currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
            currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {currentQuestion.difficulty === 'easy' ? 'Easy' :
             currentQuestion.difficulty === 'medium' ? 'Medium' : 'Hard'}
          </span>
        </div>

        <h2 className="text-2xl font-bold mb-6">
          {decodeHtmlEntities(currentQuestion.question)}
        </h2>

        <div className="space-y-3">
          {allAnswers.map((answer, index) => {
            const isCorrectAnswer = answer === currentQuestion.correct_answer;
            const isSelected = answer === selectedAnswer;
            
            let buttonClass = "w-full p-4 text-left rounded-lg border-2 transition font-medium ";
            
            if (!showResult) {
              buttonClass += "bg-gray-50 hover:bg-blue-50 border-gray-300 hover:border-blue-400 cursor-pointer hover:shadow-lg hover:shadow-blue-200";
            } else {
              if (isCorrectAnswer) {
                buttonClass += "bg-green-100 border-green-500 text-green-900";
              } else if (isSelected) {
                buttonClass += "bg-red-100 border-red-500 text-red-900";
              } else {
                buttonClass += "bg-gray-100 border-gray-300 text-gray-600";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerClick(answer)}
                disabled={showResult}
                className={buttonClass}
              >
                <span className="flex items-center justify-between">
                  <span>{decodeHtmlEntities(answer)}</span>
                  {showResult && isCorrectAnswer && <span className="text-2xl">✓</span>}
                  {showResult && isSelected && !isCorrectAnswer && <span className="text-2xl">✗</span>}
                </span>
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className="mt-6">
            <button
              onClick={handleNext}
              className="w-full p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-lg transition"
            >
              {currentIndex === questions.length - 1 ? "See results" : "Next question"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}