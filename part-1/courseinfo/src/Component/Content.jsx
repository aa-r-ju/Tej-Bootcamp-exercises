import React from "react";
import Part from "./Part";
const Content = ({parts}) => {
    return(
        <>
       
        {parts.map( (value, i) => {
            return(         
       <Part key = {i} val = {value} />
   )            
        })}
        </>
         )
  }
  export default Content;