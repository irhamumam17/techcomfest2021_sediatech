import React , { createContext } from 'react';
import axios from '../../../../../../axios.js';
import { AuthContext } from '../../../../contexts/AuthContext.js';
export const TheoryContext = createContext();

class TheoryContextProvider extends React.Component
{
	_isMounted  = false;
	constructor(props) {
		super(props);

		this.state = {
			theories: [],
			loading: {
				subjects: true,
				classes: true,
				theories: true,
				remove: false,
			},
			teacher: {
				subjects: [],
				classes: [],
			},
		}

		this.addTheory = this.addTheory.bind(this);
		this.removeTheory = this.removeTheory.bind(this);
		this.uploadFile = this.uploadFile.bind(this);
		this.detailTheory = this.detailTheory.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;

		// get list theories
		axios.get(`teacher/${this.context.id}/theory/list` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					this.setState({
						theories: res.data,		
						loading: { ...this.state.loading , theories: false },				
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

	addTheory = async (data) => {
		let response = await axios.post(`teacher/${this.context.id}/theory/add` , data , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				this.setState({
					theories: [ ...this.state.theories , res.data ],
				});
				return res.status;
			}).catch(err => console.log(err));

		return response;
	} 

	removeTheory = async (id) => {
		this.setState({ loading: { ...this.state.loading , remove:true } });
		axios.delete(`teacher/${this.context.id}/theory/${id}` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(res.status === 200) {
					this.setState({
						theories: this.state.theories.filter(theory => theory.id !== id),
					});
					this.props.props.history.push('/teacher/theory/list');
				}
			})
	}

	detailTheory = async (id) => {
		let theory = await axios.get(`teacher/${this.context.id}/theory/${id}` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				return res.data;
			});

		let readStudent = await axios.get(`teacher/${this.context.id}/theory/${id}/read` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				return res.data;
			})
		return {theory , readStudent};
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

					await axios.post(`teacher/${this.context.id}/theory/upload/docs` , fd , {
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

				await axios.post(`teacher/${this.context.id}/theory/upload/cover` , fd , {
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

	render() {
		return (
			<TheoryContext.Provider value={{
									...this.state,
									addTheory: this.addTheory,
									removeTheory: this.removeTheory,
									detailTheory: this.detailTheory,
									uploadFile: this.uploadFile,
								}} >
				{this.props.children}
			</TheoryContext.Provider>
		)
	}
}

TheoryContextProvider.contextType = AuthContext;
export default TheoryContextProvider;