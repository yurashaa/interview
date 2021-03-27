import React from 'react';
import {GridListTile, GridListTileBar, IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/HighlightOff';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';
import {NavLink} from 'react-router-dom';
import {useAppState} from '../../../../store';
import {serverURL} from '../../../../constants';
import './productCard.scss';

export const ProductCard = ({item, deleteAction}) => {
    const [_, dispatch] = useAppState();

    const {imageUrl, name, price, count, description, id} = item;

    return <GridListTile key={imageUrl} className={'product'}>
        <img src={`${serverURL}/${imageUrl}`} alt={name}/>
        <GridListTileBar
            title={`${name}, ${price}$`}
            subtitle={
                <>
                    <span>{count} left</span>
                    <span>{description}</span>
                </>
            }

            actionIcon={
                <>
                    <IconButton aria-label={`Info about ${name}`}>
                        <NavLink to={`/products/${id}`}>
                            <InfoIcon/>
                        </NavLink>
                    </IconButton>
                    <IconButton edge="end" aria-label="delete"
                        onClick={deleteAction.bind(null, item.id)}
                    >
                        <DeleteIcon/>
                    </IconButton>
                </>
            }
        />
    </GridListTile>
}
