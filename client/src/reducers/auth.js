import authActions from "../actions/authActions";
const authorization = (state = { isAuth: false }, action) => {
  const { LOGIN_REQUESTED, LOGIN_SUCCESSFUL, LOGIN_FAILED, LOGUT_REQUESTED } =
    authActions;
  switch (action.type) {
    case LOGIN_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESSFUL:
      return {
        ...state,
        isAuth: true,
        isLoading: false,
        user: {
          name: "Alphabet",
          details: "Owners of google.com and its proprietary company",
        },
      };
    case LOGIN_FAILED:
      return {
        ...state,
        isAuth: false,
        isLoading: false,
      };
    case LOGUT_REQUESTED:
      return {
        ...state,
        isAuth: false,
        isLoading: false,
        user: undefined, // removing user object
      };
    default:
      return {
        ...state,
      };
  }
};

export default authorization;
