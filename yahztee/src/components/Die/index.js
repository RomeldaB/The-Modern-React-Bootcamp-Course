import React from "react";
import "./index.css";

function Die({numberWords = ["one", "two", "three", "four", "five", "six"], val = 5, ...props}) {
  const handleClick = () => {
    props.handleClick(props.idx);
  }

  const { locked, disabled, rolling } = props;
  let classes = `Die fas fa-dice-${numberWords[val - 1]} fa-5x `;
  if (locked) classes += "Die-locked";
  if (rolling) classes += "Die-rolling";
  return (
    <i className={classes} onClick={handleClick} disabled={disabled} />
  );
}

export default Die;
