
/**
 * Fetches a single cpuntry using their unique alpha code
 * @param {String} alpha3Code 
 */
const fetchCountry = (alpha3Code) => async (dispatch) => {
    dispatch({ type: 'FETCH_COUNTRY', payload: true });
    const response = await fetch(`https://restcountries.eu/rest/v2/alpha/${alpha3Code}`);

    if (response.ok) {
        var payload = await response.json();
        if (payload && payload.alpha3Code) {
            dispatch({ type: 'FETCH_COUNTRY_FULFILLED', payload: payload });
            return true;
        }
    }
    // If the status is a 400 return false to redirect the user to home
    if (response.status === 400) {
        return false;
    }

    // If its any other error handle it with the reducer
    dispatch({ type: 'FETCH_COUNTRY_REJECTED', payload: 'Ops there was an error.' });
    return null;
};


/**
 * Fetches all countries.
 */
const fetchAllCountries = () => async (dispatch) => {
    dispatch({ type: 'FETCH_ALL_COUNTRIES', payload: true });
    const response = await fetch('https://restcountries.eu/rest/v2/all');

    if (response.ok) {
        var payload = await response.json();
        if (payload.length) {
            dispatch({ type: 'FETCH_ALL_COUNTRIES_FULFILLED', payload: payload });
        } else {
            dispatch({ type: 'FETCH_ALL_COUNTRIES_REJECTED', payload: 'No Countries Found' });
        }
    } else {
        dispatch({ type: 'FETCH_ALL_COUNTRIES_REJECTED', payload: 'Server Failure' });
    }
};

/**
 * Filters the countries array using a string using the countries name
 * @param {Array} countries 
 * @param {String} filter 
 */
const filterCountries = (countries, filter) => (dispatch) => {
    const filtered = countries.filter(country => country.name.toLowerCase().indexOf(filter) !== -1);
    dispatch({ type: 'UPDATE_FILTERED_COUNTRIES', payload: filtered });
};

export { fetchAllCountries, filterCountries, fetchCountry };
