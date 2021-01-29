import React , { Component , createContext } from 'react';
import axios from '../../../../../../axios.js';
import { AuthContext } from '../../../../contexts/AuthContext.js';

export const ContractContext = createContext();

class ContractContextProvider extends Component
{
	_isMounted = false;
	constructor(props) {
		super(props);

		this.state = {
			packages: [],
			banks: [],
			loading: {
				get_packages: true,
				get_banks: true,
			}
		}

		this.detailPackage = this.detailPackage.bind(this);
		this.buyPackage = this.buyPackage.bind(this);
		this.buyHistory = this.buyHistory.bind(this);
		this.submitProof = this.submitProof.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;

		// get list packages
		axios.get(`school/${this.context.id}/contract/package ` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`,
			}
		}).then(res => {
			this.setState({
				packages: res.data,
				loading: { ...this.state.loading , get_packages: false },
			})
		})

		// get list banks
		axios.get(`school/${this.context.id}/contract/bank` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`,
			}
		}).then(res => {
			this.setState({
				banks: res.data,
				loading: { ...this.state.loading , get_banks: false },
			})
		})

	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	detailPackage = async (id) => {
		let response = await axios.get(`school/${this.context.id}/contract/package/${id}` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`,
			}
		}).then(res => {
			return res.data;
		})

		return response;
	}

	buyPackage = async (data) => {
		let response = await axios.post(`school/${this.context.id}/contract/package/${data.id}` , data , {
			headers: {
				Authorization: `Bearer ${this.context.token}`,
			}
		}).then(res => {
			console.log(res.data);
			return res.data;
		});

		return response;
	}

	buyHistory = async (id) => {
		let response = await axios.get(`school/${this.context.id}/contract/package/${id}/history ` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`,
			}
		}).then(res => {
			return res.data;
		});

		return response;
	}

	submitProof = async (data) => {
		let response = await axios.post(`school/${this.context.id}/contract/package/proof` , data , {
			headers: {
				Authorization: `Bearer ${this.context.token}`,
			}
		}).then(res => {
			return res.data;
		})

		return response;
	} 

	render() {
		return(
			<ContractContext.Provider value={{
				...this.state,
				detailPackage: this.detailPackage,
				buyPackage: this.buyPackage,
				buyHistory: this.buyHistory,
				submitProof: this.submitProof,
			}} >
				{this.props.children}
			</ContractContext.Provider>
		)
	}

}

ContractContextProvider.contextType = AuthContext;
export default ContractContextProvider;