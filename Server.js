const express = require(`express`);
const path = require(`path`);
const app = express();
const bodyParser = require(`body-parser`);
const fs = require(`fs`)


app.use(bodyParser.urlencoded({extended:false}))

app.use('/login',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'views','login.html'))
})

app.post('/',(req,res,next)=>{
    console.log(req.body)
    fs.writeFile('username.txt',`${req.body.username} : ${req.body.message}`,{flag:'a'},(err)=> err? console.log(err): res.redirect('/'))
    
})
app.get('/',(req,res,next)=>{
    fs.readFile('username.txt', (err,data)=>{
        if(err){
            data = 'No chat exists'
        }
        res.send(`${data}<form action="/" method="POST" onSubmit="document.getElementById('username').value = localStorage.getItem('username')">
            <label for="message">Message: </label>
            <input placeholder="Enter the Message" name="message" id="message">
            <input type="hidden" name="username" id="username">
            <button type="submit">Send</button>
        </form>`)
    })
})


app.listen(5000, ()=>console.log("running 5000"))