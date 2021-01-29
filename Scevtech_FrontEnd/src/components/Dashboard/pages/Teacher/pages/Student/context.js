import React , { createContext } from 'react';
import { AuthContext } from '../../../../contexts/AuthContext.js';
import axios from '../../../../../../axios.js';
export const StudentContext = createContext();


class StudentContextProvider extends React.Component
{
	_isMounted = false;
	constructor(props)
	{
		super(props);

		this.state = {
			students: [],
			classes: [],
			get_students_loading: true,
		};

		this.addStudent = this.addStudent.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;
		axios.get(`teacher/${this.context.id}/class/` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					this.setState({ classes: res.data });
				}
			})
		axios.get(`teacher/${this.context.id}/student` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					this.setState({ students: res.data , get_students_loading: false })
				}
			})
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	addStudent = async (newStudent) => {
		let response = await axios.post(`/teacher/${this.context.id}/student/add` , newStudent , { headers: { Authorization: `Bearer ${this.context.token}` }, })
				.then(res => {
					this.setState({ students: [...this.state.students , res.data] })
					return res.status;
				}).then(status => {
					return status;
				})
		return response;
	}

	render() {
		return (
			<StudentContext.Provider value={{ 
								...this.state , 
								addStudent: this.addStudent , 
						}} >
				{this.props.children}
			</StudentContext.Provider>
		)
	}
}


StudentContextProvider.contextType = AuthContext;
export default StudentContextProvider;