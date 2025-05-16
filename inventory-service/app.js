const express = require('express');
const {response} = require("express");
const {Eureka} = require("eureka-js-client");

const app = express();
const port =  3000;

const router = express.Router();

router.get('/api/v1/inventory', (req, res) => {
    res.json({
        item: ["Milk", "Bread", "Eggs"]
    })
})

app.use("/inventory-service",router);

const client = new Eureka({
    // application instance information
    instance: {
        app: 'INVENTORY-SERVICE',
        hostName: 'localhost',
        ipAddr: '127.0.0.1',
        port: {
            $:port,
            "enabled": true
        },
        vipAddress: 'inventory-service',
        dataCenterInfo: {
            "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
            name: 'MyOwn',
        },
    },
    eureka: {
        hostname: 'localhost',
        port: 8761,
        servicePath: '/eureka/apps/'
    },
});

// http://localhost:3030/inventory-service/api/v1/inventory

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);

    client.start(err => {
        console.log(err);
        if (err){
            console.log("fail to eureka")
        }else{
            console.log("registered with eureka")
        }
    })
});