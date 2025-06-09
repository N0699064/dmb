import React, { useState } from 'react';
import Head from 'next/head';
import { createClient } from 'contentful';
import Link from 'next/link';
import Author from '../components/Author';
import CallToAction from '../components/CallToAction';
import Image from 'next/image';

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
    const aboutUs = page[0];
    const aboutImage = aboutUs.fields.image;

    const [activeTab, setActiveTab] = useState(0);
    const handleTabChange = (index) => {
        setActiveTab(index);
    };

    const title = pageTitle;
    return (
        <>
            {/* <Head>
                <title>Next Salon | {title}</title>
            </Head> */}
            <div className='page-header'>
                {aboutImage && aboutImage.fields && aboutImage.fields.file && (
                    <div className="about__header-image" style={{ marginBottom: '2rem' }}>
                        <Image
                            src={'https:' + aboutImage.fields.file.url}
                            alt={aboutImage.fields.title || 'About Us'}
                            width={1200}
                            height={400}
                            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                            priority
                        />
                    </div>
                )}
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
                        {/* <CallToAction cta={cta} /> */}
                        <div className="about-mobile-flex">
                            <img
                                src="/images/deanMckenzie.jpeg"
                                alt="About Us"
                                className="about-mobile-image"
                                style={{
                                    display: 'block',
                                    margin: '0 auto 2rem auto',
                                    width: '50%',
                                    height: 'auto',
                                    objectFit: 'cover'
                                }}
                            />
                            <div className="about-mobile-tabs">
                                <ul className='tabs__nav'>
                                    <li
                                        onClick={() => handleTabChange(0)}
                                        className={`tabs__nav-item ${activeTab === 0 ? 'tabs__nav-item--active' : ''}`}>
                                        Our Skilled Team
                                    </li>
                                    <li
                                        onClick={() => handleTabChange(1)}
                                        className={`tabs__nav-item ${activeTab === 1 ? 'tabs__nav-item--active' : ''}`}>
                                        A Welcoming Atmosphere
                                    </li>
                                    <li
                                        onClick={() => handleTabChange(2)}
                                        className={`tabs__nav-item ${activeTab === 2 ? 'tabs__nav-item--active' : ''}`}>
                                        Our Goal
                                    </li>
                                </ul>
                                <div className='tabs__content'>
                                    <div
                                        className={`tabs__content-item ${activeTab === 0 ? 'tabs__content-item--active' : ''}`}>
                                        <p>
                                            We brings more than a decade of professional experience to the chair. 
                                            Our barbers specialise in a range of services, from buzz cuts to skin fades, ensuring every client leaves looking sharp and feeling confident. With convenient amenities like parking and kid-friendly options, it's a go to destination for families seeking consistent barbering services.
                                        </p>
                                    </div>
                                    <div
                                        className={`tabs__content-item ${activeTab === 1 ? 'tabs__content-item--active' : ''}`}>
                                        <p>
                                            From the moment you walk through the door, we strive to make every visit enjoyable and stress-free. DMBarbershop is family-friendly and equipped with convenient parking to make your trip easy. Whether you're a regular or a first-time visitor, you'll feel right at home in our clean, professional, and relaxed environment.
                                        </p>
                                        <p>
                                            Our barbershop is designed with your comfort in mind, and features a
                                            relaxing and modern decor. We provide a clean, hygienic
                                            environment and use high-quality, professional products to
                                            ensure that every service we provide is of the highest standard.
                                        </p>
                                    </div>
                                    <div
                                        className={`tabs__content-item ${activeTab === 2 ? 'tabs__content-item--active' : ''}`}>
                                        <p>
                                            Our mission is simple: to provide consistently excellent barbering services that combine precision, style, and comfort. We aim to be the go-to barbershop for individuals and families in Milton Keynes, offering not just great haircuts—but a great experience, every time.
                                        </p>
                                        <p>
                                            Our team of skilled barbers are trained in the latest techniques and are
                                            dedicated to providing you with the best service possible. We
                                            understand that every client is unique, which is why we take the
                                            time to understand your individual needs and preferences, and
                                            work with you to create a personalized experience that meets
                                            your specific needs.
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
                            </div>
                        </div>
                    </div>
                    {author && <Author key={author.sys.id} author={author} />}
                </div>
            </div>
        </>
    );
}
