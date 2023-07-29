import React from "react";
import { decode } from "html-entities";



export default function Question(props){

    function decodeText(text){
        text= decode(text)
        text = decodeURI(text)
        text= unescape(text)
        return text
    
    }


    const answerElements= props.question.answers.map(answer =>{
        let color
        if(props.checkAnswers&& answer.selected && answer.correct){
            color="#94D7A2"
        }else if(props.checkAnswers && answer.selected && !answer.correct){
            color="#F8BCBC"
        }else if(props.checkAnswers && !answer.selected && answer.correct){
            color="#94D7A2"
        }else if(!props.checkAnswers){
            color=answer.selected? "#D6DBF5" : "transparent"
        }

        let styles={
            backgroundColor:  color
            // backgroundColor: answer.correct? "#94D7A2" : "#F8BCBC"
        }

        return <div 
        onClick={()=>props.toggleSelected(answer.id, props.questionID)} 
        key={answer.id} 
        style={styles} 
        className="answer">
            {decodeText(answer.value)}
        </div>
    })


    return(
        <div>
            <div className="question">
            {decodeText(props.question.question)} <br/>
            </div>
            <div>
            {answerElements}
            </div>
            <hr/>
                      
        </div>
    )

}