import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import { TheoryContext } from '../../context.js';
import thumbnail from '../../../../../../assets/theory.jpg';

class Draft extends Component {
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
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Draft Materi</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/teacher/dashboard" className="hover:underline hover:text-blue-400">guru</Link> 
							<span className="mx-1">/</span>
							<Link to="/teacher/theory/list" className="hover:underline hover:text-blue-400">materi </Link> 
							<span className="mx-1">/</span>
							<Link to="/teacher/theory/draft" className="hover:underline hover:text-blue-400">draft </Link> 
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
					<Link to="/teacher/theory/add" className="button-header" >Tambah Materi</Link>
				</motion.div>
				<div className="mt-4 flex flex-auto gap-4">
					<div className="w-1/3" >
						<motion.div className="bg-white rounded shadow-md overflow-hidden"
								variants={Variants}
								initial="cardInit"
								animate="cardAnimate"
								transition={{...Variants.cardTransition , delay: .2}}
							>
							<img src={thumbnail} alt="theory thumbnail" className="w-full h-56  object-cover mb-3" />
							<div className="px-4 pb-4">
								<h2 className="font-semibold text-blue-500 text-2xl">Judul</h2>
								<h3 className="lowercase mb-2 -mt-1 text-purple-400">Mata Pelajaran</h3>
								<p className="text-sm text-gray-600">Deskripsi</p>
								<div className="flex flex-row justify-between items-center mt-2 pt-2 border-t-2 border-gray-200">
									<a href="/teacher/theory/detail" className="text-white py-1 px-4 bg-blue-400 rounded inline-block mt-2 uppercase font-semibold text-sm transition duration-200 hover:bg-blue-500">Detail</a>
									<p className="text-sm text-gray-500">2 hari yang lalu</p>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

Draft.contextType = TheoryContext;
export default Draft;
	