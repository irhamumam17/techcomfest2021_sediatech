import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import { ProductContext } from '../../contexts/ProductContext.js';
import Loading from '../../../../../../components/Loading/';

class DetailProduct extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: this.props.match.params.id,
			orders: [],
			loading: true,
			baseUrl: process.env.REACT_APP_URL,
		}
	}

	componentDidMount = async () => {
		let product = await this.context.detailProduct(this.props.match.params.id);
		this.setState({
			...product,
			loading: false,
		});

		let orders = await this.context.getOrder(this.props.match.params.id);
		this.setState({ orders: orders });
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
						(this.state.loading) ?
							<Loading status={this.state.loading} size="large" />
						:
							<React.Fragment>
								<motion.div className="w-2/3"
										variants={Variants}
										initial="cardInit"
										animate="cardAnimate"
										transition={{...Variants.cardTransition , delay: .4}}
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
										<button onClick={() => {
											this.context.buyProduct(this.state.id);
										}} className="button bg-blue">Pesan Sekarang</button>
									</div>
									{
										this.state.orders.map((order , key) => {
											return(
												<div key={key} className="card">
													<div className="flex flex-row">
														<div className="w-1/2">
															<h3 className="font-semibold">{order.product}</h3>
															<p>{order.status}</p>
															<p>{order.order_at}</p>
														</div>
														<div className="w-1/2">
															{
																(order.status === 'progress') ?
																	<button onClick={async () => {
																		let response = await this.context.confirmOrder(order.id);
																		if(response === 200) {
																			let orders = this.state.orders.map(order => {
																							if(order.id === order.id) {
																								order.status = 'confirmed';
																								return order;
																							}
																							return order;
																						})
																			this.setState({ orders });
																		}
																	}} className="button bg-teal">Konfirmasi</button>
																: ''
															}
														</div>
													</div>
												</div>
											)
										})
									}
								</motion.div>
								<motion.div className="w-1/3"
										variants={Variants}
										initial="cardInit"
										animate="cardAnimate"
										transition={{...Variants.cardTransition , delay: .6}}
									>
									<img className="card" src={this.state.baseUrl + 'storage/store/products/' + this.state.image} alt="product" />
								</motion.div>
							</React.Fragment>
					}

				</div>
			</React.Fragment>
		);
	}
}


DetailProduct.contextType = ProductContext;
export default DetailProduct;
	