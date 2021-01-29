import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import Loading from '../../../../../../components/Loading/';
import { ProductContext } from '../../contexts/ProductContext.js';

class MyStore extends Component {
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
						<h2 className="text-xl font-bold">Avan Store</h2>
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
					<Link to="/student/store/add" className="button-header">Tambah Produk</Link>
					<Link to="/student/store/edit" className="button-header ml-2" >Edit Toko</Link>
					<Link to="/student/store/order" className="button-header ml-2" >Lihat Pemesanan</Link>
				</motion.div>

				<div className="my-4 flex flex-row gap-4">
					{
						(this.context.loading.my_products) ?
							<Loading status={this.context.loading.my_products} size="large" />
						:
							<React.Fragment>{
								this.context.my_products.map((product , key) => {
									let baseUrl = process.env.REACT_APP_URL;
							 		return(
										<div className="w-1/4" key={key} >
											<motion.div className="bg-white rounded shadow-md overflow-hidden"
													variants={Variants}
													initial="cardInit"
													animate="cardAnimate"
													transition={{...Variants.cardTransition , delay: .4}}
												>
												<img src={baseUrl + `storage/store/products/${product.image}`} alt="course" className="card-img duration-200 transform hover:scale-105 " />
												<div className="card-body">
													<h2 className="text-2xl mb-1 font-semibold text-indigo-400">{product.name}</h2>
													<h3 className="font-bold text-yellow-500" >Rp{product.cost}</h3>
													<p className="text-sm my-1 text-gray-500">{product.description}</p>
													<div className="card-footer">
														<div className="w-1/2">
															<Link to={`/student/store/myproduct/${product.id}`} className="badge bg-blue" >lihat</Link>
														</div>
														<span className="w-1/2 text-sm text-right text-green-400">{product.sales} terjual</span>
													</div>
												</div>
											</motion.div>
										</div>
						 			)
								})
							}</React.Fragment>
					}
				</div>
			</React.Fragment>
		);
	}
}

MyStore.contextType = ProductContext;
export default MyStore;
	