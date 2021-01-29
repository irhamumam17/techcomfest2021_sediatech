import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { PaymentContext } from '../../context.js';
import Loading from '../../../../../../components/Loading/';

class WalletDetail extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: this.props.match.params.id,
			loading: {
				get_data: true,
			}
		}
	}

	componentDidMount = async () => {
		let data = await this.context.detailWallet(this.state.id);
		if(data) {
			this.setState({
				data: data,
				loading: {...this.state.loading , get_data: false},
			})
		}
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
						<h2 className="text-xl font-bold">Dompet Siswa</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/admin/dashboard" className="hover:underline hover:text-blue-400">dashboard</Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/payment/contract" className="hover:underline hover:text-blue-400">pembayaran </Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/payment/wallet" className="hover:underline hover:text-blue-400">dompet </Link> 
						</h4>
					</div>
				</div>
				<Link to="/admin/payment/wallet" className="button-header">Lihat Daftar</Link>
				{
					(this.state.loading.get_data) ?
						<Loading status={this.state.loading.get_data} size="large" />
					:
						<div className="card">
							<div className="flex flex-row">
								<div className="w-1/2">
									<div className="my-2">
										<h3 className="font-semibold">Bank</h3>
										<p>{this.state.data.bank}</p>
									</div>
									<div className="my-2">
										<h3 className="font-semibold">No.Rekening</h3>
										<p>{this.state.data.card_number}</p>
									</div>
									<div className="my-2">
										<h3 className="font-semibold">Nama</h3>
										<p>{this.state.data.name}</p>
									</div>	
									<div className="my-2">
										<h3 className="font-semibold">Total Pembayaran</h3>
										<p>{this.state.data.value}</p>
									</div>
									<div className="my-2">
										<h3 className="font-semibold">Dibayar Pada</h3>
										<p>{this.state.data.payment_at}</p>
									</div>
								</div>
								<div className="w-1/2">
									<div className="my-2">
										<h3 className="font-semibold">No.Invoice</h3>
										<p>#INV{this.state.data.invoice_number}</p>
									</div>
									<div className="my-2">
										<h3 className="font-semibold">Nama Siswa</h3>
										<p>{this.state.data.student}</p>
									</div>
									<div className="my-2">
										<h3 className="font-semibold">Sekolah</h3>
										<p>{this.state.data.school}</p>
									</div>
									<div className="my-2">
										<h3 className="font-semibold">Status</h3>
										<p>{this.state.data.status}</p>
									</div>
									<button onClick={() => {
										this.context.updateTopup(this.state.id ,'confirmed');
										this.setState({ data: {...this.state.data , status: 'confirmed'} });
									}} className="button bg-teal">Konfirmasi</button>
									<button onClick={() => {
										this.context.updateTopup(this.state.id ,'failed');
										this.setState({ data: {...this.state.data , status: 'failed'} });
									}} className="button bg-red ml-2">Tolak</button>
								</div>
							</div>
						</div>
				}
			</React.Fragment>
		);
	}
}


WalletDetail.contextType = PaymentContext;
export default WalletDetail;
