import React , {Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import ClassContextProvider from './context.js';
import Add from './pages/Add/';
import List from './pages/List/';

class SchoolClass extends Component {
	render() {
		return(
			<React.Fragment>
				<ClassContextProvider>
					<Switch>
						<Route path="/school/class/add" component={Add} />
						<Route path="/school/class/list" component={List} />
					</Switch>
				</ClassContextProvider>
			</React.Fragment>
		);
	}
}

export default SchoolClass;
	