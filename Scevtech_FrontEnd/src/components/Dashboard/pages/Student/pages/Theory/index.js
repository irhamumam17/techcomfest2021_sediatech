import React , {Component} from 'react';
import {Switch , Route} from 'react-router-dom';
import TheoryContextProvider from './context.js';

import Newest from './pages/Newest/';
import All from './pages/All/';
import Detail from './pages/Detail/';

class Theory extends Component {
	render() {
		return(
			<React.Fragment>
				<TheoryContextProvider>
					<Switch>
						<Route path="/student/theory/new" component={Newest} />
						<Route path="/student/theory/all" component={All} />
						<Route path="/student/theory/detail/:id" component={Detail} />
					</Switch>
				</TheoryContextProvider>
			</React.Fragment>
		);
	}
}

export default Theory;
		