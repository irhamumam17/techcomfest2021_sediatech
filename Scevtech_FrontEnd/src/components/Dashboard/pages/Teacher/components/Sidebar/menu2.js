import React from 'react';
import { Link } from 'react-router-dom';

const Menu2 = (props) => {
	if(props.role === 2) {
		return (
			<React.Fragment>
				<button data-type="main-menu" data-menu="payment" data-collapse="sidebar-menu" data-target="#menuPayment" className="sidebar-menu transition duration-200 hover:bg-gray-200 transform hover:translate-x-1 focus:outline-none">
					<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
					</svg>
					<span className="ml-10">
						Pembayaran
					</span>
				</button>
				<div id="menuPayment" className="sidebar-collapse" >
					<Link to="/teacher/payment/add" className="sidebar-menu transition duration-200 hover:bg-gray-200 transform hover:translate-x-1">Tambah Pembayaran</Link>
					<Link to="/teacher/payment/list" className="sidebar-menu transition duration-200 hover:bg-gray-200 transform hover:translate-x-1">Daftar Pembayaran</Link>
					<Link to="/teacher/payment/statistic" className="sidebar-menu transition duration-200 hover:bg-gray-200 transform hover:translate-x-1">Statistik Pembayaran</Link>
				</div>
			</React.Fragment>
		)
	} else {
		return (
			<React.Fragment>
			</React.Fragment>
		)
	}
}

export default Menu2;