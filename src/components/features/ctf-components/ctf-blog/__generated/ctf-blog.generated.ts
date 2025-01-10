import * as Types from '../../../../../lib/__generated/graphql.types';

import { AssetFieldsFragment } from '../../ctf-asset/__generated/ctf-asset.generated';
import { AssetFieldsFragmentDoc } from '../../ctf-asset/__generated/ctf-asset.generated';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { customFetcher } from '@src/lib/fetchConfig';
export type BlogFieldsFragment = { __typename: 'Blog', title?: string | null, slug?: string | null, sys: { __typename?: 'Sys', id: string }, thumbnail?: (
    { __typename?: 'Asset' }
    & AssetFieldsFragment
  ) | null, featuredImage?: (
    { __typename?: 'Asset' }
    & AssetFieldsFragment
  ) | null, content?: { __typename?: 'BlogContent', json: any } | null };

export type CtfBlogQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
  locale?: Types.InputMaybe<Types.Scalars['String']>;
  preview?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;


export type CtfBlogQuery = { __typename?: 'Query', blog?: (
    { __typename?: 'Blog' }
    & BlogFieldsFragment
  ) | null };

export const BlogFieldsFragmentDoc = `
    fragment BlogFields on Blog {
  __typename
  sys {
    id
  }
  title
  slug
  thumbnail {
    ...AssetFields
  }
  featuredImage {
    ...AssetFields
  }
  content {
    json
  }
}
    `;
export const CtfBlogDocument = `
    query CtfBlog($id: String!, $locale: String, $preview: Boolean) {
  blog(id: $id, locale: $locale, preview: $preview) {
    ...BlogFields
  }
}
    ${BlogFieldsFragmentDoc}
${AssetFieldsFragmentDoc}`;
export const useCtfBlogQuery = <
      TData = CtfBlogQuery,
      TError = unknown
    >(
      variables: CtfBlogQueryVariables,
      options?: UseQueryOptions<CtfBlogQuery, TError, TData>
    ) =>
    useQuery<CtfBlogQuery, TError, TData>(
      ['CtfBlog', variables],
      customFetcher<CtfBlogQuery, CtfBlogQueryVariables>(CtfBlogDocument, variables),
      options
    );

useCtfBlogQuery.getKey = (variables: CtfBlogQueryVariables) => ['CtfBlog', variables];
;

useCtfBlogQuery.fetcher = (variables: CtfBlogQueryVariables, options?: RequestInit['headers']) => customFetcher<CtfBlogQuery, CtfBlogQueryVariables>(CtfBlogDocument, variables, options);