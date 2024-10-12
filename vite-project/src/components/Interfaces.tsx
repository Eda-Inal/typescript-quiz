export interface Answer {
    id: string;
    text: string;
    isCorrect: boolean;
  }
  
  export interface Question {
    question: string;
    answers: Answer[];
    id: number;
    clicked: boolean;
  }
 export interface QuizState {
    page:number;
    finishQuiz: boolean,
    startQuiz:boolean
    }