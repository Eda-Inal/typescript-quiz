import './styles.scss';
import Main from './components/Main';
import { QuizProvider } from './Context';

function App() {
  return (
    <>
      <QuizProvider>
        <Main />
      </QuizProvider>
    </>
  )
}

export default App
