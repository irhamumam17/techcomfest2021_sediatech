import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

class Navbar extends Component {
	constructor(props) {
		super(props);

		let json = window.sessionStorage.getItem('data_user');
		json = JSON.parse(json);
		if(json) {
			this.state = { auth:true };
		} else {
			this.state = { auth:false };
		}
	}
	render() {
		return(
			<React.Fragment>
				<motion.nav className="fixed z-40 w-full top-0 bg-white shadow-sm text-gray-400 flex flex-grow-2 justify-items-strech px-4"
						initial={{ y: -70 }}
						animate={{ y:0 }}
						transition={{ duration: 1.7, delay: .4 , type: 'spring' , bounce: 0.7 }}
					>
					<div className="w-2/3 lg:w-1/3 font-bold text-left text-lg py-2" >
						<a href="#home"> 
							<img src={process.env.REACT_APP_URL + 'storage/asset/logo-sediatek-inline.svg'} alt="logo" className="h-8 inline-block mt-1" />
						</a>
					</div>
					<div className="invisible lg:visible w-2/3 text-right py-4">
						<a href="/#about" className="text-gray-500 hover:text-gray-700 mx-4 uppercase" >Tentang</a>
						<a href="/#feature" className="text-gray-500 hover:text-gray-700 mx-4 uppercase" >Fitur</a>
						<a href="/#course" className="text-gray-500 hover:text-gray-700 mx-4 uppercase" >Kursus</a>
						<a href="/#job" className="text-gray-500 hover:text-gray-700 mx-4 uppercase" >Loker</a>
						<a href="/#testimoni" className="text-gray-500 hover:text-gray-700 mx-4 uppercase" >Testimoni</a>
						{
							(!this.state.auth) ? 
								<React.Fragment>
									<Link to="/auth/login" className="text-white mx-2 uppercase bg-purple-300 border-2 border-purple-300 font-semibold px-4 py-1 rounded-full  transition duration-200 hover:bg-purple-400 hover:border-purple-400" >Masuk</Link>
									<Link to="/auth/register" className="text-purple-300 mx-2 uppercase border-purple-300 font-semibold border-2 px-4 py-1 rounded-full transition duration-200 hover:bg-purple-400 hover:border-purple-400 hover:text-white" >Register</Link>
								</React.Fragment>
							: 
								<Link to="/auth/login" className="text-white mx-2 uppercase bg-purple-300 border-2 border-purple-300 font-semibold px-4 py-1 rounded-full  transition duration-200 hover:bg-purple-400 hover:border-purple-400" >Dashboard</Link>
						}
						
					</div>
				</motion.nav>
			</React.Fragment>
		);
	}
}

export default Navbar;
	