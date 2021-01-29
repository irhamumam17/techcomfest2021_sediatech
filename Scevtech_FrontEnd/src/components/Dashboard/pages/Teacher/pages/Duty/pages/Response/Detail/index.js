import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import {DutyContext} from '../../../context.js';
import Loading from '../../../../../../../components/Loading/';

class Detail extends Component
{
	constructor(props) {
		super(props);

		this.state = {
			response: [],
			feedback: [],
			loading: {
				response: true,
				submit: false,
			}
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async componentDidMount() {
		// get response
		let {id , response} = this.props.match.params; 
		let dataResponse = await this.context.detailResponse(response, id);
		this.setState({
			response: dataResponse,
			loading: {...this.state.loading , response:false},
		})
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
	
		this.setState({
		  [name]: value,
		});
	}

	async handleSubmit(e) {
		e.preventDefault();
		this.setState({ loading: {...this.state.loading , submit: true} });
		let response = await this.context.submitFeedback({
			id: this.state.response.id,
			duty_id: this.props.match.params.id,
			title: this.state.title,
			description: this.state.description,
			score: this.state.score,
			status: this.state.status,
		});
		if(response) {
			let {feedback , score, status} = response;
			this.setState({
				loading: {...this.state.loading , submit: false},
				response: {...this.state.response , skor: score , status: status},
				feedback: [...this.state.feedback , feedback],
			});
		}

	}

	render() {
		return(
			<React.Fragment>
				{
					(this.state.loading.response) ?
						<Loading status={this.state.loading.response} size="large" />
					:
						<div className="flex flex-row gap-4">
							<div className="w-1/3">
								<div className="card">
									<div className="my-2">
										<h3 className="font-semibold">Nama</h3>
										<p>{this.state.response.student.name}</p>
									</div>
									<div className="my-2">
										<h3 className="font-semibold">NIS</h3>
										<p>{this.state.response.student.nis}</p>
									</div>
									<div className="my-2">
										<h3 className="font-semibold">Kelas</h3>
										<p>{this.state.response.student.class_name}</p>
									</div>
								</div>
								<Link to={`/teacher/duty/detail/${this.props.match.params.id}`} className="button bg-gray">Lihat Daftar</Link>
							</div>
							<div className="w-2/3">
								<div className="card">
									<div className="my-2">
										<h3 className="font-semibold">Judul</h3>
										<p>{this.state.response.title}</p>
									</div>
									<div className="my-2">
										<h3 className="font-semibold">Deskripsi</h3>
										<p>{this.state.response.description}</p>
									</div>
									<div className="my-2">
										<h3 className="font-semibold">File</h3>
											{
												this.state.response.files.map((file , key) => {
													return(
														<button className="button bg-teal" key={key}>File {key + 1}</button>
													)
												})
											}
									</div>
									<div className="my-2">
										<h3 className="font-semibold">Nilai</h3>
										<p>{this.state.response.skor}</p>
									</div>
									<div className="my-2">
										<h3 className="font-semibold">Status</h3>
										<p>{this.state.response.status}</p>
									</div>
								</div>
								{
									(this.state.response.status === '-') ?
										<form onSubmit={this.handleSubmit} className="card">
											<h1 className="text-lg font-bold">Beri Tanggapan</h1>
											<div className="form-group">
												<label htmlFor="title" className="form-label">Judul</label>
												<input type="text" name="title" onChange={this.handleChange} className="form-input" />
											</div>
											<div className="form-group">
												<label htmlFor="description" className="form-label">Deskripsi</label>
												<textarea name="description" onChange={this.handleChange} id="description" rows="5" className="form-input"></textarea>
											</div>
											<div className="my-3 flex flex-row gap-2">
												<div className="form-group w-1/3">
													<label htmlFor="score" className="form-label">Nilai</label>
													<input type="number" onChange={this.handleChange} name="score" className="form-input" />
												</div>
												<div className="form-group w-2/3">
													<label htmlFor="status" className="form-label">Status</label>
													<select name="status" onChange={this.handleChange} id="status" className="form-input">
														<option value="">-- Pilih Status --</option>
														<option value="tuntas">Tuntas</option>
														<option value="remidi">Remidi</option>
													</select>
												</div>
											</div>
											<button className="button bg-blue">Kirim</button>
											<Loading status={this.state.loading.feedback} size="large" />
										</form>
									: ''
								}
							</div>
						</div>
				}
			</React.Fragment>
		)
	}
}

Detail.contextType = DutyContext;
export default Detail;
	