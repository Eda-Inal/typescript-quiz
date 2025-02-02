import { useQuizContext } from '../Context'
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

import { QuizState, AnswerControl, Answer } from './Interfaces';
import Finish from './Finish';
function Question() {

  const { setScore, setQuiz, datasLength, setAnswerControl, selectedAnswer, setSelectedAnswer, buttonState, currentQuestion, currentId, correctAnswer } = useQuizContext();
  function nextQ() {
    setQuiz((prevQuiz: QuizState) => ({
      ...prevQuiz,
      page: prevQuiz.page === datasLength ? 1 : prevQuiz.page + 1
    }));

  }
  
  function lastQ() {
    setQuiz((prevQuiz: QuizState) => ({
      ...prevQuiz,
      page: prevQuiz.page === 1 ? datasLength : prevQuiz.page - 1
    }));

  }
  function handleAnswerSelection(answerId: string) {
    setSelectedAnswer(answerId);
  }
  function updateAnswerControl(answerId: string, isCorrect: boolean) {
    setAnswerControl((prevState: AnswerControl[]) => [
      ...prevState,
      { answerId: currentId ?? 0, isTrue: isCorrect, btnId: answerId }
    ]);
  }
  function incrementScore() {
    setScore((prevScore: number) => prevScore + 10);
  }
  function markQuestionAsClicked() {
    if (currentQuestion) currentQuestion.clicked = true;
  }


  function findTrue(answerId: string, isCorrect: boolean) {
    if (!currentQuestion?.clicked) {
      handleAnswerSelection(answerId);
      updateAnswerControl(answerId, isCorrect);

      if (isCorrect) {
        incrementScore();
      }

      markQuestionAsClicked();
    }
  }
  function getButtonClass(btn: Answer): string {
    const correctAnswerId = correctAnswer?.id;

    if (currentQuestion?.clicked) {
      if (buttonState.btnId === btn.id) {
        return buttonState.class; // tıklanan butonun sınıfı
      }
      return correctAnswerId === btn.id ? 'secondary-btn' : ''; // doğru cevaba yeşil ekle
    }
    return selectedAnswer === btn.id ? (btn.isCorrect ? 'secondary-btn' : 'btn-false') : '';
  }


  return (
    <div className='question-part'>
      <h3>{currentQuestion?.question}</h3>
      <div className='middle-area'>
        <button className={`btn-arrow ${currentId === 1 ? 'display' : ""}`} onClick={() => lastQ()} ><FaArrowLeft /></button>
        <div className='buttons'>
          {
            currentQuestion?.answers.map((btn: Answer) => {

              return (
                <button onClick={() => findTrue(btn.id, btn.isCorrect)}
                  className={`primary-btn btn-content ${getButtonClass(btn)}`}
                  key={btn.id}>

                  <h4>{btn.text}</h4>
                </button>
              )
            })
          }
          {currentQuestion?.id === datasLength && <Finish />}

        </div>
        <button className={`btn-arrow ${currentId === datasLength ? 'display' : ""}`} onClick={() => nextQ()}><FaArrowRight /></button>
      </div>

    </div>
  )
}

export default Question
