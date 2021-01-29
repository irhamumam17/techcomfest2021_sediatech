import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import { DutyContext } from '../../context.js';
import Loading from '../../../../../../components/Loading/';
import Response from '../Response/';

class Detail extends Component {
	_isMounted = false;
	constructor(props) {
		super(props);

		this.state = {
			id: this.props.match.params.id,
			loading: true,
			duty: [],
		}
	}

	async componentDidMount() {
		this._isMounted= true;
		let {duty , responses} = await this.context.detailDuty(this.state.id);
		if(this._isMounted) {
			this.setState({
				duty: duty,
				responses: responses,
				loading: false,
			})
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		return(
			<React.Fragment>
				<div className="bg-white block w-1/3 py-2 px-6 rounded uppercase shadow-md text-pink-400 border-l-4 border-pink-400">
					<h2 className="text-xl font-bold">Detail Tugas</h2>
					<h4 className="text-md italic lowercase text-gray-400">
						<Link to="/teacher/dashboard" className="hover:underline hover:text-blue-400">guru</Link> 
						<span className="mx-1">/</span>
						<Link to="/teacher/duty/list" className="hover:underline hover:text-blue-400">tugas </Link> 
						<span className="mx-1">/</span>
						<Link to="/teacher/duty/list" className="hover:underline hover:text-blue-400">detail </Link> 
					</h4>
				</div>
				<Link to="/teacher/duty/list" className="button-header">Lihat Daftar Tugas</Link>
				{
					(this.state.loading) ?
						<Loading size="large" status={this.state.loading} />
					:
						<React.Fragment>
							<div className="flex flex-row gap-4">
								<div className="w-1/3">
									<img src={process.env.REACT_APP_URL+this.state.duty.thumbnail} alt="thumbnail duty" className="card rounded object-cover mr-4" />
								</div>
								<div className="w-2/3">
									<div className="card">
										<div className="my-2">
											<h3 className="font-semibold">Judul</h3>
											<p>{this.state.duty.title}</p>
										</div>
										<div className="my-2">
											<h3 className="font-semibold">Mata Pelajaran</h3>
											<p>{this.state.duty.subject}</p>
										</div>
										<div className="my-2">
											<h3 className="font-semibold">Waktu Dibuat</h3>
											<p>{this.state.duty.created_at}</p>
										</div>	
										<div className="my-2">
											<h3 className="font-semibold">Status</h3>
											<p>{this.state.duty.status}</p>
										</div>
										<div className="my-2">
											<h3 className="font-semibold">Kelas</h3>
											<ul>
												{
													this.state.duty.classes.map((value , key) => {
														return(
															<li key={key}>{value}</li>
														)
													})
												}
											</ul>
										</div>	
										<div className="my-2">
											<h3 className="font-semibold">Deskripsi</h3>
											<p>{this.state.duty.description}</p>
										</div>
									</div>
									<button onClick={() => this.context.removeDuty(this.state.duty.id)} className="button bg-red-400">hapus</button>
								</div>
							</div>
							<Loading size="small" status={this.context.loading.remove} />

							<Response responses={this.state.responses} duty={this.state.duty} />
						</React.Fragment>
				}
			</React.Fragment>
		);
	}
}


Detail.contextType = DutyContext;
export default Detail;
		