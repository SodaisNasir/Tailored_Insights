export const SIGN_IN = 'SIGNIN';
export const PASSWORD = 'PASSWORD'

const initialState = {
  userData: null,
  password: null,
};

const holderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        userData: action.payload,
      };
    case PASSWORD:
      return {
        ...state,
        userData: action.password,
      };

    default: {
      return state;
    }
  }
};

export default holderReducer;