import React , {Component} from 'react';
import { Link , Switch , Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';

import Table from './pages/Table/';
import AddStudent from './pages/AddStudent/';
import AddPayment from './pages/AddPayment/';
import History from './pages/History/';
import Description from './pages/Description/';

import DetailContextProvider from './context.js';

class Detail extends Component {
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
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Detail Pembayaran</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/teacher/dashboard" className="hover:underline hover:text-blue-400">guru</Link> 
							<span className="mx-1">/</span>
							<Link to="/teacher/payment/list" className="hover:underline hover:text-blue-400">pembayaran </Link> 
							<span className="mx-1">/</span>
							<Link to="/teacher/payment/list" className="hover:underline hover:text-blue-400">detail </Link> 
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
					<Link to="/teacher/payment/list" className="button-header">Lihat Daftar Pembayaran</Link>
					<Link to={`/teacher/payment/detail/${this.props.match.params.id}/addstudent`} className="button bg-blue ml-3">Tambah Pembayaran Siswa</Link>
				</motion.div>
				<DetailContextProvider id={this.props.match.params.id} >
					<div className="flex flex-row gap-4">
						<div className="w-2/3">
							<Table />
						</div>
						<div className="w-1/3">
							<Switch>
								<Route exact path="/teacher/payment/detail/:id" component={Description} />
								<Route exact path="/teacher/payment/detail/:id/addstudent" component={AddStudent} />
								<Route exact path="/teacher/payment/detail/:id/student/:student_id/add" component={AddPayment} />
								<Route exact path="/teacher/payment/detail/:id/student/:student_id/history" component={History} />
							</Switch>
						</div>
					</div>
				</DetailContextProvider>
			</React.Fragment>
		);
	}
}


export default Detail;
	