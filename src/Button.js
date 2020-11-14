import React from "react";
import './Button.css';
//button created from data in app.js
const Button = ({ id, value, display, onClick, backgroundColor }) => (
  <div className="button" name={id} onClick={onClick} style={backgroundColor ? {backgroundColor} : {backgroundColor: "#faf8f5"}}>{display ? display : value}</div>
);

export default Button;
