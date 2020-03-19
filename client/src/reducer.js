export default function reducer(state, action) {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        currentUser: action.payload
      };
    case "LOGOUT_USER":
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false
      };
    case "IS_LOGGED_IN":
      return {
        ...state,
        isAuthenticated: action.payload
      };
    case "CREATE_DRAFT":
      return {
        ...state,
        draft: {
          longitude: 0,
          latitude: 0
        }
      };
    case "UPDATE_DRAFT_LOCATION":
      return {
        ...state,
        draft: action.payload
      };
    case "DELETE_DRAFT":
      return {
        ...state,
        draft: null
      };
    default:
      return state;
  }
}
