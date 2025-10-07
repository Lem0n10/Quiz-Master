import { useQuizContext } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { loadAndStartQuiz, loading, resetQuiz } = useQuizContext();
  const navigate = useNavigate();

const handleStartQuiz = async () => {
  resetQuiz();

  const defaultSettings = {
    amount: 10,
    category: null,
    difficulty: null,
    type: null
  };
  
  const result = await loadAndStartQuiz(defaultSettings);
  
  if (result.success) {
    navigate('/quiz');
  } else {
    alert(result.error || "Error loading questions");
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full">

        <div className="text-center mb-12">
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-[#2980B9] via-blue-300 to-[#6DD5FA] bg-clip-text text-transparent animate-pulse">
            Quiz Master
          </h1>
          <p className="text-xl font-bold text-gray-800 mb-8">
            Test your knowledge across multiple categories
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to challenge yourself?</h2>
          <p className="font-bold mb-6">Start with 10 random questions or customize your quiz</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleStartQuiz}
              disabled={loading}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-emerald-400 hover:from-blue-500 hover:to-emerald-600 text-white font-bold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Loading..." : "Quick Start"}
            </button>
            
            <button 
              onClick={() => navigate('/custom')}
              className="px-8 py-4 text-white bg-gradient-to-r from-purple-300 to-blue-400 hover:from-purple-400 hover:to-blue-600 font-bold rounded-xl"
            >
              Custom Quiz
            </button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-purple-400">24</div>
            <div className="text-sm text-gray-400">Categories</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-pink-400">3</div>
            <div className="text-sm text-gray-400">Difficulty Levels</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;