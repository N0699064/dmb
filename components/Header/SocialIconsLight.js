// import { InstagramLogo, FacebookLogo, Moon } from 'phosphor-react';
import { LogoInstagram, LogoFacebook, LogoYoutube } from '@carbon/icons-react';
import Link from 'next/link';
import { SiTiktok } from 'react-icons/si';


export default function SocialIconsLight() {
	return (
		<ul className='social-icons' role='list'>
			<li className='social-icons__item'>
				<Link
					href='https://www.instagram.com/dmbarbershop_1?igsh=eGZ6ZWV4cTV6b3Zt'
					target='_blank'
					className='social-icons__link'>
					<LogoInstagram size={30} />
				</Link>
			</li>
			<li className='social-icons__item'>
				<Link
					href='https://www.tiktok.com/'
					target='_blank'
					className='social-icons__link'>
					{/* <FacebookLogo size={32} color='black' weight='fill' /> */}
					<SiTiktok size={25} />
				</Link>
			</li>
		</ul>
	);
}

