import React , {Component} from 'react';
import { Switch , Route } from 'react-router-dom';

import EventContextProvider from './context.js';
import Public from './pages/Public/';
import School from './pages/School/';

class Event extends Component {
	render() {
		return(
			<React.Fragment>
				<EventContextProvider>
					<Switch>
						<Route path="/student/event/school" component={School} />
						<Route path="/student/event/public" component={Public} />
					</Switch>
				</EventContextProvider>
			</React.Fragment>
		);
	}
}

export default Event;
	