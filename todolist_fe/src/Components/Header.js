import React, { useState,useEffect } from "react";
import './Header.css';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Heading,
  Stack,
} from '@chakra-ui/react';
import { auth } from "../firebase-config";
import {
    signOut
    } from "firebase/auth"
import { useNavigate } from "react-router-dom";

const Header = ()=>{
    const[user,setuser]=useState({})
    // const navigate = useNavigate();
    // const [isSignedIn, setIsSignedIn] = useState(true);
    // useEffect(()=>{
    //     auth.onAuthStateChanged((user)=>{
    //         if(user){
    //             setuser(user)
    //             setIsSignedIn(true)
    //         }else{
    //           setIsSignedIn(false)
    //         }
    //     })
    // })

    const logout = async ()=>{
        await signOut(auth)
        console.log(auth)
    }

    return(
        <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <Box>Logo</Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
            </HStack>
          </HStack>
          <Heading color='teal'>Todo List Website</Heading>
          {/* <p>Hello {user.email}</p> */}
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://avatars.dicebear.com/api/male/username.svg'
                  }
                />
              </MenuButton>
              <MenuList>
                {/* <MenuItem>{user.email}</MenuItem>
                <MenuDivider /> */}
                <MenuItem onClick={logout}>SignOut</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </>
    )
}

export default Header