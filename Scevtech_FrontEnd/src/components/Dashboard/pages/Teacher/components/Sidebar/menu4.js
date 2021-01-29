import React from 'react';
import { Link } from 'react-router-dom';

const Menu4 = (props) => {
	if(props.role === 4) {
		return (
			<React.Fragment>
				<button data-type="main-menu" data-menu="announcement" data-collapse="sidebar-menu" data-target="#menuAnnounce" className="sidebar-menu">
					<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
					</svg>
					<span className="ml-10">
						Pengumuman
					</span>
				</button>
				<div id="menuAnnounce" className="sidebar-collapse">
					<Link to="/teacher/announcement/add" className="sidebar-menu">Buat</Link>
					<Link to="/teacher/announcement/list" className="sidebar-menu">Daftar</Link>
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

export default Menu4;