import { useQuizContext } from '../Context'

function Score() {
    const { score } = useQuizContext();
  return (
   <h4>Score:{score}</h4>
  )
}

export default Score
