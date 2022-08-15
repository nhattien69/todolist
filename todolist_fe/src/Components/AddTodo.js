import React from "react";
import axios from "axios";
import Header from "./Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input, 
    FormControl,
    FormLabel,
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure 
 } from "@chakra-ui/react";
import { auth } from "../firebase-config";
import { da } from "date-fns/locale";

const AddTodo = () => {
    const[Title,setTitle] = useState("")
    const[Created,setCreated] = useState("")
    const[DueDate,setDueDate] = useState("")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const navigate = useNavigate() 
    const [isSignedIn, setIsSignedIn] = useState(true);
    const useremail = localStorage.getItem("UserEmail")
    const user = localStorage.getItem("UserId")
    const data = {user,Title,Created,DueDate}
    var curr = new Date();
    var date = curr.toISOString().substr(0,10);
    console.log(date)

    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            if(user){
                setIsSignedIn(true)
            }else{
                setIsSignedIn(false)
            }
            console.log(isSignedIn)
        })
    })
    const AddRequesHandle = async ()=>{

        if(DueDate<Created){
            alert('DueDate must be greater than Date Create')
        }else{
            await axios.post(`https://localhost:44330/api/Todoes`, data)
                        .then(res=>{
                            console.log(res)
                            navigate("/")
                        })
                        .catch((err)=>{
                            if(err.message==="Request failed with status code 400"){
                                alert('Can not add Todo. Check value input')
                            }
                        })
        }
    }
    console.log(data)
    if(isSignedIn===false){
        return(
            navigate("/Login/")
        )
    }else{
        return(
            <div id='addTodo'>
                <Header/>
                <FormControl isRequired>
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <Input
                        id='title'
                        type='text'
                        onChange={(e)=> setTitle(e.target.value)}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="datecreate">Date Created</FormLabel>
                    <Input
                        id='datecreate'
                        type='date'
                        onChange={(e)=> setCreated(e.target.value)}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="duedate">Due Date</FormLabel>
                    <Input
                        id='duedate'
                        type='date'
                        onChange={(e)=> setDueDate(e.target.value)}
                    />
                </FormControl>
                <br></br>
                <Button colorScheme='blue' onClick={onOpen}>Add new Todo</Button>
                <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef}>
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Add Todo
                        </AlertDialogHeader>
    
                        <AlertDialogBody>
                            Are you sure you want to add this todo?
                        </AlertDialogBody>
    
                        <AlertDialogFooter>
                            <Button colorScheme='blue' onClick={()=>{AddRequesHandle()}}>
                            Yes
                            </Button>
                            <Button ref={cancelRef} onClick={onClose} ml={3}>
                            No
                            </Button>
                        </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </div>
        )
    }
}

export default AddTodo