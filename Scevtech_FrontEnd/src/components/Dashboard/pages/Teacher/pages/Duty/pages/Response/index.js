import React , {Component} from 'react';
import {Switch , Route} from 'react-router-dom';
import List from './List/';
import Detail from './Detail/';

class Response extends Component {
	render() {
		return(
			<React.Fragment>
				<Switch>
					<Route exact path="/teacher/duty/detail/:id" ><List responses={this.props.responses} duty={this.props.duty} /> </Route>
					<Route exact path="/teacher/duty/detail/:id/response/:response" component={Detail} />
				</Switch>
			</React.Fragment>
		);
	}
}

export default Response;
