export const FETCH_MORE_JOB_LISTINGS_REQUEST = 'FETCH_MORE_JOB_LISTINGS_REQUEST';
export const FETCH_MORE_JOB_LISTINGS_SUCCESS = 'FETCH_MORE_JOB_LISTINGS_SUCCESS';
export const FETCH_MORE_JOB_LISTINGS_FAILURE = 'FETCH_MORE_JOB_LISTINGS_FAILURE';

export const fetchMoreJobListingsRequest = () => ({
  type: FETCH_MORE_JOB_LISTINGS_REQUEST
});

export const fetchMoreJobListingsSuccess = (jobListings) => ({
  type: FETCH_MORE_JOB_LISTINGS_SUCCESS,
  payload: jobListings
});

export const fetchMoreJobListingsFailure = (error) => ({
  type: FETCH_MORE_JOB_LISTINGS_FAILURE,
  payload: error
});

export const fetchMoreJobListings = (limit, offset) => {
  return async (dispatch) => {
    dispatch(fetchMoreJobListingsRequest());
    try {
      const response = await fetch(`your-api-endpoint?limit=${limit}&offset=${offset}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      dispatch(fetchMoreJobListingsSuccess(data));
    } catch (error) {
      dispatch(fetchMoreJobListingsFailure(error.message));
    }
  };
};
