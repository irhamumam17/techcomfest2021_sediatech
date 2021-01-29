import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import { AnnouncementContext } from '../../context.js';
import Loading from '../../../../../../components/Loading/';


class List extends Component {
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
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Pengumuman</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/student/dashboard" className="hover:underline hover:text-blue-400">siswa</Link> 
							<span className="mx-1">/</span>
							<Link to="/student/announce" className="hover:underline hover:text-blue-400">pengumuman </Link> 
						</h4>
					</div>
				</motion.div>
				{
					(this.context.loading.announces) ?
						<Loading status={this.context.loading.announces} size="large" />
					:
						<React.Fragment>
							{
								this.context.announces.map((announce , key) => {
									return(
										<div className="card" key={key} >
											<div className="flex flex-row justify-between">
												<div>
													<h2 className="font-semibold">{announce.title}</h2>
													<h4 className="text-sm text-gray-400 mb-2">{announce.author}</h4>
												</div>
												<div>
													<p>{announce.created_at}</p>
												</div>
											</div>
											<p>{announce.description}</p>
										</div>
									)
								})
							}
						</React.Fragment>
				}
			</React.Fragment>
		);
	}
}


List.contextType = AnnouncementContext;
export default List;
	