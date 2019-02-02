import * as React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../Routes';

class AppMenu extends React.Component {

    /**
     * Render Function
     */
    render() {
        return (
            <div className="app-menu">
                <ul className="nav-list">
                    <li className="logo" title="Snack Nation"><span className="s">S</span><span className="n">N</span></li>
                    <li><Link to={routes.Home}><i className="fas fa-globe"></i></Link></li>
                </ul>
            </div>
        );
    }
}

export default AppMenu;
