import { Mail } from 'lucide-react';
import OpenTriviaLogo from '../assets/OpenTriviaLogo.png'

function About() {
  return (
    <div className="flex flex-col space-y-6 rounded-2xl shadow-lg p-10 mt-10 mx-40 bg-gradient-to-r from-blue-200 to-purple-200">

      <div className="text-center">
        <h1 className="font-bold text-4xl mb-4 bg-gradient-to-r from-sky-200 to-blue-700 bg-clip-text text-transparent">
          About Quiz Master
        </h1>
      </div>

      <div className="bg-white/50 rounded-lg p-6">
        <h2 className="font-bold text-2xl mb-3 text-gray-800">Questions Database</h2>
        
        <div className="flex items-center justify-center my-8">
          <img 
            src={OpenTriviaLogo}
            alt="Open Trivia Database Logo" 
            className="h-24 w-auto object-contain"
          />
        </div>

        <p className="text-gray-700 leading-relaxed">
          All quiz questions are powered by the <span className="font-bold">Open Trivia Database API</span>, 
          a free and open-source trivia question database. This allows us to provide you with thousands 
          of questions across 24 different categories and 3 difficulty levels.
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Learn more at: <a href="https://opentdb.com" target="_blank" rel="noopener noreferrer" 
          className="text-blue-600 hover:underline font-semibold">opentdb.com</a>
        </p>
      </div>

      <div className="bg-white/50 rounded-lg p-6">
        <h2 className="font-bold text-2xl mb-3 text-gray-800">Creators</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          This project was created by <span className="font-bold">Laurent CHHUOK</span> and <span className="font-bold">Léon GARD</span>, 
          students at EFREI Paris.
        </p>
        <div className="flex flex-col space-y-2 items-center">

          <a href="mailto:laurent.chhuok@efrei.net" 
             className="flex items-center gap-2 hover:text-blue-600 transition-colors">
            <Mail size={20} className="text-blue-600" />
            <span className="font-semibold">laurent.chhuok@efrei.net</span>
          </a>

          <a href="mailto:leon.gard@efrei.net" 
             className="flex items-center gap-2 hover:text-blue-600 transition-colors">
            <Mail size={20} className="text-blue-600" />
            <span className="font-semibold">leon.gard@efrei.net</span>
          </a>

        </div>
        <p className="text-gray-600 text-sm mt-4 italic">
          Feel free to contact us! We'll try to respond as quickly as possible (but with no guarantee 😉).
        </p>
      </div>

      <div className="text-center pt-4">
        <p className="font-bold text-3xl bg-gradient-to-r from-pink-500 to-sky-500 bg-clip-text text-transparent">
          Have fun! 
        </p>
      </div>

    </div>
  );
}

export default About;