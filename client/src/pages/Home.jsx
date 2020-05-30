import React, { useContext, useState } from "react";
import { useQuery, useLazyQuery, useSubscription } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../context/authContext";
import { GET_ALL_POSTS, TOTAL_POSTS } from "../graphql/queries";
import PostPagination from "../components/PostPagination";
import { gql } from "apollo-boost";
import { toast } from "react-toastify";

const POST_ADDED = gql`
  subscription {
    postAdded {
      _id
      content
      image {
        url
        public_id
      }
      postedBy {
        username
      }
    }
  }
`;

const Home = () => {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useQuery(GET_ALL_POSTS, {
    variables: { page },
  });

  const { data: postCount } = useQuery(TOTAL_POSTS);
  // subscription
  const { data: newPost } = useSubscription(POST_ADDED, {
    onSubscriptionData: async ({
      client: { cache },
      subscriptionData: { data },
    }) => {
      const { allPosts } = cache.readQuery({
        query: GET_ALL_POSTS,
        variables: { page },
      });
      console.log(allPosts);

      // write back to cache
      cache.writeQuery({
        query: GET_ALL_POSTS,
        variables: { page },
        data: {
          allPosts: [data.postAdded, ...allPosts],
        },
      });
      // refetch post to update ui
      fetchPosts({
        variables: { page },
        refetchQueries: [{ query: GET_ALL_POSTS, variables: { page } }],
      });
      // show toast
      toast.success("New Post Added");
    },
  });
  const [fetchPosts, { data: posts }] = useLazyQuery(GET_ALL_POSTS);
  const { state, dispatch } = useContext(AuthContext);

  let history = useHistory();

  if (loading) return <p className="p-5">Loading...</p>;

  return (
    <div className="container">
      <div className="row pt-5">
        {data &&
          data.allPosts.map((post) => (
            <div className="col-md-4" key={post._id}>
              <div className="card">
                <div className="card-body">
                  <div className="card-title">
                    <h4>@{post.postedBy.username}</h4>
                  </div>
                  <p className="card-text">{post.content}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
      <hr></hr>
      <button
        onClick={() => fetchPosts()}
        className="btn btn-raised btn-primary"
      >
        Fetch Posts
      </button>
      <hr></hr>
      <PostPagination
        page={page}
        setPage={setPage}
        postCount={postCount}
      ></PostPagination>
      <hr></hr>
      {JSON.stringify(newPost)}
      {/* {JSON.stringify(state.user)} */}
    </div>
  );
};

export default Home;
