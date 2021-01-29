import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import Loading from '../../../../../../components/Loading/'; 
import { PaymentContext } from '../../context.js';

const Item = ({title , value}) => {
	return (
		<div className="my-2 w-full">
			<h3 className="font-semibold">{title}</h3>
			<p>{value}</p>
		</div>
	)
}

class Detail extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: this.props.match.params.id,
			histories: [],
			payment: [],
			spayment: [],
			loading: true,
		}
	}

	async componentDidMount() {
		let {payment , spayment ,histories} = await this.context.getHistory(this.state.id);
		this.setState({ payment , spayment , histories , loading: false })
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
						<h2 className="text-xl font-bold">Detail Pembayaran</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/student/dashboard" className="hover:underline hover:text-blue-400">siswa</Link> 
							<span className="mx-1">/</span>
							<Link to="/student/payment" className="hover:underline hover:text-blue-400">pembayaran </Link> 
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
					<Link to="/student/payment" className="button-header">Lihat Daftar Pembayaran</Link>
				</motion.div>
				{
					(this.state.loading) ?
						<Loading size="large" status={this.state.loading} />
					:
						<React.Fragment>
							<div className="flex flex-row gap-4">
								<div className="w-3/5">
									{
										this.state.histories.map((data , key) => {
											return(
												<div className="my-2 card" key={key}>
													<div className="flex flex-row">
														<div className="w-1/2">
															<Item title="Nominal" value={data.pay} />
														</div>
														<div className="w-1/2">
															<Item title="Nominal" value={data.changes} />
														</div>
													</div>
													<div className="flex flex-row">
														<div className="w-1/2">
															<Item title="Pembayaran" value={data.value} />
														</div>
														<div className="w-1/2">
															<Item title="Tanggal Pembayaran" value={data.pay_at} />
														</div>
													</div>
												</div>
											)
										})
									}
								</div>
								<div className="w-2/5">
									<div className="card">
										<h1 className="text-lg font-bold text-center">Deskripsi Pembayaran</h1>
										<div className="my-3 border-b-2">
											<Item title="Nama" value={this.state.payment.name}  />
											<Item title="Deskripsi" value={this.state.payment.description}  />
											<Item title="Total Pembayaran" value={this.state.payment.value}  />
										</div>
										<div className="my-3">
											<Item title="Siswa" value={this.state.spayment.student} /> 
											<Item title="Terbayar" value={this.state.spayment.paid_off} /> 
											<Item title="Kekurangan" value={this.state.spayment.insufficient} /> 
											<Item title="Status" value={this.state.spayment.status} /> 
										</div>
									</div>
								</div>
							</div>
						</React.Fragment>
				}
			</React.Fragment>
		);
	}
}


Detail.contextType = PaymentContext;
export default Detail;
	