import Home from '../component/Home';
import About from '../component/About';
import NotFound from '../component/NotFound';
import { Routes, Route } from 'react-router-dom';
import Quiz from '../component/Quiz'
import CustomSettings from '../component/CustomSettings'
import QuizResults from '../component/QuizResults';

function Root() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/custom" element={<CustomSettings />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/results" element={<QuizResults />} />
    </Routes>
  );
}

export default Root;