import React, {useEffect, useState} from 'react';
import {
  NativeBaseProvider,
  Box,
  Flex,
  ScrollView,
  Fab,
  Modal,
  FormControl,
  Input,
  Button,
  Center,
  HStack,
} from 'native-base';
import Icon from 'react-native-vector-icons/dist/Feather';
import axios from 'axios';
import {ActivityIndicator, Text} from 'react-native';
import {primary, primaryColor, URL} from '../../Constants';

export default function Products() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  const [modal, showModal] = useState(false);
  const getProducts = async () => {
    const result = await axios.get(`${URL}/products/all-products`);
    setProducts(result.data);
    setFilterProduct(result.data);
    setLoading(false);
  };

  const handleSearch = e => {
    console.log('Something');
    setFilterProduct(
      products.filter(product =>
        product.Name.toLowerCase().includes(e.toLowerCase()),
      ),
    );
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <NativeBaseProvider>
      {loading ? (
        <Center alignSelf="center" justifyContent="center" my="auto">
          <ActivityIndicator
            size="large"
            color={primaryColor}></ActivityIndicator>
        </Center>
      ) : (
        <Box bgColor="white">
          <Box
            px={1}
            width="99%"
            my={2}
            borderRadius="10"
            height="16"
            mx="auto"
            bgColor="white">
            <Input
              px={2}
              height="100%"
              onChangeText={handleSearch}
              placeholder="Search Products"
              borderRadius="10"
              InputRightElement={
                <Box marginRight={4} marginTop={1}>
                  <Icon size={20} name="search" />
                </Box>
              }
            />
          </Box>
          <ScrollView>
            <Box bg="white" height="200%" p={2} mx="auto" rounded="lg">
              <Flex direction="row" width="100%" flexWrap="wrap">
                {filterProduct.map(product => {
                  return (
                    <HStack
                      display="flex"
                      alignItems="center"
                      m="auto"
                      justifyContent="space-between"
                      bg="white"
                      shadow={1}
                      width="100%"
                      m={1}
                      p={3}
                      rounded="sm">
                      <Text>{product.Name} </Text>
                      <Text style={{color: 'green'}}>{product.MRP}/- </Text>
                    </HStack>
                  );
                })}
              </Flex>
              <Modal isOpen={modal} onClose={() => showModal(false)}>
                <Modal.Content maxWidth="400px">
                  <Modal.CloseButton />
                  <Modal.Header>Add Customer</Modal.Header>
                  <Modal.Body>
                    <FormControl>
                      <FormControl.Label width="100%">
                        Product Name
                      </FormControl.Label>
                      <Input />
                    </FormControl>
                    <FormControl>
                      <FormControl.Label width="100%">MRP</FormControl.Label>
                      <Input type="number" />
                    </FormControl>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button.Group space={2}>
                      <Button
                        variant="ghost"
                        colorScheme="blueGray"
                        onPress={() => {
                          showModal(false);
                        }}>
                        <Text>Cancel</Text>
                      </Button>
                      <Button
                        onPress={() => {
                          showModal(false);
                        }}>
                        <Text style={{color: 'white'}}>Add</Text>
                      </Button>
                    </Button.Group>
                  </Modal.Footer>
                </Modal.Content>
              </Modal>
              <Fab
                onPress={() => showModal(true)}
                placement="bottom-right"
                bgColor={primary}
                size="16"
                icon={<Icon name="plus" size={30} color="white" />}
              />
            </Box>
          </ScrollView>
        </Box>
      )}
    </NativeBaseProvider>
  );
}
