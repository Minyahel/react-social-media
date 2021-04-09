import React from 'react';
import { Image, Button, Card, Icon, Label } from 'semantic-ui-react';
import { Link  } from 'react-router-dom';
import moment from 'moment';

function PostCard({post: { body, createdAt, id, username, likeCount, commentCount, likes} }) {
    return ( 
        <Card>
            <Card.Content>
              <Image
                floated='right'
                size='mini'
                src='https://react.semantic-ui.com/images/avatar/large/molly.png'
              />
              <Card.Header>{username}</Card.Header>
              <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
              <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
            <Button as='div' labelPosition='right'>
                <Button icon>
                  <Icon name='heart' />
                  Like
                </Button>
                <Label as='a' basic pointing='left'>
                  {likeCount}
                </Label>
            </Button>
            </Card.Content>
        </Card>
    )
}

export default PostCard; 