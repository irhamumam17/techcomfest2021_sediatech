import React , {Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import '../../styles/auth.css';
import Login from './pages/Login/';
import Register from './pages/Register/';

class Auth extends Component {
	constructor(props)
	{
		super(props);

		let json = window.sessionStorage.getItem('data_user');
		json = JSON.parse(json);
		if(json) {
			this.props.history.push(`/${json.role}/dashboard`);
		}
	}

	render() {
		return(
			<React.Fragment>
			<div className="bg-gray-200 h-screen py-16">
				<div className="bg-gray-100 shadow-md w-4/5 m-auto py-8 rounded pb-6">
					<Switch>
						<Route exact path="/auth" component={Login} />
						<Route path="/auth/login" component={Login} />
						<Route path="/auth/register" component={Register} />
					</Switch>	
					<p className="text-sm text-gray-500 text-center mt-8 mb-2">&copy; 2020 Scev Tech. All rights reserved.</p>
				</div>
			</div>
			</React.Fragment>
		);
	}
}

export default Auth;
	