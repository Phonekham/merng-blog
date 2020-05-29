import { gql } from "apollo-boost";
import { USER_INFO, POST_DATA } from "./fragments";

export const PROFILE = gql`
  query {
    profile {
      ...userInfo
    }
  }
  ${USER_INFO}
`;

export const GET_ALL_POSTS = gql`
  query allPosts($page: Int) {
    allPosts(page: $page) {
      ...postData
    }
  }
  ${POST_DATA}
`;

export const GET_ALL_USERS = gql`
  {
    allUsers {
      ...userInfo
    }
  }
  ${USER_INFO}
`;

export const POSTS_BY_USER = gql`
  {
    postByUser {
      ...postData
    }
  }
  ${POST_DATA}
`;

export const GET_SINGLE_POST = gql`
  query singlePost($postId: String!) {
    singlePost(postId: $postId) {
      ...postData
    }
  }
  ${POST_DATA}
`;

export const TOTAL_POSTS = gql`
  query {
    totalPosts
  }
`;

// export const GET_ALL_USERS = gql`
//   query publicProfile($username:String! ){
//     publicProfile(username: $username) {
//       _id
//       username
//       name
//       email
//       images:{
//         url
//         public_id
//       }
//     }
//   }
//   ${USER_INFO}
// `;
