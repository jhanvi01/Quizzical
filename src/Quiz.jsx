import React from "react";
import Question from "./Question";
import {nanoid} from "nanoid"


export default function Quiz(props){

    const [score, setScore] = React.useState(0)

    const [checkAnswers, setCheckAnswers] = React.useState(false)

    const [questions, setQuestions] = React.useState(setInitialQuestions)
    
    
    function setInitialQuestions(){
        
        const questions =  props.quizData.results.map(data=> {
            
            let answers = [...data.incorrect_answers, data.correct_answer]
            let answersArray= answers.map((answer,i)=>{
                return {
                    id: nanoid(),
                    // questionID: props.question.id,
                    value: answer,
                    correct : i== answers.length -1? true: false,
                    selected: false
                }
            })
            
            shuffle(answersArray)
    
            return {  
                id:nanoid(),
                question: data.question, 
                answers:answersArray
            }
    
        }
        )

        return questions
    }



    // to shuffle the answers array
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

      
      
    function toggleSelected(answerID, questionID){

  
        // deselect the other answer from that question
        setQuestions(oldQArray=>(
            oldQArray.map(question=> {
                return question.id!==questionID? question: {
                    ...question,
                    answers: question.answers.map(answer=>({...answer, selected:false}))
                }
                
            } )
        ))
        
        
        // select the current clicked answer
        
        setQuestions(oldQArray=>(
            oldQArray.map(question=> {
                return question.id!==questionID? question: {
                    ...question,
                    answers: question.answers.map(answer=>{
                        
                        return answer.id==answerID? {...answer, selected:true} : answer
                    })
                }
                
            } )
        ))
        
        
        
    }
         const questionElements=questions.map(question=>{
        
            return<Question 
                    key={question.id} 
                    questionID={question.id} 
                    toggleSelected={(answerID, questionID )=>toggleSelected(answerID,questionID)}
                    checkAnswers={checkAnswers} 
                    setQuestions={setQuestions} 
                    score={score} 
                    setScore={setScore} 
                    question={question}
                    />
            }
            ) 
    


    React.useEffect(()=>{
        if(checkAnswers){

            for(let i=0;i<questions.length;i++){
                for(let j=0;j<questions[i].answers.length;j++){
                    if(questions[i].answers[j].selected && questions[i].answers[j].correct){
                        setScore(oldScore=> oldScore+1)
                    }
                }
            }


        }

    },[checkAnswers])            

    function ResetGame(){
        setQuestions([])
        props.setQuizStart(false)
        
    }


    return (
        <div className="quiz">
            <div>
            {questionElements}
            </div>
           
           {checkAnswers?
                <>
               <p className="score">You Scored {score} / {questions.length} correct answers</p>
               <button className="blue-btn" onClick={ResetGame}>Play Again</button>
                </>
            :
           <button className="blue-btn"  onClick={()=>setCheckAnswers(true)}>Check answers</button>
}
        </div>
    )
}
