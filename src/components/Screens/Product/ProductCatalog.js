import React, {useContext, useEffect, useState} from 'react';
import {loginContext} from '../../Contexts/LoginContext';
// 1. import `NativeBaseProvider` component
import {
  Box,
  Divider,
  Heading,
  HStack,
  Input,
  NativeBaseProvider,
  ScrollView,
  SearchIcon,
  Text,
  VStack,
} from 'native-base';
import axios from 'axios';

export default function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [filteredProd,setFilterProd] =useState([]);
  const [showRes,setShowRes] =useState(false);
  const [loading,setLoading] = useState(false);
  const {username, setUsername, email, setEmail} = useContext(loginContext);
 
  const getProducts = async () => {
    const result = await axios.get('http://192.168.0.106:3002/all-products');

    setProducts(result.data);
    setFilterProd(result.data)
  };

  const handleChange =(e)=>{
    if(e.length>0)
    {
      setShowRes(true)
      setLoading(true)
      let tempList =[];
    products.map(product =>{
      if(product.Name.toLowerCase().includes(e.toLowerCase()))
      {
       tempList.push(product);
      }
    })
    setLoading(false)
    setFilterProd(tempList);
   
    }
    else{
      setShowRes(false)
    }
 }
  
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <NativeBaseProvider>
    
      <Box  my="5%" width="90%" alignSelf="center" >
      <Heading>Product Catalog</Heading>
      <Input variant="rounded" width="100%" onChangeText={handleChange} placeholder='Search Product....' />
      <VStack  >
      
          {
            showRes &&   
            <Box  borderRadius=".1" p={1}  overflow={'scroll'} shadow={1}>
             <ScrollView >
            { !loading ? 
            filteredProd.map(product => {
              return (
                <Box height={10}>
                  <HStack  height="90%" p={1}  bgColor="coolGray.200" width="100%">
                    <Text width="85%">{product.Name}</Text>
                    <Text width="15%">{product.MRP}</Text>
                  </HStack>
                  <Divider height={.5} color="coolGray.500"/>
                </Box>
              );
            })
            : <Box> Loading... </Box>
          }
          </ScrollView>

          </Box>
          }
     
      </VStack>
      </Box>
    </NativeBaseProvider>
  );
}
