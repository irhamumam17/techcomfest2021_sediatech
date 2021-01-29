import React , {Component} from 'react';
import { Route , Switch } from 'react-router-dom';
import ScholarshipContextProvider from './context.js';
import Add from './pages/Add/';
import List from './pages/List/';


class Scholarship extends Component {
	render() {
		return(
			<React.Fragment>
				<ScholarshipContextProvider>
					<Switch>
						<Route path="/admin/scholarship/add" component={Add} />
						<Route path="/admin/scholarship/list" component={List} />
					</Switch>
				</ScholarshipContextProvider>
			</React.Fragment>
		);
	}
}

export default Scholarship;
	