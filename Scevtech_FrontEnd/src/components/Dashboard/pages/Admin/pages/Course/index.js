import React , {Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import CourseContextProvider from './context.js';
import Add from './pages/Add/';
import List from './pages/List/';
import Statistic from './pages/Statistic/';

class Course extends Component {
	render() {
		return(
			<React.Fragment>
				<CourseContextProvider>
					<Switch>
						<Route path="/admin/course/add" component={Add} />
						<Route path="/admin/course/list" component={List} />
						<Route path="/admin/course/statistic" component={Statistic} />
					</Switch>
				</CourseContextProvider>
			</React.Fragment>
		);
	}
}

export default Course;
	