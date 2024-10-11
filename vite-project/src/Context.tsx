import  { createContext, useContext, useState, ReactNode } from 'react';
const QuizContext = createContext<any>(null);
export const QuizProvider = ({ children }: { children: ReactNode }) => {
    const [score, setScore] = useState<number>(0);
  
    return (
      <QuizContext.Provider value={{ score, setScore }}>
        {children}
      </QuizContext.Provider>
    );
  };
  export const useQuizContext = () => useContext(QuizContext);