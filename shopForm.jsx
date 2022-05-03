import React,{Component} from "react";
import http from "./httpService.js";
class Addshop extends Component
{   state=
    {   shop:{"name":"","rent":""},
    }
    async componentDidMount()
    {   this.fetchData();
    }
    async fetchData()
    {   const{id}=this.props.match.params;
        console.log(id);
        if(id)
        {   let response=await http.get(`/shops/${id}`);
            let {data}=response;
            this.setState({shop:data,edit:true});
            console.log(data,this.state.edit)
            
        }
        else
        {   let shop={"name":"","rent":""};
            this.setState({shop:shop,edit:false});
        }
    }
    handleChange=(e)=>
    {   const {currentTarget:input}=e;
        let s1={...this.state};
        input.name==="rent"?
        s1.shop[input.name]=+input.value
        :s1.shop[input.name]=input.value;
        this.setState(s1);
    }
    async postData(url,obj)
    {   let response=await http.post(url,obj);
        this.props.history.push("/shops");
    }
    async putData(url,obj)
    {   let response=await http.put(url,obj);
        this.props.history.push("/shops");
    }
    handleSubmit=(e)=>
    {   e.preventDefault();
        let{edit,shop}=this.state;
        console.log(edit,shop);
        edit?this.putData(`/shops/${shop.shopid}`,shop)
        :this.postData("/shops",shop);
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
            <select 
            className="form-control"
            name={name}
            value={value}
            onChange={this.handleChange}
            >
                <option value="">{lable}</option>
                {arr.map((opt,index)=>(
                    <option onChange={()=>this.props.onSort(index)}>{opt}</option>
                ))}
            </select>
        </div>
    )
    getDifferentValue=(arr,name)=>
       arr.reduce((acc,curr)=>
       acc.find(val=>val===curr[name])?acc:[...acc,curr[name]],[])
    render()
    {   let{name,rent}=this.state.shop;
        return(
            <div className="container">
                <div className="form-group">
                    <lable>shop Name</lable>
                    <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={name}
                    onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <lable>shop Rent</lable>
                    <input
                    type="text"
                    className="form-control"
                    id="rent"
                    name="rent"
                    value={rent}
                    onChange={this.handleChange}
                    />
                </div>
                <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
            </div>
        )

    }

}export default Addshop;
