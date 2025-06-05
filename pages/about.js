import React, { useState } from 'react';
import Head from 'next/head';
import { createClient } from 'contentful';
import Link from 'next/link';
import Author from '../components/Author';
import CallToAction from '../components/CallToAction';

export async function getStaticProps() {
	const client = createClient({
		space: process.env.CONTENTFUL_SPACE_ID,
		accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
	});

	const page = await client.getEntries({
		content_type: 'page',
		limit: 1,
		'fields.slug': 'about-us',
	});
	const cta = await client.getEntry('6LQIUO2yYdt7SHQ8EIPthz');

	return {
		props: {
			page: page.items,
			cta: cta,
		},
		revalidate: 1,
	};
}

export default function About({ page, cta }) {
	const pageTitle = page[0].fields.title;
	const author = page[0].fields.author;

	const [activeTab, setActiveTab] = useState(0);
	const handleTabChange = (index) => {
		setActiveTab(index);
	};

	// console.log(page);
	const title = pageTitle;
	return (
		<>
			{/* <Head>
				<title>Next Salon | {title}</title>
			</Head> */}
			<div className='page-header'>
				<h1 className='page-title'>About us</h1>
				<ul className='breadcrumbs' role='list'>
					<li className='breadcrumbs__item'>
						<Link className='breadcrumbs__link' href='/'>
							Home
						</Link>
					</li>
					<li className='breadcrumbs__item'>About us</li>
				</ul>
			</div>

			<div className='page about grid'>
				<div className='wrapper'>
					<div className='page__content'>
						<CallToAction cta={cta} />
					</div>
					<ul className='tabs__nav'>
						<li
							onClick={() => handleTabChange(0)}
							className={`tabs__nav-item ${
								activeTab === 0 ? 'tabs__nav-item--active' : ''
							}`}>
							Our Skilled Team
						</li>
						<li
							onClick={() => handleTabChange(1)}
							className={`tabs__nav-item ${
								activeTab === 1 ? 'tabs__nav-item--active' : ''
							}`}>
							A Welcoming Atmosphere
						</li>
						<li
							onClick={() => handleTabChange(2)}
							className={`tabs__nav-item ${
								activeTab === 2 ? 'tabs__nav-item--active' : ''
							}`}>
							Our Goal
						</li>
					</ul>

					<div className='tabs__content'>
						<div
							className={`tabs__content-item ${
								activeTab === 0 ? 'tabs__content-item--active' : ''
							}`}>
							<p>
								At Next Salon, our skilled team of stylists, makeup artists, and
								nail technicians are trained in the latest techniques and are
								dedicated to providing you with the highest level of service and
								attention to detail.
							</p>

							<p>
								We believe that client satisfaction is the key to our success,
								which is why we always strive to go above and beyond for each
								and every one of our clients. Our team members are passionate
								about their craft, and are constantly working to improve their
								skills and knowledge to ensure that we provide the best service
								to our clients.
							</p>

							<p>
								They have experience in different hair types, textures, and
								styles, and will work with you to achieve the look you desire.
								Whether you are looking for a classic cut, a modern style, or a
								complete makeover, our team is here to help you achieve your
								desired look.
							</p>

							<p>
								We pride ourselves on providing a welcoming and professional
								atmosphere at Next Salon, and our team is dedicated to making
								sure that each and every client leaves feeling and looking their
								best.
							</p>
						</div>
						<div
							className={`tabs__content-item ${
								activeTab === 1 ? 'tabs__content-item--active' : ''
							}`}>
							<p>
								At Next Salon, we understand the importance of creating a
								welcoming and comfortable atmosphere for our clients. From the
								moment you walk through our doors, you will be greeted by our
								friendly and professional staff who are dedicated to making your
								salon experience as enjoyable as possible.
							</p>

							<p>
								Our salon is designed with your comfort in mind, and features a
								relaxing and modern decor. We provide a clean, hygienic
								environment and use high-quality, professional products to
								ensure that every service we provide is of the highest standard.
							</p>

							<p>
								We have a range of services to choose from, with something to
								suit everyone, our salon is a place where you can relax, unwind
								and be pampered. Our team will take the time to understand your
								needs and preferences, and will work with you to create a
								personalized experience that meets your individual needs.
							</p>

							<p>
								Whether you are here for a quick cut and style, a luxurious spa
								treatment, or a complete makeover, we are committed to providing
								you with the highest level of service and attention to detail in
								a welcoming and comfortable environment.
							</p>
						</div>
						<div
							className={`tabs__content-item ${
								activeTab === 2 ? 'tabs__content-item--active' : ''
							}`}>
							<p>
								At Next Salon, our goal is to provide our clients with the
								highest level of service and attention to detail, in a welcoming
								and comfortable atmosphere. We are committed to helping you look
								and feel your best, whether you are here for a quick trim or a
								complete makeover.
							</p>

							<p>
								Our team of skilled stylists, makeup artists, and nail
								technicians are trained in the latest techniques and are
								dedicated to providing you with the best service possible. We
								understand that every client is unique, which is why we take the
								time to understand your individual needs and preferences, and
								work with you to create a personalized experience that meets
								your specific needs.
							</p>
							<p>
								We believe that client satisfaction is the key to our success,
								which is why we always strive to go above and beyond for each
								and every one of our clients. Our team is passionate about their
								craft, and are constantly working to improve their skills and
								knowledge to ensure that we provide the best service to our
								clients.
							</p>
							<p>
								We are dedicated to providing a welcoming and professional
								atmosphere at Next Salon, and our team is committed to making
								sure that each and every client leaves feeling and looking their
								best. We want you to leave our salon feeling refreshed,
								rejuvenated, and confident.
							</p>
						</div>
					</div>

					{author && <Author key={author.sys.id} author={author} />}
				</div>
			</div>
		</>
	);
}
