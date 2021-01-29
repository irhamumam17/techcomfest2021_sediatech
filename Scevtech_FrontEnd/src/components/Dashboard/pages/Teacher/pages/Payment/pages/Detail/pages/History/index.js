import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { DetailContext } from '../../context.js';
import Loading from '../../../../../../../../components/Loading/';

class History extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: this.props.match.params.student_id,
			loading: true,
		}
	}

	async componentDidMount() {
		let history = await this.context.getHistoryPayment(this.state.id);
		console.log(history);
		if(history) {
			this.setState({
				loading: false,
				history: history,
			})
		}
	}

	render() {
		return(
			<React.Fragment>
				<div className="card">
					<Link to={`/teacher/payment/detail/${this.context.payment.id}/student/${this.state.id}/add`} className="button bg-indigo block text-center text-sm mb-2">Tambah Pembayaran</Link>
					{
						(this.state.loading) ?
							<Loading size="large" status={this.state.loading} />
						:
							<React.Fragment>
								{
									this.state.history.map((history , key) => {
										return(
											<div key={key} className="my-2 pb-1 border-b-2">
												<div className="flex flex-row gap-2">
													<div className="my-1 w-1/2">
														<h3 className="font-semibold text-sm">Nominal</h3>
														<p className="text-sm">{history.pay}</p>
													</div>
													<div className="my-1 w-1/2">
														<h3 className="font-semibold text-sm">Kembalian</h3>
														<p className="text-sm">{history.changes}</p>
													</div>
												</div>
												<div className="flex flex-row gap-2">
													<div className="my-1 w-1/2">
														<h3 className="font-semibold text-sm">Pembayaran</h3>
														<p className="text-sm">{history.value}</p>
													</div>
													<div className="my-1 w-1/2">
														<h3 className="font-semibold text-sm">Tgl. Pembayaran</h3>
														<p className="text-sm">{history.pay_at}</p>
													</div>
												</div>
											</div>
										)
									})
								}
							</React.Fragment>
					}
				</div>
			</React.Fragment>
		);
	}
}


History.contextType = DetailContext;
export default History;
	