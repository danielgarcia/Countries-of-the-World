import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions'; // mapDispatchToProps
import { routes } from '../../Routes';

import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';

class Country extends Component {
    constructor(props) {
        super(props);
        this.changeCountry = this.changeCountry.bind(this);
    }

    /**
     *  Loads the country information 
     */
    async componentDidMount() {
        const alpha3Code = this.props.match.params.alpha3Code;
        if (await this.props.fetchCountry(alpha3Code) === false) {
            this.props.history.push(routes.Home);
        }
    }

    /**
     *  Fetches a country with a specifuc alpha code 
     */
    changeCountry(alpha3Code) {
        this.props.fetchCountry(alpha3Code);
    }

    /**
     *  Changes a integer into readable form with commas
     */
    numberWithCommas(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    /**
     * Renders a list of Border links.
     */
    renderBorderList() {
        const { country } = this.props;

        // If country has no borders, dont display anything
        if (!country || !country.borders.length) return;

        // Creates the country cards for the list 
        const borders = country.borders.map((border) => (
            <li className="border" key={border} >
                <Link to={`/country/${border}`} onClick={this.changeCountry.bind(this, border)}>
                    {border}
                </Link>
            </li>
        ));

        return (
            <div className="country-borders">
                BORDERS
                <ul>
                    {borders}
                </ul>
            </div>
        );
    }

    /**
     *  Render Function 
     */
    render() {
        const { country, fetching, fetched, error } = this.props;

        // Display error screen if something went wrong
        if (error) return (<Error message={error} />);

        // Loading state while information is been fetch
        if (fetching || !fetched) return (<Loading />);

        return (
            <div className="country-page">
                <div className="map-frame">
                    <iframe
                        title="map"
                        id="map_canvas"
                        src={`https://maps.google.com/maps?q=${country.latlng[0]},${country.latlng[1]}&t=&z=5&ie=UTF8&iwloc=&disableDefaultUI=true&output=embed`}
                        scrolling="no"></iframe>
                    <div className="overlay"></div>
                </div>

                <div className="header">
                    <div className="flag"><div style={{ 'backgroundImage': `url(${country.flag})` }}></div></div>
                    <div className="country-name">{country.name} {this.renderBorderList()}</div>
                </div>

                <h2>Information</h2>

                <div className="info-list">
                    <div className="info-block">
                        <div className="icon"><i className="fas fa-users"></i></div>
                        <span className="data">{this.numberWithCommas(country.population)}</span>
                        <span className="title">Population</span>
                    </div>

                    <div className="info-block">
                        <div className="icon"><i className="fas fa-map-marker-alt"></i></div>
                        <span className="data">{country.capital || '(no capital)'}</span>
                        <span className="title">Capital</span>
                    </div>

                    <div className="info-block">
                        <div className="icon"><i className="fas fa-map-marked-alt"></i></div>
                        <span className="data">{country.region}</span>
                        <span className="title">REGION</span>
                    </div>

                    <div className="info-block">
                        <div className="icon"><i className="fas fa-language"></i></div>
                        <span className="data">{country.languages[0].name}</span>
                        <span className="title">MAIN LANGUAGE</span>
                    </div>

                    <div className="info-block">
                        <div className="icon"><i className="fas fa-user-alt"></i></div>
                        <span className="data">{country.demonym || '(no demonym)'}</span>
                        <span className="title">DEMONYM</span>
                    </div>

                    <div className="info-block">
                        <div className="icon">{country.currencies[0].symbol || '$'}</div>
                        <span className="data">{country.currencies[0].name}</span>
                        <span className="title">CURRENCY</span>
                    </div>

                    <div className="info-block">
                        <div className="icon"><i className="fas fa-phone"></i></div>
                        <span className="data">{country.callingCodes[0]}</span>
                        <span className="title">CALLING CODE</span>
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = (globalState) => ({
    country: globalState.country.info,
    fetching: globalState.country.fetching,
    fetched: globalState.country.fetched,
    error: globalState.country.error
});

export default connect(mapStateToProps, actions)(Country);
