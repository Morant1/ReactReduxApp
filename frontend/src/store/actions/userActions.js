import userService from '../../services/userService';

export function loadUsers() {
  return async dispatch => {
    try {
      const users = await userService.getUsers();
      console.log("users",users)
      dispatch({ type: 'SET_USERS', users });
    } catch (err) {
      console.log('err in loadUsers', err);
    };
  }
}


export function login(userCreds) {
  return async dispatch => {
    const user = await userService.login(userCreds);
    dispatch({ type: 'SET_USER', user });
    return user;
  };
}
export function signup(userCreds) {
  return async dispatch => {
    const user = await userService.signup(userCreds);
    dispatch({ type: 'SET_USER', user });
    return user;
    // history.push('/toy');
  };
}

export function logout() {
  return async dispatch => {
    await userService.logout();
    dispatch({ type: 'SET_USER', user: null });
  };
}
