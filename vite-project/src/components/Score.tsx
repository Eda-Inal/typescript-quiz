import { useQuizContext } from '../Context'

function Score() {
  const { score, quiz } = useQuizContext();
  return (
    <h4 className={`${!quiz.startQuiz ? "display" : ""}`}>Score:{score}</h4>
  )
}

export default Score
