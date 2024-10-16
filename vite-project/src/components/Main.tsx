import '../styles.scss';
import Score from './Score';
import Header from './Header';
import Timer from './Timer';
import Result from './Result';
import Start from './Start';
import Question from './Question';
import { useQuizContext } from '../Context'

function Main() {
  const { quiz, datasLength, currentId } = useQuizContext();
  return (
    <>

      <div className="container">
        <div className="top-area">
          <h4 className={`${!quiz.startQuiz ? "display" : ""}`}>Q:{currentId}/{datasLength}</h4>
          <Header />
          <Score />
        </div>
        {!quiz.startQuiz && <Start />}
        {quiz.finishQuiz && <Result />}

        {
          (!quiz.finishQuiz && quiz.startQuiz) && (
            <>
              <Timer />
              <Question />
            </>
          )
        }


      </div>

    </>
  )
}

export default Main