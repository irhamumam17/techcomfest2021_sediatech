import React , { createContext } from 'react';
import axios from '../../../../../../axios.js';
import { AuthContext } from '../../../../contexts/AuthContext.js';
export const TeacherContext = createContext();


class TeacherContextProvider extends React.Component
{
	_isMounted = false;
	constructor(props) 
	{
		super(props);

		this.state = {
			teachers: [],
			roles: [],
			schedules: [],
			get_schedules: true,
			get_teacher_loading: true,
			del_teacher_loading: false,
		}

		this.addTeacher = this.addTeacher.bind(this);
		this.addSchedule = this.addSchedule.bind(this);
		this.removeTeacher = this.removeTeacher.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;
		axios.get(`/school/${this.context.id}/teacher` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					this.setState({ teachers: res.data , get_teacher_loading: false });
				}
			}).catch(err => console.log(err));
		axios.get(`/school/${this.context.id}/teacher/role` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					this.setState({ roles: res.data });
				}
			}).catch(err => console.log(err));
		axios.get(`/school/${this.context.id}/teacher/schedule` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					this.setState({ schedules: res.data , get_schedules: false });
				}
			})
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	addTeacher = async (newTeacher) => {
		let response = await axios.post(`/school/${this.context.id}/teacher/add` , newTeacher , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				this.setState({ teachers: [...this.state.teachers , res.data] })
				return res.status;
			}).then(status => { return status});
		return response;
	}

	addSchedule = async (newSchedule) => {
		let response = await axios.post(`school/${this.context.id}/teacher/schedule/add` , newSchedule , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				res.data.forEach(date => {
					this.setState({ schedules: [...this.state.schedules , date] });
				});
				return res.status;
			}).then(status => status)
		return response;
	}

	removeTeacher = (id) => {
		this.setState({ del_teacher_loading: true });
		axios.delete(`/school/${this.context.id}/teacher/${id}` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				this.setState({ teachers: this.state.teachers.filter(teacher => teacher.id !== id) , del_teacher_loading: false });
			})
	}

	render() {
		return (
			<TeacherContext.Provider value={{ 
										...this.state , 
										addTeacher: this.addTeacher ,
										addSchedule: this.addSchedule ,
										removeTeacher: this.removeTeacher ,
									}} >
				{this.props.children}
			</TeacherContext.Provider>
		)
	}
}

TeacherContextProvider.contextType = AuthContext;
export default TeacherContextProvider;