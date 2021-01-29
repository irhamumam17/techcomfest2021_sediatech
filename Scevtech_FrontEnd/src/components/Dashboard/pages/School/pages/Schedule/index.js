import React , {Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import ScheduleContextProvider from './context.js';

import Add from './pages/Add/';
import List from './pages/List/';

class Schedule extends Component {
	render() {
		return(
			<React.Fragment>
				<ScheduleContextProvider>
					<Switch>
						<Route path="/school/schedule/add" component={Add} />
						<Route path="/school/schedule/list" component={List} />
					</Switch>
				</ScheduleContextProvider>
			</React.Fragment>
		);
	}
}

export default Schedule;
	