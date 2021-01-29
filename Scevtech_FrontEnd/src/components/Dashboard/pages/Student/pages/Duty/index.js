import React , {Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import DutyContextProvider from './context.js';
import Newest from './pages/Newest/';
import Waiting from './pages/Waiting/';
import Missed from './pages/Missed/';
import All from './pages/All/';
import Detail from './pages/Detail/';


class Duty extends Component {
	render() {
		return(
			<React.Fragment>
				<DutyContextProvider>
					<Switch>
						<Route path="/student/duty/new" component={Newest} />
						<Route path="/student/duty/waiting" component={Waiting} />
						<Route path="/student/duty/expire" component={Missed} />
						<Route path="/student/duty/all" component={All} />
						<Route path="/student/duty/detail/:id" component={Detail} />
					</Switch>		
				</DutyContextProvider>
			</React.Fragment>
		);
	}
}

export default Duty;
	