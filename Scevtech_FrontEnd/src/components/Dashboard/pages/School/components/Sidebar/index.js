import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import userProfile from '../../../../assets/school.png';
import Logout from '../../../../components/Logout/';
import { AuthContext } from '../../../../contexts/AuthContext.js';
import { MenuContext } from '../../../../contexts/MenuContext.js';


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
					<h3 className="user-role">Sekolah</h3>
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

					return (
						<div className="py-4">
							<Link data-type="main-menu" data-menu="dashboard" to="/school/dashboard" className="sidebar-menu">
								<span>
									<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
									</svg>
								</span>
								<span className="ml-10">
									Dashboard
								</span>
							</Link>
							<button data-type="main-menu" data-menu="class" data-collapse="sidebar-menu" data-target="#menuClass" className="sidebar-menu focus:outline-none">
								<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
								</svg>
								<span className="ml-10">Kelas</span>
							</button>
							<div id="menuClass" className="sidebar-collapse" >
								<Link to="/school/class/add" className="sidebar-menu">Tambah Kelas</Link>
								<Link to="/school/class/list" className="sidebar-menu">Daftar Kelas</Link>
							</div>
							<Link data-type="main-menu" data-menu="course" to="/school/course" className="sidebar-menu focus:outline-none">
								<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
								</svg>
								<span className="ml-10">Jurusan</span>
							</Link>
							<button data-type="main-menu" data-menu="schedule" data-collapse="sidebar-menu" data-target="#menuSchedule" className="sidebar-menu">
								<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
								</svg>
								<span className="ml-10">Jadwal Pelajaran</span>
							</button>
							<div id="menuSchedule" className="sidebar-collapse">
								<Link to="/school/schedule/add" className="sidebar-menu">Buat Jadwal</Link>
								<Link to="/school/schedule/list" className="sidebar-menu">Jadwal Pelajaran</Link>
							</div>
							<Link data-type="main-menu" data-menu="subject" to="/school/subject" className="sidebar-menu">
								<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
								</svg>
								<span className="ml-10">Mata Pelajaran</span>
							</Link>
							<button data-type="main-menu" data-menu="student" data-collapse="sidebar-menu" data-target="#menuStudent" className="sidebar-menu focus:outline-none">
								<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
								</svg>
								<span className="ml-10">Siswa</span>
							</button>
							<div id="menuStudent" className="sidebar-collapse" >
								<Link to="/school/student/add" className="sidebar-menu">Tambah Siswa</Link>
								<Link to="/school/student/waiting" className="sidebar-menu">Siswa Menungu</Link>
								<Link to="/school/student/list" className="sidebar-menu">Semua Siswa</Link>
								<Link to="/school/student/absent" className="sidebar-menu">Data Absensi</Link>
							</div>
							<button data-type="main-menu" data-menu="teacher" data-collapse="sidebar-menu" data-target="#menuTeacher" className="sidebar-menu focus:outline-none">
								<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
								</svg>
								<span className="ml-10">Guru</span>
							</button>
							<div id="menuTeacher" className="sidebar-collapse" >
								<Link to="/school/teacher/add" className="sidebar-menu">Tambah Guru</Link>
								<Link to="/school/teacher/waiting" className="sidebar-menu">Guru Menungu</Link>
								<Link to="/school/teacher/list" className="sidebar-menu">Semua Guru</Link>
								<Link to="/school/teacher/absent" className="sidebar-menu">Data Absensi</Link>
							</div>
							<button  data-type="main-menu" data-menu="event" data-collapse="sidebar-menu" data-target="#menuEvent" className="sidebar-menu">
								<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
								</svg>
								<span className="ml-10">
									Event
								</span>
							</button>
							<div id="menuEvent" className="sidebar-collapse" >
								<Link to="/school/event/school" className="sidebar-menu">Sekolah</Link>
								<Link to="/school/event/public" className="sidebar-menu">Umum</Link>
							</div>
							<button data-type="main-menu" data-menu="contract" data-collapse="sidebar-menu" data-target="#menuContract" className="sidebar-menu focus:outline-none">
								<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
								</svg>
								<span className="ml-10">Kontrak</span>
							</button>
							<div id="menuContract" className="sidebar-collapse" >
								<Link to="/school/contract/package" className="sidebar-menu">Beli Paket</Link>
								<Link to="/school/contract/list" className="sidebar-menu">Kontrak</Link>
							</div>
							<Link data-type="main-menu" data-menu="profile" to="/school/profile" className="sidebar-menu">
								<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
								</svg>
								<span className="ml-10">Profile</span>
							</Link>
							<Link to="/" className="sidebar-menu">
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
	