import React, { useState, useEffect } from "react";
import FitText from "react-textfit";
import "./App.css";
import { evaluate } from "mathjs";
import io from "socket.io-client";
import TextField from "@material-ui/core/TextField";
import Button from "./Button";

//create data for buttons
const data = {
  buttons: [
    { id: "clear", value: "AC" },
    { id: "plus_minus_sign", value: "±" },
    { id: "percentage", value: "%" },
    { id: "divide", value: "/", backgroundColor: "#94f2d4" },

    { id: "seven", value: "7" },
    { id: "eight", value: "8" },
    { id: "nine", value: "9" },
    { id: "multiply", value: "*", display: "x", backgroundColor: "#94f2d4" },

    { id: "four", value: "4" },
    { id: "five", value: "5" },
    { id: "six", value: "6" },
    { id: "subtract", value: "-", display: "–", backgroundColor: "#94f2d4" },

    { id: "one", value: "1" },
    { id: "two", value: "2" },
    { id: "three", value: "3" },
    { id: "add", value: "+", backgroundColor: "#94f2d4" },

    { id: "delete", value: "←" },
    { id: "zero", value: "0" },
    { id: "decimal", value: "." },
    { id: "equals", value: "=", backgroundColor: "#2fc4b8" },
  ],
};

//connect to socket
// const socket = io.connect();

const App = () => {

  //set various state for values that will change
  const [currentValue, setCurrentValue] = useState("0");
  const [operator, setOperator] = useState(false);
  const [decimal, setDecimal] = useState(false);
  const [outputs, setOutputs] = useState([]);
  const [name, setName] = useState({ name: "" });


  //listen to "outputs" from the server and add the result to an array
  // useEffect(() => {
  //   socket.on("outputs", (result) => {
  //       setOutputs((prevOutputs) => [result, ...prevOutputs]);
  //   });
  // }, []);


  //when outputs change, make sure the length stays at 10 or remove last item
  useEffect(() => {
    if (outputs.length > 10) {
      setOutputs(outputs.slice(0, -1));
    }
  }, [outputs]);


  //listen for 'new-user' from the server and add the calculations to an array in order for the suer to see previous calculations 
  // useEffect(()=> {
  //   socket.on('new-user', (calculations) => {
  //     setOutputs(calculations);
  //   })
  // }, []);


  //when user types name -> change value in name state
  const onTextChange = (e) => {
    setName({ ...name, [e.target.name]: e.target.value });
  };


  //each button has a different "case"/function
  //numbers append to the current value entered
  //operators also append to the current value entered
  //AC clears the display to 0
  //← deletes previous value entered
  //± sets value to either negative or positive
  //= evaluates the values in the display
  const handleOnClick = (buttonValue) => {
    switch (buttonValue) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9": {
        if (currentValue !== "0") {
          setCurrentValue(currentValue + buttonValue);
          setOperator(null);
        } else {
          setCurrentValue(buttonValue);
        }
        break;
      }
      case "*":
      case "+":
      case "-":
      case "/":
      case "%": {
        if (!operator) {
          setCurrentValue(currentValue + buttonValue);
          setOperator(buttonValue);
        } else {
          const newValue = currentValue.slice(0, currentValue.length - 1);
          setCurrentValue(newValue + buttonValue);
        }
        break;
      }
      case "AC":
        setCurrentValue("0");
        break;

      case "±":
        setCurrentValue(currentValue * -1);
        break;

      case "←":
        const newValue =
          currentValue.length > 1
            ? currentValue.slice(0, currentValue.length - 1)
            : "0";
        setCurrentValue(newValue);
        break;

      case ".":
        if (!decimal) {
          setCurrentValue(currentValue + ".");
          setDecimal(true);
        }
        break;

      case "=":
        if (currentValue.length < 3) {
          setCurrentValue("NaN");
        }
        const answer =
          parseFloat(currentValue) % 1 !== 0
            ? evaluate(currentValue).toFixed(2)
            : evaluate(currentValue);
        setCurrentValue(answer);

        if (outputs.length > 10) {
          setOutputs(outputs.slice(0, -1));
        }

        const result = `${name.name.length >= 1 ? name.name + ":" : " "}  ${(
          currentValue +
          "=" +
          answer
        ).toString()}`;

        setOutputs(result);

        //sends result to server
        // socket.emit("output", result);

        break;

      default:
        break;
    }
  };

  //layout of each part of the app
  //in the outputs container, it'll map out the outputs in the array in descending order from most recent to oldest
  return (
    <div className="wrapper">
      <div className="calc">
        <div className="name-card">
          <h2>Name:</h2>
          <div className="name-field">
            <TextField
              name="name"
              onChange={(e) => onTextChange(e)}
              value={name.name}
            />
          </div>
        </div>
        <div className="display">
          <FitText mode="single">{currentValue}</FitText>
        </div>
        <div className="button-container">
          {data.buttons.map((button) => (
            <Button
              key={button.id}
              onClick={() => handleOnClick(button.value)}
              {...button}
            />
          ))}
        </div>
      </div>
      <div className="vertical_line"></div>
      <div className="calculations-container">
        <h2>Calculations:</h2>
        <div className="outputs-container">
          {outputs.map((output, index) => (
            <div className="output" key={index}>
              {output}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
