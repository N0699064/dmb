import Image from 'next/image';
import { Calendar } from '@carbon/icons-react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function Promo({ promo }) {
	const { title, images, description } = promo.fields;

	return (
		<div className='promo'>
			<div className='promo__caption'>
				<h1 className='promo__title'>{title}</h1>
				<p className='promo__description'>{description}</p>
				<a href='https://www.fresha.com/a/dmbarbershop-milton-keynes-atterbury-lakes-fairbourne-drive-z1uuzwma?preview=7ff703ce-fe84-47a9-8a65-ebbd58d4694c&share&pId=2557860' className='promo__btn btn'>
					Book Appointment
					<Calendar size={24} />
				</a>
			</div>
			<div className='promo__images'>
				<div className='promo__image-container'>
					<Image
						className='promo__image promo__image--1'
						width={315}
						height={680}
						src={'https:' + images[0].fields.file.url}
						alt={images[0].fields.title}
						loading='lazy'
					/>
					<Image
						className='promo__image promo__image--3'
						src={'https:' + images[2].fields.file.url}
						alt={images[2].fields.title}
						width={315}
						height={680}
						loading='lazy'
					/>
					<Image
						className='promo__image promo__image--2'
						width={315}
						height={680}
						src={'https:' + images[1].fields.file.url}
						alt={images[1].fields.title}
						loading='lazy'
					/>
					<Image
						className='promo__image promo__image--4'
						width={315}
						height={680}
						src={'https:' + images[3].fields.file.url}
						alt={images[3].fields.title}
						loading='lazy'
					/>
					<Image
						className='promo__image promo__image--5'
						width={315}
						height={680}
						src={'https:' + images[4].fields.file.url}
						alt={images[4].fields.title}
						loading='lazy'
					/>
					<Image
						className='promo__image promo__image--6'
						width={315}
						height={680}
						src={'https:' + images[5].fields.file.url}
						alt={images[5].fields.title}
						loading='lazy'
					/>
				</div>
			</div>
		</div>
	);
}
