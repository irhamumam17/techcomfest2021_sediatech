import React , { createContext , Component } from 'react';
import axios from '../../../../../../../../axios.js';
import { PaymentContext } from '../../context.js';

export const DetailContext = createContext();

class DetailContextProvider extends Component
{
	_isMounted = false;
	constructor(props) {
		super(props);

		this.state = {
			id: this.props.id,
			payment: [],
			list_data: [],
			students: [],
			loading: {
				payment: true,
				list_data: true,
				students: true,
				add_list_data: false,
				get_history: false,
			}
		}

		this.addStudentPayment    = this.addStudentPayment.bind(this);
		this.detailStudentPayment = this.detailStudentPayment.bind(this);
		this.submitPayment        = this.submitPayment.bind(this);
		this.getHistoryPayment    = this.getHistoryPayment.bind(this);
	}

	async componentDidMount() {
		this._isMounted = true;

		// get data payment
		let {payment, students , student_payments} = await this.context.detailPayment(this.state.id);
		if(this._isMounted) {
			this.setState({
				payment: payment,
				students: students,
				list_data: student_payments,
				loading: {...this.state.loading , payment: false , students: false , list_data: false,},
			})
		} 
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	addStudentPayment = async (student_id) => {
		this.setState({ loading: {...this.state.loading , add_list_data: true} });
		let response = await axios.post(`teacher/${this.context.id}/payment/${this.state.payment.id}/addstudent` , {student_id})
					.then(res => {
						this.setState({
							list_data: [...this.state.list_data , res.data],
							loading: {...this.state.loading , add_list_data: false},
						})
						return res.status;
					})

		return response;
	}

	detailStudentPayment = async (id) => {
		let response = await axios.get(`teacher/${this.context.id}/payment/${this.state.payment.id}/student/${id} `)
			.then(res => {
				return res.data;
			}).catch(err => console.error(err));
		return response;
	}

	submitPayment = async (data) => {
		let response = await axios.post(`teacher/${this.context.id}/payment/${this.state.payment.id}/student/${data.student_id}/add ` , data)
			.then(res => {
				let list_data = this.state.list_data;
				list_data.map(item => {
					if(item.id === res.data.id) {
						item.insufficient = res.data.insufficient;
						item.paid_off = res.data.paid_off;
					}
					return item;
				})
				return res.status;
			}).catch(err => console.error(err));
		return response;
	}

	getHistoryPayment = async (id) => {
		let response = await axios.get(`teacher/${this.context.id}/payment/${this.state.payment.id}/student/${id}/history `)
						.then(res => {
							return res.data;
						}).catch(err => console.error(err));
		return response;
	}

	render() {
		return(
			<DetailContext.Provider value={{
				...this.state,
				addStudentPayment: this.addStudentPayment,
				detailStudentPayment: this.detailStudentPayment,
				submitPayment: this.submitPayment,
				getHistoryPayment: this.getHistoryPayment,
			}} >
				{this.props.children}
			</DetailContext.Provider>
		)
	}
}



DetailContextProvider.contextType = PaymentContext;
export default DetailContextProvider;