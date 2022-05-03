import React,{Component} from "react";
import http from "./httpService.js";
class Addproduct extends Component
{   state=
    {   product:{productid:"",productname:"",category:"",description:""},
    }
    async componentDidMount()
    {   this.fetchData();
    }
    async fetchData()
    {   const{id}=this.props.match.params;
        console.log(id);
        if(id)
        {   let response=await http.get(`/products/${id}`);
            let {data}=response;
            this.setState({product:data[0],edit:true});
            console.log(this.state.product)
            
            
        }
        else
        {   let product={productid:"",productname:"",category:"",description:""};
            this.setState({product:product,edit:false});
        }
    }
    handleChange=(e)=>
    {   const {currentTarget:input}=e;
        let s1={...this.state};
        s1.product[input.name]=input.value;
        this.setState(s1);
    }
    async postData(url,obj)
    {   let response=await http.post(url,obj);
        this.props.history.push("/products");
    }
    async putData(url,obj)
    {   let response=await http.put(url,obj);
        this.props.history.push("/products");
    }
    handleSubmit=(e)=>
    {   e.preventDefault();
        let{edit,product}=this.state;
        console.log(edit,product.productid);
        edit?this.putData(`/products/${product.productid}`,product)
        :this.postData("/products",product);
    }
    render()
    {   let{edit}=this.state;
        let{productname,category,description}=this.state.product;
        return(
            <div className="container">
                <div className="form-group">
                    <lable>Product Name</lable>
                    <input
                    type="text"
                    className="form-control"
                    id="productname"
                    name="productname"
                    value={productname}
                    onChange={this.handleChange}
                    disabled={edit?true:false} />
                    
                </div>
                <div className="form-group">
                    <lable>Product Category</lable>
                    <input
                    type="text"
                    className="form-control"
                    id="category"
                    name="category"
                    value={category}
                    onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <lable>Product Description</lable>
                    <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={description}
                    onChange={this.handleChange}
                    />
                </div>
                <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
            </div>
        )

    }

}export default Addproduct;
