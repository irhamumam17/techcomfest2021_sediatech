import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../../../../components/Loading/';
import { RecruiterContext } from '../../context.js';
import Profile from '../../../../../../assets/instructor.jpg';

class Detail extends Component {
	constructor(props){
		super(props);

		this.state = {
			loading: true,
			recruiter: [],
		}

		this.deleteRecruiter = this.deleteRecruiter.bind(this);
	}

	componentDidMount = async () => {
		let id = this.props.match.params.id;
		let data = await this.context.detailRecruiter(id);
		this.setState({ recruiter: data , loading: false });
	}

	deleteRecruiter = async () => {
		let status = await this.context.removeRecruiter(this.state.recruiter.id);
		if(status === 200) {
			this.props.history.push('/admin/recruiter/list');
		}
	}

	render() {
		return(
			<React.Fragment>
				<div className="bg-white block w-1/3 py-2 px-6 rounded uppercase shadow-md text-pink-400 border-l-4 border-pink-400">
					<h2 className="text-xl font-bold">Detail Rekruiter</h2>
					<h4 className="text-md italic lowercase text-gray-400">
						<Link to="/admin/dashboard" className="hover:underline hover:text-blue-400">Admin</Link> 
						<span className="mx-1">/</span>
						<Link to="/admin/recruiter/add" className="hover:underline hover:text-blue-400">Recruiter </Link> 
						<span className="mx-1">/</span>
						<Link to="/admin/recruiter/list" className="hover:underline hover:text-blue-400">daftar </Link> 
						<span className="mx-1">/</span>
						<Link to="/admin/recruiter/detail" className="hover:underline hover:text-blue-400">detail </Link> 
					</h4>
				</div>
				{
					(this.state.loading) ?
						<Loading status={this.state.loading} size="large" />
					:
						<React.Fragment>
							<div className="flex flex-row gap-4 my-6">
								<div className="w-1/3">
									<div className="card text-center">
										<img src={Profile} alt="recruiter" className="w-3/5 rounded-full m-auto my-4" />
										<h2 className="font-bold text-2xl text-indigo-500">{this.state.recruiter.name}</h2>
										<h3 className="font-light text-sm text-gray-500">{this.state.recruiter.join_at}</h3>
									</div>
								</div>
								<div className="w-2/3">
									<div className="card">
										<div className="flex flex-row py-2">
											<span className="w-2/5 text-gray-700">Nama</span>
											<span className="w-3/5 text-gray-500">{this.state.recruiter.name}</span>
										</div>
										<div className="flex flex-row py-2">
											<span className="w-2/5 text-gray-700">Email</span>
											<span className="w-3/5 text-gray-500">{this.state.recruiter.email}</span>
										</div>
										<div className="flex flex-row py-2">
											<span className="w-2/5 text-gray-700">HP</span>
											<span className="w-3/5 text-gray-500">{this.state.recruiter.phone}</span>
										</div>
										<div className="flex flex-row py-2">
											<span className="w-2/5 text-gray-700">Perusahaan</span>
											<span className="w-3/5 text-gray-500">{this.state.recruiter.company}</span>
										</div>
									</div>
								</div>
							</div>
							<div className="flex flex-row">
								<div className="w-1/2">
									<Link to="/admin/recruiter/list" className="button bg-gray-500" >Kembali</Link>
								</div>
								<div className="w-2/3 text-right">
									<button className="button bg-teal-400 mx-2">Edit</button>
									<button onClick={this.deleteRecruiter} className="button bg-red mx-2 focus:outline-none">Hapus</button>
								</div>
							</div>
						</React.Fragment>
				}
			</React.Fragment>
		);
	}
}

Detail.contextType = RecruiterContext;
export default Detail;
	