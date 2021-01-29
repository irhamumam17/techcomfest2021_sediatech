import React , { createContext } from 'react';
import axios from '../../../../../../axios.js';
import { AuthContext } from '../../../../contexts/AuthContext.js';

export const PaymentContext = createContext();

class PaymentContextProvider extends React.Component
{
	_isMounted = false;
	constructor(props) {
		super(props);

		this.state = {
			id: null,
			payments: [],
			classes: [],
			loading: {
				payments: true,
				classes: true,
				remove: false,
			}
		}

		this.addPayment = this.addPayment.bind(this);
		this.removePayment = this.removePayment.bind(this);
		this.detailPayment = this.detailPayment.bind(this);
		this.getStudent		= this.getStudent.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;
		this.setState({
			id: this.context.id,
		})

		// get payment
		axios.get(`teacher/${this.context.id}/payment/list` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`,
			}
		})
			.then(res => {
				if(this._isMounted) {
					this.setState({
						payments: res.data,
						loading: { ...this.state.loading , payments: false },
					})
				}
			})

		// get classes
		axios.get(`teacher/${this.context.id}/class` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`,
			}
		})
			.then(res => {
				if(this._isMounted) {
					this.setState({
						classes: res.data,
						loading: { ...this.state.loading , classes: false },
					})
				}
			})
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	addPayment = async (newPayment) => {
		let status = await axios.post(`teacher/${this.context.id}/payment/add	` , newPayment , {
			headers: {
				Authorization: `Bearer ${this.context.token}`,
			}
		})
			.then(res => {
				this.setState({
					payments: [ ...this.state.payments , res.data ],
				})
				return res.status;
			}).catch(err => console.log(err));
		return status;
	}

	removePayment = (id) => {
		this.setState({ loading: {...this.state.loading , remove: true} });
		axios.delete(`teacher/${this.context.id}/payment/${id} ` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`,
			}
		})		
			.then(res => {
				this.setState({
					payments: this.state.payments.filter(payment => payment.id !== id),
					loading: { ...this.state.loading , remove:false },
				});
			})
	}

	detailPayment = (id) => {
		let response = axios.get(`teacher/${this.context.id}/payment/${id}` , {
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

	getStudent = async (classId) => {
		let students = await axios.get(`teacher/${this.context.id}/student/class/${classId}` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`,
			}
		})
				.then(res => {
					return res.data;
	 			});

	 	return students;
	}

	render() {
		return(
			<PaymentContext.Provider value={{ 
											...this.state,
											addPayment: this.addPayment,
											removePayment: this.removePayment,
											detailPayment: this.detailPayment,
											getStudent: this.getStudent,
									 }} >
				{ this.props.children }
			</PaymentContext.Provider>
		)
	}
}

PaymentContextProvider.contextType = AuthContext;
export default PaymentContextProvider;