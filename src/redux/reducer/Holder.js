export const SIGN_IN = "SIGNIN";
export const PASSWORD = "PASSWORD";
export const PRODUCTS = "PRODUCTS";

const initialState = {
  userData: null,
  ProductsData: null,
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
    case PRODUCTS:
      return {
        ...state,
        ProductsData: action.payload,
      };
    default: {
      return state;
    }
  }
};

export default holderReducer;
