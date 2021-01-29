import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import userProfile from '../../../../assets/student.jpg';
import Logout from '../../../../components/Logout/';

import { AuthContext } from '../../../../contexts/AuthContext.js';
import { MenuContext } from '../../../../contexts/MenuContext.js';


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
					<h3 className="user-role">Siswa</h3>
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
							<Link  data-type="main-menu" data-menu="dashboard" to="/student/dashboard" className="sidebar-menu">
								<span>
									<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
									</svg>
								</span>
								<span className="ml-10">
									Dashboard
								</span>
							</Link>
							<button  data-type="main-menu" data-menu="subject" data-collapse="sidebar-menu" data-target="#menuSubject" className="sidebar-menu">
								<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
								</svg>
								<span className="ml-10">Mata Pelajaran</span>
							</button>
							<div id="menuSubject" className="sidebar-collapse" >
								<Link to="/student/subject/list" className="sidebar-menu">Daftar Mapel</Link>
								<Link to="/student/subject/schedule" className="sidebar-menu">Jadwal Pelajaran</Link>
							</div>
							<button  data-type="main-menu" data-menu="theory" data-collapse="sidebar-menu" data-target="#menuTheory" className="sidebar-menu">
								<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
								</svg>
								<span className="ml-10">
									Materi
								</span>
							</button>
							<div id="menuTheory" className="sidebar-collapse" >
								<Link to="/student/theory/new" className="sidebar-menu">Materi Terbaru</Link>
								<Link to="/student/theory/all" className="sidebar-menu">Semua Materi</Link>
							</div>
							<button  data-type="main-menu" data-menu="duty" data-collapse="sidebar-menu" data-target="#menuDuty" className="sidebar-menu">
								<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
								</svg>
								<span className="ml-10">
									Tugas
								</span>
							</button>
							<div id="menuDuty" className="sidebar-collapse" >
								<Link to="/student/duty/new" className="sidebar-menu">Terbaru</Link>
								<Link to="/student/duty/waiting" className="sidebar-menu">Belum Dikerjakan</Link>
								<Link to="/student/duty/expire" className="sidebar-menu">Tidak Dikerjakan</Link>
								<Link to="/student/duty/all" className="sidebar-menu">Semua Tugas</Link>
							</div>
							<button  data-type="main-menu" data-menu="exercises" data-collapse="sidebar-menu" data-target="#menuExam" className="sidebar-menu">
								<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
								</svg>
								<span className="ml-10">
									Latihan & Ujian
								</span>
							</button>
							<div id="menuExam" className="sidebar-collapse" >
								<Link to="/student/exercises/tryout" className="sidebar-menu">Latihan Soal</Link>
								<Link to="/student/exercises/exam" className="sidebar-menu">Ujian Online</Link>
							</div>
							<Link data-type="main-menu" data-menu="absent"  to="/student/absent" className="sidebar-menu">
								<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
								</svg>
								<span className="ml-10">
									Absensi
								</span>
							</Link>
							<Link  data-type="main-menu" data-menu="announce" to="/student/announce" className="sidebar-menu">
								<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
								</svg>
								<span className="ml-10">
									Pengumuman
								</span>
							</Link>
							<button  data-type="main-menu" data-menu="event" data-collapse="sidebar-menu" data-target="#menuEvent" className="sidebar-menu">
								<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
								</svg>
								<span className="ml-10">
									Event
								</span>
							</button>
							<div id="menuEvent" className="sidebar-collapse" >
								<Link to="/student/event/school" className="sidebar-menu">Sekolah</Link>
								<Link to="/student/event/public" className="sidebar-menu">Umum</Link>
							</div>
							<Link  data-type="main-menu" data-menu="profile" to="/student/profile" className="sidebar-menu">
								<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
								</svg>
								<span className="ml-10">Profile</span>
							</Link>
							<Link  data-type="main-menu" to="/" className="sidebar-menu">
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


Sidebar.contextType = AuthContext;
export default Sidebar;
	