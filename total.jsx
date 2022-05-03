import React,{Component}from"react";
import queryString from "query-string";
import http from "./httpService.js";
import { Link } from "react-router-dom";
class TotalPurchase extends Component
{   state=
    {   data:[],
        item:"",
        id:"",
    };
async fetchData()
{   const{id}=this.props.match.params;
    const{item}=this.props.match.params;
    this.setState({item:item,id:id});
    if(id&&item==="product")
    {   let response=await http.get(`/totalpurchase/product/${id}`);
        this.setState({data:response.data});

    }
    else if(id&&item==="shop")
    {   let response=await http.get(`/totalPurchase/shop/${id}`);
        this.setState({data:response.data});
    }
    

}
componentDidMount()
{   this.fetchData();
}
componentDidUpdate(prevProps,prevState)
{   if(prevProps!==this.props) this.fetchData();
}

render()
    {   const{data,item,id}=this.state;
        console.log(data);
        return(
        <div className="container">
            <h1>{item.toUpperCase()} Wise</h1>
            <div className="row">
             {data.map(st=>
                item==="shop"?
                <div className="col-3 border">
                        <p>Shop Id:{id}</p>
                        <p>Product Id:{st.productid}</p>
                        <p>Total Quantity{st.sum}</p>
                </div>
                :<div className="col-3 border">
                    <p>Product Id:{id}</p>
                    <p>Shop Id:{st.shopid}</p>
                    <p>Total Quantity{st.sum}</p>
                </div>
                )}
            </div>
        </div>
        );

    }

}export default TotalPurchase;