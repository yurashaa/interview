import React from 'react';
import moment from 'moment';
import {Grid, Paper} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/HighlightOff';
import {useAppState} from '../../../../store';
import {deleteComment} from '../../../../store/actions';
import './comments.scss';

export const Comments = ({comments = [], productId}) => {
    const [_, dispatch] = useAppState();

    const deleteHandler = (id) => {
        console.log('here', productId);
        dispatch(deleteComment, {id, productId});
    }

    return (
        <div className={'list'}>
            {comments && !!comments.length && comments.map(comment => (
                <Paper className={'wrapper'} key={comment.date}>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                        <p>
                            {comment.description}
                        </p>
                        <p>
                            {moment(comment.date).format('MMMM Do YYYY, h:mm:ss a')}
                        </p>
                        <div
                            className={'delete-icon'}
                            onClick={deleteHandler.bind(null, comment.id)}
                        >
                            <DeleteIcon />
                        </div>
                    </Grid>
                </Paper>
            ))}
        </div>
    )
}
