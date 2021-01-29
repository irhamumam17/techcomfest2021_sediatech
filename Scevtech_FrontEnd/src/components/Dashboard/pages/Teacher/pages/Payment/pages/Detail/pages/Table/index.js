import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../../../components/Variants/';
import { DetailContext } from '../../context.js';
import Loading from '../../../../../../../../components/Loading/';

class Table extends Component {
	render() {
		return(
			<React.Fragment>
				{
					(this.context.loading.list_data) ?
						<Loading status={this.context.loading.list_data} size="large" />
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
									<th>Siswa</th>
									<th>Terbayar</th>
									<th>Kekurangan</th>
									<th>Aksi</th>
								</tr>
							</thead>
							<tbody>
								{
									this.context.list_data.map((payment , key) => {
										return(
											<tr key={key}>
												<td className="p-2 text-center">{key + 1}</td>
												<td>{payment.student}</td>
												<td>{payment.paid_off}</td>
												<td>{payment.insufficient}</td>
												<td className="text-center">
													<Link to={`/teacher/payment/detail/${this.context.id}/student/${payment.id}/add`} className="badge bg-blue">tambah</Link>
													<Link to={`/teacher/payment/detail/${this.context.id}/student/${payment.id}/history`} className="badge bg-teal">riwayat</Link>
												</td>
											</tr>
										)
									} )
								}
							</tbody>
						</motion.table>
				}
			</React.Fragment>
		);
	}
}



Table.contextType = DetailContext;
export default Table;
	