import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../components/Variants/';
import profileImage from '../../../../assets/user.jpg';

class Profile extends Component {
	render() {
		return(
			<React.Fragment>
				<motion.div className="dashboard-title"
								variants={ Variants }
								initial="tInit"
								animate="tAnimate"
								transition="tTransition"
						>
					<div>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Profile</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/admin/dashboard" className="hover:underline hover:text-blue-400">Admin</Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/profile" className="hover:underline hover:text-blue-400">profile </Link> 
						</h4>
					</div>
				</motion.div>
				<div className="flex flex-row gap-4 my-6">
					<motion.div className="w-1/3"
						variants={Variants}
						initial="cardInit"
						animate="cardAnimate"
						transition={{...Variants.cardTransition , delay: .2}}
					>
						<div className="card text-center">
							<img src={profileImage} alt="instructor" className="w-3/5 rounded-full m-auto my-4" />
							<h2 className="font-bold text-2xl text-indigo-500">Abdul Latif Mubasir</h2>
							<h3 className="font-light text-sm text-gray-500">20 November 2020</h3>
						</div>
					</motion.div>
					<motion.div className="w-2/3"
						variants={Variants}
						initial="cardInit"
						animate="cardAnimate"
						transition={{...Variants.cardTransition , delay: .4}}
					>
						<div className="card">
							<div className="flex flex-row py-2">
								<span className="w-2/5 text-gray-700">Nama</span>
								<span className="w-3/5 text-gray-500">Abdul Latif Mubasir</span>
							</div>
							<div className="flex flex-row py-2">
								<span className="w-2/5 text-gray-700">Email</span>
								<span className="w-3/5 text-gray-500">email@gmail.com</span>
							</div>
							<div className="flex flex-row py-2">
								<span className="w-2/5 text-gray-700">HP</span>
								<span className="w-3/5 text-gray-500">082991828291</span>
							</div>
							<div className="flex flex-row py-2">
								<span className="w-2/5 text-gray-700">Alamat</span>
								<span className="w-3/5 text-gray-500">Gandrungmangu , Cilacap</span>
							</div>
						</div>
					</motion.div>
				</div>
			</React.Fragment>
		);
	}
}

export default Profile;
	