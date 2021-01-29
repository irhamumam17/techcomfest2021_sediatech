import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { PaymentContext } from '../../context.js';
import Loading from '../../../../../../components/Loading/';

class Bank extends Component {
	constructor(props) {
		super(props);


		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
	
		this.setState({
		  [name]: value,
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		let data = {
			bank: this.state.bank,
			customer: this.state.customer,
			card_number: this.state.card_number,
		}
		this.context.addBank(data);
	}

	render() {
		return(
			<React.Fragment>
				<div className="dashboard-title">
					<div>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Daftar Bank</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/admin/dashboard" className="hover:underline hover:text-blue-400">Admin</Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/payment/contract" className="hover:underline hover:text-blue-400">pembayaran </Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/payment/bank" className="hover:underline hover:text-blue-400">bank </Link> 
						</h4>
					</div>
				</div>
				<Link to="/admin/payment/package" className="button-header">Lihat Daftar Paket</Link>
				<Loading size="small" status={this.context.loading.del_bank} />
				<div className="flex flex-row gap-4">
					<div className="w-2/3">
						{
							(this.context.loading.banks) ?
								<Loading status={this.context.loading.banks} size="large" />
							:
								<table className="table-lg">
									<thead className="bg-indigo-500 text-white">
										<tr>
											<th className="p-2">#</th>
											<th>Bank</th>
											<th>Nasabah</th>
											<th>No.Rekening</th>
											<th>Aksi</th>
										</tr>
									</thead>
									<tbody>
									{
										this.context.banks.map((bank , key) => {
											return(
												<tr key={key}>
													<td className="p-2 text-center">{key + 1}</td>
													<td>{ bank.bank }</td>
													<td>{bank.customer}</td>
													<td>{bank.card_number}</td>
													<td className="col-badge">
														<Tippy content="Hapus"  delay={300}>
															<button onClick={() => this.context.removeBank(bank.id)} className="badge-icon bg-red">
																<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
																  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
																</svg>
															</button>
														</Tippy>
														<Tippy content="Edit"  delay={300}>
															<button className="badge-icon bg-teal">
																<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
																  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
																  <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
																</svg>
															</button>
														</Tippy>
													</td>
												</tr>
											)
										})
									}
									</tbody>
								</table>
						}
					</div>
					<div className="w-1/3">
						<form onSubmit={this.handleSubmit} className="card">
							<div className="my-4">
								<label className="form-label">Bank</label>
								<input onChange={this.handleChange} type="text" placeholder="Bank" name="bank" className="form-input focus:shadow-outline focus:outline-none "/>
							</div>
							<div className="my-4">
								<label className="form-label">Nasabah</label>
								<input onChange={this.handleChange} type="text" placeholder="Nasabah" name="customer" className="form-input focus:shadow-outline focus:outline-none "/>
							</div>
							<div className="my-4">
								<label className="form-label">No.Rekening</label>
								<input onChange={this.handleChange} type="text" placeholder="Nama" name="card_number" className="form-input focus:shadow-outline focus:outline-none "/>
							</div>
							<button className="button bg-blue-400 transition duration-200 hover:bg-blue-500">Tambah</button>
						</form>
					</div>
				</div>
			</React.Fragment>
		);
	}
}


Bank.contextType = PaymentContext;
export default Bank;
	