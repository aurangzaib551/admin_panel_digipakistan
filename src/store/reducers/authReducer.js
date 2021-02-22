const initialState = {
  msg: "",
};

const authReducer = (state = initialState, action) => {
  // Object Destructuring
  const { type, payload } = action;

  if (type === "SIGN_IN_SUCCESSFULLY") {
    return {
      ...state,
      msg: payload,
    };
  } else if (type === "SIGN_IN_ERROR") {
    return {
      ...state,
      msg: payload,
    };
  } else if (type === "CLEAR_ALL") {
    return {
      ...state,
      msg: "",
    };
  } else return state;
};

export default authReducer;
