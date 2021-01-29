import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { motion } from 'framer-motion';
import Variants from '../../../../components/Variants/';
import axios from '../../../../../../axios.js';
import { AuthContext } from '../../../../contexts/AuthContext.js';
import Loading from '../../../../components/Loading/';

class ListClass extends Component {
	_isMounted = false;
	constructor(props) {
		super(props);

		this.state = {
			classes: [],
			getLoading: true,
		}

	}

	componentDidMount() {
		this._isMounted = true;
		axios.get(`/teacher/${this.context.id}/class` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted){
					this.setState({ classes: res.data , getLoading: false })
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
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Daftar Kelas</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/teacher/dashboard" className="hover:underline hover:text-blue-400">guru</Link> 
							<span className="mx-1">/</span>
							<Link to="/teacher/class" className="hover:underline hover:text-blue-400">kelas </Link> 
						</h4>
					</div>
				</motion.div>
				{
					(this.state.getLoading) ?
						<Loading status={this.state.getLoading} size="large" />
					:
						<motion.table className="table-lg"
							variants={Variants}
							initial="cardInit"
							animate="cardAnimate"
							transition={{...Variants.cardTransition , delay: .4}}
						>
							<thead className="bg-indigo-500 text-white">
								<tr>
									<th className="p-2">#</th>
									<th>Kelas</th>
									<th>Aksi</th>
								</tr>
							</thead>
							<tbody>
							{
								this.state.classes.map((value , key) => {
									return (
										<tr key={key} className="text-center">
											<td className="p-2">{key + 1}</td>
											<td className="text-left">{value.class_name}</td>
											<td className="col-badge">
												<Tippy content="materi" delay={300}>
													<button className="badge-icon bg-indigo">
														<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
														  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
														</svg>
													</button>
												</Tippy>
												<Tippy content="tugas" delay={300}>
													<button className="badge-icon bg-purple">
														<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
														  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
														  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
														</svg>
													</button>
												</Tippy>
												<Tippy content="jadwal" delay={300}>
													<button className="badge-icon bg-teal">
														<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
														  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
														</svg>
													</button>
												</Tippy>
											</td>
										</tr>
									)
								})
							}
							</tbody>
						</motion.table>
				}
			</React.Fragment>
		);
	}
}

ListClass.contextType = AuthContext;
export default ListClass;
	