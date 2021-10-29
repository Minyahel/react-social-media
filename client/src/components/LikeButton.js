import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useMutation } from "@apollo/client";
import { Button, Icon, Label } from 'semantic-ui-react';
import gql from "graphql-tag";

function LikeButton({ user, post: { id, likeCount, likes } }) {

    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (user && likes.find(like => like.username == user.username)) {
            setLiked(true);
        }
    }, [user, likes]); 

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id}
    })

    const LikeButton = user ? (
        liked ? (
            <Button color="teal">
                <Icon name="heart"/>
            </Button>
        ) : (
            <Button color="teal" basic>
                <Icon name="heart" />
            </Button>
        )
    ) : (
        <Button as={Link} to={'/login'} color="teal" basic>
            <Icon name="heart"/>
        </Button>
    )

    return (
        <Button as='div' labelPosition='right'>
        { LikeButton }
        <Label basic color='teal' pointing='left'>
          {likeCount}
        </Label>
        </Button>
    )
}

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!) {
        likePost(postId: $postId) {
            id 
            likes {
                id 
                username
            }
            likeCount
        }
    }
`


export default LikeButton;