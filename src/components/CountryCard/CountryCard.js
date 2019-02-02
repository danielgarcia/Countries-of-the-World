import React, { Component } from 'react';

class CountryCard extends Component {

    /**
     * Render Function
     */
    render() {
        const { country } = this.props;

        return (
            <div className="country-card">
                <div className="background-img"><div style={{ 'backgroundImage': `url(${country.flag})` }}></div></div>

                <div className="country-name">
                    <span>{country.name}</span>
                </div>

                <div className="country-info">
                    <ul>
                        <li>CAPITAL CITY <span>{country.capital || '(no capital)'}</span></li>
                        <li>REGION <span>{country.region}</span></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default CountryCard;
