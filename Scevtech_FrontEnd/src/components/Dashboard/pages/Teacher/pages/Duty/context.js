import React , { createContext } from 'react';
import axios from '../../../../../../axios.js';
import { AuthContext } from '../../../../contexts/AuthContext.js';

export const DutyContext = createContext();


class DutyContextProvider extends React.Component
{
	_isMounted = false;
	constructor(props) {
		super(props);

		this.state = {
			duties: [],
			loading: {
				subjects: true,
				classes: true,
				duties: true,
				remove: false,
			},
			teacher: {
				subjects: [],
				classes: [],
			}
		}

		this.addDuty        = this.addDuty.bind(this);
		this.removeDuty     = this.removeDuty.bind(this);
		this.detailDuty     = this.detailDuty.bind(this);
		this.getDuty        = this.getDuty.bind(this);
		this.uploadFile     = this.uploadFile.bind(this);
		this.detailResponse = this.detailResponse.bind(this);
		this.submitFeedback = this.submitFeedback.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;

		// get list duties
		axios.get(`teacher/${this.context.id}/duty/list` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					this.setState({
						duties: res.data,		
						loading: { ...this.state.loading , duties: false },				
					})
				}
			})

		// get teacher subject
		axios.get(`teacher/${this.context.id}/teacher/subject` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					this.setState({
						teacher: { ...this.state.teacher, subjects: res.data, },
						loading: { ...this.state.loading , subjects: false},
					});
				}
			});

		// get teacher class
		axios.get(`teacher/${this.context.id}/teacher/class` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					this.setState({
						teacher: {...this.state.teacher ,  classes: res.data, },
						loading: { ...this.state.loading , classes: false },
					});
				}
			})
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	addDuty = async (data) => {
		let response = await axios.post(`teacher/${this.context.id}/duty/add` , data , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				this.setState({
					duties: [ ...this.state.duties , res.data ],
				});
				return res.status;
			}).catch(err => console.log(err));
		return response;
	}

	removeDuty = (id) => {
		this.setState({ loading: { ...this.state.loading , remove:true } });
		axios.delete(`teacher/${this.context.id}/duty/${id}` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(res.status === 200) {
					this.setState({
						duties: this.state.duties.filter(duty => duty.id !== id),
					});
					this.props.props.history.push('/teacher/duty/list');
				}
			})
	}

	detailDuty = async (id) => {
		let duty = await axios.get(`teacher/${this.context.id}/duty/${id}` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				return res.data;
			});

		let responses = await axios.get(`teacher/${this.context.id}/duty/${id}/response` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				console.log(res.data);
				return res.data;
			})
		return {duty , responses}; 
	}

	getDuty = (status) => {
		return this.state.duties.filter(duty => duty.status === status);
	}

	uploadFile = async (files) => {
		let listFiles = { cover: '', docs: '' } ;
		for (let [key , value] of Object.entries(files)) {
			// if uploaded is document
			if(key === 'document') {
				let listDocs = [];
				let progressContainer = document.getElementById('progress-document');
				for (let [fKey , fValue] of Object.entries(value)) {
					console.log(fKey + fValue);
					let fd = new FormData();
					fd.append('document' , fValue);
					let progressBar = document.createElement('div');
					progressBar.classList.add('progressbar');
					let progressStatus = document.createElement('span');
					progressStatus.classList.add('progress-status');
					let valueProgress = document.createElement('div');
					valueProgress.classList.add('progress-value');

					valueProgress.append(progressStatus);
					progressBar.append(valueProgress);
					progressContainer.append(progressBar);

					await axios.post(`teacher/${this.context.id}/duty/upload/docs` , fd , {
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
								'Content-Type': 'multipart/form-data',
								'Access-Control-Allow-Origin' : '*',
							}
					}).then(res => {
						listDocs.push(res.data);
					}).catch(err => console.log(err));
				}
				listFiles.docs = listDocs;

			// if uploaded is cover file
			} else if(key === 'cover') {
				let fd = new FormData();
				fd.append(key , value[0]);

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

				await axios.post(`teacher/${this.context.id}/duty/upload/cover` , fd , {
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
							'Content-Type': 'multipart/form-data',
							'Access-Control-Allow-Origin' : '*',
						}
				}).then(res => {
					listFiles.cover = res.data;
				}).catch(err => console.log(err));
			}
		}

		return listFiles;
	}

	detailResponse = async (id , duty) => {
		let response = await axios.get(`teacher/${this.context.id}/duty/${duty}/response/${id}`)
			.then(res => {
				return res.data;
			}).catch(err => console.error(err));
		return response;
	}

	submitFeedback = async (data) => {
		let response = await axios.post(`teacher/${this.context.id}/duty/${data.duty_id}/response/${data.id}/feedback` , data)
				.then(res => {
					return res.data;
				}).catch(err => console.error(err));
		return response;
	}
 
	render() {
		return(
			<DutyContext.Provider value={{
									...this.state,
									addDuty: this.addDuty,
									removeDuty: this.removeDuty,
									detailDuty: this.detailDuty,
									getDuty: this.getDuty,
									uploadFile: this.uploadFile,
									detailResponse: this.detailResponse,
									submitFeedback: this.submitFeedback,
			}} >
				{this.props.children}
			</DutyContext.Provider>
		)
	}
}


DutyContextProvider.contextType = AuthContext;
export default DutyContextProvider;