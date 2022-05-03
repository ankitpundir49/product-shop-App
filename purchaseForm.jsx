import React,{Component} from "react";
import http from "./httpService.js";
class AddPurchase extends Component
{   state=
    {   purchase:{"shopid":"","productid":"","quantity":"","price":""},
        products:[],
        shops:[],
    }
    async componentDidMount()
    {   this.fetchData();
    }
    async fetchData()
    {   const{id}=this.props.match.params;
        console.log(id);
        let response1=await http.get(`/products`);
        let response2=await http.get(`/shops`);
        this.setState({products:response1.data,shops:response2.data});
        if(id)
        {   let response=await http.get(`/purchases/${id}`);
            let {data}=response;
            this.setState({purchase:data,edit:true});
            console.log(data,this.state.edit)
            
        }
        else
        {   let purchase={"shopid":"","productid":"","quantity":"","price":""};
            this.setState({purchase:purchase,edit:false});
        }
    }
    handleChange=(e)=>
    {   const {currentTarget:input}=e;
        let s1={...this.state};
        s1.purchase[input.name]=+input.value;
        this.setState(s1);
    }
    async postData(url,obj)
    {   let response=await http.post(url,obj);
        this.props.history.push("/purchases");
    }
    async putData(url,obj)
    {   let response=await http.put(url,obj);
        this.props.history.push("/purchases");
    }
    handleSubmit=(e)=>
    {   e.preventDefault();
        let{edit,purchase}=this.state;
        console.log(edit,purchase);
        edit?this.putData(`/purchases/${purchase.purchaseId}`,purchase)
        :this.postData("/purchases",purchase);
    }
    makeR=(arr,value,name)=>
     (  <React.Fragment>
            {arr.map((d1)=>(
            <React.Fragment>
                    <input
                    type="radio"
                    className="form-radio-input"
                    name={name}
                    value={value===d1?d1:d1}
                    checked={value===d1?d1:false}
                    onChange={this.handleChange}
                    />{d1}
            </React.Fragment>))}
        </React.Fragment> 
    )
    makeDrop=(arr,value,name,lable)=>
     (  <div className="">
         {console.log(arr)}
            <select 
            className="form-control"
            name={name}
            value={value}
            onChange={this.handleChange}
            >
                <option value="">{lable}</option>
                {arr.map((opt,index)=>(
                    <option>{opt}</option>
                ))}
            </select>
        </div>
    )
    getDifferentValue=(arr,name)=>
       arr.reduce((acc,curr)=>
       acc.find(val=>val===curr[name])?acc:[...acc,curr[name]],[])
    render()
    {   let{products,shops}=this.state;
        let{productid,shopid,quantity,price}=this.state.purchase;
        return(
            <div className="container">
                 <div className="form-group">
                    <lable>Product Id</lable><br/>
                    {this.makeDrop(this.getDifferentValue(products,"productid"),productid,"productid","Select Product")}
                </div>
                <div className="form-group">
                    <lable>Shop Id</lable><br/>
                    {this.makeDrop(this.getDifferentValue(shops,"shopid"),shopid,"shopid","Select Shop")}
                </div>
                <div className="form-group">
                    <lable>Purchase Quantity</lable>
                    <input
                    type="text"
                    className="form-control"
                    id="quantity"
                    name="quantity"
                    value={quantity}
                    onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <lable>Purchase Price</lable>
                    <input
                    type="text"
                    className="form-control"
                    id="price"
                    name="price"
                    value={price}
                    onChange={this.handleChange}
                    />
                </div>
                <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
            </div>
        )

    }

}export default AddPurchase;
