import {
  USERS_POSTS_STATE_CHANGE,
  USERS_DATA_STATE_CHANGE,
  CLEAR_DATA,
} from "../constants";

const initialState = {
  users: [],
  userLoaded: 0,
};

export const users = (state = initialState, action) => {
  switch (action.type) {
    case USERS_DATA_STATE_CHANGE:
      return {
        ...state,
        users: [...state.users, action.user],
      };

    case USERS_POSTS_STATE_CHANGE:
      return {
        ...state,
        userLoaded: state.userLoaded + 1,
        users: state.users.map((user) =>
          user.uid === action.uid
            ? { ...user, user, posts: action.posts }
            : { ...user, user, posts: action.posts }
        ),
      };
    case CLEAR_DATA:
      return {
        users: [],
        userLoaded: 0,
      };
    default:
      return state;
  }
};
