import '../styles.scss';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import {useEffect } from 'react';
import Score from './Score';
import Header from './Header';
import Timer from './Timer';
import Result from './Result';
import Start from './Start';
import Finish from './Finish';
import { useQuizContext } from '../Context'
import { QuizState,AnswerControl, Answer} from './Interfaces';






function Main() {
  const { score ,setScore,quiz,setQuiz,datasLength,answerControl,setAnswerControl,selectedAnswer,setSelectedAnswer,buttonState,setButtonState,currentQuestion,currentId,correctAnswer} = useQuizContext();
 


  useEffect(() => {
    setSelectedAnswer(null);
    setButtonState({ class: "", btnId: "" });
    if (currentQuestion?.clicked) {
      const selectedAnswer = answerControl.find(
        (answer:AnswerControl) => answer.answerId === currentId
      );
      
      
      if (selectedAnswer) {
        // eğer seçilen bir cevap varsa, buttonState'i güncelle
        setButtonState({
          class: selectedAnswer.isTrue ? "secondary-btn" : "btn-false",
          btnId: selectedAnswer.btnId,
        });
      }
   
    }

  }, [currentQuestion,answerControl]);
  

  function nextQ() {
    setQuiz((prevQuiz:QuizState) => ({
      ...prevQuiz,   
      page: prevQuiz.page === datasLength ? 1 : prevQuiz.page + 1
    }));

  }
  function lastQ() {
    setQuiz((prevQuiz:QuizState) => ({
      ...prevQuiz,  
      page: prevQuiz.page === 1 ? datasLength : prevQuiz.page - 1 
    }));

  }
  function findTrue(answerId: string,isCorrect:boolean) {
    !currentQuestion?.clicked &&  setSelectedAnswer(answerId); 
    if (!currentQuestion?.clicked) {
      setAnswerControl((prevState:AnswerControl[]) => [
        ...prevState, 
        {
          answerId: currentId ?? 0, 
          isTrue: isCorrect, 
          btnId : answerId
        }
      ]);
    }
    
    
  
   ( !currentQuestion?.clicked && isCorrect )&& setScore(score +10) 
   
   if (currentQuestion) {
    currentQuestion.clicked = true;
  
  }

      
  }
//   function tryAgain()  {
// setScore(0);
// setButtonState({class:"",btnId:""})
// setQuiz((prevQuiz:QuizState) => ({...prevQuiz,page: 1,finishQuiz:false}));
// datas.map((question: Question) => question.clicked = false);
// setSelectedAnswer("")
// setAnswerControl([]); 

//   }
 
  

  return (
    <>

      <div className="container">
        <div className="top-area">
          <h4 className={`${!quiz.startQuiz? "display" : ""}`}>Q:{currentId}/{datasLength}</h4>
         <Header/>
        <Score/>
        </div>
        { !quiz.startQuiz &&  <Start/>}
        {quiz.finishQuiz &&<Result/> }
        
      {
        (!quiz.finishQuiz && quiz.startQuiz) && (
<>
<Timer/>
        <div className='question-part'>
          <h3>{currentQuestion?.question}</h3>
          <div className='middle-area'>
            <button className={`btn-arrow ${currentId===1 ? 'display' :""}`  }  onClick={() => lastQ()} ><FaArrowLeft /></button>
            <div className='buttons'>
              {
                currentQuestion?.answers.map((btn:Answer) => {
                  const correctAnswerId = correctAnswer?.id; 
                  return (
                  <button onClick={() => findTrue(btn.id,btn.isCorrect)}
                  className={`primary-btn btn-content ${
                    currentQuestion?.clicked ? 
                      // eğer soru tıklanmışsa:
                      (buttonState.btnId === btn.id ? 
                        // tıklanan cevap:
                        buttonState.class : 
                        // yanlış cevap tıklanmışsa, doğru cevaba yeşil sınıf ekle:
                        (correctAnswerId === btn.id ? 'secondary-btn' : '')
                      ) : 
                      // tıklanmamışsa normal kontrol:
                      (selectedAnswer === btn.id ? (btn.isCorrect ? 'secondary-btn' : 'btn-false') : '')
                  }`}
                    key={btn.id}>

                    <h4>{btn.text}</h4>
                  </button>
                ) })
              }
{currentQuestion?.id === datasLength &&<Finish/>}

            </div>
            <button className={`btn-arrow ${currentId===datasLength ? 'display' :""}`  }   onClick={() => nextQ()}><FaArrowRight /></button>
          </div>
        
        </div>
</>
        )
      }
       
        
      </div>

    </>
  )
}

export default Main