import {
  FFETCH_OWNER_RECIPES,
  OWNER_RECIPES
} from '../actions';

export default (state = [], action) => {
  switch (action.type) {
    case FFETCH_OWNER_RECIPES:
      console.log("ownerreducer-------->action.payload.data")
      return action.payload;
    case OWNER_RECIPES:
      console.log(action.payload, "recipereducer----action.payload.ownerRecipes---->action.payload.data")
      return action.payload;
    default:
      return state;
  }
};
