import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const POSTS_QUERY = gql`
  query postsQuery{
    posts {
      id
      title
    }
  }
`;

export default function Posts() {
  const { loading, error, data } = useQuery(POSTS_QUERY);
  console.log("posts", loading, error, data)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return null
}

