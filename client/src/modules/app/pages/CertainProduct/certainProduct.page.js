import React, {useEffect, useState} from 'react';
import {NavLink, useParams} from 'react-router-dom';
import {editProduct, getProductById} from '../../../../store/actions';
import {useAppState} from '../../../../store';
import {Comments} from '../../components/Comments';
import {CommentInput} from '../../components/CommentInput';
import {Description} from '../../components/Description';
import './certainProduct.scss';
import {ModalWindow} from '../../components/ModalWindow';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export const CertainProduct = () => {
    const [state, dispatch] = useAppState();

    const [isModalOpened, setIsModalOpened] = useState(false);

    const params = useParams();

    useEffect(() => {
        dispatch(getProductById, params.id);
    }, []);

    return (
        <>
            {
                state.certainProduct ?
                    (<div className={'product'}>

                        <NavLink to={'/products'} className={'back-arrow'}>
                            <ArrowBackIcon />
                        </NavLink>

                        {isModalOpened && <ModalWindow
                            id={state.certainProduct.id}
                            defName={state.certainProduct.name}
                            defDescription={state.certainProduct.description}
                            defPrice={state.certainProduct.price}
                            defCount={state.certainProduct.count}
                            defImage={state.certainProduct.imageUrl}
                            closeAction={setIsModalOpened.bind(null, false)}
                            submitAction={(data) => {
                                dispatch(editProduct, data);
                                setIsModalOpened(false);
                            }}
                        />}

                        <div className={'product__description'}>
                            <div className={'edit-icon'} onClick={setIsModalOpened.bind(null,true)}>
                                <EditIcon />
                            </div>
                            <Description item={state.certainProduct || {}}/>
                        </div>

                        <div className={'product__comments'}>
                            <CommentInput productId={params.id}/>
                            <Comments
                                comments={state.certainProduct && state.certainProduct.commentsInfo}
                                productId={params.id}
                            />
                        </div>
                    </div>) : (<div>Loading...</div>)
            }
        </>
    )
}
