import './HomePage.css';
import React, { useEffect } from 'react';
import axios from 'axios';
import Header from './Header'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Checkbox,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure 
} from '@chakra-ui/react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import moment from "moment";

const TodoList=()=>{

  const navigate = useNavigate();
  const [todoes,setTodo] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const [isSignedIn, setIsSignedIn] = useState(true);
  const userid = localStorage.getItem("UserId")
  const useremail = localStorage.getItem("UserEmail")
  //console.log(userid)

  //delete todo
  const DelTodo= async (id)=>{
    await axios.delete(`https://localhost:44330/api/Todoes/${id}`)
    window.location.reload(true)
  }
  //get todo
  const GetTodo= async ()=>{

    await axios.get(`https://localhost:44330/api/Users/${userid}/todoes`)
                .then(res => {
                  const todoes = res.data;
                  setTodo({ todoes: todoes });
                })
                .catch(error => console.log(error));

  }
  useEffect(()=>{
    GetTodo();
  },[])

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
  if(isSignedIn===false){
    return(
      navigate("/Login/")
    )
    
  }else{
    return(
      <div className="App">
      <Header />
        <TableContainer id='todolist' >
          <Table variant='striped' colorScheme='teal'>
            <TableCaption fontSize='4xl' placement="top">This Is Your Todo List</TableCaption>
            <Thead>
              <Tr key='0'>
                <Th>STT</Th>
                <Th>Title</Th>
                <Th>Completed</Th>
                <Th>Created</Th>
                <Th>DueDate</Th>
                <Th>Perform</Th>
                <Th>Remove from list</Th>
                <Th>Edit</Th>
              </Tr>
            </Thead>
            <Tbody id="todoes_table">
                {todoes.todoes?.map((todo,index)=>(
                  <><Tr key={index}>
                      <Td>{index + 1}</Td> 
                      <Td>{todo.Title}</Td>
                      <Td>{<Checkbox  size='lg' colorScheme='teal' isDisabled isChecked={todo.Completed}>
                      </Checkbox>}
                      </Td>
                      <Td>{moment(todo.Created).format('DD-MM-YYYY')}</Td>
                      <Td>{moment(todo.DueDate).format('DD-MM-YYYY')}</Td>
                      <Td>{todo.Perform}</Td>
                      <Td><Button colorScheme='red' onClick={onOpen}>Remove</Button></Td>
                      <Td><Button colorScheme='teal' onClick={() => { navigate("/Edittodo/" + `${todo.Id}`); } }>Edit</Button></Td>
                      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef}>
                        <AlertDialogOverlay>
                          <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                              Delete Todo
                            </AlertDialogHeader>

                            <AlertDialogBody>
                              Are you sure? You can't undo this action.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                              <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                              </Button>
                              <Button colorScheme='red' onClick={()=>{DelTodo(todo.Id)}} ml={3}>
                                Delete
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialogOverlay>
                      </AlertDialog>
                  </Tr>
                  </>
                ))
                }
            </Tbody>
            
          </Table>
        </TableContainer>
        <br/>
        <Button colorScheme='blue' onClick={()=>{navigate("/Addtodo")}}>Add New Todo</Button>
    </div>
    )
  }
  
}

export default TodoList;