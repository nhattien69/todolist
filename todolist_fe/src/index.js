import React from 'react';
import './index.css';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from '@chakra-ui/react'
import RouterApp from './Router';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
    <ChakraProvider>
      <RouterApp />
    </ChakraProvider>
    </BrowserRouter>
  </StrictMode>
);


