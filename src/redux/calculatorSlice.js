import { createSlice } from '@reduxjs/toolkit';
import { create, all } from 'mathjs';

const math = create(all); // Create a math.js instance

const initialState = {
  currentVal: '0',
  prevVal: '0',
  formula: '',
  currentSign: 'pos',
  lastClicked: '',
  evaluated: !1,
};

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    maxDigitWarning(state) {
      state.currentVal = 'NUMBER LIMIT';
    },
    initialize(state) {
      Object.assign(state, initialState);
    },
    handleNumbers(state, action) {
      const input = action.payload;
      const { currentVal, formula, evaluated } = state;

      if (evaluated) {
        state.currentVal = input;
        state.formula = input !== '0' ? input : '';
      } else {
        state.currentVal =
          currentVal === '0' || /[x/+-]/.test(currentVal)
            ? input
            : currentVal + input;
        state.formula =
          currentVal === '0' && input === '0'
            ? formula === ''
              ? input
              : formula
            : /([^.0-9]0|^0)$/.test(formula)
            ? formula.slice(0, -1) + input
            : formula + input;
      }
    },
    handleOperators(state, action) {
      const operator = action.payload;
      const { formula, prevVal, evaluated } = state;

      state.currentVal = operator;
      state.evaluated = false;

      if (evaluated) {
        state.formula = prevVal + operator;
      } else if (/[x+-/]$/.test(formula)) {
        if (/\d[x/+-]{1}-$/.test(formula)) {
          if (operator !== '-') state.formula = prevVal + operator;
        } else {
          state.formula =
            (/\d[x/+-]{1}-/.test(formula + operator) ? formula : prevVal) +
            operator;
        }
      } else {
        state.prevVal = formula;
        state.formula = formula + operator;
      }
    },

    handleEvaluate(state) {
      if (state.currentVal.includes('Limit')) return;

      let { formula } = state;

      // Remove trailing operators
      formula = formula.replace(/[x+-/]+$/, '');

      try {
        // Sanitize and evaluate the formula
        const sanitizedExpression = formula
          .replace(/x/g, '*')
          .replace(/--/g, '+');

        // Use math.js to evaluate the expression
        const result = math.evaluate(sanitizedExpression);
        const roundedResult = Math.round(result * 1e12) / 1e12;

        // Update state with the result
        state.currentVal = roundedResult.toString();
        state.formula = `${formula.replace(/\*/g, '⋅')}=${roundedResult}`;
        state.prevVal = roundedResult.toString();
        state.evaluated = true;
      } catch (error) {
        console.error('Evaluation error:', error);

        // Handle evaluation errors
        state.currentVal = 'Error';
        state.formula = '';
        state.prevVal = '';
        state.evaluated = true;
      }
    },

    handleDecimal(state) {
      const { currentVal, formula, evaluated } = state;

      if (evaluated) {
        state.currentVal = '0.';
        state.formula = '0.';
        state.evaluated = false;
      } else if (!currentVal.includes('.') && !currentVal.includes('Limit')) {
        if (/[x/+-]$/.test(formula) || (currentVal === '0' && formula === '')) {
          state.currentVal = '0.';
          state.formula = formula + '0.';
        } else {
          state.currentVal += '.';
          state.formula += '.';
        }
      }
    },
  },
});

export const {
  maxDigitWarning,
  initialize,
  handleNumbers,
  handleOperators,
  handleEvaluate,
  handleDecimal,
} = calculatorSlice.actions;

export default calculatorSlice.reducer;
