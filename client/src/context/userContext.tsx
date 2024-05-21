
import Cookies from 'js-cookie';
import React, { createContext, useReducer, ReactNode, Dispatch, FC } from 'react';
// Define the shape of the state
interface State {
  userInfo: any | null;
  isLoggedIn:boolean
}
// Define action types
type Action =
  | { type: 'USER_LOGIN'; payload: any }
  | { type: 'USER_LOGOUT' };
// Initial state
const initialState: State = {
  userInfo: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo') as string) : null,
  isLoggedIn:false
};
// Reducer function
function reducer(state: State, action: Action): State {
  console.log('action', action.type)
  switch (action.type) {
    case 'USER_LOGIN':
      return { ...state, userInfo: action.payload, isLoggedIn:true };
    case 'USER_LOGOUT':
      return { ...state, userInfo: null,isLoggedIn:false };
    default:
      return state;
  }
}
// Create the UserContext
interface UserContextProps {
  state: State;
  dispatch: Dispatch<Action>;
}
const UserContext = createContext<UserContextProps | undefined>(undefined);
// UserProvider component
interface UserProviderProps {
  children: ReactNode;
}
const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
// Export the UserContext to use it in other components
export { UserContext, UserProvider };





