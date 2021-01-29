import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import { ContractContext } from '../../context.js';
import Loading from '../../../../../../components/Loading/';

class Buy extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: this.props.match.params.id,
			data: [],
			history: [],
			loading: {
				get_data: true,
				get_history: true,
			}
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleProof = this.handleProof.bind(this);
		this.handleApprof = this.handleApprof.bind(this);
	}

	componentDidMount = async () => {
		// get data
		let data = await this.context.detailPackage(this.state.id);
		this.setState({ 
			data: data,
			loading: { ...this.state.loading , get_data: false },
		});

		// get history
		let history = await this.context.buyHistory(this.state.id);
		this.setState({
			history: history,
			loading: { ...this.state.loading , get_history: false },
		})
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
	
		this.setState({
		  [name]: value,
		});

		if(name === 'bank_id') {
			let bank = this.context.banks.filter(bank => bank.id === parseInt(value))[0];
			this.setState({ bank: bank });
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		let data = {
			id: this.state.id,
			bank_id: this.state.bank_id,
			start_date: this.state.start_date,
		}
		this.context.buyPackage(data);
	}

	handleProof(event) {
		const target = event.target;
		this.setState({
			proof: target.files[0],
		})
	}

	handleApprof(e) {
		e.preventDefault();
		let contract_id = e.target.getAttribute('data-id');
		let fd = new FormData();
		fd.append('contract_id' , contract_id);
		fd.append('proof' , this.state.proof);
		let response = this.context.submitProof(fd);
		if(response) {
			let newHistory = this.state.history.map(data => {
				if(data.id === parseInt(contract_id)) {
					data.status = 'menunggu';
					return data;
				}
				return data;
			})

			this.setState({ history: newHistory });
		}
	}

	render() {
		return(
			<React.Fragment>
				<motion.div className="dashboard-title"
					variants={ Variants }
					initial="tInit"
					animate="tAnimate"
					transition="tTransition"
				>
					<div>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Beli Paket</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/school/dashboard" className="hover:underline hover:text-blue-400">Sekolah</Link> 
							<span className="mx-1">/</span>
							<Link to="/school/contract/package" className="hover:underline hover:text-blue-400">Package </Link> 
						</h4>
					</div>
				</motion.div>
				<motion.div
						variants={Variants}
						initial="btnHeadInit"
						animate="btnHeadAnimate"
						transition="btnHeadTransition"
						className="inline-block"
					>
					<Link to="/school/contract/package" className="button-header">Lihat Daftar	 Paket</Link>
				</motion.div>
				<div className="flex flex-row gap-4">
					<div className="w-1/3">
						{
							(this.state.loading.get_data) ?
								<Loading size="large" status={this.state.loading.get_data} />
							:
								<form onSubmit={this.handleSubmit} className="card">
									<div className="my-2">
										<h4 className="font-semibold">Nama Paket</h4>
										<p>{this.state.data.name}</p>
									</div>
									<div className="my-2">
										<h4 className="font-semibold">Harga Paket</h4>
										<p>{this.state.data.cost}</p>
									</div>
									<div className="my-2">
										<h4 className="font-semibold">Transfer ke Bank</h4>
										<select onChange={this.handleChange} name="bank_id" id="bank_id" className="form-input">
											<option value="">-- Pilih Bank --</option>
											{
												this.context.banks.map((bank , key) => {
													return(
														<option key={key} value={bank.id}>{bank.bank}</option>
													)
												})
											}
										</select>
										{
											(this.state.bank) ?
												<div className="mt-2 mb-3">
													<h3 className="font-semibold">Transfer ke</h3>
													<p>{this.state.bank.bank}</p>
													<p>{this.state.bank.customer}</p>
													<p>{this.state.bank.card_number}</p>
												</div>
											:''
										}
									</div>
									<div className="my-2">
										<label htmlFor="start_date" className="font-semibold">Mulai Kontrak</label>
										<input name="start_date" onChange={this.handleChange} type="date" className="form-input" />
									</div>
									<button className="button bg-blue">Beli</button>
								</form>
						}
					</div>
					<div className="w-2/3">
						{
							(this.state.loading.get_history) ?
								<Loading size="large" status={this.state.loading.get_history} />
							:
								<React.Fragment>
									{
										this.state.history.map((data , key) => {
											return(
												<div key={key} className="card">
													<div className="flex flex-row">
														<div className="w-1/2">
															<div className="my-2">
																<h3 className="font-semibold">Nomor Invoice</h3>
																<p>{data.inv_number}</p>
															</div>
															<div className="my-2">
																<h3 className="font-semibold">Terakhir Pembayaran</h3>
																<p>{data.inv_date}</p>
															</div>
															<div className="my-2">
																<h3 className="font-semibold">PPN (10%)</h3>
																<p>{data.tax}</p>
															</div>
															<div className="my-2">
																<h3 className="font-semibold">Total</h3>
																<p>{data.total}</p>
															</div>
														</div>
														<div className="w-1/2">
															<div className="my-2">
																<h3 className="font-semibold">Bank</h3>
																<p>{data.bank.bank}</p>
															</div>
															<div className="my-2">
																<h3 className="font-semibold">Nama</h3>
																<p>{data.bank.customer}</p>
															</div>
															<div className="my-2">
																<h3 className="font-semibold">Nomor Rekening</h3>
																<p>{data.bank.card_number}</p>
															</div>
															<div className="my-2">
																<h3 className="font-semibold">Status</h3>
																<p>{data.status}</p>
															</div>
														</div>
													</div>
													{
														(data.status === 'unpaid') ?
															<form data-id={data.id} onSubmit={this.handleApprof} className="flex flex-row items-center gap-2 border-t-2" encType="multipart/form-data" >
																<div>

																	<label htmlFor="proof" className="form-label">Bukti Pembayaran</label>
																	<input type="file" className="form-input" name="proof_payment" onChange={this.handleProof} />
																</div>
																<button className="button bg-teal">Kirim Bukti</button>
															</form>
														: ''
													}
												</div>
											)
										})
									}
								</React.Fragment>
						}
					</div>
				</div>
			</React.Fragment>
		);
	}
}


Buy.contextType = ContractContext;
export default Buy;
	