const DEFAULT_STATE = {
    info: {},
    fetching: false,
    fetched: false,
    error: null,
};

const country = (state = DEFAULT_STATE, action) => {

    switch (action.type) {
    case 'FETCH_COUNTRY': {
        return {
            info: {},
            fetching: true,
            fetched: false,
            error: null,
        };
    }
    case 'FETCH_COUNTRY_REJECTED': {
        return {
            ...state,
            fetching: false,
            error: action.payload,
        };
    }
    case 'FETCH_COUNTRY_FULFILLED': {
        return {
            info: action.payload,
            fetching: false,
            fetched: true,
            error: null,
        };
    }
    case 'UPDATE_COUNTRY': {
        return {
            info: action.payload,
            fetching: false,
            fetched: true,
            error: null,
        };
    }
    default:
        return state;
    }
};

export default country;