import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import {DutyContext} from '../../context.js';
import Loading from '../../../../../../components/Loading/';


class Detail extends Component {
	_isMounted = false;
	constructor(props) {
		super(props);

		this.state = {
			id: this.props.match.params.id,
			loading: {
				duty: true,
				responses: true,
			},
			duty: [],
			doIt: false,
			submit: false,
			responses: [],
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async componentDidMount() {
		this._isMounted = true;
		let data = await this.context.detailDuty(this.state.id);
		if(this._isMounted) {
			this.setState({
				duty: data.duty,
				responses: data.responses,
				loading: {...this.state.loading , duty: false},
			})
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
	
		this.setState({
		  [name]: value,
		});
	}

	handleSubmit = async (e) => {
		e.preventDefault();
		this.setState({ submit: true});
		let fileResponse = await this.context.uploadFile(this.state.response_file , this.state.duty.id);
		let response = await this.context.submitDuty({
							duty_id: this.state.duty.id,
							title: this.state.response_title,
							description: this.state.response_description,
							file: fileResponse
						})
		if(response) {
			this.setState({
				responses: [...this.state.responses , response],
				duty: {...this.state.duty , do: true},
				submit: false,
				doIt: false,
			});
		}
	}

	render() {
		return(
			<React.Fragment>
				<div className="bg-white block w-1/3 py-2 px-6 rounded uppercase shadow-md text-pink-400 border-l-4 border-pink-400">
					<h2 className="text-xl font-bold">Detail Materi</h2>
					<h4 className="text-md italic lowercase text-gray-400">
						<Link to="/student/dashboard" className="hover:underline hover:text-blue-400">guru</Link> 
						<span className="mx-1">/</span>
						<Link to="/student/duty/list" className="hover:underline hover:text-blue-400">materi </Link> 
						<span className="mx-1">/</span>
						<Link to="/student/duty/list" className="hover:underline hover:text-blue-400">detail </Link> 
					</h4>
				</div>
				<Link to="/student/duty/list" className="button-header">Lihat Daftar Materi</Link>
				{
					(this.state.loading.duty) ?
						<Loading size="large" status={this.state.loading.duty} />
					:
						<React.Fragment>
							<div className="flex flex-row gap-4">
								<div className="w-1/3">
									<img src={process.env.REACT_APP_URL+this.state.duty.thumbnail} alt="thumbnail duty" className="card rounded object-cover" />
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
											<h3 className="font-semibold">Pengajar</h3>
											<p>{this.state.duty.teacher}</p>
										</div>
										<div className="my-2">
											<h3 className="font-semibold">Batas Akhir</h3>
											<p>{this.state.duty.deadline}</p>
										</div>
										<div className="my-2">
											<h3 className="font-semibold">Status</h3>
											<p>
												{
													(this.state.duty.do) ?
														<span className="text-teal-400">Sudah Dikerjakan</span>
													:
														<span className="text-red-400">Belum Dikerjakan</span>
												}
											</p>
										</div>
										<div className="my-2">
											<h3 className="font-semibold">Deskripsi</h3>
											<p>{this.state.duty.description}</p>
										</div>
										{
											(!this.state.duty.do) ?
												<button onClick={() => this.setState({ doIt: !this.state.doIt })} className="button bg-teal">Kerjakan</button>
											: ''
										}
									</div>
									{
										this.state.responses.map((data , key) => {
											return(
												<div className="card" key={key} >
													<div className="my-2">
														<h3 className="font-semibold">Judul</h3>
														<p>{data.title}</p>
													</div>
													<div className="my-2">
														<h3 className="font-semibold">Deskripsi</h3>
														<p>{data.description}</p>
													</div>
													<div className="my-2">
														{
															data.files.map((file , key) => {
																return(
																	<button key={key} className="button bg-teal" >Unduh File ( {file.size}KB )</button>
																)
															})
														}
													</div>
												</div>
											)
										})
									}
									{
										(this.state.doIt) ?
											<form onSubmit={this.handleSubmit} encType="multipart/form-data" className="card">
												<h3 className="font-semibold">Kerjakan</h3>
												<div className="my-2">
													<label htmlFor="title" className="form-label">Judul</label>
													<input type="text" name="response_title" onChange={this.handleChange} className="form-input" />
												</div>
												<div className="my-2">
													<label htmlFor="description" className="form-label">Deskripsi</label>
													<textarea name="response_description" onChange={this.handleChange} id="response" rows="5" className="form-input" ></textarea>
												</div>
												<div className="my-2">
													<label htmlFor="response_file" className="form-label">File</label>
													<input type="file" onChange={(e) => {
														this.setState({
															response_file: e.target.files[0],
														})
													}} name="response_file" className="form-input" />
													<div id="progress-container"></div>
												</div>
												<button className="button bg-teal">Kirim</button>
												<Loading status={this.state.submit} size="large" />
											</form>
										: ''
									}
								</div>
							</div>
						</React.Fragment>
				}
			</React.Fragment>
		);
	}
}

Detail.contextType = DutyContext;
export default Detail;
	