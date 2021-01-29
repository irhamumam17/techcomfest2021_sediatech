import React , {Component} from 'react';

class Footer extends Component {
	render() {
		return(
			<React.Fragment>
				<section className="p-8 md:p-16 flex flex-col md:flex-row bg-gray-600 text-white text-opacity-75">
					<div className="w-full md:w-5/12 my-4">
						<h3 className="font-semibold md:font-bold uppercase md:text-2xl md:mb-2" >Tentang Kami</h3>
						<p className="w-full md:w-2/3 text-sm md:text-md mb-4">SediaTek adalah aplikasi sekolah online berbasis website yang dibuat dengan tujuan untuk sekolah agar dapat melaksanakan kegiatan pembelajaran yang lebih efektif dan efisien.</p>
						<h3 className="font-semibold md:font-bold uppercase md:text-2xl md:mb-2" >Hubungi Kami</h3>
						<ul>
							<li className="text-sm md:text-md" >0831-2258-2930</li>
							<li className="text-sm md:text-md" >info@sediatek.com</li>
						</ul>
					</div>
					<div className="w-full md:w-3/12 my-4">
						<h3 className="font-semibold md:font-bold uppercase md:text-2xl md:mb-2" >Informasi</h3>
						<ul>
							<li className="text-sm md:text-md" ><a href="/">Tentang Kami</a></li>
							<li className="text-sm md:text-md" ><a href="/">Artikel</a></li>
							<li className="text-sm md:text-md" ><a href="/">Testimoni</a></li>
							<li className="text-sm md:text-md" ><a href="/">Event</a></li>
						</ul>
					</div>
					<div className="w-full md:w-4/12 my-4">
						<h3 className="font-semibold md:font-bold uppercase md:text-2xl md:mb-2" >Bantuan</h3>
						<ul>
							<li className="text-sm md:text-md" ><a href="/">Layanan</a></li>
							<li className="text-sm md:text-md" ><a href="/">Suppports</a></li>
							<li className="text-sm md:text-md" ><a href="/">Terms & Condition</a></li>
							<li className="text-sm md:text-md" ><a href="/">Kebijakan Privasi</a></li>
						</ul>
					</div>
				</section>
				<footer className="flex flex-row justify-between px-4 bg-gray-800 py-2 text-sm text-opacity-50 text-white">
					<div>
						<img src={process.env.REACT_APP_URL + 'storage/asset/logo-sediatek-inline.svg'} alt="logo sediatek" className="h-6" />
					</div>
					<div>
						&copy; 2020. SediaTek All rights reserved.
					</div>
				</footer>
			</React.Fragment>
		);
	}
}

export default Footer;
	