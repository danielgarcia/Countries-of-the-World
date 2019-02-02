import React, { Component } from 'react';

class Loading extends Component {

    /**
     *  Render Function 
     */
    render() {
        return (
            <div className="loading">
                <div className="box">
                    <i className="fas fa-globe-americas fa-spin"></i>
                    <span>Loading</span>
                </div>
            </div>
        );
    }
}

export default Loading;
