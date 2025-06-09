import { createClient } from 'contentful';
import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import GalleryImage from '../components/GalleryImage';

export async function getStaticProps() {
	const client = createClient({
		space: process.env.CONTENTFUL_SPACE_ID,
		accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
	});

	const gallery = await client.getEntries({ content_type: 'gallery' });

	return {
		props: {
			galleryItems: gallery.items,
		},
		revalidate: 1,
	};
}

export default function galleryPage({ galleryItems }) {
	const [modalOpen, setModalOpen] = useState(false);
	const [modalImage, setModalImage] = useState(null);

	const handleModalOpen = (image) => {
		setModalImage(image);
		setModalOpen(true);
	};

	const handleModalClose = () => {
		setModalOpen(false);
	};

	// const title = 'Gallery';

	return (
		<>
			{/* <Head>
				<title>Zoe Justice Hair | Gallery</title>
			</Head> */}

			<div className='page-header'>
				<h1 className='page-title'>Gallery</h1>
				<ul className='breadcrumbs' role='list'>
					<li className='breadcrumbs__item'>
						<Link className='breadcrumbs__link' href='/'>
							Home
						</Link>
					</li>
					<li className='breadcrumbs__item'>Gallery</li>
				</ul>
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
		</>
	);
}
