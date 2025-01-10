import { createClient } from 'contentful';
import CtfBlogCard from '@src/components/features/ctf-components/ctf-blog-card/ctf-blog-card';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

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

export default function Blogs({ blogs }) {
    const classes = useStyles();
    console.log(blogs);
    return (
        <div className={classes.innerContainer}>
            <div className={classes.blogsList}>
                {blogs.map(blog => (
                    <CtfBlogCard key={blog.sys.id} blog={blog} />
                ))}
            </div>
        </div>
    );
}
