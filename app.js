const express = require("express");
const bodyParser = require("body-parser");
const request=require("request");
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

app.post('/',function(req,res){
    var Fname=req.body.Fname;
    var Lname=req.body.Lname;
    var email=req.body.email;
    var password=req.body.password;

    var data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:Fname,
                    LNAME:Lname
                }
            }
        ]
    }
    var jasonFormat=JSON.stringify(data);
    var options = {
        url: "https://us20.api.mailchimp.com/3.0/lists/8676152504",
        method: "POST",
        headers:{
            "Authorization": "Kundan a9713f940536d16ed5c30a4a91ae0987-us20",
        },
        body:jasonFormat
    }

    request(options, function (error, response, body) {
        if (error) {
            console.log(error);
        } else {
            var code=response.statusCode;
            if(code==200){
                res.sendFile(__dirname+"/success.html");
            }
            else{
                res.sendFile(__dirname+"/failure.html");
            }
        }
    });
});


app.listen(process.env.PORT||3000, function () {
    console.log("Port running at 3000");
});

//Apikey
//a9713f940536d16ed5c30a4a91ae0987 - us20

//List id
//8676152504