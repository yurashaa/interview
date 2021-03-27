import React, {useEffect, useState} from 'react';
import AddIcon from '@material-ui/icons/Add';
import {useAppState} from '../../../../store';
import {createProduct, getProducts} from '../../../../store/actions';
import {ProductsList} from '../../components/ProductsList';
import {ModalWindow} from '../../components/ModalWindow';
import './products.scss';

export const Products = () => {
    const [_, dispatch] = useAppState();

    const [isModalOpened, setIsModalOpened] = useState(false);

    useEffect(() => {
        dispatch(getProducts);
    }, []);

    return (
        <div className={'products'}>
            <div className={'new-icon'} onClick={setIsModalOpened.bind(null, true)}><AddIcon/></div>

            {isModalOpened &&
            <ModalWindow
                closeAction={setIsModalOpened.bind(null, false)}
                submitAction={(data) => {
                    dispatch(createProduct, data);
                    setIsModalOpened(false);
                }}
            />
            }

            <ProductsList/>
        </div>
    )
}
