import React , {Component} from 'react';
import { Switch ,  Route } from 'react-router-dom';

import AbsentContextProvider from './context.js';

import Mine from './pages/Mine/';
import Student from './pages/Student/';

class Absent extends Component {
	render() {
		return(
			<React.Fragment>
				<AbsentContextProvider>
					<Switch>
						<Route path="/teacher/absent/list" component={Mine} />
						<Route path="/teacher/absent/student" component={Student} />
					</Switch>
				</AbsentContextProvider>
			</React.Fragment>
		);
	}
}

export default Absent;
	