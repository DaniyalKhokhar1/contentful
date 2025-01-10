import { createClient } from 'contentful';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import clsx from 'clsx';

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
    const { title, content, featuredImage } = post.fields;
    const classes = useStyles();
    console.log(post);
    return (
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
    );
}
