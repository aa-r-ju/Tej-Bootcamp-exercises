import React from "react";
const Total = (props) => {
    return(
      <div>
      <p> Number of exercises is {props.total[0] + props.total[1] + props.total[2]}</p>
      </div>
    )
  }

  export default Total;