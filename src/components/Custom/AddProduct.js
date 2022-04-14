import React, {useEffect, useRef, useState} from 'react';
import {
  Box,
  Input,
  HStack,
  Avatar,
  Button,
  FormControl,
  ScrollView,
} from 'native-base';
import {Text, TouchableOpacity, Pressable} from 'react-native';
import {primary} from '../Constants';

export default function AddProduct({
  itemName,
  setItemName,
  products,
  rate,
  setRate,
  qty,
  setQty,
  calculateTotal,
  handleEnter,
}) {
  const qtyRef = useRef();
  const [selectedItem, setSeletecItem] = useState();
  const [selected, setSelected] = useState(false);
  const [filteredProd, setFilterProd] = useState([]);
  const [err, setErr] = useState();
  const [showList, setShowList] = useState(false);

  const handleChange = e => {
    //setSelected(false);
    if (e.length > 0) {
      console.log(e);
      let tempList = [];
      products.map(product => {
        if (!product.Name.toLowerCase().includes(e.toLowerCase())) {
          setItemName(e);
          setShowList(false);
          // return;
        } else {
          setShowList(true);
          tempList.push(product);
          try {
            setFilterProd(tempList);
          } catch (err) {
            console.log(err);
          }
        }
      });
    } else {
      setFilterProd([]);
      // setShowList(false);
    }
  };
  const handleItemSelect = prod => {
    setSelected(true);
    setItemName(prod.Name);
    setRate(prod.MRP);
    setShowList(false);
    qtyRef.current.focus();
  };
  useEffect(() => {
    console.log({showList});
  }, [showList]);

  const ItemSuggestion = () => {
    return (
      <Box
        maxHeight="170"
        overflow="hidden"
        bgColor="white"
        width="67%"
        position="absolute"
        left="24%"
        top="25%"
        zIndex={1}
        borderWidth={1}>
        <ScrollView keyboardShouldPersistTaps={true}>
          {filteredProd.map(prod => {
            return (
              <Pressable onPress={() => handleItemSelect(prod)}>
                <Box
                  borderBottomWidth="1"
                  borderBottomColor="blueGray.200"
                  py={2}>
                  <Text>{prod.Name}</Text>
                </Box>
              </Pressable>
            );
          })}
        </ScrollView>
      </Box>
    );
  };

  return (
    <Box
      width="100%"
      bgColor="white"
      display={'flex'}
      py={4}
      px={1}
      rounded={1}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>
        Enter Product Details
      </Text>
      <FormControl>
        <HStack p={2} width="100%">
          <FormControl.Label marginTop={3} width="20%">
            <Text>Item Name</Text>
          </FormControl.Label>
          <Input
            isRequired
            value={itemName}
            onChangeText={handleChange}
            backgroundColor="white"
            width="70%"
          />
          <FormControl.ErrorMessage>Name is required</FormControl.ErrorMessage>
        </HStack>
        {showList && <ItemSuggestion />}

        <HStack p={2} width="100%">
          <FormControl.Label marginTop={3} width="20%">
            <Text>Rate</Text>
          </FormControl.Label>
          <Input
            isRequired
            value={rate}
            keyboardType="number-pad"
            onChangeText={e => {
              setRate(e);
              calculateTotal();
            }}
            backgroundColor="white"
            width="25%"
          />

          <FormControl.Label marginLeft={6} marginTop={3} width="10%">
            <Text>Qty</Text>
          </FormControl.Label>
          <Input
            isRequired
            value={qty}
            ref={qtyRef}
            keyboardType="number-pad"
            onChangeText={e => {
              setQty(e);
              calculateTotal();
            }}
            backgroundColor="white"
            width="25%"
          />
        </HStack>
        <HStack p={2} width="100%">
          <FormControl.Label marginTop={3} width="20%">
            <Text>Total</Text>
          </FormControl.Label>
          <Input
            isRequired
            value={(rate * qty).toString()}
            isDisabled={true}
            backgroundColor="white"
            width="70%"
          />
        </HStack>
        <Button
          onPress={handleEnter}
          alignSelf={'center'}
          width="100%"
          bgColor={primary}
          color="white">
          <Text style={{color: 'white'}}>Enter</Text>
        </Button>
      </FormControl>
    </Box>
  );
}
