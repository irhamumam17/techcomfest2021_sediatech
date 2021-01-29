import React , {Component} from 'react';
import  { Switch , Route } from 'react-router-dom';

import DutyContextProvider from './context.js';

import Add from './pages/Add/';
import Waiting from './pages/Waiting/';
import Complete from './pages/Complete/';
import Draft from './pages/Draft/';
import List from './pages/List/';
import Detail from './pages/Detail/';

class Duty extends Component {
	render() {
		return(
			<React.Fragment>
				<DutyContextProvider props={this.props} >
					<Switch>
						<Route path="/teacher/duty/add" component={Add} />
						<Route path="/teacher/duty/waiting" component={Waiting} />
						<Route path="/teacher/duty/complete" component={Complete} />
						<Route path="/teacher/duty/draft" component={Draft} />
						<Route path="/teacher/duty/list" component={List} />
						<Route path="/teacher/duty/detail/:id" component={Detail} />
					</Switch>
				</DutyContextProvider>
			</React.Fragment>
		);
	}
}

export default Duty;
	