import React , {Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import SubjectContextProvider from './context.js';
import List from './pages/List/';
import Schedules from './pages/Schedules/';

class Subject extends Component {
	render() {
		return(
			<React.Fragment>
				<SubjectContextProvider>
					<Switch>
						<Route path="/student/subject/list" component={List} />
						<Route path="/student/subject/Schedule" component={Schedules} />
					</Switch>
				</SubjectContextProvider>
			</React.Fragment>
		);
	}
}

export default Subject;
	