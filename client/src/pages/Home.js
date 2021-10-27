import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks';
import { Grid, GridColumn, GridRow, Transition } from 'semantic-ui-react';
import { FETCH_POSTS_QUERY } from '../util/graphql';

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
                    <Transition.Group>
                    <GridColumn key={post.id} style={ {marginBottom: 20}}>
                        <PostCard post = {post}/>
                    </GridColumn>
                    </Transition.Group>
                )))}
            </GridRow>  
        </Grid>
    ) : (
        (<h1>Loading posts...</h1>)
    );

    return content;
}


export default Home; 