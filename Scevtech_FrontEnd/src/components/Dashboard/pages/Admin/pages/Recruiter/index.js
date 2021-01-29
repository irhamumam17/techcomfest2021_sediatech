import React , {Component} from 'react';
import { Switch , Route } from 'react-router-dom';

import RecruiterContextProvider from './context.js';

import Add from './pages/Add/';
import List from './pages/List/';
import Detail from './pages/Detail/';

class Recruiter extends Component {
	render() {
		return(
			<React.Fragment>
				<RecruiterContextProvider>
					<Switch>
						<Route path="/admin/recruiter/add" >
							<Add props={this.props.props} />
						</Route>
						<Route path="/admin/recruiter/list" component={List} />
						<Route path="/admin/recruiter/detail/:id" component={Detail} />
					</Switch>
				</RecruiterContextProvider>
			</React.Fragment>
		);
	}
}

export default Recruiter;
		