import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql   from 'graphql-tag';
import { Grid, GridColumn, GridRow } from 'semantic-ui-react';
import PostCard from '../components/PostCard';

function Home() {
    const { loading, data : {getPosts: posts} } = useQuery(FETCH_POSTS_QUERY);

    return (    
        <Grid columns={3}>
            <Grid.Row>
                <h1>Recent Posts</h1>
            </Grid.Row>
            <GridRow>
                { loading ? (<h1>Loading posts...</h1>) : ( posts && posts.map(post => (
                    <GridColumn key={post.id} style={ {marginBottom: 20}}>
                        <PostCard post = {post}/>
                    </GridColumn>
                )))}
            </GridRow>  
        </Grid>
       
    )
}

const FETCH_POSTS_QUERY = gql`
    {
        getPosts{
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