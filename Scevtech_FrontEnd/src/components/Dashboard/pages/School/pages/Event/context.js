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
				publics: [],
				schools: [],
			},
			loading: {
				add_event: false,
				publics: true,
				schools: true,
			},
		}

		this.uploadImage = this.uploadImage.bind(this);
		this.addEvent = this.addEvent.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;

		// get list events school
		axios.get(`school/${this.context.id}/event/school/list` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`,
			}
		}).then(res => {
			this.setState({
				events: {...this.state.events , schools: res.data},
				loading: {...this.state.loading , schools: false},
			});
		})

		// get list events public
		axios.get(`school/${this.context.id}/event/public/list` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`,
			}
		}).then(res => {
			console.log(res.data);
			this.setState({
				events: {...this.state.events , publics: res.data},
				loading: {...this.state.loading , publics: false},
			});
		})
	}

	componentWillUnmount() {
		this._isMounted = false;
	}


	/* -- upload image Event -- */
	uploadImage = async (image) => {
		let fd = new FormData();
		fd.append('image' , image);

		let progressContainer = document.getElementById('progress-image');

		let progressBar = document.createElement('div');
		progressBar.classList.add('progressbar');
		let progressStatus = document.createElement('span');
		progressStatus.classList.add('progress-status');
		let valueProgress = document.createElement('div');
		valueProgress.classList.add('progress-value');

		valueProgress.append(progressStatus);
		progressBar.append(valueProgress);
		progressContainer.append(progressBar);

		let response = await axios.post(`school/${this.context.id}/event/upload`, fd , {
						onUploadProgress: progressEvent => {
												let persentase = Math.round(progressEvent.loaded / progressEvent.total * 100);
												progressBar.lastElementChild.lastElementChild.textContent = `${persentase}%`;
												progressBar.lastElementChild.style.width = parseInt(persentase) + '%';
												if(persentase < 50) { 
													progressBar.classList.add('text-gray-500') 
												} else {
													progressBar.classList.remove('text-gray-500');
													progressBar.classList.add('text-white');
												}

												if(persentase === 100) {
													setTimeout(function() {
														progressBar.style.display = 'none';
													} , 1500);
												}
											},
						headers: {
							ContentType: 'multipart/form-data',
							AccessControlAllowOrigin : '*',
							Authorization: `Bearer ${this.context.token}`
						},
				}).then(res => {
							console.log(res);
							return res.data;
						}).catch(err => console.log(err));

		return response;
	}


	/* -- Add Event -- */
	addEvent = async (data) => {
		this.setState({ loading: { ...this.state.loading , add_event: true } });
		let response = await axios.post(`school/${this.context.id}/event/add` , data , {
			headers: {
				Authorization: `Bearer ${this.context.token}`,
			}
		}).then(res => {
			console.log(res.data);
			if(data.status === 'public') {
				this.setState({
					events: {...this.state.events , publics: [...this.state.events.publics , res.data]},
					loading: {...this.state.loading , add_event: false},
				})
			} else {
				this.setState({
					events: {...this.state.events , schools: [...this.state.events.publics , res.data]},
					loading: {...this.state.loading , add_event: false},
				})
			}

			return res.status;
		});

		return response;
	}

	render() {
		return(
			<EventContext.Provider value={{
				...this.state,
				uploadImage: this.uploadImage,
				addEvent: this.addEvent,
			}} >
				{this.props.children}
			</EventContext.Provider>
		);
	}
}


EventContextProvider.contextType = AuthContext;
export default EventContextProvider;
	