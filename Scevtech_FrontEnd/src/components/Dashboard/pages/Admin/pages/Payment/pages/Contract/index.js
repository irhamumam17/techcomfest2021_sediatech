import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { PaymentContext } from '../../context.js';
import Loading from '../../../../../../components/Loading/';

class Contract extends Component {
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
						<h2 className="text-xl font-bold">Daftar Kontrak</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/admin/dashboard" className="hover:underline hover:text-blue-400">Admin</Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/payment/contract" className="hover:underline hover:text-blue-400">pembayaran </Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/payment/contract" className="hover:underline hover:text-blue-400">kontrak </Link> 
						</h4>
					</div>
				</div>
				{
					(this.context.loading.contracts) ?
						<Loading size="large" status={this.context.loading.contracts} />
					:
						<table className="table-lg mt-4">
							<thead className="bg-indigo-500 text-white">
								<tr>
									<th className="p-2">#</th>
									<th>Invoice</th>
									<th>Sekolah</th>
									<th>Total</th>
									<th>Batas Waktu</th>
									<th>Status</th>
									<th>Aksi</th>
								</tr>
							</thead>
							<tbody>
								{
									this.context.contracts.map((contract , key) => {
										return(
											<tr key={key} >
												<td className="p-2 text-center">{key + 1}</td>
												<td>{contract.inv_number}</td>
												<td>{contract.school}</td>
												<td>{contract.total}</td>
												<td>{contract.inv_date}</td>
												<td className="text-center">{contract.status}</td>
												<td className="col-badge" >
													<Tippy content="hapus"  delay={300}>
														<button className="badge-icon bg-red">
															<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
															  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
															</svg>
														</button>
													</Tippy>
													<Tippy content="detail"  delay={300}>
														<Link to={`/admin/payment/contract/${contract.id}`} className="badge-icon bg-blue">
															<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
															  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
															</svg>
														</Link>
													</Tippy>
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


Contract.contextType = PaymentContext;
export default Contract;
	