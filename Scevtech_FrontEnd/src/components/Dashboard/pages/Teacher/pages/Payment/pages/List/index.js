import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import Loading from '../../../../../../components/Loading/';
import { PaymentContext } from '../../context.js';


class List extends Component {
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
						<h2 className="text-xl font-bold">Daftar Pembayaran</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/teacher/dashboard" className="hover:underline hover:text-blue-400">guru</Link> 
							<span className="mx-1">/</span>
							<Link to="/teacher/payment/list" className="hover:underline hover:text-blue-400">pembayaran </Link>
							<span className="mx-1">/</span>
							<Link to="/teacher/payment/list" className="hover:underline hover:text-blue-400">daftar </Link> 
						</h4>
					</div>
				</motion.div>
				<motion.div
					variants={Variants}
					initial="btnHeadInit"
					animate="btnHeadAnimate"
					transition="btnHeadTransition"
					className="inline-block">
					<Link to="/teacher/payment/add" className="button-header">Tambah Pembayaran</Link>
				</motion.div>
				<Loading size="small" status={this.context.loading.remove} />
				{
					(this.context.loading.payments) ?
						<Loading size="large" status={this.context.loading.payments} />
					:
						<table className="table-lg">
							<thead className="bg-indigo-400 text-white">
								<tr>
									<th className="p-2">#</th>
									<th>Nama</th>
									<th>Kelas</th>
									<th>Aksi</th>
								</tr>
							</thead>
							<tbody>
								{
									this.context.payments.map((payment , key) => {
										return(
											<tr key={key}>
												<td className="p-2 text-center">{key + 1}</td>
												<td>{payment.name}</td>
												<td>{payment.class_name}</td>
												<td className="text-center">
													<Link to={`/teacher/payment/detail/${payment.id}`} className="badge bg-blue">detail</Link>
													<button onClick={() => this.context.removePayment(payment.id)} className="badge bg-red-400">hapus</button>
												</td>
											</tr>
										)
									})
								}
							</tbody>
						</table>
				}
			</React.Fragment>
		);
	}
}

List.contextType = PaymentContext;
export default List;
	