const initialState = {
  msg: "",
};

const authReducer = (state = initialState, action) => {
  // Object Destructuring
  const { type, payload } = action;

  if (type) {
    return {
      ...state,
      msg: payload,
    };
  } else return state;
};

export default authReducer;
