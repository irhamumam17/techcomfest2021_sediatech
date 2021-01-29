import React from 'react';
import { Link } from 'react-router-dom';
import illustraion from '../../assets/images/banner.svg';
import { motion , useViewportScroll , useTransform } from 'framer-motion';

function Banner(){
		const {scrollYProgress} = useViewportScroll()
		const scale = useTransform(scrollYProgress, [0,1] , [1, .02]);
		return(
			<React.Fragment>
				<div id="home" className="flex flex-col-reverse items-center justify-center md:flex-row h-3/4 bg-indigo-200 text-indigo-600 w-full py-20 px-8 md:py-32 md:px-16">
					<motion.div className="w-full text-center md:mb-8 md:text-left md:w-1/2 md:pr-16"
								initial={{ opacity: 0 , x: -100 }}
								animate={{ opacity: 1 , x: 0 }}
								style={{ scale }}
								transition={{ duration: 1.4 , delay: .6 , type: 'spring' , bounce: 0.7 }}
						>
						<h1 className="text-3xl md:text-5xl uppercase font-bold mb-2 md:mb-6">Belajar Efisien bersama SediaTek</h1>
						<p className="text-sm md:text-lg text-indigo-900" >SediaTek menyediakan berbagai fitur menarik sebagai penunjang pemembelajaran secara online maupun untuk mencari pekerjaan bagi para fresh graduate yang sedang butuh pekerjaan. Untuk melanjutkan silahkan untuk masuk.</p>
						<div className="flex flex-row mt-2 mb-4 justify-center md:justify-start">
							<Link to="/auth/login" className="uppercase text-md font-semibold border-2 border-indigo-600 py-1 px-6 mr-2 rounded-full transition duration-200 hover:bg-indigo-600 hover:text-indigo-100 hover:shadow-outline" >Masuk</Link>
							<Link to="/auth/login" className="uppercase text-md font-semibold border-2 border-indigo-600 py-1 px-6 mr-2 rounded-full transition duration-200 hover:bg-indigo-600 hover:text-indigo-100 hover:shadow-outline" >Daftar</Link>
						</div>
						<h3 className="text-xl font-bold" >Belum punya akun instansi?</h3>
						<button className="bg-white font-semibold uppercase py-2 px-8 rounded text-lg mt-3 rounded-full transition duration-300 transform hover:-translate-y-1 hover:shadow-md" >Daftar Segera</button>
					</motion.div>
					<div className="w-full md:w-1/2 flex items-center justify-center">
						<motion.img src={illustraion} alt="illustration" className="w-full" 
								initial={{ opacity: 0 , x: 100 }}
								animate={{ opacity: 1 , x: 0 }}
								transition={{ duration: 1 , delay: .5 , type: 'spring' , damping: 100}} />
					</div>
				</div>
			</React.Fragment>
		);
}

export default Banner;
	