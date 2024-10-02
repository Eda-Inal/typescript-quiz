import './styles.scss';


function App() {


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
          <h2>What is the capital city of German?</h2>
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
        </div>



      </div>

    </>
  )
}

export default App
