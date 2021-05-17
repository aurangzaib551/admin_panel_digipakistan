export const uploadLecture = (
  collection,
  topic,
  subTopic,
  video,
  notification
) => {
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
      .then(() => {
        firestore.collection("Notifications").add({
          name: `${collection} lecture has been uploaded`,
          createdAt: new Date(),
          course: notification,
        });
      })
      .then(() =>
        dispatch({
          type: "LECTURE_UPLOADED",
          payload: "Lecture uploaded successfully",
        })
      );
  };
};

export const updateLecture = (watch, collection, topic, notification) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    if (watch) {
      firestore
        .collection(collection)
        .doc(topic)
        .update({
          watch,
        })
        .then(() => {
          firestore.collection("Notifications").add({
            name: `${collection} lecture has been uploaded`,
            createdAt: new Date(),
            course: notification,
          });
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
