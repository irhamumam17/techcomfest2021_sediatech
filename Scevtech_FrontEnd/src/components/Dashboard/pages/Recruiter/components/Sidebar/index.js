import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import userProfile from '../../../../assets/instructor.jpg';

import { AuthContext } from '../../../../contexts/AuthContext.js';
import { MenuContext } from '../../../../contexts/MenuContext.js';
import Logout from '../../../../components/Logout/';



function Event() {

	const menuCollapse = document.querySelectorAll('button[data-collapse="sidebar-menu"]');
	menuCollapse.forEach(btn => {
		btn.addEventListener('click' , () => {
			let target = btn.getAttribute('data-target');
			let element = document.querySelector(String(target));
			let height = element.childElementCount * 48.5;
			if(!element.classList.contains('active')) {
				element.classList.add('active');
				element.style.height = height + 'px';
			} else {
				element.classList.remove('active');
				element.style.height = '0px';
			}
		})
	})

	return (
		<React.Fragment>
		</React.Fragment>
	)
}

class Sidebar extends Component {
	static contextType = AuthContext;
	render() {
		return(
			<motion.aside className="sidebar"
					initial={{ x: '-100%' }}
					animate={{ x: 0 }}
					transition={{ duration: 1.2 , type: 'spring' , bounce: 0.5 }}
				>
				<div className="sidebar-brand">
					<img src={process.env.REACT_APP_URL + 'storage/asset/logo-sediatek-inline.svg'} alt="scev tech" className="brand-logo" />
				</div>
				<div className="py-4 text-center border-b-2 border-gray-200">
					<img src={userProfile} alt="Abdul Latif Mubasir" className="user-profile transition duration-200 hover:scale-105" />
					<h2 className="username">{this.context.name}</h2> 
					<h3 className="user-role">Rekruiter</h3>
				</div>
				<MenuContext.Consumer>{menu => {
					let elements = document.querySelectorAll('[data-type="main-menu"]');
					let status = menu.menu;
					elements.forEach(element => {
						let idMenu = element.getAttribute('data-menu');
						if(idMenu === status) {
							element.classList.add('sidebar-menu-active');
							element.classList.remove('sidebar-menu');
						} else {
							element.classList.add('sidebar-menu');
							element.classList.remove('sidebar-menu-active');
						}
					});

					return(
							<div className="py-4">
								<Link data-type="main-menu" data-menu="dashboard" to="/recruiter/dashboard" className="sidebar-menu-active">
									<span>
										<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
										</svg>
									</span>
									<span className="ml-10">
										Dashboard
									</span>
								</Link>
								<button data-type="main-menu" data-menu="job" data-collapse="sidebar-menu" data-target="#menuJob" className="sidebar-menu transition duration-200 hover:bg-gray-200 transform hover:translate-x-1 focus:outline-none">
									<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
									</svg>
									<span className="ml-10">
										Job
									</span>
								</button>
								<div id="menuJob" className="sidebar-collapse" >
									<Link to="/recruiter/job/add" className="sidebar-menu transition duration-200 hover:bg-gray-200 transform hover:translate-x-1">Tambah Job</Link>
									<Link to="/recruiter/job/list" className="sidebar-menu transition duration-200 hover:bg-gray-200 transform hover:translate-x-1">Daftar Job</Link>
								</div>
								<Link data-type="main-menu" data-menu="profile" to="/recruiter/profile" className="sidebar-menu transition duration-200 hover:bg-gray-200 transform hover:translate-x-1">
									<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
									</svg>
									<span className="ml-10">Profile</span>
								</Link>
								<Link to="/" className="sidebar-menu transition duration-200 hover:bg-gray-200 transform hover:translate-x-1">
									<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
									</svg>
									<span className="ml-10">Homepage</span>
								</Link>
								<Logout context={this.context} />
							</div>
					)
				}}</MenuContext.Consumer>
				<Event />
			</motion.aside>
		);
	}
}

export default Sidebar;
	