import '../styles.scss';
import { useEffect } from 'react';
import Score from './Score';
import Header from './Header';
import Timer from './Timer';
import Result from './Result';
import Start from './Start';
import Question from './Question';
import { useQuizContext } from '../Context'
import { AnswerControl } from './Interfaces';






function Main() {
  const { quiz, datasLength, answerControl, setSelectedAnswer, setButtonState, currentQuestion, currentId } = useQuizContext();



  useEffect(() => {
    setSelectedAnswer(null);
    setButtonState({ class: "", btnId: "" });
    if (currentQuestion?.clicked) {
      const selectedAnswer = answerControl.find(
        (answer: AnswerControl) => answer.answerId === currentId
      );


      if (selectedAnswer) {
        // eğer seçilen bir cevap varsa, buttonState'i güncelle
        setButtonState({
          class: selectedAnswer.isTrue ? "secondary-btn" : "btn-false",
          btnId: selectedAnswer.btnId,
        });
      }

    }

  }, [currentQuestion, answerControl]);







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