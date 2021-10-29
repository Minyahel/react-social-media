import React, {useContext} from "react";
import gql from "graphql-tag";
import { useQuery } from '@apollo/react-hooks';
import { Button, Card, CardContent, Grid, GridRow, Label } from "semantic-ui-react";
import moment from "moment";
import LikeButton from "../components/LikeButton";

import { AuthContext } from "../context/auth";


function SinglePost(props) {
    const postId = props.match.params.postId;

    const { user } = useContext(AuthContext);

    const { data = { getPost }} = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    })

    let postMarkup;

    if (!data) {
        postMarkup = <p>Loading post...</p>
    } else {
        const {id, body, createdAt, username, comments, likes, likeCount, commentCount} = data;

        postMarkup = (
            <Grid>
                <Grid.Row>
                <Grid.Column width={2}>
                    <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                    />
                </Grid.Column>
                <Grid.Column width={10}>
                <Card fluid>
                    <Card.Content>
                        <Card.Header>{username}</Card.Header>
                        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                    </Card.Content>
                    <hr/>
                    <CardContent extra>
                        <LikeButton user={user} post={{id, likeCount, likes}} />
                        <Button as="div" labelPosition="right" onClick={() => console.log('Comment')}>
                            <Button basic color="blue">
                                <Icon name="comments"/>
                            </Button>
                            <Label basic color="blue" pointing="left">
                                {commentCount}
                            </Label>
                        </Button>
                    </CardContent>
                </Card>
                </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

    return (

    )
}

const FETCH_POST_QUERY = gql `
    query ($postId: ID!) {
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