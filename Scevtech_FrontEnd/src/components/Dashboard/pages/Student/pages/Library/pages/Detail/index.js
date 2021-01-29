import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import { LibraryContext } from '../../context.js';
import Loading from '../../../../../../components/Loading/';

class Detail extends Component {
	constructor(props) {
		super(props);

		this.state = {
			book: [],
			borrow: [],
			loading: {
				book: true,
			}
		}
	}

	async componentDidMount() {
		let {borrow , book} = await this.context.detailBook(this.props.match.params.id);
		console.log(borrow);
		this.setState({
			borrow: borrow,
			book: book,
			loading: {...this.state.loading , book: false},
		})
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
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Perpustakaan</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/student/dashboard" className="hover:underline hover:text-blue-400">siswa</Link> 
							<span className="mx-1">/</span>
							<Link to="/student/library" className="hover:underline hover:text-blue-400">perpustakaan </Link> 
						</h4>
					</div>
				</motion.div>
				{
					(this.state.loading.book) ?
						<Loading status={this.state.loading.book} size="large" />
					:
						<div className="flex flex-row gap-4">
							<div className="w-1/2">
								<div className="card">
									<div className="my-2">
										<h3 className="font-semibold">Tanggal Pinjam</h3>
										<p>{this.state.borrow.borrow_at}</p>
									</div>
									<div className="my-2">
										<h3 className="font-semibold">Tanggal Pengembalian</h3>
										<p>{this.state.borrow.return_at}</p>
									</div>
									<div className="my-2">
										<h3 className="font-semibold">Status</h3>
										<p>{this.state.borrow.status}</p>
									</div>
								</div>
							</div>
							<div className="w-1/2">
								<div className="card">
									<div className="my-2">
										<h3 className="font-semibold">Judul Buku</h3>
										<p>{this.state.book.title}</p>
									</div>
									<div className="my-2">
										<h3 className="font-semibold">Kode Buku</h3>
										<p>{this.state.book.code}</p>
									</div>
									<div className="my-2">
										<h3 className="font-semibold">Penulis</h3>
										<p>{this.state.book.publisher}</p>
									</div>
									<div className="my-2">
										<h3 className="font-semibold">Deskripsi</h3>
										<p>{this.state.book.description}</p>
									</div>
								</div>
							</div>
						</div>
				}
				<Link to="/student/library" className="button bg-gray">Kembali</Link>
			</React.Fragment>
		);
	}
}


Detail.contextType = LibraryContext;
export default Detail;
	