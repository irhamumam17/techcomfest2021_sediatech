import React , {Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import AnnouncementContextProvider from './context.js';
import Add from './pages/Add/';
import List from './pages/List/';

class Announcement extends Component {
	render() {
		return(
			<React.Fragment>
				<AnnouncementContextProvider>
					<Switch>
						<Route path="/teacher/announcement/add"  component={Add} />
						<Route path="/teacher/announcement/list"  component={List} />
					</Switch>
				</AnnouncementContextProvider>
			</React.Fragment>
		);
	}
}

export default Announcement;
	