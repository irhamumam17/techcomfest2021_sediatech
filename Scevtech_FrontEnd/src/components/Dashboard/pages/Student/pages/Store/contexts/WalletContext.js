import React , {Component , createContext} from 'react';
import axios from '../../../../../../../axios.js';
import { AuthContext } from '../../../../../contexts/AuthContext.js';

export const WalletContext = createContext();

class WalletContextProvider extends Component {
	_isMounted = false;
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			activities: [],
			banks: [],
			loading: {
				wallet: true,
				activities: true,
				get_topup: false,
			}
		}

		this.topUp = this.topUp.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;

		// get data wallet
		axios.get(`student/${this.context.id}/wallet` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`
			}
		})
			.then(res => {
				this.setState({
					data: res.data,
					loading: {...this.state.loading , get_topup: true},
				});
				getTopup(this.context.id,res.data.id);
			});

		// get history topup
		const getTopup = (studentId , id) => {
			axios.get(`student/${studentId}/wallet/topup/${id}` , {
				headers: {
					Authorization: `Bearer ${this.context.token}`
				}
			})
				.then(res => {
					this.setState({
						loading: {...this.state.loading , get_topup: false},
						activities: res.data,
					})
				}).catch(err => console.error(err));
		}

		// get list bank
		axios.get(`student/${this.context.id}/wallet/bank` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`,
			}
		}).then(res => {
			this.setState({ banks: res.data });
		})
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	topUp = async (data) => {
		data.append('wallet_id' , this.state.data.id);
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

		let response  = await axios.post(`student/${this.context.id}/wallet/topup` , data , {
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
							'Access-Control-Allow-Origin' : '*',
							Authorization: `Bearer ${this.context.token}`,
						}
				})
			.then(res => {
				return res.status;
			}).catch(err => console.error(err));
		return response;
	}

	render() {
		return(
			<WalletContext.Provider value={{
				...this.state,
				topUp: this.topUp
			}} >
				{this.props.children}
			</WalletContext.Provider>
		);
	}
}


WalletContextProvider.contextType = AuthContext;
export default WalletContextProvider;
	