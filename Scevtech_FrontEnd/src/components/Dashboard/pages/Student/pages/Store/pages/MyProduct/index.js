import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';	
import { ProductContext } from '../../contexts/ProductContext.js';
import Loading from '../../../../../../components/Loading/';

class MyProduct extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: {
				product: true,
				edit: false,
				del: false,
			},
			baseUrl: process.env.REACT_APP_URL,
			edit: false,
			form_image: false,
		}

		this.formEdit = this.formEdit.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.updateData = this.updateData.bind(this);
		this.handleImage = this.handleImage.bind(this);
		this.updateImage = this.updateImage.bind(this);
		this.deleteProduct = this.deleteProduct.bind(this);
	}

	componentDidMount = async () => {
		let product = await this.context.detailProduct(this.props.match.params.id);
		this.setState({
			...product,
			loading: {...this.state.loading , product: false},
		});
	}

	formEdit() {
		this.setState({
			edit: !this.state.edit,
			data_edit: {
				name: this.state.name,
				cost: 0,
				description: this.state.description,
			}
		})
	}

	handleEdit = (event) => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
	
		this.setState({
		 	data_edit: {...this.state.data_edit , [name]: value}
		});
	}

	updateData = async (e) => {
		e.preventDefault();
		this.setState({ loading: {...this.state.loading , edit: true} });
		let data = this.state.data_edit;
		let response = await this.context.editProduct(data , this.state.id);
		if(response) {
			this.setState({
				edit: false,
				loading: { ...this.state.loading , edit: false },
				name: response.name,
				cost: response.cost,
				description: response.description,
			})
		}
	}

	handleImage = (e) => {
		this.setState({ 
			data_edit: { 
				...this.state.data_id , 
				image: e.target.files[0], 
			} 
		})
	}

	updateImage = async (e) => {
		e.preventDefault();

		let response = await this.context.editImage(this.state.data_edit.image , this.state.id);
		if(response) {
			this.setState({
				image: response,
			});
		}
	}

	deleteProduct = async () => {
		this.setState({ loading: { ...this.state.loading , del: true } });
		let status = await this.context.deleteProduct(this.state.id);
		if(status === 200) {
			this.props.history.push('/student/store/detail');
		}
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
						<h2 className="text-xl font-bold">Detail Product</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/student/dashboard" className="hover:underline hover:text-blue-400">siswa</Link> 
							<span className="mx-1">/</span>
							<Link to="/student/store" className="hover:underline hover:text-blue-400">toko </Link> 
							<span className="mx-1">/</span>
							<Link to="/student/store/detail" className="hover:underline hover:text-blue-400">toko saya </Link> 
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
					<Link to="/student/store/detail" className="button-header">Lihat Toko</Link>
				</motion.div>

				<div className="flex flex-row gap-4">
					{
						(this.state.loading.product) ?
							<Loading status={this.state.loading.product} size="large" />
						:
							<React.Fragment>
								<motion.div className="w-2/3"
										variants={Variants}
										initial="cardInit"
										animate="cardAnimate"
										transition={{...Variants.cardTransition , delay: .2}}
									>
									<div className="card">
										<div className="flex flex-row">
											<div className="w-1/2">
												<p>Nama Produk</p>
											</div>
											<div className="w-1/2">
												<p>{this.state.name}</p>
											</div>
										</div>
										<div className="flex flex-row">
											<div className="w-1/2">
												<p>Harga Produk</p>
											</div>
											<div className="w-1/2">
												<p>Rp{this.state.cost}</p>
											</div>
										</div>
										<div className="flex flex-row">
											<div className="w-1/2">
												<p>Terjual</p>
											</div>
											<div className="w-1/2">
												<p>{this.state.sales}</p>
											</div>
										</div>
										<div className="flex flex-row">
											<div className="w-1/2">
												<p>Deskripsi</p>
											</div>
											<div className="w-1/2">
												<p>{this.state.description}</p>
											</div>
										</div>
										<button type="submit" onClick={this.formEdit} className="button bg-indigo">Ubah Data</button>
										<button type="button" onClick={this.deleteProduct} className="button ml-2 bg-red">Hapus Produk</button>
										<Loading size="small" status={this.state.loading.del} />
									</div>
									{
										(this.state.edit) ?
											<form onSubmit={this.updateData} className="card mt-2">
												<h1 className="font-semibold text-xl">Ubah Data Produk</h1>
												<div className="form-group">
													<label htmlFor="name" className="form-label">Nama</label>
													<input type="text" onChange={this.handleEdit} name="name" defaultValue={this.state.name} className="form-input" />
												</div>
												<div className="form-group">
													<label htmlFor="cost" className="form-label">Harga</label>
													<input type="number" onChange={this.handleEdit} name="cost" min="0" className="form-input" />
												</div>
												<div className="form-group">
													<label htmlFor="description" className="form-label">Deskripsi</label>
													<textarea name="description" onChange={this.handleEdit} id="description" rows="5" defaultValue={this.state.description} className="form-input"></textarea>
												</div>
												<button className="button bg-blue">Ubah</button>
												<Loading status={this.state.loading.edit} size="large" />
											</form>
										: ''
									}
								</motion.div>
								<motion.div className="w-1/3 text-center"
										variants={Variants}
										initial="cardInit"
										animate="cardAnimate"
										transition={{...Variants.cardTransition , delay: .4}}
									>
									<img className="card" src={this.state.baseUrl + 'storage/store/products/' + this.state.image} alt="product" />
									<button onClick={() => this.setState({ form_image: !this.state.form_image })} className="button bg-blue">Ubah Gambar</button>
									{
										(this.state.form_image) ?
											<form onSubmit={this.updateImage} encType="multipart/form-data" className="card text-left">
												<div className="form-group">
													<label htmlFor="imgea" className="form-label">Gambar</label>
													<input type="file" name="image" onChange={this.handleImage} className="form-input" />
												</div>
												<button className="button bg-blue">Ubah</button>
												<div id="progress-image"></div>
											</form>
										: ''
									}
								</motion.div>
							</React.Fragment>
					}

				</div>
			</React.Fragment>
		);
	}
}


MyProduct.contextType = ProductContext;
export default MyProduct;
	