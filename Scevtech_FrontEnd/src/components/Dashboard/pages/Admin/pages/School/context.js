import React , { createContext } from 'react';
import axios from '../../../../../../axios.js';
import { AuthContext } from '../../../../contexts/AuthContext.js';

export const SchoolContext = createContext();

class SchoolContextProvider extends React.Component
{
	_isMounted = false;
	constructor(props)
	{
		super(props);

		this.state = {
			schools: [],
			grades: [],
			getSchoolLoading: true,
			getGradeLoading: true,
			deleteSchoolLoading: false,
			deleteGradeLoading: false,
		}

		this.addSchool = this.addSchool.bind(this);
		this.removeSchool = this.removeSchool.bind(this);
		this.addGrade = this.addGrade.bind(this);
		this.removeGrade = this.removeGrade.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;

		// get list level school
		axios.get(`admin/${this.context.id}/school/level` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					this.setState({ grades: res.data , getGradeLoading: false});
				}
			});

		// get list schools
		axios.get(`admin/${this.context.id}/school/` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					this.setState({  schools: res.data  , getSchoolLoading: false});
				}
			})
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	addSchool = async (newSchool) => {
		let response = await axios.post(`admin/${this.context.id}/school/add` , newSchool, { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				this.setState({schools: [...this.state.schools , res.data]});
				return res.status;
			}).then(status => {
				return status;
			}).catch(err => console.error(err));
		return response;
	}

	removeSchool = (id) => {
		this.setState({ deleteSchoolLoading: true });
		axios.delete(`admin/${this.context.id}/school/${id}` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				this.setState({schools: this.state.schools.filter(school => school.id !== id) , deleteSchoolLoading: false });
			})
	}

	addGrade = async (newGrade) => {
		let response = await axios.post(`admin/${this.context.id}/school/level/add` , newGrade , {headers: { Authorization: `Bearer ${this.context.token}` },})
			.then(res => {
				this.setState({grades: [...this.state.grades , res.data]});
				return res.status;
			}).then(status => {
				return status;
			})
		return response;
	}

	removeGrade = (id) => {
		axios.delete(`admin/${this.context.id}/school/level/${id}`, { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				this.setState({grades: this.state.grades.filter(grade => grade.id !== id)});
			})
	}

	render() {
		return(
			<SchoolContext.Provider value={{ 
									...this.state ,
									addSchool: this.addSchool,
									removeSchool: this.removeSchool,
									addGrade: this.addGrade,
									removeGrade: this.removeGrade,
							 }}>
				{this.props.children}
			</SchoolContext.Provider>
		)
	}
}



SchoolContextProvider.contextType = AuthContext;
export default SchoolContextProvider;