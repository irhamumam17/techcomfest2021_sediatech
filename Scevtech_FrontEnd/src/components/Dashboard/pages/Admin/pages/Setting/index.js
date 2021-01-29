import React , {Component} from 'react';
import { Switch , Route } from 'react-router-dom';

import Version from './pages/Version/';
import Theme from './pages/Theme/';

class Setting extends Component {
	render() {
		return(
			<React.Fragment>
				<Switch>
					<Route path="/admin/setting/version" component={Version} />
					<Route path="/admin/setting/theme" component={Theme} />
				</Switch>
			</React.Fragment>
		);
	}
}

export default Setting;
	