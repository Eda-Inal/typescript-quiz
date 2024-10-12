import  { createContext, useContext, useState, ReactNode } from 'react';
import { QuizState } from './components/Interfaces';
const QuizContext = createContext<any>(null);
export const QuizProvider = ({ children }: { children: ReactNode }) => {
    const [score, setScore] = useState<number>(0);
    const [quiz,setQuiz] = useState<QuizState>({
      page:1,
      finishQuiz:false,
      startQuiz:false
    })
  
    return (
      <QuizContext.Provider value={{ score, setScore,quiz,setQuiz }}>
        {children}
      </QuizContext.Provider>
    );
  };
  export const useQuizContext = () => useContext(QuizContext);