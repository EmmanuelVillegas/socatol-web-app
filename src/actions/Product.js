import {
  ActionsTypesCreator,
  ActionsCreator,
  ActionsCreatorsCreator
} from '../utils/Basics';

// Actions
export const Actions = ActionsCreator('product');
export const ActionsTypes = ActionsTypesCreator('product');
export const ActionsCreators = ActionsCreatorsCreator(Actions, 'product');

// Actions Creators
export const GET_ALL = ActionsCreators.GET_ALL('product');

// export function GET_ALL(payload) {
//   return async dispatch => {
//     const result = await API.post('user/login', payload);
//     if (result) {
//       const token = result.data.token;
//       localStorage.setItem('JWToken', token);
//       setAuthorizationToken(token);
//       dispatch(setCurrentUser(token));
//     }
//   };
// }