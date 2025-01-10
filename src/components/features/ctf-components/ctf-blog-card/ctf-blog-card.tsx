import Link from 'next/link';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import { BLOCKS } from '@contentful/rich-text-types';

const useStyles = makeStyles((theme: Theme) => ({
    card: {
        width: '100%',
        maxWidth: '645px',
        cursor: 'pointer',
        boxShadow: '0px 10px 10px #ddd',
        padding: '20px',
        borderRadius: '10px',
        margin: '50px 0',
    },
    featured: {},
    image: {
        borderRadius: '10px',
    },
    content: {},
    blogContent: {
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 3,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    title: {
        margin: '0',
        marginBottom: '20px',
    },
    blogPara: {
        margin: '0',
        marginBottom: '20px',
    },
}));

export default function CtfBlogCard({ blog }) {
    const { title, slug, thumbnail, content } = blog.fields;
    const classes = useStyles();

    const options = {
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node, children) => <p className={classes.blogPara}>{children}</p>,
        },
    };
    return (
        <Link href={'/blogs/' + slug}>
            <div className={classes.card}>
                <div className={classes.featured}>
                    <Image
                        src={'https:' + thumbnail.fields.file.url}
                        width={thumbnail.fields.file.details.image.width}
                        height={thumbnail.fields.file.details.image.height}
                        className={classes.image}
                    />
                </div>
                <div className={classes.content}>
                    <h4 className={classes.title}>{title}</h4>
                    <div className={classes.blogContent}>
                        {' '}
                        {documentToReactComponents(content, options)}
                    </div>
                </div>
            </div>
        </Link>
    );
}
