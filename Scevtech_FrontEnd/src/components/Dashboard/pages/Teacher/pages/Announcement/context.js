import React , { createContext } from 'react';
import axios from '../../../../../../axios.js';
import { AuthContext } from '../../../../contexts/AuthContext.js';

export const AnnouncementContext = createContext();

class AnnouncementContextProvider extends React.Component
{
	_isMounted = false;
	constructor(props) {
		super(props);

		this.state = {
			announcements: [],
			classes: [],
			loading: {
				announcements: true,
				remove: false,
			}
		}

		this.addAnnouncement = this.addAnnouncement.bind(this);
		this.removeData = this.removeData.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;
		// get list class
		axios.get(`teacher/${this.context.id}/class ` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`
			}
		})
			.then(res => {
				if(this._isMounted) {
					this.setState({ classes: res.data });
				}
			});

		// get list announcement
		axios.get(`teacher/${this.context.id}/announce/list ` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`
			}
		})
			.then(res => {
				if(this._isMounted){
					this.setState({ announcements: res.data , loading: {...this.state.loading , announcements: false} });
				}
			})
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	addAnnouncement = async (newData) => {
		let response = await axios.post(`teacher/${this.context.id}/announce/add ` , newData , {
			headers: {
				Authorization: `Bearer ${this.context.token}`
			}
		})
			.then(res => {
				console.table(res.data);
				return res.status;
			});
		return response;
	}

	removeData = (id) => {
		this.setState({ loading: {...this.state.loading , remove: true} });
		axios.delete(`teacher/${this.context.id}/announce/${id} ` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`
			}
		})
			.then(res => {
				this.setState({ 
					announcements: this.state.announcements.filter(data => data.id !== id),
					loading: { ...this.state.loading , remove: false },
				});
			})
	}

	render() {
		return(
			<AnnouncementContext.Provider value={{
										...this.state,
										addAnnouncement: this.addAnnouncement,
										removeData: this.removeData,
			}} >
				{ this.props.children }
			</AnnouncementContext.Provider>
		)
	}
}

AnnouncementContextProvider.contextType = AuthContext;
export default AnnouncementContextProvider;