import { useQuizContext } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';
import decodeHtmlEntities from '../utils/decodeHtmlEntities';

export default function QuizResults() {
  const { score, answersHistory, resetQuiz } = useQuizContext();
  const navigate = useNavigate();

  if (!answersHistory || answersHistory.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-xl mb-4">No results available</p>
        <button
          onClick={() => navigate('/custom')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold"
        >
          Start a quiz
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">

      <div className="text-center mb-8">
        <div className="p-8 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg shadow-lg">
          <p className="text-4xl font-bold mb-4">Quiz finished!</p>
          <p className="text-3xl font-bold mb-2">
            Your score: {score.correct}/{score.total}
          </p>
          <p className="text-2xl text-gray-700">
            ({Math.round((score.correct / score.total) * 100)}% success rate)
          </p>
        </div>
      </div>

      <button
        onClick={() => {
          resetQuiz();
          navigate('/custom');
        }}
        className="w-full p-4 mb-5 bg-sky-300 hover:bg-sky-600 hover:shadow-lg hover:shadow-blue-200 text-white rounded-lg font-bold text-lg transition"
      >
        Play again
      </button>

      

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Questions Summary</h2>
        <div className="space-y-4">
          {answersHistory.map((answer, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg border-2 ${
                answer.isCorrect 
                  ? 'bg-green-50 border-green-300' 
                  : 'bg-red-50 border-red-300'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <span className="font-bold text-gray-700">Question {index + 1}</span>
                  <div className="flex gap-2 mt-1">
                    <span className="px-2 py-1 bg-white rounded text-xs">
                      {decodeHtmlEntities(answer.category)}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      answer.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                      answer.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {answer.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              <p className="font-medium text-gray-800 mb-3">
                {decodeHtmlEntities(answer.question)}
              </p>

              <div className="space-y-2 text-sm">
                <div className={`p-2 rounded ${
                  answer.isCorrect ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <span className="font-semibold">Your answer: </span>
                  <span>{decodeHtmlEntities(answer.userAnswer)}</span>
                </div>

                {!answer.isCorrect && (
                  <div className="p-2 rounded bg-green-100">
                    <span className="font-semibold">Correct answer: </span>
                    <span>{decodeHtmlEntities(answer.correctAnswer)}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}