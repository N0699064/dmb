import Head from 'next/head';
import Link from 'next/link';
import { createClient } from 'contentful';
import PriceList from '../components/PriceList';
import Accordion from '../components/Accordion';

// import Accordion from "../components/Accordion";

export async function getStaticProps() {
	const client = createClient({
		space: process.env.CONTENTFUL_SPACE_ID,
		accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
	});

	const priceList = await client.getEntries({ content_type: 'priceList' });

	return {
		props: {
			priceList: priceList.items,
		},
		revalidate: 1,
	};
}

export default function Prices({ priceList }) {
	return (
		<>
			<Head>
				<title>DM Barbershop | Price List</title>
			</Head>
			<div className='page-header'>
				<h1 className='page-title'>Price List</h1>
				<ul className='breadcrumbs' role='list'>
					<li className='breadcrumbs__item'>
						<Link href='/' className='breadcrumbs__link'>
							Home
						</Link>
					</li>
					<li className='breadcrumbs__item'>Price List</li>
				</ul>
			</div>
			<div className='page grid price-list'>
				<div className='wrapper wrapper--price-list'>
					{priceList.map((priceList) => (
						<PriceList key={priceList.sys.id} priceList={priceList} />
					))}
				</div>
			</div>
		</>
	);
}
