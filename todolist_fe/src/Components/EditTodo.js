import React from "react";
import axios from "axios";
import Header from './Header'
import { useState, useEffect } from "react";
import { Input, 
    FormControl,
    FormLabel,
    Button,
    Checkbox,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
 } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { set } from "date-fns";

function EditTodo() {

    const [todo,setTodo]=useState([])
    const [Id,setID]=useState()
    const [Title,setTitle]=useState("")
    const [Completed,setCompleted]=useState("")
    const [Created,setCreated]=useState("")
    const [DueDate,setDueDate]=useState("")
    const [Perform,setPerform]=useState()
    const mCreate = moment(todo.Created).format('YYYY-MM-DD')
    const mDueDate = moment(todo.DueDate).format('YYYY-MM-DD')
    const user = localStorage.getItem("UserId")
    const data = {Id,user,Title,Completed,Created,DueDate,Perform}
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const params = useParams()
    const navigate = useNavigate();
    const [isSignedIn, setIsSignedIn] = useState(true);
    const useremail = localStorage.getItem("UserEmail")

    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            if(user){
                setIsSignedIn(true)
            }else{
                setIsSignedIn(false)
            }
        })
    })
    useEffect(()=>{
        GetOneTodo()
        setID(todo.Id)
        setTitle(todo.Title)
        setCompleted(todo.Completed)
        setCreated(mCreate)
        setDueDate(mDueDate)
        setPerform(todo.Perform)
    },[todo.Id,todo.Title,todo.Completed,mCreate,mDueDate,todo.Perform])
    console.log(data)
    //get todo
    const GetOneTodo= async ()=>{
        await axios.get(`https://localhost:44330/api/Todoes/${params.id}`)
                    .then(res => {
                      const todo = res.data;
                      setTodo(todo);
                    })
                    .catch(error => console.log(error));
      }
    //put todo
    const EditTodo= async ()=>{
        if(DueDate<Created){
            alert('DueDate must be greater than Date Create')
        }else{
            await axios.put(`https://localhost:44330/api/Todoes/${params.id}`,data)
            .then(res=>{
                console.log(res)
                navigate("/")
            })
            .catch(err=>{console.log(err.message)})
        }
    }
    
    const setPerformValue = (e)=>{
        if(e.target.value < 0){
            setPerform("0")
        }
        if(0 <= e.target.value <= 100){
            setPerform(e.target.value)
        }if(e.target.value>100){
            setPerform("100")
        }
    }

    const setPerformValid = (e)=>{
        if(e.target.value==true){
            setCompleted(e.target.checked)
        }else{
            setCompleted(e.target.checked)
            setPerform("0")
        }

    }

    if(isSignedIn===false){
        return(
            navigate("/Login/")
        )
    }else{
        return(
            <div>
                <Header/>
                <FormControl isRequired>
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <Input
                        id='title'
                        type='text'
                        defaultValue={todo.Title}
                        onChange={(e)=>{setTitle(e.target.value)}}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="completed">Completed</FormLabel>
                    <Checkbox
                        colorScheme='teal'
                        isChecked={Completed}
                        onChange={setPerformValid}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="datecrete">Date Created</FormLabel>
                    <Input
                        id='datecrete'
                        type='date'
                        defaultValue={Created}
                        onChange={(e)=>{setCreated(e.target.value)}}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="duedate">Due Date</FormLabel>
                    <Input
                        id='duedate'
                        type='date'
                        defaultValue={DueDate}
                        onChange={(e)=>{setDueDate(e.target.value)}}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="perform">Perform</FormLabel>
                        <Input
                            isDisabled={!Completed}
                            id='perform'
                            type='number'
                            defaultValue={Perform}
                            onChange={setPerformValue}
                        />
                </FormControl>
                <br></br>
                <Button colorScheme='teal'onClick={onOpen}>Edit Todo</Button>
                <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef}>
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Add Todo
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to edit this todo?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button colorScheme='teal' onClick={()=>{EditTodo()}}>
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

export default EditTodo