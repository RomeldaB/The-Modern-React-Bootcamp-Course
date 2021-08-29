import React from 'react'
import "./index.css"

function Cell({flipCellsAroundMe, isLit}) {
  const handleClick = () =>  {
    flipCellsAroundMe();
  }

  let classes = "Cell" + (isLit ? " Cell-lit" : "");

  return (
      <td className={classes} onClick={handleClick} />
  )
}

export default Cell