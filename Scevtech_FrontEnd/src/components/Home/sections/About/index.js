import React , {Component} from 'react';

class About extends Component {
	render() {
		return(
			<section id="about" className="flex flex-col md:flex-row p-8 md:p-16">
				<div className="w-full md:w-1/3 text-center">
					<img src={process.env.REACT_APP_URL + 'storage/asset/logo-sediatek.svg'} alt="log" className="block m-auto w-3/5 mb-10 md:mb-4 md:w-48" />
				</div>
				<div className="w-full md:w-2/3" >
					<h2 className="text-2xl text-center uppercase md:capitalize md:text-left md:text-5xl mb-2">Tentang Kami</h2>
					<p className="text-center md:text-left md:leading-8 md:text-lg">SediaTek adalah aplikasi sekolah online berbasis website yang dibuat dengan tujuan untuk sekolah agar dapat melaksanakan kegiatan pembelajaran yang lebih efektif dan efisien. Dengan dibuatnya aplikasi ini diharapkan agar materi yang disampaikan mudah diterima dengan baik oleh siswa. Dengan menggunakan aplikasi ini siswa diharapkan menjadi siswa yang mandiri dan bisa mencari informasi melalui media internet dengan baik.</p>
				</div>
			</section>
		);
	}
}

export default About;
