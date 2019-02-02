import React, { Component } from 'react';

class Error extends Component {

    /**
     *  Render Function 
     */
    render() {
        const { message } = this.props;
        return (
            <div className="error">
                <div className="box">
                    <i className="fas fa-exclamation"></i>
                    <span>{message}</span>
                </div>
            </div>
        );
    }
}

export default Error;
