const initialState = {
  lectureUploaded: "",
};

export const lectures = (state = initialState, actions) => {
  if (actions.type === "LECTURE_UPLOADED") {
    return {
      ...state,
      lectureUploaded: actions.payload,
    };
  }
  if (actions.type === "LECTURE_UPDATED") {
    return {
      ...state,
      lectureUploaded: actions.payload,
    };
  } else if (actions.type === "CLEAR_ALL") {
    return {
      ...state,
      lectureUploaded: "",
    };
  } else {
    return state;
  }
};
