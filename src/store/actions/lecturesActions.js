export const uploadLecture = (collection, topic, subTopic, video) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection(collection)
      .doc(topic)
      .set({
        topic,
        watch: [
          {
            subTopic,
            video,
          },
        ],
      })
      .then(() =>
        dispatch({
          type: "LECTURE_UPLOADED",
          payload: "Lecture uploaded successfully",
        })
      );
  };
};

export const updateLecture = (watch, collection, topic) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    if (watch) {
      firestore
        .collection(collection)
        .doc(topic)
        .update({
          watch,
        })
        .then(() =>
          dispatch({
            type: "LECTURE_UPDATED",
            payload: "Lecture updated successfully",
          })
        );
    }
  };
};

export const clearAll = () => {
  return (dispatch) =>
    dispatch({
      type: "CLEAR_ALL",
    });
};
