import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import userProfile from '../../../../assets/teacher.jpg';
import Logout from '../../../../components/Logout/';

import { AuthContext } from '../../../../contexts/AuthContext.js';
import { MenuContext } from '../../../../contexts/MenuContext.js';
import { RoleTeacherContext } from '../../context.js';

import Menu1 from './menu1.js';
import Menu2 from './menu2.js';
import Menu3 from './menu3.js';
import Menu4 from './menu4.js';
import Menu5 from './menu5.js';


function Event() {
	const menuCollapse = document.querySelectorAll('button[data-collapse="sidebar-menu"]');
	menuCollapse.forEach(btn => {
		btn.addEventListener('click' , (e) => {
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
	render() {
		return(
			<RoleTeacherContext.Consumer>{(roleContext) => {
				return (
					<motion.aside className="sidebar z-50"
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
							<h3 className="user-role">Guru</h3>
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
							})

							return (
								<div className="py-4">
									<Link data-type="main-menu" data-menu="dashboard" to="/teacher/dashboard" className="sidebar-menu">
										<span>
											<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
											</svg>
										</span>
										<span className="ml-10">
											Dashboard
										</span>
									</Link>
									<Link data-type="main-menu" data-menu="class" to="/teacher/class" className="sidebar-menu transition duration-200 hover:bg-gray-200 transform hover:translate-x-1">
										<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
										</svg>
										<span className="ml-10">
										Kelas
										</span>
									</Link>
									<button data-type="main-menu" data-menu="student" data-collapse="sidebar-menu" data-target="#menuStudent" className="sidebar-menu transition duration-200 hover:bg-gray-200 transform hover:translate-x-1 focus:outline-none">
										<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
										</svg>
										<span className="ml-10">
											Siswa
										</span>
									</button>
									<div id="menuStudent" className="sidebar-collapse" >
										<Link to="/teacher/student/add" className="sidebar-menu transition duration-200 hover:bg-gray-200 transform hover:translate-x-1">Tambah Siswa</Link>
										<Link to="/teacher/student/list" className="sidebar-menu transition duration-200 hover:bg-gray-200 transform hover:translate-x-1">Daftar Siswa</Link>
									</div>
									<Menu1 role={roleContext.role_teacher} />
									<Menu2 role={roleContext.role_teacher} />
									<Menu3 role={roleContext.role_teacher} />
									<Menu4 role={roleContext.role_teacher} />
									<Menu5 role={roleContext.role_teacher} />
									<button data-type="main-menu" data-menu="absent" data-collapse="sidebar-menu" data-target="#menuAbsent" className="sidebar-menu">
										<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
										</svg>
										<span className="ml-10">
											Absensi
										</span>
									</button>
									<div id="menuAbsent" className="sidebar-collapse" >
										<Link to="/teacher/absent/list" className="sidebar-menu">Daftar Absensi</Link>
										<Link to="/teacher/absent/student" className="sidebar-menu">Absensi Siswa</Link>
									</div>
									<Link data-type="main-menu" data-menu="profile" to="/teacher/profile" className="sidebar-menu transition duration-200 hover:bg-gray-200 transform hover:translate-x-1">
										<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
										</svg>
										<span className="ml-10">
											Profil
										</span>
									</Link>
									<Link to="/" className="sidebar-menu transition duration-200 hover:bg-gray-200 transform hover:translate-x-1">
										<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
										</svg>
										<span className="ml-10">
											Homepage
										</span>
									</Link>
									<Logout context={this.context} />
								</div>

							)

						}}</MenuContext.Consumer>
						<Event />
					</motion.aside>
				)
			}}</RoleTeacherContext.Consumer>
		);
	}
}

Sidebar.contextType = AuthContext;
export default Sidebar;
	