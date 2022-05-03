import React,{Component}from"react";
import queryString from "query-string";
import http from "./httpService.js";
import { Link } from "react-router-dom";
class Products extends Component
{   state=
    {   products:[],
    };
async fetchData()
{   let queryParams=queryString.parse(this.props.location.search)
    let searchStr=this.makeSearchString(queryParams);
    let response=await http.get(`/products?${searchStr}`);
    this.setState({products:response.data});

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
    {   let {brand}=options;
        let searchStr="";
        searchStr=this.addToQueryString(searchStr,"brand",brand);
        return searchStr;
    }
handleOptionChange=(options)=>
    {   this.callURL(`/shops`,options);
    }
render()
    {   const{products}=this.state;
        return(
        <div className="container">
            <div className="row">
                <div className="col-2">
                    <br/><br/>
                </div>
            <div className="col-10">
                <h1 className="text-center">Products</h1>
                <div className="row bg-dark text-white">
                    <div className="col-2 border">Id</div>
                    <div className="col-2 border">Name</div>
                    <div className="col-2 border">Category</div>
                    <div className="col-3 border">Description</div>
                    <div className="col-1 border"></div>
                    <div className="col-1 border"></div>
                    <div className="col-1 border"></div>
                </div>
                {products.map((st)=>(
                    <div className="row" key={st.id}>
                        <div className="col-2 border">{st.productid}</div>
                        <div className="col-2 border">{st.productname}</div>
                        <div className="col-2 border">{st.category}</div>
                        <div className="col-3 border">{st.description}</div>
                        <div className="col-1 border"><Link to={`/products/${st.productid}/edit`} className=""><button className="btn btn-primary">Edit</button></Link></div>
                        <div className="col-1 border"><Link to={`/purchases/product/${st.productid}`} className=""><button className="btn btn-primary">Purchases</button></Link></div>
                        <div className="col-1 border"><Link to={`/totalPurchases/product/${st.productid}`} className=""><button className="btn btn-primary">Total Purchases</button></Link></div>
                    </div>
                ))}
                </div>    
            </div>  
        </div>
        );

    }

}export default Products;