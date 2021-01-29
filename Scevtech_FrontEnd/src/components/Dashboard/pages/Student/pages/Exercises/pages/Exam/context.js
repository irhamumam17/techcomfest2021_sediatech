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
				exam: true,
				do: true,
			}
		}

		this.getExam = this.getExam.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;

		// get exam
		axios.get(`student/${this.context.id}/exam/list ` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					this.setState({
						exams: res.data,
						loading: { ...this.state.loading , exam: false },
					})
				} 
			})
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	getExam = async (id) => {
		let response = await axios.get(`student/${this.context.id}/exam/do/${id} ` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					this.setState({ loading: { ...this.state.loading , do: false } });
				}
				res.user = this.context;
				return res;
			}).catch(err => console.log(err));

		return response;
	}

	render() {
		return(
				<ExamContext.Provider value={{ 
					...this.state,
					getExam: this.getExam,
				 }} >
					{this.props.children}
				</ExamContext.Provider>
			)
	}
}

ExamContextProvider.contextType = AuthContext;
export default ExamContextProvider;