import React , {Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/';

import Dashboard from './pages/Dashboard/';
import Job from './pages/Job/';

class Recruiter extends Component {
	render() {
		return(
			<React.Fragment>
				<Sidebar />
				<div className="bg-gray-200 h-screen w-3/4 fixed right-0 z-0 pt-16 px-6 overflow-auto pb-6">
					<Switch>
						<Route path="/recruiter/job" component={Job} />
						<Route path="/recruiter/dashboard" component={Dashboard} />
					</Switch>
				</div>
			</React.Fragment>
		);
	}
}

export default Recruiter;
	