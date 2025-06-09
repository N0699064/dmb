import React, { useState } from 'react';
import { createClient } from 'contentful';
import Head from 'next/head';
import Testimonial from '../components/Testimonial';
import Promo from '../components/Promo';
import Image from 'next/image';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import PriceList from '../components/PriceList';
import ServiceCard from '../components/ServiceCard';
import CallToAction from '../components/CallToAction';
import GalleryImage from '../components/GalleryImage';



 export async function getStaticProps() {
	const client = createClient({
		space: process.env.CONTENTFUL_SPACE_ID,
		accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
	});

	
	const promo = await client.getEntries({
		content_type: 'promo',
	}); 
	const testimonial = await client.getEntries({ content_type: 'testimonial' });
	const priceList = await client.getEntries({
        content_type: 'priceList', // Fetch priceList data
    });

	const gallery = await client.getEntries({ content_type: 'gallery' });

	const service = await client.getEntries({ content_type: 'service' });
		  const page = await client.getEntries({
			content_type: 'page',
			limit: 1,
			'fields.slug': 'services',
		}); 
		const cta = await client.getEntry('2cUo5vH15P37ppzrFeHoot');

		


	return {
		props: {
			testimonials: testimonial.items,
			promo: promo.items,
			priceList: priceList.items, // Pass priceList data as a prop
			services: service.items,
			page: page.items,
			cta: cta,
			galleryItems: gallery.items,
		},
		revalidate: 1,
	}; 
} 

export default function homePage({ testimonials, promo, priceList, services, page, cta, galleryItems }) {
	const [modalOpen, setModalOpen] = useState(false);
		const [modalImage, setModalImage] = useState(null);
	
		const handleModalOpen = (image) => {
			setModalImage(image);
			setModalOpen(true);
		};
	
		const handleModalClose = () => {
			setModalOpen(false);
		};
	return (
		<>
			 <Head>
				<title>DM Barbershop | Home</title>
			</Head>

			 <div className='home-page'>
				{promo.map((promo) => (
					<Promo key={promo.sys.id} promo={promo} />
				))}

				<div className='page grid price-list'>
								<div className='wrapper wrapper--price-list'>
									{priceList.map((priceList) => (
										<PriceList key={priceList.sys.id} priceList={priceList} />
									))}
								</div>
							</div>

							{modalOpen && modalImage && (
											<div className='modal-overlay' onClick={handleModalClose}>
												<div className='modal-content' onClick={(e) => e.stopPropagation()}>
													<button className='modal__close-button' onClick={handleModalClose}>
														X
													</button>
													<div className='modal__image-container'>
														<Image
															src={'https:' + modalImage.fields.file.url}
															alt={modalImage.fields.title}
															fill
															loading='lazy'
														/>
													</div>
							
													<div className='modal-caption'>
														<p>{modalImage.fields.title}</p>
													</div>
												</div>
											</div>
										)}

										
										<div className='page grid gallery'>
											<div className='wrapper wrapper--gallery'>
												{galleryItems.map((item) => (
													<GalleryImage
														key={item.sys.id}
														galleryItem={galleryItems}
														handleModalOpen={handleModalOpen}
													/>
												))}
											</div>
										</div>
							

				{/* <div className='page'>
									<div className='grid services'>
										<div className='wrapper wrapper--services'>
											{services.slice(0, 4).map((service) => (
												<ServiceCard key={service.sys.id} service={service} />
											))}
											 //<CallToAction cta={cta} />
										</div> 
									</div>
								</div> */}

				{/* <section className='grid testimonials'>
					<div className='wrapper wrapper--sec-header'>
						<div className='section-header'>
							<h2 className='section-header__title section-header__title--script'>
								Welcome to DM Barbershop
							</h2>
							<p className='section-header__subtitle'>
								 DM Barbershop.
							</p>
						</div>
					</div>

					 <div className='wrapper wrapper--testimonials'>
						<Splide
							options={{
								type: 'loop',
								gap: '10rem',
								arrows: false,
								autoplay: true,
								width: '75rem',
								pagination: false,
								autoHeight: true,
								perMove: '1',
								perPage: '1',
								breakpoints: {
									370: {
										// perPage: 1,
										width: '28rem',
									},
									500: {
										// perPage: 1,
										width: '32rem',
									},
									850: {
										// perPage: 1,
										width: '50rem',
									},
									// 1200: {
									//   perPage: 1,
									//   width: "70rem",
									// },
								},
							}}>
							{testimonials.map((testimonial) => (
								<Testimonial
									key={testimonial.sys.id}
									testimonial={testimonial}
								/>
							))}
						</Splide>
					</div> 
				</section> */}
			</div> 
		</>
	);
}
