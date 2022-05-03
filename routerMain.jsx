import React,{Component} from "react";
import { Route,Switch,Redirect } from "react-router-dom";
import NavBar from "./navBar";
import AddProduct from "./productForm";
import Products from "./products";
import AddPurchase from "./purchaseForm";
import Purchases from "./purchases";
import Addshop from "./shopForm";
import Shops from "./shops";
import TotalPurchase from "./total";
class MainView extends Component
{   render()
    {   return(
            <div className="container-fluid m-0 p-0">
              <NavBar/>
                <Switch>
                    <Route path="/totalPurchases/:item/:id" component={TotalPurchase}/>
                    <Route path="/purchases/add" component={AddPurchase}/>
                    <Route path="/purchases/:item/:id" component={Purchases}/>
                    <Route path="/purchases" component={Purchases}/>
                    <Route path="/products/:id/edit" component={AddProduct}/>
                    <Route path="/products/add" component={AddProduct}/>
                    <Route path="/products" component={Products}/>
                    <Route path="/shops/add" component={Addshop}/>
                    <Route path="/shops" component={Shops}/>
                    <Redirect from="/" to="/" />
                </Switch>  
            </div>
        )
    }

}export default MainView;