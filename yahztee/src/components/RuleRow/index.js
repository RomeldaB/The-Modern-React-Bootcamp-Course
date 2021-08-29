import React from "react";
import "./index.css";

function RuleRow(props) {
  const { score, name, doScore, description } = props;
  const disabled = score !== undefined;
  return (
    <tr
      className={`RuleRow RuleRow-${disabled ? "disabled" : "active"}`}
      onClick={disabled ? null : doScore}
    >
      <td className='RuleRow-name'>{name}</td>
      <td className='RuleRow-score'>{disabled ? score : description}</td>
    </tr>
  );
}

export default RuleRow;
