import React , { createContext } from 'react';
import axios from '../../../../../../axios.js';
import { AuthContext } from '../../../../contexts/AuthContext.js';

export const SubjectContext = createContext();

class SubjectContextProvider extends React.Component {
	_isMounted = false;
	constructor(props) {
		super(props);

		this.state = {
			subjects: [],
			schedules: [],
			loading: {
				subjects: true,
				schedules: true,
			}
		}
	}

	componentDidMount() {
		this._isMounted = true;

		//get subject
		axios.get(`student/${this.context.id}/subject/list ` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					this.setState({
						subjects: res.data,
						loading: { ...this.state.loading , subjects: false },
					})
				}
			});

		// get schedules
		axios.get(`student/${this.context.id}/subject/schedules ` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					this.setState({
						schedules: res.data,
						loading: { ...this.state.loading , schedules: false },
					})
				}
			})

	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		return(
			<SubjectContext.Provider value={{
									...this.state,
			}} >
				{ this.props.children }
			</SubjectContext.Provider>
		);
	}
}


SubjectContextProvider.contextType = AuthContext;
export default SubjectContextProvider;
	