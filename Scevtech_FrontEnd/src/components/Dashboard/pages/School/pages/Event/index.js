import React , {Component} from 'react';
import { Switch , Route } from 'react-router-dom';

import EventContextProvider from './context.js';
import School from './pages/School/';
import Public from './pages/Public/';
import Add from './pages/Add/';

class Event extends Component {
	render() {
		return(
			<React.Fragment>
				<EventContextProvider>
					<Switch>
						<Route path="/school/event/school" component={School} />
						<Route path="/school/event/public" component={Public} />
						<Route path="/school/event/add" component={Add} />
					</Switch>
				</EventContextProvider>
			</React.Fragment>
		);
	}
}

export default Event;
	