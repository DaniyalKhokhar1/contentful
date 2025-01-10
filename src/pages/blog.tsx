import { createClient } from 'contentful';
import CtfBlogCard from '@src/components/features/ctf-components/ctf-blog-card/ctf-blog-card';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import Head from 'next/head';

const useStyles = makeStyles((theme: Theme) => ({
    blogsList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '30px',
    },
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

export async function getStaticProps() {
    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID ?? '',
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ?? '',
    });

    const res = await client.getEntries({ content_type: 'blog' });

    return {
        props: {
            blogs: res.items,
        },
    };
}

const metaTags = {
    title: 'Blog',
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

export default function Blogs({ blogs }) {
    const classes = useStyles();
    console.log(blogs);
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
                <meta key="og:url" property="og:url" content="blog" />
                <meta key="og:locale" property="og:locale" content="" />
            </Head>
            <div className={classes.innerContainer}>
                <div className={classes.blogsList}>
                    {blogs.map(blog => (
                        <CtfBlogCard key={blog.sys.id} blog={blog} />
                    ))}
                </div>
            </div>
        </>
    );
}
