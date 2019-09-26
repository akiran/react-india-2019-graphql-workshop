import React from 'react'
import { useQuery, useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const POSTS_QUERY = gql`
  query postsQuery{
    posts {
      id
      title
    }
  }
`;

const POSTS_SUBSCRIPTION_QUERY = gql`
  subscription newPostQuery{
    onNewPost {
      id
      title
    }
  }
`;
export default function Posts() {
  // const { loading, error, data } = useQuery(POSTS_QUERY);
  const { data, loading, error } = useSubscription(
    POSTS_SUBSCRIPTION_QUERY,
  );
  console.log("posts", loading, error, data)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return <div>{data.onNewPost.title}</div>
}

