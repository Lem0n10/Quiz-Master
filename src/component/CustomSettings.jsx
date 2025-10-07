import { useQuizContext } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';

const triviaCategories = [
  { id: 9, name: "General Knowledge" },
  { id: 10, name: "Entertainment: Books" },
  { id: 11, name: "Entertainment: Film" },
  { id: 12, name: "Entertainment: Music" },
  { id: 13, name: "Entertainment: Musicals & Theatres" },
  { id: 14, name: "Entertainment: Television" },
  { id: 15, name: "Entertainment: Video Games" },
  { id: 16, name: "Entertainment: Board Games" },
  { id: 17, name: "Science & Nature" },
  { id: 18, name: "Science: Computers" },
  { id: 19, name: "Science: Mathematics" },
  { id: 20, name: "Mythology" },
  { id: 21, name: "Sports" },
  { id: 22, name: "Geography" },
  { id: 23, name: "History" },
  { id: 24, name: "Politics" },
  { id: 25, name: "Art" },
  { id: 26, name: "Celebrities" },
  { id: 27, name: "Animals" },
  { id: 28, name: "Vehicles" },
  { id: 29, name: "Entertainment: Comics" },
  { id: 30, name: "Science: Gadgets" },
  { id: 31, name: "Entertainment: Japanese Anime & Manga" },
  { id: 32, name: "Entertainment: Cartoon & Animations" },
];

function CustomSettings() {
  const { settings, updateSettings, loadAndStartQuiz, loading , resetQuiz} = useQuizContext();

  const navigate = useNavigate();


const handleStartQuiz = async () => {
    resetQuiz();
    const result = await loadAndStartQuiz();
    
    if (result.success) {
      navigate('/quiz');
    } else {
      alert(result.error || "Error when loading questions");
    }
  };



  return (
    <div className="flex flex-col p-8 m-20 mx-40 bg-gradient-to-r from-blue-200 to-purple-100 rounded-lg shadow-lg gap-4">

      <label className="font-bold">Question amount:</label>
      <select
        value={settings.amount}
        onChange={(e) => updateSettings({ amount: Number(e.target.value) })}
        className="p-4 bg-white rounded-lg shadow border"
      >
        {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>

      <label className="font-bold">Category :</label>
      <select
      
        value={settings.category || ''}
        onChange={(e) => updateSettings({ category: Number(e.target.value) })}
        className="p-4 bg-white rounded-lg shadow border"
      >
        <option value="">All</option>
        {triviaCategories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <label className="font-bold">Difficulty :</label>
      <select
        value={settings.difficulty || ''}
        onChange={(e) => updateSettings({difficulty: e.target.value})}
        className="p-4 bg-white rounded-lg shadow border"
      >
        <option value=""> - </option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <label className="font-bold">Type :</label>
      <select
        value={settings.type || ''}
        onChange={(e) => updateSettings({type: e.target.value})}
        className="p-4 bg-white rounded-lg shadow border"
      >
        <option value="">-</option>
        <option value="multiple">Multiple Choice</option>
        <option value="boolean">True / False</option>
      </select>


      <div className="flex gap-4 mt-4">
       <button 
          onClick={handleStartQuiz}
          disabled={loading}
          className="flex-1 p-4 font-bold bg-emerald-100 rounded-lg shadow hover:bg-green-400 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Start quiz"}
        </button>
      </div>
    </div>
  );
}

export default CustomSettings;
