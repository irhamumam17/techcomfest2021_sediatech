import React , {Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import AnnouncementContextProvider from './context.js';
import List from './pages/List/';
import Detail from './pages/Detail/';


class Announcement extends Component {
	render() {
		return(
			<React.Fragment>
				<AnnouncementContextProvider>
					<Switch>
						<Route path="/student/announce" component={List} />
						<Route path="/student/announce/:id" component={Detail} />
					</Switch>
				</AnnouncementContextProvider>
			</React.Fragment>
		);
	}
}

export default Announcement;
	