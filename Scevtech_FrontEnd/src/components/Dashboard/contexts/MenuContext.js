import React , { createContext , useState , useEffect } from 'react';

export const MenuContext = createContext();

const MenuContextProvider = (props) => {
	const [menu , setMenu] = useState('');
	let path = window.location.pathname.split('/');
	useEffect(() => {
		setMenu(path[2]);
	} , [path])

	return (
		<MenuContext.Provider value={{ menu }} >
			{props.children}
		</MenuContext.Provider>
	)
}

export default MenuContextProvider;