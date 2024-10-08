import './styles.scss';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import datas from "../public/datas.json"
import { useState, useEffect } from 'react';



function App() {
  const [page, setPage] = useState<number>(1)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score,setScore] = useState<number>(0)

  interface Answer {
    id: string;
    text: string;
    isCorrect: boolean;
  }

  interface Question {
    question: string;
    answers: Answer[];
    id: number;
  }



  const currentQuestion = datas.find((question: Question) => question.id === page);
  const datasLength = datas.length;
  const currentId = currentQuestion?.id
  const trueAnswer = currentQuestion?.answers.filter((answer) => {
    return answer.isCorrect
  })

  console.log(trueAnswer);
  console.log(currentId);

  useEffect(() => {
    setSelectedAnswer(null);
  }, [currentQuestion]);

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
    setSelectedAnswer(answerId);
    if(isCorrect) setScore(score +10)
  }

  return (
    <>

      <div className="container">
        <div className="top-area">
          <h4>Q:{currentId}/5</h4>
          <h1>Quiz Game</h1>
          <h4>Score:{score}</h4>
        </div>
        <div className='timer'>
          <div className='circle'>
            <h3>20</h3>
          </div>
        </div>
        <div className='question-part'>
          <h2>{currentQuestion?.question}</h2>
          <div className='middle-area'>
            <button className='btn-arrow' onClick={() => lastQ()} ><FaArrowLeft /></button>
            <div className='buttons'>
              {
                currentQuestion?.answers.map((btn) => (
                  <button onClick={() => findTrue(btn.id,btn.isCorrect)}
                    className={`primary-btn btn-content ${selectedAnswer === btn.id ? (btn.isCorrect ? 'secondary-btn' : 'btn-false') : ''}`}
                    key={btn.id}>

                    <h4>{btn.text}</h4>
                  </button>
                ))
              }


            </div>
            <button className='btn-arrow' onClick={() => nextQ()}><FaArrowRight /></button>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
