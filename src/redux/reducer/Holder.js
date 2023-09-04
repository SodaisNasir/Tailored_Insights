export const SIGN_IN = 'IS_SIGNIN';

const initialState = {
  userDetails: null,
};

const holderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        userDetails: action.payload,
      };
    default: {
      return state;
    }
  }
};

export default holderReducer;