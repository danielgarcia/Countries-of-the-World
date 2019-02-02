import * as React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import AppFrame from './components/AppFrame/AppFrame';

import Home from './pages/Home/Home';
import Country from './pages/Country/Country';;

/**
 * Application routes.
 */
const routes = {
    Home: '/',
    Country: '/country/:alpha3Code',
};

class Routes extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Route exact path="/">
                    <AppFrame>
                        <Switch>
                            <Route exact path={routes.Home} component={Home} />
                            <Route exact path={routes.Country} component={Country} />
                            <Redirect from='*' to={routes.Home} />
                        </Switch>
                    </AppFrame>
                </Route>
            </BrowserRouter>
        );
    }
}

export default Routes;
export { routes };
