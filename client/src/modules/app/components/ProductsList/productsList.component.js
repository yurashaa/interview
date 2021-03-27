import React, {useEffect, useState} from 'react';
import {useAppState} from '../../../../store';
import {ProductCard} from '../ProductCard';
import {GridList} from '@material-ui/core';
import SortByAlphaSharpIcon from '@material-ui/icons/SortByAlphaSharp';
import FormatListNumberedRtlSharpIcon from '@material-ui/icons/FormatListNumberedRtlSharp';
import {ModalWindow} from '../ModalWindow';
import {deleteProduct} from '../../../../store/actions';
import './productsList.scss';

const sortObj = {
    'alphaUp': (a, b) => a.name > b.name ? 1 : -1,
    'alphaDown': (a, b) => a.name < b.name ? 1 : -1,
    'countUp': (a, b) => a.count > b.count ? 1 : -1,
    'countDown': (a, b) => a.count < b.count ? 1 : -1,
}

export const ProductsList = () => {
    const [{products}, dispatch] = useAppState();

    const [currentProducts, setCurrentProducts] = useState([]);
    const [currentSort, setCurrentSort] = useState('');
    const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);

    useEffect(() => {
        setCurrentProducts(products)
    }, [products])

    const sortByAlpha = () => {
        const newSort = currentSort === 'alphaUp' ? 'alphaDown' : 'alphaUp'
        setCurrentProducts([...products.sort(sortObj[newSort])])
        setCurrentSort(newSort)
    }

    const sortByNumber = () => {
        const newSort = currentSort === 'countUp' ? 'countDown' : 'countUp'
        setCurrentProducts([...products.sort(sortObj[newSort])])
        setCurrentSort(newSort)
    }

    return (
        <>
            <div className={'sort-panel'}>
                <div onClick={sortByAlpha}><SortByAlphaSharpIcon/></div>
                <div onClick={sortByNumber}><FormatListNumberedRtlSharpIcon/></div>
            </div>

            {isDeleteModalOpened &&
            <ModalWindow
                closeAction={setIsDeleteModalOpened.bind(null, false)}
                submitAction={(data) => {
                    dispatch(deleteProduct, idToDelete);
                    setIsDeleteModalOpened(false);
                }}
                isQuestion={true}
            />
            }

            <GridList cellHeight={400} className={'list'}>
                {!!currentProducts.length && currentProducts.map((item) => {
                    return <ProductCard
                        key={item.imageUrl}
                        item={item}
                        deleteAction={(id) => {
                            setIdToDelete(id);
                            setIsDeleteModalOpened(true);
                        }}
                    />
                })}
            </GridList>
        </>
    )
}
