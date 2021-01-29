import React , {Component} from 'react';
import { Switch , Route } from 'react-router-dom';

import StudentContextProvider from './context.js';

import Add from './pages/Add/';
import List from './pages/List/';

class Student extends Component {
	render() {
		return(
			<React.Fragment>
				<StudentContextProvider>
					<Switch>
						<Route path="/teacher/student/add" component={Add} />
						<Route path="/teacher/student/list" component={List} />
					</Switch>	
				</StudentContextProvider>
			</React.Fragment>
		);
	}
}

export default Student;
	