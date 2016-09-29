
Web3 = require("web3");


var app = require('express')();
var http = require('http').Server(app);
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));


abi = [{
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{
        name: "",
        type: "string"
    }],
    type: "function"
}, {
    constant: true,
    inputs: [],
    name: "action",
    outputs: [{
        name: "",
        type: "string"
    }],
    type: "function"
}, {
    constant: false,
    inputs: [{
        name: "_value",
        type: "bool"
    }],
    name: "setAction",
    outputs: [],
    type: "function"
}, {
    constant: false,
    inputs: [],
    name: "getAction",
    outputs: [{
        name: "action_state",
        type: "bool"
    }],
    type: "function"
}, {
    constant: false,
    inputs: [{
        name: "_actorAddress",
        type: "address"
    }, {
        name: "_level",
        type: "string"
    }],
    name: "setLevel",
    outputs: [],
    type: "function"
}, {
    constant: false,
    inputs: [{
        name: "_actorAddress",
        type: "address"
    }],
    name: "transferOwner",
    outputs: [],
    type: "function"
}, {
    constant: false,
    inputs: [{
        name: "_actorAddress",
        type: "address"
    }],
    name: "removeActor",
    outputs: [],
    type: "function"
}, {
    constant: false,
    inputs: [],
    name: "destroy",
    outputs: [],
    type: "function"
}, {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [{
        name: "",
        type: "address"
    }],
    type: "function"
}, {
    constant: true,
    inputs: [],
    name: "action_state",
    outputs: [{
        name: "",
        type: "bool"
    }],
    type: "function"
}, {
    constant: true,
    inputs: [{
        name: "",
        type: "address"
    }],
    name: "actors",
    outputs: [{
        name: "",
        type: "uint256"
    }],
    type: "function"
}, {
    inputs: [{
        name: "_action",
        type: "string"//Bad sanitizing. Hackathon POC no security 
    }, {
        name: "_action_state",
        type: "bool"
    }, {
        name: "_name",
        type: "string"
    }],
    type: "constructor"
}];






app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});


app.get('/lightbulb', function(req, res){

res.send("lightbulb");
});


app.get('/block_number', function(req, res){


res.send(web3.eth.blockNumber.toString());

});


app.get('/status', function(req, res){


q = req.query.q
//Bad sanitizing. Hackathon POC no security in place. 


var MyContract = web3.eth.contract(abi);


//~ var myContractInstance = MyContract.at('0xE8eb35AFBA98fdE9071308b4F7cfB844EE5bf666');
//Bad sanitizing. Hackathon POC no  security in place. 
var myContractInstance = MyContract.at(q);


action_state = myContractInstance.action_state();
name = myContractInstance.name();



res.send(action_state.toString());

});

app.get('/test', function(req, res){

q = req.query.q
res.send(q.toString());

});



http.listen(3000, function(){
  console.log('listening on *:3000');
});
