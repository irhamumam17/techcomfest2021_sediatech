import React from 'react';
import { Link } from 'react-router-dom';

const Menu1 = (props) => {
	if(props.role === 1) {
		return (
			<React.Fragment>
				<button data-type="main-menu" data-menu="theory" data-collapse="sidebar-menu" data-target="#menuTheory" className="sidebar-menu transition duration-200 hover:bg-gray-200 transform hover:translate-x-1 focus:outline-none">
					<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
					</svg>
					<span className="ml-10">
						Materi
					</span>
				</button>
				<div id="menuTheory" className="sidebar-collapse" >
					<Link to="/teacher/theory/add" className="sidebar-menu transition duration-200 hover:bg-gray-200 transform hover:translate-x-1">Tambah Materi</Link>
					<Link to="/teacher/theory/list" className="sidebar-menu transition duration-200 hover:bg-gray-200 transform hover:translate-x-1">Daftar Materi</Link>
					<Link to="/teacher/theory/draft" className="sidebar-menu transition duration-200 hover:bg-gray-200 transform hover:translate-x-1">Draft Materi</Link>
				</div>
				<button data-type="main-menu" data-menu="duty" data-collapse="sidebar-menu" data-target="#menuDuty" className="sidebar-menu transition duration-200 hover:bg-gray-200 transform hover:translate-x-1 focus:outline-none">
					<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
					</svg>
					<span className="ml-10">
						Tugas
					</span>
				</button>
				<div id="menuDuty" className="sidebar-collapse" >
					<Link to="/teacher/duty/add" className="sidebar-menu transition duration-200 hover:bg-gray-200 transform hover:translate-x-1">Tambah Tugas</Link>
					<Link to="/teacher/duty/waiting" className="sidebar-menu transition duration-200 hover:bg-gray-200 transform hover:translate-x-1">Tugas Menunggu</Link>
					<Link to="/teacher/duty/complete" className="sidebar-menu transition duration-200 hover:bg-gray-200 transform hover:translate-x-1">Tugas Selesai</Link>
					<Link to="/teacher/duty/draft" className="sidebar-menu transition duration-200 hover:bg-gray-200 transform hover:translate-x-1">Draft Tugas</Link>
					<Link to="/teacher/duty/list" className="sidebar-menu transition duration-200 hover:bg-gray-200 transform hover:translate-x-1">Daftar Tugas</Link>
				</div>
				<button data-type="main-menu" data-menu="exercises" data-collapse="sidebar-menu" data-target="#menuExam" className="sidebar-menu transition duration-200 hover:bg-gray-200 transform hover:translate-x-1 focus:outline-none">
					<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
					</svg>
					<span className="ml-10">
						Latihan & Ujian
					</span>
				</button>
				<div id="menuExam" className="sidebar-collapse" >
					<Link to="/teacher/exercises/tryout/list" className="sidebar-menu transition duration-200 hover:bg-gray-200 transform hover:translate-x-1">Latihan Soal</Link>
					<Link to="/teacher/exercises/exam/list" className="sidebar-menu transition duration-200 hover:bg-gray-200 transform hover:translate-x-1">Ujian</Link>
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

export default Menu1;