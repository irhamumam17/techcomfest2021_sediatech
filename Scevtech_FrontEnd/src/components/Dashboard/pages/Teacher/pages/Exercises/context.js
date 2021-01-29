import React from 'react';
import axios from '../../../../../../axios.js';
import { AuthContext } from '../../../../contexts/AuthContext.js';

export const ExercisesContext = React.createContext();

class ExercisesContextProvider extends React.Component
{
	_isMounted = false;
	constructor(props) {
		super(props);

		this.state = {
			classes: [],
			subjects: [],
			loading: {
				classes: true,
				subjects: true,
			}
		}

		this.getSubject = this.getSubject.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;
		// get classes
		axios.get(`teacher/${this.context.id}/teacher/class ` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					this.setState({ 
								classes: res.data , 
								loading: {...this.state.loading , classes: false} 
							});
				}
			}).catch(err => console.error(err));

		// get teacher subject
		axios.get(`teacher/${this.context.id}/teacher/subject` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					this.setState({ 
									subjects: res.data,
									loading: {...this.state.loading , subjects: false},
							 });
				}
			});
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	getSubject = (id) => {
		console.log(id);
	}

	render() {
		return(
			<ExercisesContext.Provider value={{
								...this.state,
								getSubject: this.getSubject,
			}} >
				{this.props.children}
			</ExercisesContext.Provider>
		)
	}
}

ExercisesContextProvider.contextType = AuthContext;
export default ExercisesContextProvider;