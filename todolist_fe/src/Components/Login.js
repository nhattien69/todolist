import React, { useEffect, useState } from "react";
import './Login.css';
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Heading,
    Alert,
    AlertIcon,
    CloseButton
  } from '@chakra-ui/react'
import Header from "./Header";
import {createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
    } from "firebase/auth"
import { auth } from "../firebase-config";
import { Route,Routes } from "react-router-dom";
import HomePage from "./HomePage"
import { render } from "@testing-library/react";


const Login = ()=>{
    
    const [Email,setRegisterEmail]=useState("")
    const [Password,setRegisterPass]=useState("")
    const [RePassword,setRegisterRePass]=useState("")
    const [loginEmail,setLoginEmail]=useState("")
    const [loginPass,setLoginPass]=useState("")
    const [isSignedIn, setIsSignedIn] = useState(true);
    const ggProvider = new GoogleAuthProvider()

    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            if(user){
                setIsSignedIn(true)
                localStorage.setItem("UserId",user.uid)
                localStorage.setItem("UserEmail",user.email)
            }else{
                setIsSignedIn(false)
            }
        })
    })
    //Register
    const register = async ()=>{

        if(Password !== RePassword){
            alert("Password not match")
        }else{
            try{
                await createUserWithEmailAndPassword(auth, Email, Password).then(res=>{
                    alert('Register Success')
                    console.log(res)
                }).catch((err)=>{
                    if(err.message==="Firebase: Error (auth/email-already-in-use)."){
                        alert('Email already in use')
                    }else if(err.message==="Firebase: Error (auth/internal-error)."){
                        alert('Please Enter Password')
                    }else if(err.message==="Firebase: Password should be at least 6 characters (auth/weak-password)."){
                        alert('Password should be at least 6 characters')
                    }else if(err.message==="Firebase: Error (auth/invalid-email)."){
                        alert('Invalid Email')
                    }else{
                        console.log(err.message)
                    }
                })
    
            }catch(err){
                console.log(err)
            }
        }
    }
    //Login email
    const login = async ()=>{
        try{
            await signInWithEmailAndPassword(auth, loginEmail, loginPass).then(res=>{
                console.log(res)
            }).catch((err)=>{
                if(err.message==="Firebase: Error (auth/invalid-email)."){
                    alert('Email Invalid')
                }else if(err.message==="Firebase: Error (auth/user-not-found)."){
                    alert('Email not found')
                }else if(err.message==="Firebase: Error (auth/internal-error)."){
                    alert('Please Enter Password')
                }else if(err.message==="Firebase: Error (auth/wrong-password)."){
                    alert('Wrong Password')
                }else{
                    console.log(err.message)
                }
            })
        }catch(err){
            console.log(err)
        }
    }

    //Login gg
    const loginWithGg = ()=>{
        signInWithPopup(auth, ggProvider).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    }

    if(isSignedIn===true){
        return(
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        )
    }else{
        return(
            <>
                <Header/>
                <Heading textAlign='center' size='lg' fontSize='50px' color='teal' >
                    Register
                </Heading>
                <FormControl isRequired>
                    <FormLabel htmlFor='Email'>Email</FormLabel>
                    <Input id='Email' type='email' placeholder='Email' onChange={(e)=>{setRegisterEmail(e.target.value)}} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor='Password' >Password</FormLabel>
                    <Input id='Password' type='password' placeholder='Password' onChange={(e)=>{setRegisterPass(e.target.value)}} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor='RePassword' >RePassword</FormLabel>
                    <Input id='RePassword' type='password' placeholder='RePassword' onChange={(e)=>{setRegisterRePass(e.target.value)}} />
                </FormControl>
                <br></br>
                <Button onClick={register} colorScheme='teal' >Register</Button>
    
                <Heading textAlign='center' size='lg' fontSize='50px' color='teal' >
                    Login
                </Heading>
                <FormControl isRequired>
                    <FormLabel htmlFor='email'>Email</FormLabel>
                    <Input id='emailLogin' type='email' placeholder='Email' onChange={(e)=>{setLoginEmail(e.target.value)}} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor='password' >password</FormLabel>
                    <Input id='passwordLogin' type='password' placeholder='Password' onChange={(e)=>{setLoginPass(e.target.value)}} />
                </FormControl>
                <div id='alert-login'></div>
                <br></br>
                <Button onClick={login} colorScheme='teal' >Login</Button>
                <br></br>
                <Button className="login-with-google-btn" onClick={loginWithGg}>Login With Google</Button>
            </>
        )
    }
}

export default Login;