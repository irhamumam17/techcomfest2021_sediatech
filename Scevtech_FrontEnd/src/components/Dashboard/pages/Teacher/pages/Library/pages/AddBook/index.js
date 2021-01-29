import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../../../../components/Loading/';
import { LibraryContext } from '../../context.js';

class AddBook extends Component {
	constructor(props) {
		super(props);

		this.state = {
			add_loading: false,
		}

		this.handleChange = this.handleChange.bind(this);
		this.uploadCover = this.uploadCover.bind(this);
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

	uploadCover() {
		console.log(this.state);
	}

	async handleSubmit(e) {
		e.preventDefault();
		this.setState({ add_loading: true });
		let status = await this.context.addBook(this.state);
		
		if(status === 200) {
			this.props.history.push('/teacher/library/book');
		}
	}

	render() {
		return(
			<React.Fragment>
				<div className="bg-white block w-1/3 py-2 px-6 rounded uppercase shadow-md text-pink-400 border-l-4 border-pink-400">
					<h2 className="text-xl font-bold">Tambah Buku Perpustakaan</h2>
					<h4 className="text-md italic lowercase text-gray-400">
						<Link to="/teacher/dashboard" className="hover:underline hover:text-blue-400">guru</Link> 
						<span className="mx-1">/</span>
						<Link to="/teacher/library/book" className="hover:underline hover:text-blue-400">perpustakaan </Link> 
						<span className="mx-1">/</span>
						<Link to="/teacher/library/book" className="hover:underline hover:text-blue-400">buku </Link> 
					</h4>
				</div>
				<Link to="/teacher/library/book" className="button-header transition duration-200 hover:bg-pink-600">Lihat Daftar Buku</Link>
				<form encType="multipart/form-data" onSubmit={this.handleSubmit} className="card">
					<div className="form-group">
						<label htmlFor="title" className="form-label">Judul Buku</label>
						<input onChange={this.handleChange} name="title" type="text" className="form-input"/>
					</div>
					<div className="form-group">
						<label htmlFor="code" className="form-label">Kode Buku</label>
						<input onChange={this.handleChange} name="code" type="text" className="form-input"/>	
					</div>
					<div className="form-group">
						<label htmlFor="publisher" className="form-label">Penerbit Buku</label>
						<input onChange={this.handleChange} name="publisher" type="text" className="form-input"/>
					</div>
					<div className="form-group">
						<label htmlFor="total" className="form-label">Jumlah Buku</label>
						<input onChange={this.handleChange} name="total" type="number" className="form-input"/>
					</div>
					<div className="form-group">
						<label htmlFor="image" className="form-label">Gambar Buku</label>
						<input onChange={this.handleChange} name="cover" accept=".jpg,.jpeg,.png" type="file" className="form-input"/>
						<button type="button" onClick={() => this.uploadCover} className="button bg-teal-400">Upload</button>
					</div>
					<div className="form-group">
						<label htmlFor="description" className="form-label">Deskripsi</label>
						<textarea onChange={this.handleChange} name="description" id="description" rows="6" className="form-input"></textarea>
					</div>
					<button className="button bg-blue-400">Tambah</button>
					<Loading status={this.state.add_loading} size="large" />
				</form>
			</React.Fragment>
		);
	}
}


AddBook.contextType = LibraryContext;
export default AddBook;
	