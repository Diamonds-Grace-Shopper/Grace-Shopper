const { response } = require('express');
const express = require('express');
const app = express();
const { getAllProducts, getProducts, } = require('../db')

app.use(express.static('public'));

app.get("/", function (req, res){
    response.sendFile(__dirname + '/views/index.html');
});

//POST goes here

//Simple in-memory store for now 
const Storage = {
    add: function(name) {
        const item = {name: name, id: this.setId};
        this.items.push(item);
        this.setId +=1;
        return item;
    }
};

const createStorage = () => {
    const storage = Object.create(Storage);
    storage.items = [];
    storage.setId = 1;
    return storage;
}

storage = createStorage();

storage.add('');
storage.add('');
storage.add('');

//Request Listener
const listener = app.listen(process.env.PORT, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});