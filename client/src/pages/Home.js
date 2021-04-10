import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql   from 'graphql-tag';
import { Grid, GridColumn, GridRow } from 'semantic-ui-react';

import { AuthContext } from '../context/auth'
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

function Home() {
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);    

    const { user } = useContext(AuthContext);

    const content = data ? (
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <GridRow>
                {user && (
                    <Grid.Column>
                        <PostForm/>
                    </Grid.Column>
                )}
                { loading ? (<h1>Loading posts...</h1>) : ( data.getPosts && data.getPosts.map(post => (
                    <GridColumn key={post.id} style={ {marginBottom: 20}}>
                        <PostCard post = {post}/>
                    </GridColumn>
                )))}
            </GridRow>  
        </Grid>
    ) : (
        (<h1>Loading posts...</h1>)
    );

    return content;
}

const FETCH_POSTS_QUERY = gql`
    query {
        getPosts {
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
                id username createdAt body
            }
        }
    }
`;

export default Home; 