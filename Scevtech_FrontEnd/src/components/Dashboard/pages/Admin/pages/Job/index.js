import React , {Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import JobContextProvider from './context.js';

import List from './pages/List/';
import Complete from './pages/Complete/';
import Statistic from './pages/Statistic/';

class Job extends Component {
	render() {
		return(
			<React.Fragment>
				<JobContextProvider>
					<Switch>
						<Route path="/admin/job/list" component={List} />
						<Route path="/admin/job/complete" component={Complete} />
						<Route path="/admin/job/statistic" component={Statistic} />
					</Switch>
				</JobContextProvider>
			</React.Fragment>
		);
	}
}

export default Job;
	