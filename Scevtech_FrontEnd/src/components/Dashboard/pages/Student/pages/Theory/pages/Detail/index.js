import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import {TheoryContext} from '../../context.js';
import Loading from '../../../../../../components/Loading/';


class Detail extends Component {
	_isMounted = false;
	constructor(props) {
		super(props);

		this.state = {
			id: this.props.match.params.id,
			loading: true,
			theory: [],
		}
	}

	async componentDidMount() {
		this._isMounted = true;
		let theory = await this.context.detailTheory(this.state.id);
		if(this._isMounted) {
			console.log(theory);
			this.setState({
				theory: theory,
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
					<h2 className="text-xl font-bold">Detail Materi</h2>
					<h4 className="text-md italic lowercase text-gray-400">
						<Link to="/student/dashboard" className="hover:underline hover:text-blue-400">guru</Link> 
						<span className="mx-1">/</span>
						<Link to="/student/theory/all" className="hover:underline hover:text-blue-400">materi </Link> 
						<span className="mx-1">/</span>
						<Link to="/student/theory/all" className="hover:underline hover:text-blue-400">detail </Link> 
					</h4>
				</div>
				<Link to="/student/theory/all" className="button-header">Lihat Daftar Materi</Link>
				{
					(this.state.loading) ?
						<Loading size="large" status={this.state.loading} />
					:
						<React.Fragment>
							<div className="flex flex-row gap-4">
								<div className="w-1/3">
									<img src={process.env.REACT_APP_URL+this.state.theory.thumbnail} alt="thumbnail theory" className="card rounded object-cover mr-4" />
									{
										this.state.theory.files.map((file , key) => {
											return(
												<button href={`${process.env.REACT_APP_URL}storage/theory/documents/${file.name}`} download key={key} className="button block bg-teal w-full cursor-pointer" onClick={() => this.context.downloadFile(file.id)}
												>
													<h2>File {key + 1}</h2>
													<h4>{file.size}KB</h4>
												</button>
											)
										})
									}
								</div>
								<div className="w-2/3">
									<div className="card">
										<div className="my-2">
											<h3 className="font-semibold">Judul</h3>
											<p>{this.state.theory.title}</p>
										</div>
										<div className="my-2">
											<h3 className="font-semibold">Mata Pelajaran</h3>
											<p>{this.state.theory.subject}</p>
										</div>
										<div className="my-2">
											<h3 className="font-semibold">Pengajar</h3>
											<p>{this.state.theory.teacher}</p>
										</div>
										<div className="my-2">
											<h3 className="font-semibold">Waktu Dibuat</h3>
											<p>{this.state.theory.created_at}</p>
										</div>
										<div className="my-2">
											<h3 className="font-semibold">Deskripsi</h3>
											<p>{this.state.theory.description}</p>
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

Detail.contextType = TheoryContext;
export default Detail;
	