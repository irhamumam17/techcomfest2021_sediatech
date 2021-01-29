import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';	
import { ProductContext } from '../../contexts/ProductContext.js';


class Order extends Component {
	constructor(props) {
		super(props);

		this.state = {
			orders: [],
			loading: {
				get_orders: true,
			}
		}
	}

	componentDidMount = async () => {
		let orders = await this.context.getListOrder();
		console.log(orders);
		this.setState({ orders });
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
						<h2 className="text-xl font-bold">Daftar Pesanan</h2>
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
				<table className="table-lg">
					<thead className="bg-indigo-400 text-white">
						<tr>
							<th className="p-2">#</th>
							<th>Produk</th>
							<th>Status</th>
							<th>Waktu Pemesanan</th>
						</tr>
					</thead>
					<tbody>
						{
							this.state.orders.map((order , key) => {
								return(
									<tr key={key} >
										<td className="p-2 text-center">{key + 1}</td>
										<td>{order.product}</td>
										<td className="text-center">{order.status}</td>
										<td>{order.order_at}</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
			</React.Fragment>
		);
	}
}


Order.contextType = ProductContext;
export default Order;
	