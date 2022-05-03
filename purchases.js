import React,{Component}from"react";
import queryString from "query-string";
import http from "./httpService.js";
//import axios from "axios";
import { Link } from "react-router-dom";
import LeftPanel from "./leftPanel.jsx";
class Purchases extends Component
{   state=
    {   purchases:[],
        shops:[],
        products:[],
    };
async fetchData()
{   let queryParams=queryString.parse(this.props.location.search)
    let searchStr=this.makeSearchString(queryParams);
    const{id}=this.props.match.params;
    const{item}=this.props.match.params;
    console.log(id,item)
    if(id&&item==="product")
    {   let response=await http.get(`/purchases/product/${id}`);
        this.setState({purchases:response.data});

    }
    else if(id&&item==="shop")
    {   let response=await http.get(`/purchases/shop/${id}`);
        this.setState({purchases:response.data});
    }
    else if(!id && !item)
    {   let response=await http.get(`/purchases?${searchStr}`);
        this.setState({purchases:response.data});
    }
    let response2=await http.get(`/shops`);
    let response3=await http.get(`/products`);
    console.log(this.state.purchases)
    this.setState({shops:response2.data,products:response3.data});

}
componentDidMount()
{   this.fetchData();
}
componentDidUpdate(prevProps,prevState)
{   if(prevProps!==this.props) this.fetchData();
}
callURL=(url,options)=>
    {   let searchString=this.makeSearchString(options);
        this.props.history.push({
            pathname:url,
            search:searchString,
        })
        return searchString;
    }
addToQueryString=(str,paramName,paramValue)=>
       paramValue?
            str?
                `${str}&${paramName}=${paramValue}`
                :`${paramName}=${paramValue}`
            :str;

    
makeSearchString=(options)=>
    {   let {shop,product,sort}=options;
        let searchStr="";
        searchStr=this.addToQueryString(searchStr,"shop",shop);
        searchStr=this.addToQueryString(searchStr,"product",product);
        searchStr=this.addToQueryString(searchStr,"sort",sort);
        return searchStr;
    }
handleOptionChange=(options)=>
    {   this.callURL(`/purchases`,options);
    }
getDifferentValue=(arr,name)=>
    arr.reduce((acc,curr)=>
    acc.find(val=>val===curr[name])?acc:[...acc,curr[name]],[])
render()
    {   const{purchases,shops,products}=this.state;
        let queryParams=queryString.parse(this.props.location.search)
        return(
        <div className="container text-center">
            <div className="row">
                <div className="col-2">
                    <br/><br/>
                    <LeftPanel options={queryParams} shops={this.getDifferentValue(shops,"shopid")} products={this.getDifferentValue(products,"productid")} onOptionChange={this.handleOptionChange}/>
                </div>
            <div className="col-10">
                <h1 className="text-center">Purchases</h1>
                <div className="row bg-dark text-white">
                    <div className="col-2 border">Purchase Id</div>
                    <div className="col-2 border">Shop Id</div>
                    <div className="col-2 border">Product Id</div>
                    <div className="col-3 border">Quantity</div>
                    <div className="col-3 border">Price</div>
                </div>
                {purchases.map((st)=>(
                    <div className="row">
                        <div className="col-2 border">{st.purchaseid}</div>
                        <div className="col-2 border">{st.shopid}</div>
                        <div className="col-2 border">{st.productid}</div>
                        <div className="col-3 border">{st.quantity}</div>
                        <div className="col-3 border">{st.price}</div>
                    </div>
                ))}
                </div>    
            </div>  
        </div>
        );

    }

}export default Purchases;