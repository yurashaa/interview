import React from 'react';
import {serverURL} from '../../../../constants';
import {TextField} from '@material-ui/core';
import './description.scss';

const propsNames = ['name', 'description', 'price', 'count'];

export const Description = ({item}) => {

    return (
        <div className={'wrapper'}>
            <img src={`${serverURL}/${item.imageUrl}`} alt=""/>

            <div className={'info'}>
                {propsNames.map(el =>
                    <TextField
                        key={el}
                        label={el}
                        InputProps={{
                            readOnly: true,
                        }}
                        value={item[el]}
                    />
                )}
            </div>
        </div>
    )
}
