import React , {createContext} from 'react';
import axios from '../../../../../../axios.js';
import { AuthContext } from '../../../../contexts/AuthContext.js';
export const CourseContext = createContext();


class CourseContextProvider extends React.Component
{
	_isMounted = false;
	constructor(props)
	{
		super(props);
		this.state = {
			courses: [],
			get_courses: true,
		};
		

		this.addCourse = this.addCourse.bind(this);
		this.removeCourse = this.removeCourse.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;
		axios.get(`school/${this.context.id}/course` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					this.setState({courses: res.data , get_courses: false});
				}
			}).catch(err => console.log(err))
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	addCourse = async (newCourse) => {
		let response = await axios.post(`school/${this.context.id}/course/add` , newCourse , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				console.log(res);
				this.setState({ courses: [...this.state.courses , res.data] });
				return res.status;
			}).then(status =>  status)
			.catch(err => console.log(err));
		return response;
	}

	removeCourse = (id) => {
		axios.delete(`school/${this.context.id}/course/${id}` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				this.setState({ courses: this.state.courses.filter(course => course.id !== id) });

			})
	}

	render() {
		return(
			<CourseContext.Provider value={{ 
									...this.state , 
									addCourse: this.addCourse, 
									removeCourse: this.removeCourse ,
								}}>
				{this.props.children}
			</CourseContext.Provider>
		)
	}
}

CourseContextProvider.contextType = AuthContext;
export default CourseContextProvider;