import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Skeleton from '../../components/Skeleton';

const client = createClient({
	space: process.env.CONTENTFUL_SPACE_ID,
	accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export const getStaticPaths = async () => {
    const res = await client.getEntries({ content_type: 'service' });

    const paths = res.items
        .filter(item => typeof item.fields.slug === 'string' && item.fields.slug.trim() !== '')
        .map((item) => ({
            params: { slug: item.fields.slug }
        }));

    return {
        paths,
        fallback: true,
    };
};

export async function getStaticProps({ params }) {
	const { items } = await client.getEntries({
		content_type: 'service',
		'fields.slug': params.slug,
	});

	return {
		props: {
			service: items[0],
		},
		revalidate: 1,
	};
}

export default function ServiceDetails({ service }) {
	if (!service) return <Skeleton />;
	const { featuredImage, title, description } = service.fields;
	const router = useRouter();

	return (
		<>
			<Head>
				<title>Zoe Justice Hair | {title}</title>
			</Head>
			<div className='page-header'>
				<h1 className='page-title'>{title}</h1>
				<ul className='breadcrumbs' role='list'>
					<li className='breadcrumbs__item'>
						<Link href='/' className='breadcrumbs__link'>
							Home
						</Link>
					</li>
					<li className='breadcrumbs__item'>
						<Link href='/services' className='breadcrumbs__link'>
							Services
						</Link>
					</li>
					<li className='breadcrumbs__item'>{title}</li>
				</ul>
			</div>
			<div className='page grid'>
				<div className='wrapper wrapper--page'>
					<div className='banner'>
						<Image
							src={'https:' + featuredImage.fields.file.url}
							width={featuredImage.fields.file.details.image.width}
							height={featuredImage.fields.file.details.image.height}
							alt={featuredImage.fields.title}
							loading='lazy'
						/>
					</div>

					<div className='back-button' onClick={() => router.back()}>
						Pervious Page
					</div>

					<div className='rich-text__description'>
						<h2> {title} </h2>
						{documentToReactComponents(description)}
					</div>
				</div>
			</div>
		</>
	);
}
  
