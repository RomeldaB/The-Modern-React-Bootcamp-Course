import React, { useState } from "react";
import "./index.css";

function Card({image, name}) {
  const [angle] = useState( Math.random() * 90 - 45);
  const [xPos] = useState(Math.random() * 40 - 20);
  const [yPos] = useState(Math.random() * 40 - 20);
  let transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;
 
  return (
    <img
      style={{ transform }}
      className='Card'
      src={image}
      alt={name}
    />
  );
}
export default Card;
