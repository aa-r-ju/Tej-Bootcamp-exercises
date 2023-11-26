import React from "react";
import Part from "./Part";
const Content = ({parts,exercises}) => {
    return(
        <>
        <Part chapter = {parts[0]} number = {exercises[0]} />
        <Part chapter = {parts[1]} number = {exercises[1]}  />
        <Part chapter = {parts[2]} number = {exercises[2]}  />
        </>
         )
  }
  export default Content;