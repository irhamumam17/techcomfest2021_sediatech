import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import userProfile from '../../../../assets/user.jpg';
import { AuthContext } from '../../../../contexts/AuthContext.js';
import { MenuContext } from '../../../../contexts/MenuContext.js';
import Logout from '../../../../components/Logout/';

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
					<h3 className="user-role">Administrator</h3>
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
							<Link data-type="main-menu" data-menu="dashboard" to="/admin/dashboard" className="sidebar-menu">
								<span>
									<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
									</svg>
								</span>
								<span className="ml-10">
									Dashboard
								</span>
							</Link>
							<button data-type="main-menu" data-menu="admin" data-collapse="sidebar-menu" data-target="#menuAdmin" className="sidebar-menu">
								<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
								</svg>
								<span className="ml-10">
									Admin
								</span>
							</button>
							<div id="menuAdmin" className="sidebar-collapse" >
								<Link to="/admin/admin/add" className="sidebar-menu">Tambah Admin</Link>
								<Link to="/admin/admin/list" className="sidebar-menu">Daftar Admin</Link>
							</div>
							<button data-type="main-menu" data-menu="school" data-collapse="sidebar-menu" data-target="#menuSchool" className="sidebar-menu">
								<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
								</svg>
								<span className="ml-10">
									Sekolah
								</span>
							</button>
							<div id="menuSchool" className="sidebar-collapse">
								<Link to="/admin/school/add" className="sidebar-menu">Tambah Sekolah</Link>
								<Link to="/admin/school/list" className="sidebar-menu">Daftar Sekolah</Link>
								<Link to="/admin/school/statistic" className="sidebar-menu">Statistik Sekolah</Link>
							</div>
							<button data-type="main-menu" data-menu="recruiter" data-collapse="sidebar-menu" data-target="#menurecruiter" className="sidebar-menu">
								<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								  <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
								  <path fill="#fff" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
								</svg>
								<span className="ml-10">
									Rekruiter
								</span>
							</button>
							<div id="menurecruiter" className="sidebar-collapse">
								<Link to="/admin/recruiter/add" className="sidebar-menu">Tambah Rekruiter</Link>
								<Link to="/admin/recruiter/list" className="sidebar-menu">Daftar Rekruiter</Link>
							</div>
							<button data-type="main-menu" data-menu="course" data-collapse="sidebar-menu" data-target="#menuCourse" className="sidebar-menu">
								<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
								</svg>
								<span className="ml-10">
									Kursus
								</span>
							</button>
							<div id="menuCourse" className="sidebar-collapse">
								<Link to="/admin/course/add" className="sidebar-menu">Tambah Kursus</Link>
								<Link to="/admin/course/list" className="sidebar-menu">Daftar Kursus</Link>
								<Link to="/admin/course/statistic" className="sidebar-menu">Statistik</Link>
							</div>
							<button data-type="main-menu" data-menu="scholarship" data-collapse="sidebar-menu" data-target="#menuScholarship" className="sidebar-menu">
								<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								  <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
								  <path fill="#fff" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
								</svg>
								<span className="ml-10">
									Beasiswa
								</span>
							</button>
							<div id="menuScholarship" className="sidebar-collapse">
								<Link to="/admin/scholarship/add" className="sidebar-menu">Tambah Beasiswa</Link>
								<Link to="/admin/scholarship/list" className="sidebar-menu">Daftar Beasiswa</Link>
							</div>
							<button data-type="main-menu" data-menu="payment" data-collapse="sidebar-menu" data-target="#menuPayment" className="sidebar-menu">
								<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
								</svg>
								<span className="ml-10">
									Pembayaran
								</span>
							</button>
							<div id="menuPayment" className="sidebar-collapse">
								<Link to="/admin/payment/package" className="sidebar-menu">Paket </Link>
								<Link to="/admin/payment/contract" className="sidebar-menu">Daftar Kontrak</Link>
								<Link to="/admin/payment/bank" className="sidebar-menu">Bank</Link>
								<Link to="/admin/payment/wallet" className="sidebar-menu">Dompet Siswa</Link>
								<Link to="/admin/payment/statistic" className="sidebar-menu">Statistik</Link>
							</div>
							<button data-type="main-menu" data-menu="job" data-collapse="sidebar-menu" data-target="#menuJob" className="sidebar-menu">
								<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
								</svg>
								<span className="ml-10">
									Job
								</span>
							</button>
							<div id="menuJob" className="sidebar-collapse">
								<Link to="/admin/job/list" className="sidebar-menu">Daftar Job</Link>
								<Link to="/admin/job/complete" className="sidebar-menu">Job Selesai</Link>
								<Link to="/admin/job/statistic" className="sidebar-menu">Statistik</Link>
							</div>
							<button data-type="main-menu" data-menu="setting" data-collapse="sidebar-menu" data-target="#menuApk" className="sidebar-menu">
								<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
								  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
								</svg>
								<span className="ml-10">
									Pengaturan
								</span>
							</button>
							<div id="menuApk" className="sidebar-collapse">
								<Link to="/admin/setting/version" className="sidebar-menu">Versi Aplikasi</Link>
								<Link to="/admin/setting/theme" className="sidebar-menu">Tema Aplikasi</Link>
							</div>
							<Link data-type="main-menu" data-menu="feedback" to="/admin/feedback" className="sidebar-menu">
								<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
								</svg>
								<span className="ml-10">
									Feedback
								</span>
							</Link>
							<Link data-type="main-menu" data-menu="profile" to="/admin/profile" className="sidebar-menu">
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
	