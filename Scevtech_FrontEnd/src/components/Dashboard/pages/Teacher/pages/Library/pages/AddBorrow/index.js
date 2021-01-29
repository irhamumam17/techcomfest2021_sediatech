import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../../../../components/Loading/';
import { LibraryContext } from '../../context.js';

class AddBorrow extends Component {
	constructor(props) {
		super(props);

		this.state = {
			students: [],
			add_data: false,
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}


	async handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
	
		if(name === 'class_id') {
			let students = await this.context.getStudent(value);
			this.setState({ students: students });
		}

		this.setState({
		  [name]: value,
		});
	}

	async handleSubmit(e) {
		e.preventDefault();
		this.setState({ add_data: true });

		let data = {
			'student_id': this.state.student_id,
			'book_id': this.state.book_id,
		}
		let status = await this.context.addBorrow(data);
		if(status === 200) {
			this.props.history.push('/teacher/library/loan');
		}
	}

	render() {
		return(
			<React.Fragment>
				<div className="bg-white block w-1/3 py-2 px-6 rounded uppercase shadow-md text-pink-400 border-l-4 border-pink-400">
					<h2 className="text-xl font-bold">Tambah Peminjaman Buku</h2>
					<h4 className="text-md italic lowercase text-gray-400">
						<Link to="/teacher/dashboard" className="hover:underline hover:text-blue-400">guru</Link> 
						<span className="mx-1">/</span>
						<Link to="/teacher/library/book" className="hover:underline hover:text-blue-400">perpustakaan </Link> 
						<span className="mx-1">/</span>
						<Link to="/teacher/library/addborrow" className="hover:underline hover:text-blue-400">tambah pinjaman </Link> 
					</h4>
				</div>
				<Link to="/teacher/library/loan" className="button-header transition duration-200 hover:bg-pink-600">Lihat Daftar Pinjaman Buku</Link>
				<form onSubmit={this.handleSubmit} className="card">
					<div className="form-group">
						<label htmlFor="class_id" className="form-label">Pilih Kelas</label>
						<select name="class_id" onChange={this.handleChange} id="class_id" className="form-input">
							<option value="">-- Pilih Kelas --</option>
							{
								this.context.classes.map((value , key) => {
									return(
										<option key={key} value={value.id}>{value.class_name}</option>
									)
								})
							}
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="student_id" className="form-label">Pilih Siswa</label>
						<select onChange={this.handleChange} name="student_id" id="student_id" className="form-input">
							<option value="">-- Pilih Siswa --</option>
							{
								this.state.students.map((student , key) => {
									return(
										<option key={key} value={student.id} >{student.name}</option>
									)
								})
							}
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="book_id" className="form-label">Pilih Buku</label>
						<select onChange={this.handleChange} name="book_id" id="book_id" className="form-input">
							<option value="">-- Pilih Buku --</option>
							{
								this.context.books.map((book , key) => {
									return(
										<option key={key} value={book.id}>{book.title}</option>
									)
								})
							}
						</select>
					</div>
					<button className="button bg-blue">Tambah</button>
					<Loading status={this.state.add_data} size="large" />
				</form>
			</React.Fragment>
		);
	}
}


AddBorrow.contextType = LibraryContext;
export default AddBorrow;
		