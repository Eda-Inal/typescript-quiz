import { useQuizContext } from '../Context'
import { QuizState } from './Interfaces'

function Start() {
    const {setQuiz} = useQuizContext()
    function startQ(){
        setQuiz((prevQuiz:QuizState) => ({...prevQuiz,startQuiz:true }))
      }
  return (
    <div className='start-btn'>
    <button onClick={startQ} className='start-btn-style'>Start Quiz</button>
    </div>
  )
}

export default Start
