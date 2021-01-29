import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { AuthContext } from '../../contexts/AuthContext.js';

class Navbar extends Component {
	render() {
		return(
			<motion.nav className="fixed z-40 w-full top-1 bg-white shadow-sm text-gray-400 flex flex-grow-2 justify-end items-center px-4 h-12"
					initial={{ y: '-100%' }}
					animate={{ y: 0 }}
					transition={{ duration: 2 , delay: .5 , type: 'spring' , bounce: 0.8 }}
				>
				<div className="flex flex-row gap-3 text-gray-500 mr-6">
					{
						(this.context.role === 'student') ?
							<React.Fragment>
								<Link to='/student/library'>
									<Tippy content="Perpustakaan" >
										<svg className="w-8 h-8 transition duration-200 hover:text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
										</svg>
									</Tippy>
								</Link>
								<Link to='/student/payment'>
									<Tippy content="Pembayaran" >
										<svg className="w-8 h-8 transition duration-200 hover:text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
										</svg>
									</Tippy>
								</Link>	
								<Link to='/student/store'>
									<Tippy content="Toko" >
										<svg className="w-8 h-8 transition duration-200 hover:text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
										</svg>
									</Tippy>
								</Link>	
							</React.Fragment>
						: ''
					}
					<Link to={`/${this.context.role}/socmed`}>
						<Tippy content="Sosial Media" >
							<svg className="w-8 h-8 transition duration-200 hover:text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
							</svg>
						</Tippy>
					</Link>
					<Link to={`/${this.context.role}/profile`}>
						<Tippy content="Profile">
							<svg className="w-8 h-8 transition duration-200 hover:text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
							</svg>
						</Tippy>
					</Link>
					<div className="inline-block">
						<Tippy content="Keluar" >
							<svg onClick={() => this.context.logout()} className="w-8 h-8 transition duration-200 text-red-400 hover:text-red-500 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
							</svg>
						</Tippy>
					</div>
				</div>
			</motion.nav>
		);
	}
}

Navbar.contextType = AuthContext;
export default Navbar;
	
