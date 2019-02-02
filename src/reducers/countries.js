const DEFAULT_STATE = {
    all: [],
    list: [],
    fetching: false,
    fetched: false,
    error: null,
};

const countries = (state = DEFAULT_STATE, action) => {

    switch (action.type) {
    case 'FETCH_ALL_COUNTRIES': {
        return {
            all: [],
            list: [],
            fetching: true,
            fetched: false,
            error: null,
        };
    }
    case 'FETCH_ALL_COUNTRIES_REJECTED': {
        return {
            ...state,
            fetching: false,
            error: action.payload,
        };
    }
    case 'FETCH_ALL_COUNTRIES_FULFILLED': {
        return {
            all: action.payload,
            list: action.payload,
            fetching: false,
            fetched: true,
            error: null,
        };
    }
    case 'UPDATE_FILTERED_COUNTRIES': {
        return {
            ...state,
            list: action.payload,
        };
    }
    default:
        return state;
    }
};

export default countries;