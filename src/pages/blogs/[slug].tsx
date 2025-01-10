import { createClient } from 'contentful';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Head from 'next/head';

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID ?? '',
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ?? '',
});

export const getStaticPaths = async () => {
    const res = await client.getEntries({
        content_type: 'blog',
    });

    const paths = res.items.map(post => {
        return {
            params: { slug: post.fields.slug },
        };
    });

    return {
        paths,
        fallback: false,
    };
};

export async function getStaticProps({ params }) {
    const { items } = await client.getEntries({
        content_type: 'blog',
        'fields.slug': params.slug,
    });

    return {
        props: {
            post: items[0],
        },
    };
}

const useStyles = makeStyles((theme: Theme) => ({
    banner: {
        position: 'relative',
    },
    featuredImage: {},
    title: {
        textTransform: 'uppercase',
        margin: '0',
        background: '#fff',
        display: 'inline-block',
        padding: '20px',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        zIndex: 100,
    },
    contentWrap: {},
    innerContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '1380px',
        padding: '0 30px',
        position: 'relative',
        width: '100%',
        '@media (min-height: 91.2em)': {
            padding: theme.spacing(39, 0, 39),
        },
    },
}));

export default function Blog({ post }) {
    const { title, content, featuredImage, slug } = post.fields;
    const classes = useStyles();
    const metaTags = {
        title: title,
        description: '',
        image: {
            url: '',
        },
        no_index: false,
        no_follow: false,
    };

    const robots = [
        metaTags.no_index === true ? 'noindex' : undefined,
        metaTags.no_follow === true ? 'nofollow' : undefined,
    ].filter((x): x is string => x !== undefined);
    return (
        <>
            <Head>
                {metaTags.title && (
                    <>
                        <title key="title">{metaTags.title}</title>
                        <meta key="og:title" property="og:title" content={metaTags.title} />
                    </>
                )}
                {metaTags.description && (
                    <>
                        <meta key="description" name="description" content={metaTags.description} />
                        <meta
                            key="og:description"
                            property="og:description"
                            content={metaTags.description}
                        />
                    </>
                )}
                {robots.length > 0 && (
                    <meta key="robots" name="robots" content={robots.join(', ')} />
                )}
                {metaTags.image && (
                    <meta
                        key="og:image"
                        property="og:image"
                        content={`${metaTags.image.url}?w=1200&h=630&f=faces&fit=fill`}
                    />
                )}
                <meta key="og:url" property="og:url" content={slug} />
                <meta key="og:locale" property="og:locale" content="" />
            </Head>
            <div className={classes.innerContainer}>
                <div className={classes.banner}>
                    <Image
                        src={'https:' + featuredImage.fields.file.url}
                        width={featuredImage.fields.file.details.image.width}
                        height={featuredImage.fields.file.details.image.height}
                        className={classes.featuredImage}
                    />
                    <h1 className={classes.title}>{title}</h1>
                </div>
                <div className={classes.contentWrap}>{documentToReactComponents(content)}</div>
            </div>
        </>
    );
}
