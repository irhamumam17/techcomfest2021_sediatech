import React , {Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import Add from './pages/Add/';
import List from './pages/List/';
import TryoutContextProvider from './context.js';

class Tryout extends Component {
	render() {
		return(
			<React.Fragment>
				<TryoutContextProvider>
					<Switch>
						<Route path="/teacher/exercises/tryout/add" component={Add} />
						<Route path="/teacher/exercises/tryout/list" component={List} />
					</Switch>
				</TryoutContextProvider>
			</React.Fragment>
		);
	}
}

export default Tryout;
