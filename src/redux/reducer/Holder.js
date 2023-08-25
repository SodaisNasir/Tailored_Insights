export const IS_SIGN_IN = 'IS_SIGNIN';

const initialState = {
  isSignin: null,
};

const holderReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_SIGN_IN:
      return {
        ...state,
        isSignin: action.payload,
      };
    default: {
      return state;
    }
  }
};

export default holderReducer;