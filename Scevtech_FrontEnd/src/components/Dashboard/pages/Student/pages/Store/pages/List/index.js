import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';	
import Loading from '../../../../../../components/Loading/';
import { ProductContext } from '../../contexts/ProductContext.js';
import { WalletContext } from '../../contexts/WalletContext.js';

class List extends Component {
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
						<h2 className="text-xl font-bold">Toko</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/student/dashboard" className="hover:underline hover:text-blue-400">siswa</Link> 
							<span className="mx-1">/</span>
							<Link to="/student/store" className="hover:underline hover:text-blue-400">toko </Link> 
						</h4>
					</div>
				</motion.div>
				<div className="w-1/2">
					<motion.div className="card"
							variants={Variants}
							initial="cardInit"
							animate="cardAnimate"
							transition={{...Variants.cardTransition , delay: .3}}
						>
						<div className="flex flex-row gap-2">
							<div className="w-1/2">
								<h1 className="font-semibold uppercase text-xl text-purple-400">Avan Store</h1>
								<p>22 produk</p>
							</div>
							<WalletContext.Consumer>{ context => {
								return (
										<div className="w-1/2">
											<h1 className="font-semibold text-2xl text-yellow-400">{context.data.saldo}</h1>
											<p>{context.data.phone}</p>
										</div>
									)
							} }</WalletContext.Consumer>
						</div>
						<div className="flex flex-row gap-2">
							<Link to="/student/store/detail" className="button bg-purple w-1/2 h-10 text-center inline-block">Lihat Toko</Link>
							<Link to="/student/store/wallet/topup" className="button bg-yellow w-1/2 h-10 text-center inline-block">Isi Dompet</Link>
						</div>
					</motion.div>
				</div>

				<div className="my-4 flex flex-row gap-4">
					{
						(this.context.loading.products) ?
						 <Loading status={this.context.loading.products} size="large" />
						 :
						 <React.Fragment>{
						 	this.context.products.map((product , key) => {
						 		let baseUrl = process.env.REACT_APP_URL;
						 		return(
									<div className="w-1/4" key={key} >
										<motion.div className="bg-white rounded shadow-md overflow-hidden"
												variants={Variants}
												initial="cardInit"
												animate="cardAnimate"
												transition={{...Variants.cardTransition , delay: .4 + (key * 2/10)}}
											>
											<img src={baseUrl + `storage/store/products/${product.image}`} alt="course" className="card-img duration-200 transform hover:scale-105 " />
											<div className="card-body">
												<h2 className="text-2xl mb-1 font-semibold text-indigo-400">{product.name}</h2>
												<h3 className="font-bold text-yellow-500" >Rp{product.cost}</h3>
												<p className="text-sm my-1 text-gray-500">{product.description}</p>
												<div className="card-footer">
													<div className="w-1/2">
														<Link to={`/student/store/product/${product.id}`} className="badge bg-blue" >lihat</Link>
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


List.contextType = ProductContext;
export default List;
	