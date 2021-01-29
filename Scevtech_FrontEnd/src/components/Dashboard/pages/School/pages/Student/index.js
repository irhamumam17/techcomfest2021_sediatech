import React , {Component} from 'react';
import { Switch , Route } from 'react-router-dom';

import StudentContextProvider from './context.js';

import Add from './pages/Add/';
import Waiting from './pages/Waiting/';
import List from './pages/List/';
import Absent from './pages/Absent/';

class Student extends Component {
	render() {
		return(
			<React.Fragment>
				<StudentContextProvider>
					<Switch>
						<Route path="/school/student/add" component={Add} />
						<Route path="/school/student/waiting" component={Waiting} />
						<Route path="/school/student/list" component={List} />
						<Route path="/school/student/absent" component={Absent} />
					</Switch>
				</StudentContextProvider>
			</React.Fragment>
		);
	}
}

export default Student;
	