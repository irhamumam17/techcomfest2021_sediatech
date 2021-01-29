import React , {Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import TryoutContextProvider from './context.js';
import Do from './pages/Do/';
import List from './pages/List/';

class Tryout extends Component {
	render() {
		return(
			<React.Fragment>
				<TryoutContextProvider>
				<Switch>
					<Route path='/student/exercises/tryout/do/:id' component={Do} />
					<Route path='/student/exercises/tryout/list' component={List} />
					<Route path='/student/exercises/tryout/' component={List} />
				</Switch>
				</TryoutContextProvider>
			</React.Fragment>
		);
	}
}

export default Tryout;
	