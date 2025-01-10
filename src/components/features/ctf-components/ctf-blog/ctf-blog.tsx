import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import { Container, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { useMemo } from 'react';

import { BlogFieldsFragment } from './__generated/ctf-blog.generated';

import { CtfRichtext } from '@src/components/features/ctf-components/ctf-richtext/ctf-richtext';
import LayoutContext, { defaultLayout, useLayoutContext } from '@src/layout-context';
import { CtfAsset } from '../ctf-asset/ctf-asset';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    alignItems: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    overflow: 'hidden',
    position: 'relative',
  },

  fullScreen: {
    '@media (min-height: 91.2em)': {
      minHeight: '91.2rem',
    },
  },

  innerContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '125.8rem',
    padding: theme.spacing(33, 0, 33),
    position: 'relative',
    width: '100%',
    '@media (min-height: 91.2em)': {
      padding: theme.spacing(39, 0, 39),
    },
  },

  partialBgContainer: {
    display: 'none',
    height: '100%',
    left: '50%',
    maxWidth: '192rem',
    position: 'absolute',
    top: 0,
    transform: 'translateX(-50%)',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },

  partialBg: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%',
    position: 'absolute',
    right: 0,
    top: 0,
    width: '50%',
  },

  headline: {
    fontSize: '3rem',
    fontWeight: 800,
    lineHeight: 1.08,
    maxWidth: '44rem',
    [theme.breakpoints.up('xl')]: {
      fontSize: '3.8rem',
    },
  },

  body: {
    fontWeight: 400,
    lineHeight: 1.56,
    marginTop: theme.spacing(6),
    maxWidth: '46.9rem',
    '& p': {
      fontSize: '2.5rem',
      [theme.breakpoints.up('xl')]: {
        fontSize: '2.5rem',
      },
    },
  },
  ctaContainer: {
    marginTop: theme.spacing(6),
  },
}));

export const CtfBlog = (props: BlogFieldsFragment) => {
  const {
    featuredImage,
    title,
    // Tutorial: uncomment the line below to make the Greeting field available to render
    // greeting,
    slug,
    thumbnail,
    content,
    sys: { id },
  } = props;
  const layout = useLayoutContext();

  const classes = useStyles();
  const inspectorMode = useContentfulInspectorMode({ entryId: id });

  return (
    <Container
      maxWidth={false}
      className={clsx(classes.root)}
      {...inspectorMode({ fieldId: 'image' })}
    >
      <div className={classes.partialBgContainer}>
        <div className={classes.partialBg} />
      </div>
      <div className={classes.innerContainer}>
        {/* Tutorial: uncomment this block to render the Greeting field value
        {greeting && (
          <Typography>
            {greeting}
          </Typography>
        )}
        */}
        {featuredImage && <CtfAsset {...featuredImage} showDescription={false} />}
        {thumbnail && <CtfAsset {...thumbnail} showDescription={false} />}
        {slug}
        {title && (
          <Typography
            variant="h1"
            className={classes.headline}
            {...inspectorMode({ fieldId: 'title' })}
          >
            {title}
          </Typography>
        )}
        {content && (
          <LayoutContext.Provider value={{ ...defaultLayout, parent: 'hero-banner-body' }}>
            <div {...inspectorMode({ fieldId: 'content' })}>
              <CtfRichtext {...content} className={classes.body} />
            </div>
          </LayoutContext.Provider>
        )}
      </div>
    </Container>
  );
};
