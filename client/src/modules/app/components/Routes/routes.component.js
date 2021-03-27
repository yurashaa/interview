import {Route, Switch, Redirect, Router} from 'react-router-dom';
import {Products} from '../../pages/Products';
import {CertainProduct} from '../../pages/CertainProduct';

export const Routes = () => {
    return (
            <Switch>
                <Route exact path='/products/:id' component={CertainProduct}/>

                <Route exact path='/products' component={Products}/>

                <Route path='*'>
                    <Redirect to={'/products'}/>
                </Route>
            </Switch>
    )
}
