import React, { useState } from "react";

//#region 
const Container = ({ children }) => {
  return <div className="container">{children}</div>;
};

const Screen = ({ value }) => {
  return (
    <div className="screen" mode="single" max={70}>
      {value}
    </div>
  );
};

const ButtonBox = ({ children }) => {
  return <div className="buttonBox">{children}</div>;
};

const Button = ({ className, value, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
};
//#endregion

// Array for the visualization of the layout
const btnValues =[ ["C", "+-", "%", "/"], [7, 8, 9, "X"], [4, 5, 6, "-"], [1, 2, 3, "+"], [0, ".", "="] ];

/*
    ["C", "+-", "%", "/"],
      [7, 8, 9, "X"],
      [4, 5, 6, "-"],
      [1, 2, 3, "+"],
      [0, ".", "="] 
*/

// Conversion to string
const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

// To reverse the process we have to remove the spaces
const removeSpaces = (num) => num.toString().replace(/\s/g, "");

// Declare the state variables. Sign for the selected operator, num for the entered value, and res for the result
// using React 'useState' hook
const App = () => {
  let [calc, setCalc] = useState({  
    sign: "",
    num: 0,
    res: 0,
  });

  // Set value to triggered button value
  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    // IF
    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : removeSpaces(calc.num) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  }; 

// Creates a floating point number // Doesn't allow multiple commas
  const comaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc, // IF
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

 // +,-,*,/
  const signClickHandler = (e) => {
    setCalc({
      ...calc,
      sign: e.target.innerHTML, // IF
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  // third IF
  // Calculates result when '=' is pressed //  num / sign / res
  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "X"
          ? a * b
          : a / b;

      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : toLocaleString(
                math(
                  Number(removeSpaces(calc.res)),
                  Number(removeSpaces(calc.num)),
                  calc.sign
                )
              ),
        sign: "",
        num: 0,
      });
    }
  };

// Changes sign (+/- n) by multiplying with -1 
  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
      sign: "",
    });
  };

  // 2 % 0.02 // Calc percentage by using Math.pow
  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;
    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });
  };

  // Clear
  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  return (
    <Container>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={btn === "=" ? "equals" : ""}
              value={btn}
              onClick={
                btn === "C"
                  ? resetClickHandler
                  : btn === "+-"
                  ? invertClickHandler
                  : btn === "%"
                  ? percentClickHandler
                  : btn === "="
                  ? equalsClickHandler
                  : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                  ? signClickHandler
                  : btn === "."
                  ? comaClickHandler
                  : numClickHandler
              }
            />
          );
        })}
      </ButtonBox>
    </Container>
  );
};

export default App;