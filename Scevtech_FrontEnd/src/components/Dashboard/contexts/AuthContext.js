import React , { createContext } from 'react';

export const AuthContext = createContext();

class AuthContextProvider extends React.Component {
	constructor(props) {
		super(props);
		let json = window.sessionStorage.getItem('data_user');
		if(json === null) {
			this.props.props.history.push('/auth/login');
		} else {
			let data = JSON.parse(json);
			this.state = {
				auth: true,
				id: data.id,
				name: data.name,
				role: data.role,
				token: data.token,
			}
		}

	}

	logout= () => {
		this.props.props.history.push('/');
		window.sessionStorage.removeItem('data_user');
	}

	render() {
		return(
			<AuthContext.Provider value={{...this.state , logout: this.logout }}>
				{this.props.children}
			</AuthContext.Provider>
		);
	}
}

export default AuthContextProvider;