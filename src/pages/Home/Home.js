import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions'; // mapDispatchToProps

import CountryCard from '../../components/CountryCard/CountryCard';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';

class Home extends Component {
    constructor(props) {
        super(props);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    /**
     *  Loads the country information 
     */
    componentDidMount() {
        this.props.fetchAllCountries();
    }

    /**
     * Renders a list of ContryCard elements.
     */
    renderCountryCards() {
        const { list, fetching, fetched, error } = this.props;

        // Display error screen if something went wrong
        if (error) return (<Error message={error} />);

        // Loading state while information is been fetch
        if (fetching || !fetched) return (<Loading />);

        // If data was fetch but empty display empty message
        if (fetched && list.length === 0) return this.renderNothingOnList();

        // Creates the country cards for the list 
        const countryCards = this.props.list.map((country) => (
            <li key={country.alpha3Code} >
                <Link to={`/country/${country.alpha3Code}`}>
                    <CountryCard country={country} />
                </Link>
            </li>
        ));

        return (
            <ul className="countries-list">
                {countryCards}
            </ul>
        );
    }

    /**
     *  Render state when there is an empty country list 
     */
    renderNothingOnList() {
        return (
            <div className="empty-list">
                <i className="fas fa-globe-americas"></i>
                <span>No countries found</span>
            </div>
        );
    }

    /**
     *  Handles the Search on Change function 
     */
    onSearchChange(e) {
        this.props.filterCountries(this.props.all, e.currentTarget.value);
    }

    /**
     *  Renders Seatch Bar 
     */
    renderSearchBar() {
        return (
            <div className="search-bar">
                <input type="text" placeholder="Search Countries by Name" id="search-input" onChange={this.onSearchChange} />
                <label htmlFor="search-input"><i className="fas fa-search search-icon"></i></label>
            </div>
        );
    }

    /**
     *  Render Function 
     */
    render() {
        return (
            <div className="home-page">
                {this.renderSearchBar()}
                {this.renderCountryCards()}
            </div>
        );
    }
}

const mapStateToProps = (globalState) => ({
    all: globalState.countries.all,
    list: globalState.countries.list,
    fetching: globalState.countries.fetching,
    fetched: globalState.countries.fetched,
    error: globalState.countries.error
});

export default connect(mapStateToProps, actions)(Home);
