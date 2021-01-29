import React from 'react';
import axios from '../../../../../../../../axios.js';
import { AuthContext } from '../../../../../../contexts/AuthContext.js';
export const ExamContext = React.createContext();

class ExamContextProvider extends React.Component
{
	_isMounted = false;
	constructor(props) {
		super(props);

		this.state = {
			exams: [],
			loading: {
				exams: true,
				destroy: false,
			}
		}

		this.addExam = this.addExam.bind(this);
		this.removeExam = this.removeExam.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;
		// get list Exam
		axios.get(`teacher/${this.context.id}/exam ` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					this.setState({ 
									exams: res.data,  
									loading: {...this.state.loading , exams: false},
							})
				}
			})
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	addExam = async (newData) => {
		let response = await axios.post(`teacher/${this.context.id}/exam/create ` , newData , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				return res.status;
			}).catch(err => console.error(err));
		return response;
	}

	removeExam = (id) => {
		this.setState({ loading: {...this.state.loading , destroy: true} });
		axios.delete(`teacher/${this.context.id}/exam/${id}` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				this.setState({
					exams: this.state.exams.filter(Exam => Exam.id !== id),
					loading: { ...this.state.loading , destroy: false },
				})
			})
	}

	render() {
		return(
			<ExamContext.Provider value={{
								...this.state,
								addExam: this.addExam,
								removeExam: this.removeExam,
			}} >
				{this.props.children}
			</ExamContext.Provider>
		)
	}
}


ExamContextProvider.contextType = AuthContext;
export default ExamContextProvider;