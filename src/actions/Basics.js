import axios from 'axios';
import { createActions } from 'redux-actions';

// Action Types Creator
export const ActionsTypesCreator = name => ({
  STARTED: `${name}_STARTED`,
  SUCCESS: `${name}_SUCCESS`,
  FAILURE: `${name}_FAILURE`,
  GET: `${name}_GET`,
  NEW: `${name}_NEW`,
  GET_ALL: `${name}_GET_ALL`,
  UPDATE: `${name}_UPDATE`,
  DELETE: `${name}_DELETE`,
});

// Actions Creator
export const ActionsCreator = name =>
  createActions(
    `${name}_STARTED`,
    `${name}_SUCCESS`,
    `${name}_FAILURE`,
    `${name}_GET`,
    `${name}_NEW`,
    `${name}_GET_ALL`,
    `${name}_UPDATE`,
    `${name}_DELETE`
  );

// Actions Creators Creator
export const ActionsCreatorsCreator = (Actions, name) => {
  const nameLower = name.toLowerCase();
  const ActionsList = {
    Started: Actions[`${nameLower}Started`],
    Success: Actions[`${nameLower}Success`],
    Failure: Actions[`${nameLower}Failure`],

    Get: Actions[`${nameLower}Get`],
    GetNew: Actions[`${nameLower}New`],
    GetAll: Actions[`${nameLower}GetAll`],
    Update: Actions[`${nameLower}Update`],
    Delete: Actions[`${nameLower}Delete`],
  };

  const Methods = {
    GET: (url, id) => async dispatch => {
      dispatch(ActionsList.Started());
      const result = await axios.get(`${url}/${id}`);
      if (result) {
        dispatch(ActionsList.Success());
        // Modificar Action
        setTimeout(() => {
          dispatch(ActionsList.GetAll(result.data));
        }, 2000);
      }
    },

    GET_ALL: url => async dispatch => {
      dispatch(ActionsList.Started());
      const result = await axios.get(url);
      if (result) {
        dispatch(ActionsList.Success());
        setTimeout(() => {
          dispatch(ActionsList.GetAll(result.data));
        }, 2000);
      }
    },

    NEW: (url, payload) => async dispatch => {
      dispatch(ActionsList.Started());
      const result = await axios.post(url, payload);
      if (result) {
        dispatch(ActionsList.Success());
        // Modificar Action
        setTimeout(() => {
          dispatch(ActionsList.GetAll(result.data));
        }, 2000);
      }
    },

    UPDATE: (url, id, payload) => async dispatch => {
      dispatch(ActionsList.Started());
      const result = await axios.patch(`${url}/${id}`, payload);
      if (result) {
        dispatch(ActionsList.Success());
        // Modificar Action
        setTimeout(() => {
          dispatch(ActionsList.GetAll(result.data));
        }, 2000);
      }
    },

    DELETE: (url, id) => async dispatch => {
      dispatch(ActionsList.Started());
      const result = await axios.delete(url, id);
      if (result) {
        dispatch(ActionsList.Success());
        // Modificar Action
        setTimeout(() => {
          dispatch(ActionsList.GetAll(result.data));
        }, 2000);
      }
    },
  };

  return Methods;
};