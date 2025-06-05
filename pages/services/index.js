import Head from 'next/head';
import { useState } from 'react';
import { createClient } from 'contentful';
import ServiceCard from '../../components/ServiceCard';
import CallToAction from '../../components/CallToAction';
import Link from 'next/link';

export async function getStaticProps() {
	const client = createClient({
		space: process.env.CONTENTFUL_SPACE_ID,
		accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
	});

	const service = await client.getEntries({ content_type: 'service' });
	const page = await client.getEntries({
		content_type: 'page',
		limit: 1,
		'fields.slug': 'services',
	});
	const cta = await client.getEntry('2cUo5vH15P37ppzrFeHoot');

	console.log('Page Data:', page); // Log the page data


	return {
		props: {
			services: service.items,
			page: page.items,
			cta: cta,
		},
		revalidate: 1,
	};
}

export default function Services({ services, page, cta }) {
	const [contentfulData, setContentfulData] = useState(null);
	//const pageDescription = page[0].fields.pageDescription;
	//const pageTitle = page[0].fields.title;
	//const title = pageTitle;

	return (
		<>
			{/* <Head>
				<title>Next Salon | {title}</title>
			</Head> */}
			<div>
				<div className='page-header'>
					<h1 className='page-title'>Services</h1>
					<ul className='breadcrumbs' role='list'>
						<li className='breadcrumbs__item'>
							<Link href='/' className='breadcrumbs__link'>
								Home
							</Link>
						</li>
						<li className='breadcrumbs__item'>Servicess</li>
					</ul>
				</div>

				<div className='page'>
					<div className='grid services'>
						<div className='wrapper wrapper--services'>
							{services.map((service) => (
								<ServiceCard key={service.sys.id} service={service} />
							))}
							<CallToAction cta={cta} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
