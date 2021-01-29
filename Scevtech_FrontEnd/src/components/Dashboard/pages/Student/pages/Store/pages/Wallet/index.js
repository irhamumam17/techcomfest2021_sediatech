import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';	
import Loading from '../../../../../../components/Loading/';
import { WalletContext } from '../../contexts/WalletContext.js';


class Wallet extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: {
				topup: false,
			}
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleFile = this.handleFile.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
	
		this.setState({
		  [name]: value,
		});

		if(name === 'bank_id') {
			let bankTarget = this.context.banks.filter(bank => bank.id === parseInt(value))[0];
			this.setState({ bankTarget });
		}
	}

	handleFile(e) {
		this.setState({ proof: e.target.files[0] });
	}

	handleSubmit = async (e) => {
		e.preventDefault();
		this.setState({ topup: true });
		const fd = new FormData();
		let {card_number , name , bank , bank_id , value , proof} = this.state;
		fd.append('card_number' , card_number);
		fd.append('name' , name);
		fd.append('bank' , bank);
		fd.append('bank_id' , bank_id);
		fd.append('value' , value);
		fd.append('proof' , proof);
		this.context.topUp(fd);
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
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Dompet</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/student/dashboard" className="hover:underline hover:text-blue-400">siswa</Link> 
							<span className="mx-1">/</span>
							<Link to="/student/store" className="hover:underline hover:text-blue-400">toko </Link> 
							<span className="mx-1">/</span>
							<Link to="/student/store/wallet" className="hover:underline hover:text-blue-400">dompet </Link> 
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
					<Link to="/student/store/" className="button-header">Lihat Toko</Link>
				</motion.div>
				<div className="flex flex-row gap-4">
					<div className="w-3/5">
						{
							(this.context.loading.get_topup) ?
								<Loading status={this.context.loading.activities} size="large" />
							:
								<React.Fragment>
									{
										this.context.activities.map((data , key) => {
											return(
												<div key={key} className="card flex flex-row gap-2">
													<div className="w-2/5 flex flex-col justify-between">
														<h3>#INV{data.invoice_number}</h3>
														<h1 className="text-orange-400 font-semibold text-2xl">{data.value}</h1>
														{
															(data.status === 'confirmed') ?
																<h3 className="text-teal-400 lowercase text-sm">{data.status}</h3>
															:
																<h3 className="text-red-400 lowercase text-sm">{data.status}</h3>
														}
													</div>
													<div className="w-3/5">
														<h3 className="font-bold text-xl">{data.bank}</h3>
														<h1 className="text-lg text-blue-500">{data.card_number}</h1>
														<h3 className="text-sm">{data.name}</h3>
													</div>
												</div>
											)
										})
									}
								</React.Fragment>
						}
					</div>
					<div className="w-2/5">
						<form onSubmit={this.handleSubmit} encType="multipart/form-data" className="card">
							<h1 className="text-center text-lg font-semibold uppercase">Isi Dompet</h1>
							<div className="form-group">
								<label htmlFor="card_number" className="form-label">Kartu Kredit</label>
								<input type="text" className="form-input" name="card_number" onChange={this.handleChange} />
							</div>
							<div className="form-group">
								<label htmlFor="name" className="form-label">Nama</label>
								<input type="text" className="form-input" name="name" onChange={this.handleChange} />
							</div>
							<div className="form-group">
								<label htmlFor="bank" className="form-label">Bank</label>
								<input type="text" className="form-input" name="bank" onChange={this.handleChange} />
							</div>
							<div className="form-group">
								<label htmlFor="value" className="form-label">Nominal</label>
								<input type="number" min="0" className="form-input" name="value" onChange={this.handleChange} />
							</div>
							<div className="form-group">
								<label htmlFor="proof" className="form-label">Bukti Pembayaran</label>
								<input type="file" accept=".jpg,.jpeg,.png" className="form-input" onChange={this.handleFile} name="proof_payment" />
							</div>
							<div className="form-group">
								<label htmlFor="bank" className="form-label">Pilih  Bank</label>
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
							</div>
							{
								(this.state.bankTarget) ?
									<div className="form-group">
										<label htmlFor="" className="form-label">Transfer ke Bank berikut:</label>
										<p>Bank : {this.state.bankTarget.bank}</p>
										<p>Nama : {this.state.bankTarget.customer}</p>
										<p>Nomor Rekening : {this.state.bankTarget.card_number}</p>
									</div>
								: ''
							}
							<Loading status={this.state.loading.topup} size="large" />
							<div id="progress-container"></div>
							<button className="button bg-blue">Kirim</button>
						</form>
					</div>
				</div>
			</React.Fragment>
		);
	}
}


Wallet.contextType = WalletContext;
export default Wallet;
	