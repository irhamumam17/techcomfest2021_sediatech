import React , {Component} from 'react';
import axios from '../../../../../../axios.js';
import { Link } from 'react-router-dom';
import Loading from '../../../../components/Loading/';
import { motion } from 'framer-motion';
import Variants from '../../../../components/Variants/';
import profileImage from '../../../../assets/user.jpg';
import { AuthContext } from '../../../../contexts/AuthContext.js';

class Profile extends Component {
	_isMounted = false;
	constructor(props) {
		super(props);

		this.state = {
			loading: {
				student: true,
				theory: true,
				duty: true,
			},
			student: [],
			theory: 0,
			duty: 0,
		}
	}

	componentDidMount() {
		this._isMounted = true;
		// get student
		axios.get(`student/${this.context.id}/profile/student` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					console.log(res);
					this.setState({
						student: res.data,
						loading: {...this.state.loading , student: false},
					})
				}
			})
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

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
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Profile</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/student/dashboard" className="hover:underline hover:text-blue-400">siswa</Link> 
							<span className="mx-1">/</span>
							<Link to="/student/profile" className="hover:underline hover:text-blue-400">profile </Link> 
						</h4>
					</div>
				</motion.div>
				{
					(this.state.loading.student) ?
						<Loading status={this.state.loading.student} size="large" />
					:
						<React.Fragment>
							<div className="flex flex-row gap-4 my-6">
								<motion.div className="w-1/3"
										variants={Variants}
										initial="cardInit"
										animate="cardAnimate"
										transition={{...Variants.cardTransition , delay: .2}}
									>
									<div className="card text-center">
										<img src={profileImage} alt="instructor" className="w-3/5 rounded-full m-auto my-4" />
										<h2 className="font-bold text-2xl text-indigo-500">{this.context.name}</h2>
										<h3 className="font-light text-sm text-gray-500">{this.state.student.nis}</h3>
									</div>
								</motion.div>
								<div className="w-2/3">
									<motion.div className="card"
											variants={Variants}
											initial="cardInit"
											animate="cardAnimate"
											transition={{...Variants.cardTransition , delay: .4}}
										>
										<div className="flex flex-row py-2">
											<span className="w-2/5 text-gray-700">Nama</span>
											<span className="w-3/5 text-gray-500">{this.context.name}</span>
										</div>
										<div className="flex flex-row py-2">
											<span className="w-2/5 text-gray-700">Email</span>
											<span className="w-3/5 text-gray-500">{this.state.student.email}</span>
										</div>
										<div className="flex flex-row py-2">
											<span className="w-2/5 text-gray-700">HP</span>
											<span className="w-3/5 text-gray-500">{this.state.student.phone}</span>
										</div>
										<div className="flex flex-row py-2">
											<span className="w-2/5 text-gray-700">Alamat</span>
											<span className="w-3/5 text-gray-500">{this.state.student.address}</span>
										</div>
									</motion.div>
								</div>
							</div>
						</React.Fragment>
				}
			</React.Fragment>
		);
	}
}

Profile.contextType = AuthContext
export default Profile;
	