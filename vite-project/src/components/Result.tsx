import { useQuizContext } from "../Context";

function Result() {
  const { score, datasLength, tryAgain } = useQuizContext();
  return (
    <div className='score'>
      <div className='score-card'>
        <div className='score-card-messages'>
          <div>

          </div>
          <h3 className='h3-message'>Your score is <span className='span-color'>{score}</span> out of {datasLength * 10}</h3>

          {
            score >= 70 ? (
              <h4>Amazing job! You really nailed it with a score of {score}. Keep up the great work, you're on your way to becoming a React pro!</h4>
            ) : score >= 50 ? (
              <h4>Great effort! You scored {score}, which is a solid result. With a bit more practice, you'll reach the top in no time!</h4>
            ) : (
              <h4>Don't give up! You scored {score}, but remember that every step is progress. Keep learning and you'll see improvement soon!</h4>
            )
          }
        </div>
      </div>
      <button onClick={tryAgain} className='try-finish-btn' >Try again</button>
    </div>
  )
}

export default Result
