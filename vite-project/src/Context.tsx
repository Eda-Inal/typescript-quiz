import  { createContext, useContext, useState, ReactNode } from 'react';
import { QuizState ,AnswerControl,ButtonState,Question} from './components/Interfaces';
import datas from "../public/datas.json";
import { useEffect } from 'react';


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
    let currentQuestion = datas.find((question: Question) => question.id === quiz.page);
    let correctAnswer = currentQuestion?.answers.find(answer => answer.isCorrect);
    const currentId = currentQuestion?.id
    
    useEffect(() => {
      setSelectedAnswer(null);
      setButtonState({ class: "", btnId: "" });
      if (currentQuestion?.clicked) {
        const selectedAnswer = answerControl.find(
          (answer: AnswerControl) => answer.answerId === currentId
        );
  
  
        if (selectedAnswer) {
          // eğer seçilen bir cevap varsa, buttonState'i güncelle
          setButtonState({
            class: selectedAnswer.isTrue ? "secondary-btn" : "btn-false",
            btnId: selectedAnswer.btnId,
          });
        }
  
      }
  
    }, [currentQuestion, answerControl]);
  
    function tryAgain()  {
      setScore(0);
      setButtonState({class:"",btnId:""})
      setQuiz((prevQuiz:QuizState) => ({...prevQuiz,page: 1,finishQuiz:false}));
      datas.map((question: Question) => question.clicked = false);
      setSelectedAnswer("")
      setAnswerControl([]); 
      
      
        }
    return (
      <QuizContext.Provider value={{ score, setScore,quiz,setQuiz,datasLength,answerControl,setAnswerControl,selectedAnswer,setSelectedAnswer,buttonState ,setButtonState,currentQuestion,currentId,correctAnswer,tryAgain}}>
        {children}
      </QuizContext.Provider>
    );
  };
  export const useQuizContext = () => useContext(QuizContext);