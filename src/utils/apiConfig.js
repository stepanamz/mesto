const token = '7fac089b-5548-4e87-af58-0cf3b47eea4b';
const cohortId = 'cohort-63';

export const apiConfig = {
  baseUrl: `https://mesto.nomoreparties.co/v1/${cohortId}`,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
};
