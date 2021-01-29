import React , {Component , createContext} from 'react';
import axios from '../../../../../../axios.js';
import { AuthContext } from '../../../../contexts/AuthContext.js';

export const EventContext = createContext();


class EventContextProvider extends Component {
	_isMounted = false;
	constructor(props) {
		super(props);

		this.state = {
			events: {
				schools: [],
				publics: [],
			},
			loading: {
				schools: true,
				publics: true,
			}
		}
	}

	componentDidMount() {
		this._isMounted = true;

		// get list events public
		axios.get(`student/${this.context.id}/event/public` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`,
			}
		}).then(res => {
			this.setState({
				events: {...this.state.events , publics: res.data},
				loading: {...this.state.loading , publics: false},
			});
		});

		// get list events school
		axios.get(`student/${this.context.id}/event/school` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`,
			}
		}).then(res => {
			this.setState({
				events: {...this.state.events , schools: res.data},
				loading: {...this.state.loading , schools: false},
			});
		})
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		return(
			<EventContext.Provider value={{
				...this.state,
			}} >
				{this.props.children}
			</EventContext.Provider>
		);
	}
}


EventContextProvider.contextType = AuthContext;
export default EventContextProvider;
	