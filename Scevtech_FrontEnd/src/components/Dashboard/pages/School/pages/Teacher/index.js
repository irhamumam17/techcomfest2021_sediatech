import React , {Component} from 'react';
import { Switch , Route } from 'react-router-dom';

import TeacherContextProvider from './context.js';

import Add from './pages/Add/';
import Waiting from './pages/Waiting/';
import List from './pages/List/';
import Absent from './pages/Absent/';
import Detail from './pages/Detail/';

class Teacher extends Component {
	render() {
		return(
			<React.Fragment>
			<TeacherContextProvider>
				<Switch>
					<Route path="/school/teacher/add" component={Add} />
					<Route path="/school/teacher/waiting" component={Waiting} />
					<Route path="/school/teacher/list" component={List} />
					<Route path="/school/teacher/absent" component={Absent} />
					<Route path="/school/teacher/detail/:id" component={Detail} />
				</Switch>
			</TeacherContextProvider>
			</React.Fragment>
		);
	}
}

export default Teacher;
	