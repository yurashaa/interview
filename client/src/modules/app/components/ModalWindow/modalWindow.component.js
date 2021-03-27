import React, {useState} from 'react';
import {Button, CardHeader, TextField} from '@material-ui/core';
import ImageUploader from 'react-images-upload';
import './modalWindow.scss';

export const ModalWindow = ({
                                id = null,
                                defName = '',
                                defDescription = '',
                                defPrice = 0,
                                defCount = 0,
                                defImage = '',
                                submitAction,
                                closeAction,
                                isQuestion = false
                            }) => {
    const [name, setName] = useState(defName);
    const [description, setDescription] = useState(defDescription);
    const [price, setPrice] = useState(defPrice);
    const [count, setCount] = useState(defCount);
    const [image, setImage] = useState(defImage);

    const nameHandler = e => setName(e.target.value);
    const descriptionHandler = e => setDescription(e.target.value);
    const priceHandler = e => setPrice(e.target.value);
    const countHandler = e => setCount(e.target.value);
    const imageHandler = pic => setImage(pic && pic[0])

    const outsideClick = (e) => {
        e.preventDefault();
        closeAction();
    }

    const submit = () => {
        submitAction({name, description, price, count, image, id});
    }

    return (
        <div
            className='modal__wrapper'
            onClick={outsideClick}
        >
            <div
                className='modal__block'
                onClick={e => e.stopPropagation()}
            >
                {!isQuestion ? (<>
                    <CardHeader title={defName ? 'Edit product' : 'Add product'}/>
                    <form noValidate autoComplete="off" onSubmit={submit}>
                        <TextField
                            id="standard-basic"
                            label="Name"
                            value={name}
                            required
                            onChange={nameHandler}
                        />
                        <TextField
                            id="standard-basic"
                            label="Description"
                            value={description}
                            required
                            onChange={descriptionHandler}
                        />
                        <TextField
                            id="standard-basic"
                            label="Price"
                            value={price}
                            required
                            onChange={priceHandler}
                        />
                        <TextField
                            id="standard-basic"
                            label="Count"
                            value={count}
                            required
                            onChange={countHandler}
                        />
                        <ImageUploader
                            withIcon={true}
                            buttonText='Choose image'
                            value={image}
                            onChange={imageHandler}
                            imgExtension={['.jpg', '.png', '.jpeg']}
                            maxFileSize={5242880}
                        />
                        <Button
                            onClick={submit}
                            disabled={!name || !description || !price || !count || !image}
                        >
                            Save
                        </Button>
                        <Button onClick={closeAction}>
                            Cancel
                        </Button>
                    </form>
                </>) : (
                    <>
                        <CardHeader title={'Are you sure ?'}/>
                        <Button
                            onClick={submit}
                        >
                            Yes
                        </Button>
                        <Button onClick={closeAction}>
                            No
                        </Button>
                    </>
                )}
            </div>
        </div>
    )
}
