import { Link } from 'react-router-dom';
import logo from './../../../../images/logo.png';

export const Logo = () => (
	<Link to='/corses'>
		<img width={150} src={logo} alt='logo' />
	</Link>
);
