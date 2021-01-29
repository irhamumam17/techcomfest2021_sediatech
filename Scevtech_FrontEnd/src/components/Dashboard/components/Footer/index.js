import React from 'react';

function Footer() {
	let date = new Date();
	return (
		<footer className="text-center text-xs text-gray-500 mt-6 mb-4">&copy; SediaTek {date.getFullYear()}. All rights reserved.</footer>
	)
}

export default Footer;