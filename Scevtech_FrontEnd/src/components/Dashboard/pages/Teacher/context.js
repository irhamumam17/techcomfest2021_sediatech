import React , { createContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext.js';
import axios from '../../../../axios.js';
export const RoleTeacherContext = createContext();

class RoleTeacherContextProvider extends React.Component
{
	_isMounted = false;
	constructor(props) 
	{
		super(props);

		this.state = {
			role_teacher: '',
		}
	}

	componentDidMount() {
		this._isMounted = true;
		axios.get(`/teacher/${this.context.id}/role` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					this.setState({ role_teacher: res.data });
				}
			})
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		return (
			<RoleTeacherContext.Provider value={{ ...this.state }} >
				{this.props.children}
			</RoleTeacherContext.Provider>
		)
	}
}


RoleTeacherContextProvider.contextType = AuthContext;
export default RoleTeacherContextProvider