import React, {useState} from 'react';
import {Button, Icon, TextField} from '@material-ui/core';
import {useAppState} from '../../../../store';
import './commentInput.scss';
import {createComment} from '../../../../store/actions';

export const CommentInput = ({productId}) => {
    const [_, dispatch] = useAppState();

    const [value, setValue] = useState('');
    const [isValueValid, setIsValueValid] = useState(true);

    const changeHandler = (e) => {
        if (e.target.value) {
            setIsValueValid(true);
        }
        setValue(e.target.value)
    }

    const createCommentHandler = (e) => {
        e.preventDefault();

        if (!value) {
            setIsValueValid(false);
            return;
        }

        dispatch(createComment, {date: new Date(), productId: +productId, description: value});
    }

    return (
        <form autoComplete="off" onSubmit={createCommentHandler}>
            <TextField
                label="Outlined"
                variant="outlined"
                value={value}
                onChange={changeHandler}
                error={!isValueValid}
            />
            <Button
                variant="contained"
                color="primary"
                type={'submit'}
                endIcon={'Send'}
            />
        </form>
    )
}
