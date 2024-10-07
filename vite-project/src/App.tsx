import './styles.scss';
import { FaArrowRight,FaArrowLeft } from "react-icons/fa";
import datas from "../public/datas.json"



function App() {
  interface Question {
    question: string;
    answers: {
      a: string;
      b: string;
      c: string;
      d: string;
    };
    correctAnswer: string;
    id: number;
  }
  
  let page : number=1
  const currentQuestion = datas.find((question: Question) => question.id === page);

page

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
<button className='btn-arrow'><FaArrowLeft/></button>
<div className='buttons'>
            <div className='button-row'>
              <button className='primary-btn btn-content'>
                <div>A)</div>
                <div>Paris</div>
              </button>
              <button className='secondary-btn btn-content'>
                <div>B)</div>
                <div>Berlin</div>
              </button>

            </div>
            <div className='button-row'>
              <button className='primary-btn btn-content'>
                <div>C)</div>
                <div>Belgium</div>
              </button>


              <button className='primary-btn btn-content'>
                <div>D)</div>
                <div>Washington</div>
              </button>

            </div>
          </div>
<button className='btn-arrow'><FaArrowRight/></button>
          </div>
      
        </div>



      </div>

    </>
  )
}

export default App
