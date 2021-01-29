import React from 'react';
import { Link } from 'react-router-dom';

const Menu3 = (props) => {
	if(props.role === 3) {
		return (
			<React.Fragment>
				<button data-type="main-menu" data-menu="library" data-collapse="sidebar-menu" data-target="#menuLibrary" className="sidebar-menu transition duration-200 hover:bg-gray-200 transform hover:translate-x-1 focus:outline-none">
					<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
					</svg>
					<span className="ml-10">
						Perpustakaan
					</span>
				</button>
				<div id="menuLibrary" className="sidebar-collapse" >
					<Link to="/teacher/library/book" className="sidebar-menu transition duration-200 hover:bg-gray-200 transform hover:translate-x-1">Buku</Link>
					<Link to="/teacher/library/loan" className="sidebar-menu transition duration-200 hover:bg-gray-200 transform hover:translate-x-1">Pinjaman</Link>
					<Link to="/teacher/library/return" className="sidebar-menu transition duration-200 hover:bg-gray-200 transform hover:translate-x-1">Pengembalian</Link>
					<Link to="/teacher/library/statistic" className="sidebar-menu transition duration-200 hover:bg-gray-200 transform hover:translate-x-1">Statistik</Link>
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

export default Menu3;