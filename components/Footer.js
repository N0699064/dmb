import Link from 'next/link';
import SocialIconsDark from './SocialIconsDark';
import SocialIconsLight from './Header/SocialIconsLight';
import styles from '../styles/Footer.module.scss';

export default function Footer() {
	return (
		<>
			<footer className='grid footer'>
				<div className='wrapper wrapper--footer'>
					{/* <ul className={styles.links} role='list'>
						<li className={styles.links__item}>
							<Link href='/' className={styles.links__link}>
								Disclaimer and Privacy Policy
							</Link>
						</li>
						<li className={styles.links__item}>
							<Link href='/' className={styles.links__link}>
								Cookies Policy
							</Link>
						</li>
					</ul> */}

					{/* <SocialIconsDark className={styles.social} /> */}
					{/* <SocialIconsLight /> */}
					<p className='footer__copy'>
						© {new Date().getFullYear()} - DM Barbershop. All rights reserved.
					</p>

					{/* <ul className={styles.details} role='list'>
						<li className={styles.details__item}>
							<p className={styles.address}>
								123 Main St, Suite 200, Anytown, UK 00000
							</p>
						</li>
						<li className={styles.details__item}>
							<p className={styles.phone}> +00 123 456 0000</p>
						</li>
						<li className={styles.details__item}>
							<a className={styles.email} href='mailto: hello@next-salon.com'>
								hello@next-salon.com
							</a>
						</li>
					</ul> */}
				</div>
			</footer>
		</>
	);
}
