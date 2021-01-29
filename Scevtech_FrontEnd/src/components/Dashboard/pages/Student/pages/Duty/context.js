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
				duties: true,
			}
		}

		this.detailDuty = this.detailDuty.bind(this);
		this.uploadFile = this.uploadFile.bind(this);
		this.submitDuty = this.submitDuty.bind(this);
		this.getDuty = this.getDuty.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;
		axios.get(`student/${this.context.id}/duty/list` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					this.setState({ 
									duties: res.data , 
									loading: {...this.state.loading , duties: false} ,
							})
				}
			}).catch(err => console.error(err));
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	getDuty = (status) => {
		let duties = this.state.duties.filter(duty => duty.do === status );
		return duties;
	}

	detailDuty = async (id) => {
		let duty = await axios.get(`student/${this.context.id}/duty/detail/${id}` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				return res.data;
			});

		let responses = await axios.get(`student/${this.context.id}/duty/detail/${id}/response` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				return res.data;
			})
		return {duty , responses};
	}

	uploadFile = async (file , id) => {
		let fd = new FormData();
		fd.append('file' , file);

		let progressContainer = document.getElementById('progress-container');
		let progressBar = document.createElement('div');
		progressBar.classList.add('progressbar');
		let progressStatus = document.createElement('span');
		progressStatus.classList.add('progress-status');
		let valueProgress = document.createElement('div');
		valueProgress.classList.add('progress-value');

		valueProgress.append(progressStatus);
		progressBar.append(valueProgress);
		progressContainer.append(progressBar);

		let response = await axios.post(`student/${this.context.id}/duty/response/${id}/upload` , fd  , {
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
							Authorization: `Bearer ${this.context.token}`,
						}
				}).then(res => {
					return res.data;
				}).catch(err => console.error(err));

		return response;
	}

	submitDuty = async (data) => {
		let response = await axios.post(`student/${this.context.id}/duty/response/${data.duty_id}/submit` , data , { headers: { Authorization: `Bearer ${this.context.token}` }, })
						.then(res => {
							return res.data;
						}).catch(err => console.error(err));
		return response;
	}

	render() {
		return(
			<DutyContext.Provider value={{
									...this.state,
									detailDuty: this.detailDuty,
									uploadFile: this.uploadFile,
									submitDuty: this.submitDuty,
									getDuty: this.getDuty,
								}}>
				{this.props.children}
			</DutyContext.Provider>	
		)
	}
}

DutyContextProvider.contextType = AuthContext;
export default DutyContextProvider;