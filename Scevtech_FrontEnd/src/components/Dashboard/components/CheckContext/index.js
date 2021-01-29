import React , {Component} from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext.js';

class CheckContext extends Component {
	render() {
		return 	(
			<AuthContext.Consumer>
			{
				(context) => {
					let auth = context.auth;
					if(!auth) {
								return(
									<Redirect to="/" />
									)
							} else {
								let role = context.role;
								let justLogin = window.sessionStorage.getItem('just_login');
								if(justLogin === null) {
									if(performance.navigation.type === performance.navigation.TYPE_RELOAD) {
										return(
											<Redirect to={window.location.pathname} />
										)
									}
								} else {
									window.sessionStorage.removeItem('just_login');
									if(role === 'admin') {
										return (
											<Redirect to="/admin/dashboard" />
										)
									} else if(role === 'school') {
										return (
											<Redirect to="/school/dashboard" />
											)
									} else if(role === 'recruiter') {
										return (
											<Redirect to="/recruiter/dashboard" />
											)
									}else if(role === 'teacher') {
										return (
											<Redirect to="/teacher/dashboard" />
											)
									}else if(role === 'student') {
										return (
											<Redirect to="/student/dashboard" />
											)
									}
								}

							}
				}
			}
		</AuthContext.Consumer>	
		)
	}
}


export default CheckContext;
