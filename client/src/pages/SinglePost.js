import React from "react";
import gql from "graphql-tag";
import { useQuery } from '@apollo/react-hooks';

function SinglePost(props) {
    const postId = props.match.params.postId;

    return (

    )
}

const FETCH_POST_QUERY = gql `
    query($postId: ID!){
        getPost(postId: $postId) {
            id
            body 
            createdAt
            username
            likeCount
            likes {
                username
            }
            commentCount
            comments {
                id
                username
                createdAt
                body
            }
        }
    }
`

export default SinglePost;