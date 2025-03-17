import { createStore } from 'redux';

// Initial state
const initialState = {
  year: 1950,
  running: false,
  speed: 500,
  increaseByAmount: 1,
};

// Action types
const START = 'START';
const PAUSE = 'PAUSE';
const RESUME = 'RESUME';
const RESET = 'RESET';
const RESTART = 'RESTART';
const SET_VALUE = 'SET_VALUE';
const SET_SPEED = 'SET_SPEED';
const SET_INCREASE_AMOUNT = 'SET_INCREASE_AMOUNT';

// Action creators
export const start = () => ({
  type: START,
});

export const pause = () => ({
  type: PAUSE,
});

export const resume = () => ({
  type: RESUME,
});

export const reset = () => ({
  type: RESET,
});

export const restart = () => ({
  type: RESTART,
});

export const setValue = (value) => ({
  type: SET_VALUE,
  payload: value,
});

export const setSpeed = (speed) => ({
  type: SET_SPEED,
  payload: speed,
});

export const setIncreaseAmount = (amount) => ({
  type: SET_INCREASE_AMOUNT,
  payload: amount,
});

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case START:
      return {
        ...state,
        running: true,
      };
    case PAUSE:
      return {
        ...state,
        running: false,
      };
    case RESUME:
      return {
        ...state,
        running: true,
      };
    case RESET:
      return {
        ...initialState,
      };
    case RESTART:
      return {
        ...initialState,
        running: true,
      };
    case SET_VALUE:
      return {
        ...state,
        year: action.payload,
      };
    case SET_SPEED:
      return {
        ...state,
        speed: action.payload,
      };
    case SET_INCREASE_AMOUNT:
      return {
        ...state,
        increaseByAmount: action.payload,
      };
    default:
      return state;
  }
};

// Create store
const store = createStore(reducer);

export default store;