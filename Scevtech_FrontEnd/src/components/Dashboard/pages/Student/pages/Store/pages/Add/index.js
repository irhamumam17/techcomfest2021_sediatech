import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import { ProductContext } from '../../contexts/ProductContext.js';
import Loading from '../../../../../../components/Loading/';

class Add extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
		}

		this.handleCover  = this.handleCover.bind(this);
		this.handleUpload = this.handleUpload.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleCover(event) {
		this.setState({ image: event.target.files[0] });
	}

	handleUpload = async (e) => {
		e.preventDefault();
		let response = await this.context.uploadImage(this.state.image);
		this.setState({ 
			image_products: response,
		 });
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
		this.setState({ loading: true });
		let status = await this.context.addProduct({
			name: this.state.name,
			cost: this.state.cost,
			description: this.state.description,
			image: this.state.image_products,
		});

		if(status === 200) { this.props.history.push('/student/store/detail') }
	}

	render() {
		return(
			<React.Fragment>
				<motion.div className="dashboard-title"
						variants={ Variants }
						initial="tInit"
						animate="tAnimate"
						transition="tTransition"
					>
					<div>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Tambah Produk</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/student/dashboard" className="hover:underline hover:text-blue-400">siswa</Link> 
							<span className="mx-1">/</span>
							<Link to="/student/store" className="hover:underline hover:text-blue-400">toko </Link> 
							<span className="mx-1">/</span>
							<Link to="/student/store/add" className="hover:underline hover:text-blue-400">tambah </Link> 
						</h4>
					</div>
				</motion.div>
				<motion.div
						variants={Variants}
						initial="btnHeadInit"
						animate="btnHeadAnimate"
						transition="btnHeadTransition"
						className="inline-block"
					>
					<Link to="/student/store/detail" className="button-header">Daftar Produk</Link>
				</motion.div>
				<div className="card">
					<div className="flex flex-row gap-4">
						<motion.form onSubmit={this.handleSubmit} className="w-2/3"
								variants={Variants}
								initial="cardInit"
								animate="cardAnimate"
								transition={{...Variants.cardTransition , delay: .4}}
							>
							<div className="form-group">
								<label htmlFor="name" className="form-label">Nama</label>
								<input type="text" name="name" onChange={this.handleChange} className="form-input" />	
							</div>
							<div className="form-group">
								<label htmlFor="cost" className="form-label">Harga</label>
								<input type="number" name="cost" onChange={this.handleChange} min="0" className="form-input" />	
							</div>
							<div className="form-group">
								<label htmlFor="description" className="form-label">Deskripsi</label>
								<textarea name="description" onChange={this.handleChange} id="description" rows="5" className="form-input"></textarea>
							</div>
							<button className="button bg-blue">Tambah</button>
						</motion.form>
						<motion.form onSubmit={this.handleUpload} encType="multipart/form-data" className="w-1/3"
								variants={Variants}
								initial="cardInit"
								animate="cardAnimate"
								transition={{...Variants.cardTransition , delay: .6}}
							>
							{
								(this.state.image_products) ?
									<img src={`${process.env.REACT_APP_URL}storage/store/products/${this.state.image_products}`} alt="produk" />
									:
									''
							}
							<div className="form-group">
								<label htmlFor="image" className="form-label">Gambar Produk</label>
								<input type="file" onChange={this.handleCover} name="image" accept=".jpg,.jpeg,.png" className="form-input" />
							</div>
							<button className="button bg-indigo">Tambah</button>
							<div className="w-full" id="progress-container"></div>
						</motion.form>
					</div>
					<Loading status={this.state.loading} size="large" />
				</div>
			</React.Fragment>
		);
	}
}


Add.contextType = ProductContext;
export default Add;
	