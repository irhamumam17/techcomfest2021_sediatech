import React , { createContext , Component } from 'react';
import axios from '../../../../../../axios.js';
import { AuthContext } from '../../../../contexts/AuthContext.js';

export const ScholarshipContext = createContext();

class ScholarshipContextProvider extends Component
{
	_isMounted = false;
	constructor(props) {
		super(props);

		this.state = {
			loading: {
				scholarships: true,
				add_data: false,
				del_data: false,
			},
			scholarships: [],
		}

		this.uploadCover = this.uploadCover.bind(this);
		this.addScholarship = this.addScholarship.bind(this);
		this.removeScholarship = this.removeScholarship.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;

		// get list scholarship
		axios.get(`admin/{this.context.id}/scholarship/list` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted ) {
					this.setState({
						scholarships: res.data,
						loading: {...this.state.loading, scholarships: false},
					})
				}
			})
	}

	componentWillUnmount() {
		this._isMounted = false
	}

	uploadCover = async (file) => {
		let fd = new FormData();
		fd.append('cover' , file);

		let progressContainer = document.getElementById('progress-cover');

		let progressBar = document.createElement('div');
		progressBar.classList.add('progressbar');
		let progressStatus = document.createElement('span');
		progressStatus.classList.add('progress-status');
		let valueProgress = document.createElement('div');
		valueProgress.classList.add('progress-value');

		valueProgress.append(progressStatus);
		progressBar.append(valueProgress);
		progressContainer.append(progressBar);

		let response = await axios.post(`admin/${this.context.id}/scholarship/upload`, fd , {
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

	addScholarship = async (data) => {
		this.setState({ loading: {...this.state.loading , add_data: true} });
		let response = await axios.post(`admin/${this.context.id}/scholarship/store` , data , {headers: { Authorization: `Bearer ${this.context.token}` },})
			.then(res => {
				console.log(res);
				this.setState({
					loading: {...this.state.loading , add_data: false},
					scholarships: [...this.state.scholarships , res.data],
				})
				return res.status;
			}).catch(err => console.error(err));
		return response;
	} 

	removeScholarship = (id) => {
		this.setState({ loading: {...this.state.loading , del_data: true} });
		axios.delete(`admin/${this.context.id}/scholarship/destroy/${id}` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				this.setState({
					loading: {...this.state.loading , del_data: false},
					scholarships: this.state.scholarships.filter(data => data.id !== id),
				})
			}).catch(err => console.error(err));
	}

	render() {
		return(
			<ScholarshipContext.Provider value={{
				...this.state,
				uploadCover: this.uploadCover,
				addScholarship: this.addScholarship, 
				removeScholarship: this.removeScholarship,
			}} > 
				{this.props.children}
			</ScholarshipContext.Provider>
		)
	}

}


ScholarshipContextProvider.contextType = AuthContext;
export default ScholarshipContextProvider;