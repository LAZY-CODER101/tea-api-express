import dotenv from 'dotenv'
import express from 'express'


const app = express()


const port = process.env.port || 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;


//adding in array
app.post('/addtea',(req,res) => {
    const {name , price} = req.body
    const newTea = {id: nextId++,name,price}
    teaData.push(newTea);
    res.status(200).send(newTea)
})
//list
app.get('/tea',(req,res)=>{
    res.status(200).send(teaData);
})

//list one
app.get('/tea/:id',(req,res)=>{
   const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send("tea not found");
    }else{
        res.status(201).send(tea);
    }
})
//update

app.put('/tea/:id',(req,res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send("tea not found");
    }else{
        const {name,price} = req.body
        tea.name=name
        tea.price=price
        res.status(202).send(tea);
    }
})

app.delete('/tea/:id',(req,res)=>{
   const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
   if(index === -1){
    return res.status(404).send(`tea not found`)
   }
   else{
    let deletedTea = teaData.splice(index,1);
    return res.status(203).send(`deleted ${deletedTea}`);
   }
})


app.listen(port,() => {
    console.log(`Server is listenig at ${port}`);
    
})