const Dashboard = require('../../models/administration/dashboard.model')
const express = require('express')

exports.create = (req,res)=>{
    if(!req.body.name){
        res.status(400).json({
            message:"Name cannot be blank"
        })
    }
    let dashboard = new Dashboard({
        name:req.body.name
    })
    dashboard
    .save(dashboard)
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message: err ||'Some Error Occurred while saving dashboard'
        })
    })
}
exports.readAll = (req,res)=>{
    Dashboard
    .find()
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message : err ||'SomeError Occurred while reading dashboards'
        })
    })
}

