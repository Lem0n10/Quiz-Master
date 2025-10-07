import { createContext, useContext, useState } from 'react';
import fetchQuizData from '../services/fetchQuizData';

const QuizContext = createContext();

export function QuizProvider({ children }) {
  const [settings, setSettings] = useState({
    amount: 10,
    category: null,
    difficulty: null,
    type: null
  });

  const [score, setScore] = useState({
    correct: 0,
    incorrect: 0,
    total: 0
  });

  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [answersHistory, setAnswersHistory] = useState([]);

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

const incrementScore = (isCorrect, questionData) => {
  if (!questionData) {
    console.error("questionData is undefined");
    return;
  }

  setScore(prev => ({
    correct: prev.correct + (isCorrect ? 1 : 0),
    incorrect: prev.incorrect + (isCorrect ? 0 : 1),
    total: prev.total + 1
  }));
  
  setAnswersHistory(prev => [...prev, {
    question: questionData.question,
    category: questionData.category,
    difficulty: questionData.difficulty,
    correctAnswer: questionData.correct_answer,
    userAnswer: questionData.userAnswer,
    isCorrect
  }]);
};

  const resetQuiz = () => {
    setScore({ correct: 0, incorrect: 0, total: 0 });
    setQuizStarted(false);
    setQuestions([]);
    setAnswersHistory([]);
    setError(null);
  };

  const startQuiz = (fetchedQuestions) => {
    setQuestions(fetchedQuestions);
    setQuizStarted(true);
    setScore({ correct: 0, incorrect: 0, total: 0 });
  };

const loadAndStartQuiz = async (customSettings = null) => {
  setLoading(true);
  setError(null);

  const settingsToUse = customSettings || settings;
  
  try {
    const data = await fetchQuizData(
      settingsToUse.amount,
      settingsToUse.category,
      settingsToUse.difficulty,
      settingsToUse.type
    );
    
    if (data.results && data.results.length > 0) {
      startQuiz(data.results);
      setLoading(false);
      return { success: true };
    } else {
      setError("No questions available with these parameters");
      setLoading(false);
      return { success: false, error: "No questions available with these parameters" };
    }
  } catch (err) {
    console.error("Error loading questions:", err);
    setError(err.message);
    setLoading(false);
    return { success: false, error: err.message };
  }
};

  const value = {
    settings,
    score,
    quizStarted,
    questions,
    loading,
    error,
    answersHistory,
    updateSettings,
    incrementScore,
    resetQuiz,
    startQuiz,
    loadAndStartQuiz
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuizContext() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuizContext must be used within a QuizProvider');
  }
  return context;
}