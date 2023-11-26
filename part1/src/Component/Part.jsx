import React from "react";

const Part = (props) => {
    return(
        <div> 
        <p> {props.chapter.part1[0]} {props.chapter.exercises1[0]}</p>
        <p> {props.chapter.part1[1]} {props.chapter.exercises1[1]}</p>
        <p> {props.chapter.part1[2]} {props.chapter.exercises1[2]}</p>
       </div>
 
    )
}

export default Part;