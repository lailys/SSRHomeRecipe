import {
  FFETCH_RECIPES,
} from '../actions';

export default (state = [], action) => {
  switch (action.type) {
    case FFETCH_RECIPES:
      console.log(action.payload.data, "recipereducer----FFETCH_RECIPES---->action.payload.data")
      return action.payload;

    default:
      return state;
  }
};
