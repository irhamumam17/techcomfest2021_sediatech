import React , { createContext } from 'react';
import axios from '../../../../../../axios.js';
import { AuthContext } from '../../../../contexts/AuthContext.js';
export const StudentContext = createContext();


class StudentContextProvider extends React.Component 
{
	_isMounted = false;
	constructor(props) 
	{
		super(props);

		this.state = {
			classes: [],
			students: [],
			schedules: [],
			get_schedules: true,
			get_students: true,
			del_students: false,
		}

		this.addStudent = this.addStudent.bind(this);
		this.addSchedule = this.addSchedule.bind(this);
		this.removeStudent = this.removeStudent.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;
		axios.get(`school/${this.context.id}/class/list` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					this.setState({ classes: res.data });
				}
			})
		axios.get(`/school/${this.context.id}/student` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					this.setState({ students: res.data , get_students: false });
				}
			})
		axios.get(`/school/${this.context.id}/student/schedule` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					this.setState({ schedules: res.data , get_schedules: false });
				}
			})
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	addStudent = async (newStudent) => {
		let response = await axios.post(`/school/${this.context.id}/student/add` , newStudent , { headers: { Authorization: `Bearer ${this.context.token}` }, })
				.then(res => {
					this.setState({ students: [...this.state.students , res.data] })
					return res.status;
				}).then(status => {
					return status;
				})
		return response;
	}

	addSchedule = async (newSchedule) => {
		let response = await axios.post(`school/${this.context.id}/student/schedule/add` , newSchedule , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				res.data.forEach(date => {
					this.setState({ schedules: [...this.state.schedules , date] });
				});
				return res.status;
			}).then(status => status)
		return response;
	}

	removeStudent = (id) => {
		this.setState({ del_students: true });
		axios.delete(`/school/${this.context.id}/student/${id}` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				this.setState({ 
							students: this.state.students.filter(student=> student.id !== id),
							del_students: false,
					 });
			});
	}

	render() {
		return(
			<StudentContext.Provider value={{
				...this.state,
				addStudent: this.addStudent,
				addSchedule: this.addSchedule,
				removeStudent: this.removeStudent,
			}}>
				{this.props.children}
			</StudentContext.Provider>
		)
	}
}

StudentContextProvider.contextType = AuthContext;
export default StudentContextProvider;