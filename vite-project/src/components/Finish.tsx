import { useQuizContext } from '../Context'
import { QuizState } from './Interfaces'

function Finish() {
    const {setQuiz} = useQuizContext()
  return (
    <div className='finish-btn'>
    <button onClick={() => {setQuiz((prevQuiz:QuizState) => ({...prevQuiz,finishQuiz:true}))}} className='try-finish-btn'>Finish the test</button>
    </div>
  )
}

export default Finish
