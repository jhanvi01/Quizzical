import React from "react"
import Home from "./Home"
import Quiz from "./Quiz"


function App() {

  const [quizStart, setQuizStart]= React.useState(false)
  const [quizData, setQuizData]= React.useState([])

React.useEffect(()=>{

async function getQuiz(){

  if(quizStart){
    // https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple
    const response = await fetch("https://opentdb.com/api.php?amount=7&encode=url3986&difficulty=easy&type=multiple")
    const data=await response.json()
    setQuizData(data)
  }

}

getQuiz()

},[quizStart])

  

  return (
    <div className="main-container">
      <main className="main-body">
        
        {!quizStart || quizData.length===0? 
        <Home setQuizStart={setQuizStart}/>:
        <Quiz setQuizStart={setQuizStart} quizData={quizData} />
        }

      </main>
    </div>
  )
}

export default App
