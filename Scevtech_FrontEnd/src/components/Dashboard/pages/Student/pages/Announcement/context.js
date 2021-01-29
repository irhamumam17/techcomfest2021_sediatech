import React , {Component , createContext} from 'react';
import axios from '../../../../../../axios.js';
import {AuthContext} from '../../../../contexts/AuthContext.js';

export const AnnouncementContext = createContext();


class AnnouncementContextProvider extends Component {
	_isMounted = false;
	constructor(props) {
		super(props);

		this.state = {
			announces: [],
			loading: {
				announces: true,
			}
		}
	}

	componentDidMount() {
		this._isMounted = true;

		axios.get(`student/${this.context.id}/announcement` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					this.setState({
						announces: res.data,
						loading: {...this.state.loading , announces: false},
					})
				}
			})
	}

	componentWilUnmount() {
		this._isMounted = false;
	}

	render() {
		return(
			<AnnouncementContext.Provider value={{
				...this.state,
			}} >
				{this.props.children}
			</AnnouncementContext.Provider>
		);
	}
}


AnnouncementContextProvider.contextType = AuthContext;
export default AnnouncementContextProvider;
	