import { FFETCH_RECIPE_DETAIL  } from '../actions';

export default (state = null, action) => {
  switch (action.type) {
    case FFETCH_RECIPE_DETAIL :
        console.log(action.payload.data,"detailreducer-------->action.payload.data")
      return action.payload.data;

    default:
      return state;
  }
};