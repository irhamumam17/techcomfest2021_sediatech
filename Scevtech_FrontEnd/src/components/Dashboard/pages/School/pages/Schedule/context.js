import React , { createContext } from 'react';
import axios from '../../../../../../axios.js';
import { AuthContext } from '../../../../contexts/AuthContext.js';

export const ScheduleContext = createContext();

class ScheduleContextProvider extends React.Component
{
	_isMounted = false;
	constructor(props) {
		super(props);

		this.state = {
			schedules: [],
			classes: [],
			subjects: [],
			loading: {
				schedules: true,
				classes: true,
			},
		}

		this.addSchedule = this.addSchedule.bind(this);
		this.getSubject = this.getSubject.bind(this);
		this.removeSchedule = this.removeSchedule.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;

		// get list classes
		axios.get(`school/${this.context.id}/class/list` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					this.setState({ classes: res.data , get_classes_loading: false });
				}
			});

		// get schedules
		axios.get(`school/${this.context.id}/schedule/list ` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
 					this.setState({ schedules: res.data , loading: {...this.state.loading , schedules: false} });
				}
			})
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	addSchedule = async (newData) => {
		let response = await axios.post(`school/${this.context.id}/schedule/add` , newData , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				return res.status;
			}).catch(err=> console.error(err));
		return response;
	}

	removeSchedule = (id) => {
		console.log(id);
	}

	getSubject = (id) => {
		axios.get(`school/${this.context.id}/class/${id}/subject` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				this.setState({ subjects: res.data });
			}).catch(err => console.error(err));
	}

	render() {
		return(
			<ScheduleContext.Provider value={{
										...this.state,
										addSchedule: this.addSchedule,
										removeSchedule: this.removeSchedule,
										getSubject: this.getSubject,
			}} >
				{ this.props.children }
			</ScheduleContext.Provider>
		)
	}
}



ScheduleContextProvider.contextType = AuthContext;
export default ScheduleContextProvider;
