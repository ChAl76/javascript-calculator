import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleNumbers,
  handleOperators,
  handleEvaluate,
  handleDecimal,
  initialize,
  maxDigitWarning,
} from './redux/calculatorSlice';

const Calculator = () => {
  const dispatch = useDispatch();
  const { currentVal, formula } = useSelector((state) => state.calculator);

  const handleNumbersClick = (e) => {
    if (currentVal.length > 20) {
      dispatch(maxDigitWarning());
      setTimeout(() => dispatch(initialize()), 2000);
      return;
    }
    dispatch(handleNumbers(e.target.value));
  };

  const handleOperatorsClick = (e) => {
    dispatch(handleOperators(e.target.value));
  };

  const handleEvaluateClick = () => {
    dispatch(handleEvaluate());
  };

  const handleDecimalClick = () => {
    dispatch(handleDecimal());
  };

  const handleReset = () => {
    dispatch(initialize());
  };

  return (
    <div className="calculator">
      <div className="calculator__body">
        <Formula formula={formula} />
        <Output currentValue={currentVal} />
        <Buttons
          decimal={handleDecimalClick}
          evaluate={handleEvaluateClick}
          initialize={handleReset}
          numbers={handleNumbersClick}
          operators={handleOperatorsClick}
        />
      </div>
      <div className="calculator__author">
        Created By
        <br />
        <a
          href="https://github.com/ChAl76"
          target="_blank"
          rel="noreferrer"
          className="calculator__author-link"
        >
          Alexander Chorny
        </a>
      </div>
    </div>
  );
};

const Formula = ({ formula }) => (
  <div className="calculator__formula">{formula}</div>
);

const Output = ({ currentValue }) => (
  <div className="calculator__output" id="display">
    {currentValue}
  </div>
);

const Buttons = ({ decimal, evaluate, initialize, numbers, operators }) => (
  <div className="calculator__buttons">
    <button
      className="calculator__button--jumbo calculator__button--clear"
      id="clear"
      onClick={initialize}
      value="AC"
    >
      AC
    </button>
    <button
      className="calculator__button--operator"
      id="divide"
      onClick={operators}
      value="/"
    >
      /
    </button>
    <button
      className="calculator__button--operator"
      id="multiply"
      onClick={operators}
      value="x"
    >
      x
    </button>
    <button id="seven" onClick={numbers} value="7">
      7
    </button>
    <button id="eight" onClick={numbers} value="8">
      8
    </button>
    <button id="nine" onClick={numbers} value="9">
      9
    </button>
    <button
      className="calculator__button--operator"
      id="subtract"
      onClick={operators}
      value="-"
    >
      -
    </button>
    <button id="four" onClick={numbers} value="4">
      4
    </button>
    <button id="five" onClick={numbers} value="5">
      5
    </button>
    <button id="six" onClick={numbers} value="6">
      6
    </button>

    <button
      className="calculator__button--operator"
      id="add"
      onClick={operators}
      value="+"
    >
      +
    </button>
    <button id="one" onClick={numbers} value="1">
      1
    </button>
    <button id="two" onClick={numbers} value="2">
      2
    </button>
    <button id="three" onClick={numbers} value="3">
      3
    </button>
    <button
      className="calculator__button--jumbo"
      id="zero"
      onClick={numbers}
      value="0"
    >
      0
    </button>

    <button id="decimal" onClick={decimal} value=".">
      .
    </button>
    <button
      className="calculator__button--equal"
      id="equals"
      onClick={evaluate}
      value="="
    >
      =
    </button>
  </div>
);

export default Calculator;
