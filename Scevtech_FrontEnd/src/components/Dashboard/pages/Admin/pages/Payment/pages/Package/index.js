import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { PaymentContext } from '../../context.js';
import Loading from '../../../../../../components/Loading/';

class Package extends Component {
	constructor(props) {
		super(props);

		this.state = {

		};

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

	handleSubmit = (e) => {
		e.preventDefault();
		this.context.addPackage(this.state);
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
						<h2 className="text-xl font-bold">Daftar Paket</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/admin/dashboard" className="hover:underline hover:text-blue-400">Admin</Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/payment/contract" className="hover:underline hover:text-blue-400">pembayaran </Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/payment/package" className="hover:underline hover:text-blue-400">paket </Link> 
						</h4>
					</div>
				</div>
				<Loading status={this.context.loading.del_package} size="small" />
				<div className="flex flex-row gap-4">
					<div className="w-2/3">
						{
							(this.context.loading.packages) ?
								<Loading status={this.context.loading.packages} size="large" />
							:
								<table className="table-lg">
									<thead className="bg-indigo-500 text-white">
										<tr>
											<th className="p-2">#</th>
											<th>Paket</th>
											<th>Harga</th>
											<th>Aksi</th>
										</tr>
									</thead>
									<tbody>
										{
											this.context.packages.map((data , key) => {
												return(
													<tr key={key} >
														<td className="p-2 text-center">{ key + 1 }</td>
														<td>{data.name}</td>
														<td>{data.cost}</td>
														<td className="col-badge">
															<Tippy content="Hapus"  delay={300}>
																<button onClick={() => this.context.removePackage(data.id)} className="badge-icon bg-red">
																	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
																	  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
																	</svg>
																</button>
															</Tippy>
															<Tippy content="Detail"  delay={300}>
																<Link to="/admin/package/detail" className="badge-icon bg-blue">
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
					</div>
					<div className="w-1/3">
						<form onSubmit={this.handleSubmit} className="card">
							<div className="my-4">
								<label className="form-label">Nama</label>
								<input type="text" name="name" onChange={this.handleChange} className="form-input"/>
							</div>
							<div className="my-4">
								<label className="form-label">Harga</label>
								<input type="number" name="cost" onChange={this.handleChange} className="form-input"/>
							</div>
							<div className="form-group">
								<label htmlFor="description" className="form-label">Deskripsi</label>
								<textarea onChange={this.handleChange} name="description" id="description" rows="5" className="form-input"></textarea>
							</div>
							<button className="button bg-blue-400 transition duration-200 hover:bg-blue-500">Tambah</button>
							<Loading size="large" status={this.context.loading.add_package} />
						</form>
					</div>
				</div>
			</React.Fragment>
		);
	}
}



Package.contextType = PaymentContext;
export default Package;
	