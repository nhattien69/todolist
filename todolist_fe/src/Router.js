import React, { Component } from 'react'
import { BrowserRouter, Route,Routes, Link, NavLink, Switch, Router } from "react-router-dom";
import AddTodo from "./Components/AddTodo";
import EditTodo from './Components/EditTodo';
import HomePage from "./Components/HomePage"
import Login from './Components/Login';


const RouterApp = ()=>{
    return(
        <div>
            <Routes>
                <Route path="*" element={<HomePage/>} exact />
                <Route path="/Addtodo" element={< AddTodo />} exact />
                <Route path="/Edittodo/:id" element={< EditTodo />} exact />
                <Route path="/Login/*" element={<Login/>} exact />
            </Routes>
            
        </div>
    )
}

export default RouterApp