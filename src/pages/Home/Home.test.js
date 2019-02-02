
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Home from './Home';

it('renders Home without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Home />, div);
    ReactDOM.unmountComponentAtNode(div);
});

test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
});
