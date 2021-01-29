import React , {Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import JobContextProvider from './context.js';
import Add from './pages/Add/';
import List from './pages/List/';
import Detail from './pages/Detail/';

class Job extends Component {
	render() {
		return(
			<React.Fragment>
				<JobContextProvider>
					<Switch>
						<Route path="/recruiter/job/add" component={Add} />
						<Route path="/recruiter/job/list" component={List} />
						<Route path="/recruiter/job/detail/:id" component={Detail} />
					</Switch>
				</JobContextProvider>
			</React.Fragment>
		);
	}
}


export default Job;
	