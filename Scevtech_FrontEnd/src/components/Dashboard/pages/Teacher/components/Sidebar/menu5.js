import React from 'react';
import { Link } from 'react-router-dom';

const Menu5 = (props) => {
	if(props.role === 1 || props.role === 4) {
		return (
			<React.Fragment>
				<Link data-type="main-menu" data-menu="subject" to="/teacher/subject" className="sidebar-menu transition duration-200 hover:bg-gray-200 transform hover:translate-x-1">
					<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
					</svg>
					<span className="ml-10">
						Mata Pelajaran
					</span>
				</Link>
				<Link data-type="main-menu" data-menu="schedule" to="/teacher/schedule" className="sidebar-menu transition duration-200 hover:bg-gray-200 transform hover:translate-x-1">
					<svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<span className="ml-10">
						Jadwal Pelajaran
					</span>
				</Link>
			</React.Fragment>
		)
	} else {
		return (
			<React.Fragment>
			</React.Fragment>
		)
	}
}

export default Menu5;