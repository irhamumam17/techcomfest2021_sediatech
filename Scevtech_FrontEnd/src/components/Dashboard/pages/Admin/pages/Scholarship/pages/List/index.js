import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../../../../components/Loading/';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { ScholarshipContext } from '../../context.js';

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
						  <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
						  <path fill="#fff" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Daftar Beasiswa</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/admin/dashboard" className="hover:underline hover:text-blue-400">Admin</Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/scholarship/list" className="hover:underline hover:text-blue-400">beasiswa </Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/scholarship/list" className="hover:underline hover:text-blue-400">daftar </Link> 
						</h4>
					</div>
				</motion.div>
				<motion.div
							variants={Variants}
							initial="btnHeadInit"
							animate="btnHeadAnimate"
							transition="btnHeadTransition"
							className="inline-block">
					<Link to="/admin/scholarship/add" className="button-header" >Tambah Beasiswa</Link>
				</motion.div>
				<Loading status={this.context.loading.del_data} size="small" />
				{
					(this.context.loading.scholarships) ?
						<Loading status={this.context.loading.scholarships} size="large" />
					:
						<motion.table className="table-lg"
							variants={Variants}
							initial="cardInit"
							animate="cardAnimate"
							transition={{...Variants.cardTransition , delay: .2}}
						>
							<thead className="bg-blue-400 text-white">
								<tr>
									<th className="p-2">#</th>
									<th>Judul</th>
									<th>Lembaga</th>
									<th>Aksi</th>
								</tr>
							</thead>
							<tbody>
								{
									this.context.scholarships.map((data , key) => {
										return(
											<tr key={key}>
												<td className="p-2 text-center">{key + 1}</td>
												<td>{data.title}</td>
												<td>{data.institution}</td>
												<td className="col-badge">
													<Tippy content="Hapus" delay={300} >
														<button onClick={() => this.context.removeScholarship(data.id)} className="badge-icon bg-red">
															{<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
																														  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
																														</svg>}
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


List.contextType = ScholarshipContext;
export default List;
	