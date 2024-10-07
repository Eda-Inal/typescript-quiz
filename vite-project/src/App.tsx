import './styles.scss';
import { FaArrowRight,FaArrowLeft } from "react-icons/fa";
import datas from "../public/datas.json"
import { useState } from 'react';



function App() {
  const [page,setPage] = useState<number>(1)
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

function nextQ() {
  if(page === datasLength){
    setPage(1)
  }else{
    setPage(page+1)
  }

}
function lastQ() {
  if(page === 1){
    setPage(datasLength)
  }else{
    setPage(page-1)
  }

}

  return (
    <>

      <div className="container">
        <div className="top-area">
          <h4>Q:1/5</h4>
          <h1>Quiz Game</h1>
          <h4>Score:25</h4>
        </div>
        <div className='timer'>
          <div className='circle'>
            <h3>20</h3>
          </div>
        </div>
        <div className='question-part'>
          <h2>{currentQuestion?.question}</h2>
          <div className='middle-area'>
<button className='btn-arrow' onClick={()=> lastQ()} ><FaArrowLeft/></button>
<div className='buttons'>
          
              <button className='primary-btn btn-content'>
              
                <h4>{currentQuestion?.answers[0].text}</h4>
              </button>
              <button className='primary-btn btn-content'>
             
                <h4>{currentQuestion?.answers[1].text}</h4>
              </button>            
              <button className='primary-btn btn-content'>
           
                <h4>{currentQuestion?.answers[2].text}</h4>
              </button>
              <button className='primary-btn btn-content'>
                <h4>{currentQuestion?.answers[3].text}</h4>
              </button>
          </div>
<button className='btn-arrow' onClick={()=> nextQ()}><FaArrowRight/></button>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
