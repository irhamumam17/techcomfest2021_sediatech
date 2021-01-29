import React , {Component , createContext} from 'react';
import axios from '../../../../../../axios.js';
import {AuthContext} from '../../../../contexts/AuthContext.js';

export const PaymentContext = createContext();

class PaymentContextProvider extends Component {
	_isMounted = false;
	constructor(props) {
		super(props);

		this.state = {
			payments: [],
			loading: {
				payments: true,
			}
		}

		this.getHistory = this.getHistory.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;

		// get list data
		axios.get(`student/${this.context.id}/payment/list` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`,
			}
		})
			.then(res => {
				if(this._isMounted) {
					this.setState({
						payments: res.data,
						loading: {...this.state.loading , payments: false},
					})
				}
			});

	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	getHistory = async (id) => {
		let response = await axios.get(`student/${this.context.id}/payment/detail/${id} ` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`,
			}
		})
						.then(res => {
							console.log(res.data);
							return res.data;
						}).catch(err => console.error(err));
		return response;
	}

	render() {
		return(
			<PaymentContext.Provider value={{
				...this.state,
				getHistory: this.getHistory,
			}} >
				{this.props.children}
			</PaymentContext.Provider>
		);
	}
}


PaymentContextProvider.contextType = AuthContext;
export default PaymentContextProvider;
	