import React , {Component} from 'react';
import { Switch , Route } from 'react-router-dom';

import TheoryContextProvider from './context.js';

import Add from './pages/Add/';
import List from './pages/List/';
import Draft from './pages/Draft/';
import Detail from './pages/Detail/';

class Theory extends Component {
	render() {
		return(
			<React.Fragment>
				<TheoryContextProvider props={this.props}  >
					<Switch>
						<Route path="/teacher/theory/add" component={Add} />
						<Route path="/teacher/theory/list" component={List} />
						<Route path="/teacher/theory/draft" component={Draft} />
						<Route path="/teacher/theory/detail/:id" component={Detail} />
					</Switch>
				</TheoryContextProvider>
			</React.Fragment>
		);
	}
}

export default Theory;
	