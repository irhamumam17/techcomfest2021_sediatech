import React , {Component} from 'react';
import { Switch , Route } from 'react-router-dom';

import CourseContextProvider from './context.js';

import List from './pages/List/';

class Course extends Component {
	render() {
		return(
			<React.Fragment>
				<CourseContextProvider>
					<Switch>
						<Route path="/school/course/" component={List} />
					</Switch>
				</CourseContextProvider>
			</React.Fragment>
		);
	}
}

export default Course;
	