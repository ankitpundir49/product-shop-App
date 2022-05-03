import React,{Component}from"react";
import { Link } from "react-router-dom";
class LeftPanel extends Component
{   handleChange=(e)=>
    {   let {currentTarget:input}=e;
        let options={...this.props.options};
        input.name==="product"?
        options[input.name]=this.updateCBs(options[input.name],input.checked,input.value)
        :options[input.name]=input.value;
        console.log(input.name,options);
        this.props.onOptionChange(options);
    }
    updateCBs=(inpValue,checked,value)=>{
        console.log(inpValue,checked,value)
        let inpArr=inpValue?inpValue.split(","):[];
        if(checked) inpArr.push(value);
        else
        {   let index=inpArr.findIndex((ele)=>ele===value);
            if(index>=0) inpArr.splice(index,1)
        }
        return inpArr.join(",");
    }
    makeCb=(arr,values,name,lable)=>
     (  <React.Fragment>
         {console.log(arr,values,name)}
        {arr.map((opt)=>
        <div className="form-check" key={opt}>
        <input 
        className="form-check-input"
        name={name}
        value={opt}
        type="checkbox"
        checked={values?values.find(val=>val===opt):false}
        onChange={this.handleChange}
        />
        <lable className="form-check-lable ">{opt}</lable>
     </div>
        )}
     </React.Fragment>
    )
    makeDrop=(arr,value,name,lable)=>
     (  <div className="row roundes border">
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
    render()
    {   let {shops,products}=this.props;
        let {shop="",product="",sort=""}=this.props.options;
        let sorts=["QtyAsc","QtyDesc","ValueAsc","ValueDesc"];
        return(
            <div className="container">
                <div className="container">
                    <div className="row rounded border">
                        <p>product</p>
                    </div>
                    {this.makeCb(products,product.split(","),"product")}
                </div><br/>
                <div className="container">
                    <div className="row rounded border">
                        <p>Shop</p>
                    </div>
                    {this.makeDrop(shops,shop,"shop","Select Shop")}
                </div><br/>
                <div className="container">
                    <div className="row rounded border">
                        <p>Sort</p>
                    </div>
                    {this.makeDrop(sorts,sort,"sort","Select Sort")}
                </div><br/>
            </div>
            
            )
    }

}export default LeftPanel;