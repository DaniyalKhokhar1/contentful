import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import React from 'react';

import { useCtfBlogQuery } from './__generated/ctf-blog.generated';
import { CtfBlog } from './ctf-blog';

interface CtfBlogGqlPropsInterface {
  id: string;
  locale: string;
  preview: boolean;
}

export const CtfBlogGql = (props: CtfBlogGqlPropsInterface) => {
  const { id, locale, preview } = props;
  const { data, isLoading } = useCtfBlogQuery({
    id,
    locale,
    preview,
  });

  const componentBlog = useContentfulLiveUpdates(data?.blog);

  if (!componentBlog || isLoading) return null;

  return <CtfBlog {...componentBlog} />;
};
