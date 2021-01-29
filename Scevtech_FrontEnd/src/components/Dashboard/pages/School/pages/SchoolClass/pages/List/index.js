import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { ClassContext } from '../../context.js';
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
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Daftar Kelas</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/school/dashboard" className="hover:underline hover:text-blue-400">Sekolah</Link> 
							<span className="mx-1">/</span>
							<Link to="/school/class/list" className="hover:underline hover:text-blue-400">kelas </Link> 
							<span className="mx-1">/</span>
							<Link to="/school/class/list" className="hover:underline hover:text-blue-400">daftar </Link> 
						</h4>
					</div>
				</motion.div>
				<motion.div
					variants={Variants}
					initial="btnHeadInit"
					animate="btnHeadAnimate"
					transition="btnHeadTransition"
					className="inline-block"
				>
					<Link to="/school/class/add" className="button-header">Tambah Kelas</Link>
				</motion.div>
				<Loading status={this.context.del_classes_loading} size="small" />
				<div className="flex flex-row gap-4">
					<div className="w-3/5">
						{
							(this.context.get_classes_loading) ?
								<Loading status={this.context.get_classes_loading} size="large" />
							:
							<motion.table className="table-primary"
								variants={Variants}
								initial="cardInit"
								animate="cardAnimate"
								transition={{...Variants.cardTransition , delay: .2}}
							>
								<thead className="bg-indigo-500 text-white">
									<tr>
										<th className="p-2">#</th>
										<th>Kelas</th>
										<th>Siswa</th>
										<th>Aksi</th>
									</tr>
								</thead>
								<tbody>
								{
									this.context.classes.map((value , key) => {
										return (
											<tr key={key} className="text-center">
												<td className="p-2">{ key + 1 }</td>
												<td className="text-left">{ value.class_name }</td>
												<td>100 siswa</td>
												<td className="col-badge">
													<Tippy content="hapus" delay={300}>
														<button onClick={() => this.context.removeClass(value.id)} className="badge-icon bg-red">
															<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
															  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
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
					</div>
					<div className="w-2/5">
							<Loading status={this.context.del_levels_loading} size="small" />
							{
								(this.context.get_levels_loading) ?
									<Loading status={this.context.get_levels_loading} size="large" />
								:
									<motion.table className="table-primary"
										variants={Variants}
										initial="cardInit"
										animate="cardAnimate"
										transition={{...Variants.cardTransition , delay: .2}}
									>
										<thead className="bg-blue-500 text-white">
											<tr>
												<th className="p-2">Tingkat</th>
												<th>Aksi</th>
											</tr>
										</thead>
										<tbody>
											{
												this.context.levels.map((level , key) => {
													return (
														<tr key={key} className="text-center">
															<td className="text-left p-2">{level.name}</td>
															<td className="col-badge">
																<Tippy content="hapus" delay={300}>
																	<button onClick={() => this.context.removeLevel(level.id)} className="badge-icon bg-red">
																		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
																		  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
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
							<Loading status={this.context.del_sub_classes_loading} size="small" />
							{
								(this.context.get_sub_classes_loading) ?
									<Loading status={this.context.get_sub_classes_loading} size="large" />
								: 
									<motion.table className="table-primary"
										variants={Variants}
										initial="cardInit"
										animate="cardAnimate"
										transition={{...Variants.cardTransition , delay: .2}}
									>
										<thead className="bg-blue-500 text-white">
											<tr>
												<th className="p-2">Sub-kelas</th>
												<th>Aksi</th>
											</tr>
										</thead>
										<tbody>
											{
												this.context.sub_classes.map((sub , key) => {
													return (
														<tr key={key} className="text-center">
															<td className="text-left p-2">{sub.name}</td>
															<td className="col-badge">
																<Tippy content="hapus" delay={300}>
																	<button onClick={() => this.context.removeSub(sub.id)} className="badge-icon bg-red">
																		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
																		  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
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
					</div>
				</div>
			</React.Fragment>
		);
	}
}

List.contextType = ClassContext;
export default List;
	