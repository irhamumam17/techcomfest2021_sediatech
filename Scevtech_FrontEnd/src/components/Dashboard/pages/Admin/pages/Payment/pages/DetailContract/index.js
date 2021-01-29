import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { PaymentContext } from '../../context.js';
import Loading from '../../../../../../components/Loading/';

class DetailContract extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: this.props.match.params.id,
			data: [],
			loading: {
				get_data: true,
			}
		}
	}

	componentDidMount = async () => {
		// get data
		let  data = await this.context.detailContract(this.state.id);
		console.log(data);
		this.setState({
			data: data,
			loading: {...this.state.loading , get_data: false},
		})
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
						<h2 className="text-xl font-bold">Detail Kontrak</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/admin/dashboard" className="hover:underline hover:text-blue-400">Admin</Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/payment/contract" className="hover:underline hover:text-blue-400">pembayaran </Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/payment/contract" className="hover:underline hover:text-blue-400">kontrak </Link> 
						</h4>
					</div>
				</div>
				<Link to="/admin/payment/contract" className="button-header">Lihat Daftar Kontrak</Link>
				{
					(this.state.loading.get_data) ?
						<Loading size="large" status={this.state.loading.get_data} />
					:
						<div className="card">
							<div className="flex flex-row">
								<div className="w-1/2">
									<div className="my-2">
										<h3 className="font-semibold">Nomor Invoice</h3>
										<p>{this.state.data.inv_number}</p>
									</div>
									<div className="my-2">
										<h3 className="font-semibold">Terakhir Pembayaran</h3>
										<p>{this.state.data.inv_date}</p>
									</div>
									<div className="my-2">
										<h3 className="font-semibold">Sekolah</h3>
										<p>{this.state.data.school}</p>
									</div>
									<div className="my-2">
										<h3 className="font-semibold">PPN(10%)</h3>
										<p>{this.state.data.tax}</p>
									</div>
									<div className="my-2">
										<h3 className="font-semibold">Total Pembayaran</h3>
										<p>{this.state.data.total}</p>
									</div>
								</div>
								<div className="w-1/2">
									<div className="my-2">
										<h3 className="font-semibold">Bank</h3>
										<p>{this.state.data.bank.bank}</p>
									</div>
									<div className="my-2">
										<h3 className="font-semibold">Nama</h3>
										<p>{this.state.data.bank.customer}</p>
									</div>
									<div className="my-2">
										<h3 className="font-semibold">Nomor Rekening</h3>
										<p>{this.state.data.bank.card_number}</p>
									</div>
									<div className="my-2">
										<h3 className="font-semibold">Status</h3>
										<p>{this.state.data.status}</p>
									</div>
									<button onClick={() => {
										this.context.updateStatusContract(this.state.id , 'confirmed');
										this.setState({ data: {...this.state.data , status: 'confirmed'} });
									}} className="button bg-teal">Konfirmasi</button>
									<button onClick={() => {
										this.context.updateStatusContract(this.state.id , 'reject');
										this.setState({ data: {...this.state.data , status: 'reject'} })
									}} className="button bg-red ml-2">Tolak</button>
								</div>
							</div>
						</div>
				}
			</React.Fragment>
		);
	}
}


DetailContract.contextType = PaymentContext;
export default DetailContract;
	