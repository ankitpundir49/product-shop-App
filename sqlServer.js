

let express=require("express");
let app=express();
app.use(express.json());
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET,PosT,OPTIONS,PUT,PATCH,DELETE,HEAD"
    );
    res.header(
        "Access-Control-Allow-Header",
        "Origin,X-Requested-with,Content-Type,Accept"
    );
    next();
});

var port = process.env.PORT || 2410;



const { Client } = require("pg");
const client = new Client({
    user: "icrcqtpgajgqev",
    password:"18aa1f90f7dda1aadcc72dcd58918f417ca166954eeabdb74bcd60bfe8d64ea0",
    database:"dae35vqp7tpvhs",
    port: 5432,
    host: "ec2-34-228-154-153.compute-1.amazonaws.com",
    ssl: { rejectUnauthorized: false },});
client.connect(function (res, error) 
{console.log(`Connected!!!`);});  
app.get("/shops",function(req,res){
    const query = ` SELECT * From shops`;
    client.query(query, function (err, result) {
        if (err) { res.status(400).send(err);}
        res.send(result.rows);
    });
})
app.get("/products",function(req,res){
    const query = ` SELECT * From products`;
    client.query(query, function (err, result) {
        if (err) { res.status(400).send(err);}
        res.send(result.rows);
    });
})
app.get("/products/:id",function(req,res){
    let id=+req.params.id;
    const query = ` SELECT * From products where productid=$1`;
    client.query(query,id,function (err, result) {
        if (err) { res.status(400).send(err);}
        res.send(result.rows);
    });
})
app.get("/purchases",function(req,res){
    let shopStr=req.query.shop;
    let productStr=req.query.product;
    let sort=req.query.sort;
    let query = ` SELECT * From purchases`;
    let arr=[];
    if(shopStr)
    {   arr.push(shopStr);
        console.log(arr);
        query+=!productStr&&!sort?` where  shopid in (${arr[0]})`:` where shopid in (${arr[0]})`;
    }
    if(productStr)
    {   arr.push(productStr);
        query+=!shopStr&&!sort?` where productid in (${arr[0]})`:` AND  productid in (${arr[1]})`;
        
    }
    if(sort==="QtyAsc")
    {   query+=` order by quantity ASC`;
    }
    if(sort==="QtyDesc")
    {   query+=` order by quantity DESC`;
    }
    if(sort==="ValueAsc")
    {   query+=` order by price*quantity ASC`;
    }
    if(sort==="ValueDesc")
    {   query+=` order by price*quantity DESC`;
    }
    console.log(query);    
    client.query(query,function (err, result) {
    if (err) { res.status(400).send(err);}
    res.send(result.rows);
    });
})
app.get("/purchases/shop/:id",function(req,res){
    let id=+req.params.id;
    console.log(id);
    const query = ` SELECT * From purchases where shopid=$1`;
    client.query(query,[id],function (err, result) {
        if (err) { res.status(400).send(err);}
        res.send(result.rows);
    });
})
app.get("/purchases/product/:id",function(req,res){
    let id=+req.params.id;
    console.log(id);
    const query = ` SELECT * From purchases where productid=$1`;
    client.query(query,[id],function (err, result) {
        if (err) { res.status(400).send(err);}
        res.send(result.rows);
    });
})
app.get("/totalPurchase/shop/:id",function(req,res){
    let id=+req.params.id;
    console.log(id);
    const query = `SELECT productid,sum(quantity*price) From purchases where shopid=$1 group by productid`;
    client.query(query,[id],function (err, result) {
        if (err) { res.status(400).send(err);}
        res.send(result.rows);
    });
})
app.get("/totalPurchase/product/:id",function(req,res){
    let id=+req.params.id;
    console.log(id);
    const query = `SELECT shopid,sum(quantity*price) From purchases where productid=$1 group by shopid`;
    client.query(query,[id],function (err, result) {
        if (err) { res.status(400).send(err);}
        res.send(result.rows);
    });
})
app.post("/shops",function(req,res){
    var values = Object.values(req.body);
    let query="INSERT INTO shops (name,rent) VALUES ($1,$2)";
    console.log(values);
    client.query(query,values,function(err,result){
    if(err) res.status(404).send(err);
    else res.send(result.rows);
    })
})
app.post("/products",function(req,res){
    var values = Object.values(req.body);
    let query="INSERT INTO products (productname,category,description) VALUES ($1,$2,$3)";
    console.log(values);
    client.query(query,values,function(err,result){
    if(err) res.status(404).send(err);
    else res.send(result.rows);
    })
})
app.post("/purchases",function(req,res){
    var values = Object.values(req.body);
    let query="INSERT INTO purchases (shopid,productid,quantity,price) VALUES ($1,$2,$3,$4)";
    client.query(query,values,function(err,result){
    if(err) res.status(404).send(err);
    else res.send(result.rows);
    })
})
app.put("/products/:id", function (req, res, next) {
    let p=req.body;
    let id=+req.params.id;
    console.log(body,id)
    let query="update products Set productname=$1,category=$2,description=$3 where productid=$4";
    client.query(query,[p.productname,p.category,p.description,id],function(err,result){
        if(err) res.send(err);
        else res.send(p);
    }) 
});
const cors=require("cors");
app.use(cors());
app.listen(port,()=>console.log(`Node app listening on port ${port}!`))