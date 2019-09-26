import React from 'react'
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const POSTS_QUERY = gql`
  query postsQuery{
    posts {
      id
      title
    }
  }
`;

const newPostMutation = gql`
  mutation createPostMutation($title: String, $author: Int) {
    createPost(title: $title, author: $author) {
      id
      title
    }
  }
`

const POSTS_SUBSCRIPTION_QUERY = gql`
  subscription newPostQuery{
    onNewPost {
      id
      title
    }
  }
`;

export default function Posts() {
  const { loading, error, data } = useQuery(POSTS_QUERY);
  const [addPost] = useMutation(newPostMutation)
  const { data: subscriptionData } = useSubscription(
    POSTS_SUBSCRIPTION_QUERY,
  );
  if (loading) return <p>Loading...</p>;
  return (
    <div>
      {subscriptionData && <div>
        Latest post: {subscriptionData.onNewPost.title}
      </div>}
      <br />
      {
        data.posts.map(post => <div key={post.id}>{post.title}</div>)
      }
      <button
        onClick={
          () => addPost({
            variables: {
              title: `New Post ${data.posts.length}`,
              author: 1
            },
            refetchQueries: [{ query: POSTS_QUERY }]
          })}>
        Add new Post
    </button>
    </div>
  )
}

