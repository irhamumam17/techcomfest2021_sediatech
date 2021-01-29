import React , { createContext } from 'react';
import axios from '../../../../../../axios.js';
import { AuthContext } from '../../../../contexts/AuthContext.js';
export const AbsentContext = createContext();



class AbsentContextProvider extends React.Component
{
	_isMounted = false;
	constructor(props) {
		super(props);

		this.state = {
			schedules: [],
			get_schedules: true,
			status: false,
			get_status: true,
		}

		this.absentNow = this.absentNow.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;
		axios.get(`/teacher/${this.context.id}/absent/status` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					this.setState({ status: res.data , get_status: false });
				}
			});
		axios.get(`/teacher/${this.context.id}/absent/list` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					this.setState({
						schedules: res.data,
						get_schedules: false,
					})
				}
			});
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	absentNow = () => {
		axios.post(`/teacher/${this.context.id}/absent` , [] , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				this.setState({
					schedules: this.state.schedules.map(date => {
									if(date.id === res.data) {
										date.status = 'already';
										return date;
									}
									return date;
								}),
					status: true,
				});
			});
	}

	render() {
		return (
			<AbsentContext.Provider value={{ ...this.state , absentNow: this.absentNow }} >
				{this.props.children}
			</AbsentContext.Provider>
		)
	}
}


AbsentContextProvider.contextType = AuthContext;
export default AbsentContextProvider;