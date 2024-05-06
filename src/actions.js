export const GET_DATA = 'GET_DATA';

export const getData = (data) => ({
  type: GET_DATA,
  payload: data,
});