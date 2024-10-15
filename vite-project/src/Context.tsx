import  { createContext, useContext, useState, ReactNode } from 'react';
import { QuizState ,AnswerControl,ButtonState} from './components/Interfaces';
import datas from "../public/datas.json";

const QuizContext = createContext<any>(null);
export const QuizProvider = ({ children }: { children: ReactNode }) => {
    const [score, setScore] = useState<number>(0);
    const datasLength = datas.length;
    const [answerControl, setAnswerControl] = useState<AnswerControl[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [buttonState, setButtonState] = useState<ButtonState>({ class: "", btnId: "" });

 
    
    const [quiz,setQuiz] = useState<QuizState>({
      page:1,
      finishQuiz:false,
      startQuiz:false
    })
  
    return (
      <QuizContext.Provider value={{ score, setScore,quiz,setQuiz,datasLength,answerControl,setAnswerControl,selectedAnswer,setSelectedAnswer,buttonState ,setButtonState}}>
        {children}
      </QuizContext.Provider>
    );
  };
  export const useQuizContext = () => useContext(QuizContext);