import '../styles.scss';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import datas from "../../public/datas.json"
import { useState, useEffect } from 'react';
import Score from './Score';
import Header from './Header';
import Timer from './Timer';
import { useQuizContext } from '../Context'





function Main() {
  const { score ,setScore} = useQuizContext();
  const [startQuiz,setStartQuiz] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const [answerControl, setAnswerControl] = useState<
  { answerId: number; isTrue: boolean | null;btnId:string }[]
>([]);
const [buttonState, setButtonState] = useState<{
  class: string;
  btnId: string;
}>({ class: "", btnId: "" });
const [finishQuiz,setFinishQuiz] = useState<boolean>(false)
interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  question: string;
  answers: Answer[];
  id: number;
  clicked:boolean;


}
  
let currentQuestion = datas.find((question: Question) => question.id === page);
  const datasLength = datas.length;
  const currentId = currentQuestion?.id
  let correctAnswer = currentQuestion?.answers.find(answer => answer.isCorrect);

console.log("correct answer",correctAnswer?.id);
 
  useEffect(() => {
    setSelectedAnswer(null);
    setButtonState({ class: "", btnId: "" });
    if (currentQuestion?.clicked) {
      const selectedAnswer = answerControl.find(
        (answer) => answer.answerId === currentId
      );
      
      
      if (selectedAnswer) {
        // Eğer seçilen bir cevap varsa, buttonState'i güncelle
        setButtonState({
          class: selectedAnswer.isTrue ? "secondary-btn" : "btn-false",
          btnId: selectedAnswer.btnId,
        });
      }
   
    }

  }, [currentQuestion,answerControl]);
  

  function nextQ() {
    if (page === datasLength) {
      setPage(1)
    } else {
      setPage(page + 1)
    }

  }
  function lastQ() {
    if (page === 1) {
      setPage(datasLength)
    } else {
      setPage(page - 1)
    }

  }
  function findTrue(answerId: string,isCorrect:boolean) {
    !currentQuestion?.clicked &&  setSelectedAnswer(answerId); // soru seçildiyse tekrar seçilemiyor
    if (!currentQuestion?.clicked) {
      setAnswerControl((prevState) => [
        ...prevState, 
        {
          answerId: currentId ?? 0, 
          isTrue: isCorrect, 
          btnId : answerId
        }
      ]);
    }
    
    
  
   ( !currentQuestion?.clicked && isCorrect )&& setScore(score +10) // soru daha önce seçildiyse puanı değiştirmiyor
   
   if (currentQuestion) {
    currentQuestion.clicked = true;
  
  }

      
  }
  function tryAgain()  {
setScore(0);
setButtonState({class:"",btnId:""})
setPage(1)
setFinishQuiz(false);
datas.map((question: Question) => question.clicked = false);
setSelectedAnswer("")
setAnswerControl([]); 

  }
  function startQ(){
    setStartQuiz(true)
  }
  

  return (
    <>

      <div className="container">
        <div className="top-area">
          <h4 className={`${!startQuiz? "display" : ""}`}>Q:{currentId}/{datasLength}</h4>
         <Header/>
        <Score/>
        </div>
        {
          !startQuiz && (
            <div className='start-btn'>
            <button onClick={startQ} className='start-btn-style'>Start Quiz</button>
            </div>
          )
        }
    
       
        {
          finishQuiz &&(
<div className='score'>
        <div className='score-card'>
          <div className='score-card-messages'>
            <div>
              
            </div>
          <h3 className='h3-message'>Your score is <span className='span-color'>{score}</span> out of {datasLength *10}</h3>
       
       {
         score >= 70? (
           <h4>Amazing job! You really nailed it with a score of {score}. Keep up the great work, you're on your way to becoming a React pro!</h4>
         ): score >= 50 ? (
           <h4>Great effort! You scored {score}, which is a solid result. With a bit more practice, you'll reach the top in no time!</h4>
         ) : (
           <h4>Don't give up! You scored {score}, but remember that every step is progress. Keep learning and you'll see improvement soon!</h4>
         )
       }
          </div>
        
          

        </div>
        <button className='try-finish-btn' onClick={() => tryAgain()}>Try again</button>
        </div>
          )
        }
        
      {
        (!finishQuiz && startQuiz) && (
<>
<Timer/>
        <div className='question-part'>
          <h3>{currentQuestion?.question}</h3>
          <div className='middle-area'>
            <button className={`btn-arrow ${currentId===1 ? 'display' :""}`  }  onClick={() => lastQ()} ><FaArrowLeft /></button>
            <div className='buttons'>
              {
                currentQuestion?.answers.map((btn) => {
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
{currentQuestion?.id === datasLength &&(
  <div className='finish-btn'>
          <button onClick={() => {setFinishQuiz(true)}} className='try-finish-btn'>Finish the test</button>
          </div>
)}

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