import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function notFound() {
	// const title = '404';
	const router = useRouter();

	useEffect(() => {
		setTimeout(() => {
			// router.go(-1)
			router.push('/');
		}, 10000);
	}, []);

	return (
		<div>
			<Head>
				<title>DM Barbershop | 404</title>
			</Head>

			<div className='grid page'>
				<div className='wrapper wrapper--page'>
					<div className='error-page'>
						<h1 className='error-page__title'>404</h1>
						<div className='error-page__text'>
							<h2>
								Oops! It looks like you've stumbled upon a bad hair day... on
								our website.
							</h2>
							<p>
								Don't worry, we're experts at fixing bad hair days, but this one
								is out of our hands. Hang tight, you'll be automatically
								redirected to our home page and we'll have you looking fabulous
								in no time!
							</p>
							{/* <Link href='/'>Homepage</Link> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// export default notFound;
