export const SIGN_IN = 'SIGNIN';

const initialState = {
userData: null,
};

const holderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        userData: action.payload,
      };
    default: {
      return state;
    }
  }
};

export default holderReducer;