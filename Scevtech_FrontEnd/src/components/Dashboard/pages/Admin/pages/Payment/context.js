import React , {Component , createContext} from 'react';
import axios from '../../../../../../axios.js';
import { AuthContext } from '../../../../contexts/AuthContext.js';

export const PaymentContext = createContext();

class PaymentContextProvider extends Component
{
	_isMounted = false;
	constructor(props)  {
		super(props);

		this.state = {
			packages: [],
			contracts: [],
			banks: [],
			wallets: [],
			loading: {
				packages: true,
				add_package: false,
				del_package: false,

				contracts: true,

				banks: true,
				add_bank: false,
				del_bank: false,

				wallets: true,
			}
		};

		this.addPackage = this.addPackage.bind(this);
		this.removePackage = this.removePackage.bind(this);

		this.addBank = this.addBank.bind(this);
		this.removeBank = this.removeBank.bind(this);

		this.detailContract = this.detailContract.bind(this);
		this.updateStatusContract = this.updateStatusContract.bind(this);

		this.detailWallet = this.detailWallet.bind(this);
		this.updateTopup = this.updateTopup.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;

		// get list packages
		axios.get(`admin/${this.context.id}/payment/package` , { 
			headers: {
				Authorization: `Bearer ${this.context.token}` 
			} 
		})
			.then(res => {
				this.setState({ 
					packages: res.data,
					loading: { ...this.state.loading , packages: false },
				});
			});

		// get list banks
		axios.get(`admin/${this.context.id}/payment/bank ` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`,
			}
		}).then(res => {
			this.setState({
				banks: res.data,
				loading: { ...this.state.loading , banks: false },
			});
		});

		// get list contracts
		axios.get(`admin/${this.context.id}/payment/contract` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`
			}
		}).then(res => {
			this.setState({
				contracts: res.data,
				loading: { ...this.state.loading , contracts: false },
			})
		})

		// get list topup
		axios.get(`admin/${this.context.id}/payment/wallet/topup` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`
			}
		}).then(res => {
			this.setState({
				wallets: res.data,
				loading: {...this.state.loading , wallets: false},
			})
		})
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	/* ---- add package --- */
	addPackage = (data) => {
		this.setState({ loading: { ...this.state.loading , add_package: true } });
		axios.post(`admin/${this.context.id}/payment/package` , data , {
			headers: { Authorization: `Bearer ${this.context.token}` }
		}).then(res => {
			this.setState({
				packages: [...this.state.packages , res.data],
				loading: { ...this.state.loading , add_package: false },
			})
		})
	}

	/* ---- remove package --- */
	removePackage = (id) => {
		this.setState({ loading: { ...this.state.loading , del_package: true } });
		axios.delete(`admin/${this.context.id}/payment/package/${id}`, {
			headers: { Authorization: `Bearer ${this.context.token}` }
		}).then(res => {
			this.setState({
				packages: this.state.packages.filter(data => data.id !== id),
				loading: { ...this.state.loading , del_package: false },
			});
		})
	}

	/* ---- add bank --- */
	addBank = (data) => {
		this.setState({ loading: {...this.state.loading , add_bank: true} });
		axios.post(`admin/${this.context.id}/payment/bank` , data , {
			headers: {
				Authorization: `Bearer ${this.context.token}`,
			}
		}).then(res => {
			console.log(res.data);
			this.setState({
				banks: [...this.state.banks , res.data],
				loading: { ...this.state.loading , add_bank: false },
			})
		})
	}

	/* ---- remove bank --- */
	removeBank = (id) => {
		this.setState({ loading: {...this.state.loading , del_bank: true} });
		axios.delete(`admin/${this.context.id}/payment/bank/${id}`, {
			headers: {
				Authorization: `Bearer ${this.context.token}`,
			}
		}).then(res => {
			this.setState({
				banks: this.state.banks.filter(bank => bank.id !== id),
				loading: {...this.state.loading , del_bank: false},
			})
		})
	}

	/* ---- detail contract --- */
	detailContract = async (id) => {
		let response = await axios.get(`admin/${this.context.id}/payment/contract/${id} ` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`,
			}
		}).then(res => {
			return res.data;
		});

		return response;
	}

	/* ---- update status contract --- */
	updateStatusContract = async (id , status) => {
		let response = await axios.put(`admin/${this.context.id}/payment/contract/${id}/status` , {status} , {
			headers: {
				Authorization: `Bearer ${this.context.token}`,
			}
		}).then(res => {
			let newContract = this.state.contracts.map(contract => {
				if(contract.id === parseInt(id)) {
					contract.status = status;
					return contract;
				}
				return contract;
			});
			this.setState({ contracts: newContract });
		});

		return response;
	}

	/* ---- update status contract --- */
	detailWallet = async (id) => {
		let response = await axios.get(`admin/${this.context.id}/payment/wallet/topup/${id}` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`,
			}
		}).then(res => {
			return res.data;
		});

		return response;
	}

	/* ---- update status contract --- */
	updateTopup = async (id , status) => {
		let response = await axios.put(`admin/${this.context.id}/payment/wallet/topup/${id}/status ` , {status} ,  {
			headers: {
				Authorization: `Bearer ${this.context.token}`,
			}
		}).then(res => {
			return res.status;
		});
		return response;
	}

	render() {
		return(
			<PaymentContext.Provider value={{
				...this.state,
				addPackage: this.addPackage,
				removePackage: this.removePackage,
				addBank: this.addBank,
				removeBank: this.removeBank,
				detailContract: this.detailContract,
				updateStatusContract: this.updateStatusContract,
				detailWallet: this.detailWallet,
				updateTopup: this.updateTopup,
			}} >
				{this.props.children}
			</PaymentContext.Provider>
		)
	}
}

PaymentContextProvider.contextType = AuthContext;
export default PaymentContextProvider;