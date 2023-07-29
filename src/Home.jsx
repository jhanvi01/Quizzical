import React from "react";

export default function Home(props){


    return(
        <div className="home">
            <h1 className="title">
                Quizzical 
            </h1>
            <p>Come and check your quiz skills</p>
            <button className="blue-btn" onClick={()=>props.setQuizStart(true)}>Start Quiz</button>
        </div>
    )
}