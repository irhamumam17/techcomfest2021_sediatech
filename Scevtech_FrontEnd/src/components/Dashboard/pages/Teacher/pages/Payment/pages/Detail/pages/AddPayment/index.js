import React , {Component} from 'react';
import { DetailContext } from '../../context.js'; 
import Loading from '../../../../../../../../components/Loading/';

class AddPayment extends Component {
	constructor(props) {
		super(props);

		this.state = {
			student_id: this.props.match.params.student_id,
			nominal: 0,
			payment: 0,
			loading: {
				get_data: true,
				submit_data: false,
			}
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async componentDidMount() {
		// get student payment
		let student_payment_id = this.props.match.params.student_id;
		let studentPayment = await this.context.detailStudentPayment(student_payment_id);
		if(studentPayment) { this.setState({ data: studentPayment , loading: {...this.state.loading , get_data: false} }) }
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
	
		this.setState({
		  [name]: value,
		});

		const changesInput = document.getElementById('changes');
		let payment = (name === 'payment') ? value : this.state.payment;
		let nominal = (name === 'nominal') ? value : this.state.nominal;
		let changes = nominal - payment;
		changesInput.value = changes;

		if(name === 'payment') {
			const elInsufficient = document.getElementById('insufficient');
			const elPaidOff = document.getElementById('paid_off');

			let insufficient = this.state.data.in_integer.insufficient - value;
			let paid_off = this.state.data.in_integer.paid_off + parseInt(value);
			elInsufficient.value = insufficient;
			elPaidOff.value = paid_off;
			this.setState({
				form_data: {...this.state.form_data, paid_off , insufficient },
			})
		}
	}

	handleSubmit = async (e) => {
		e.preventDefault();
		this.setState({ loading: {...this.state.loading , submit_data: true} });
		let changes = parseInt(this.state.nominal) - parseInt(this.state.payment);
		let data = {
			student_id: this.state.student_id ,
			...this.state.form_data,
			changes: changes,
			pay: this.state.nominal,
			value: this.state.payment,
		}

		let response = await this.context.submitPayment(data);
		if(response === 200) {
			this.setState({ loading: {...this.state.loading ,submit_data: false} });
			this.props.history.push('/teacher/payment/detail/' + this.props.match.params.id);
		}

	}

	render() {
		return(
			<React.Fragment>
				{
					(this.state.loading.get_data) ? 
						<Loading status={this.state.loading.get_data} size="large" />
					:
						<form onSubmit={this.handleSubmit} className="card">
							<div className="form-group">
								<label htmlFor="value" className="form-label">Nominal</label>
								<input type="number" autoFocus={true} name="nominal" onChange={this.handleChange} className="form-input" />
							</div>
							<div className="form-group">
								<label htmlFor="pay" className="form-label">Pembayaran</label>
								<input type="number" name="payment" onChange={this.handleChange} className="form-input" />
							</div>
							<div className="form-group">
								<label htmlFor="changes" className="form-label">Kembalian</label>
								<input type="number" id="changes" className="form-input" readOnly />
							</div>
							<div className="form-group">
								<label htmlFor="paid_off" className="form-label">Terbayar</label>
								<input type="text" id="paid_off" className="form-input" readOnly defaultValue={this.state.data.in_integer.paid_off} />
							</div>
							<div className="form-group">
								<label htmlFor="insufficient" className="form-label">Kekurangan</label>
								<input type="text" id="insufficient" className="form-input" readOnly defaultValue={this.state.data.in_integer.insufficient} />
							</div>
							<button className="button bg-blue">Kirim</button>
							<Loading size="large" status={this.state.loading.submit_data} />
						</form>
				}
			</React.Fragment>
		);
	}
}



AddPayment.contextType = DetailContext;
export default AddPayment;
	