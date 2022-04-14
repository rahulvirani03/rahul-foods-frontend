import React, {useState, useEffect} from 'react';

import {
  Box,
  Modal,
  FormControl,
  HStack,
  Button,
  Input,
  useToast,
} from 'native-base';
import {Text, TextInput} from 'react-native';
import axios from 'axios';
import {primary, URL} from '../../Constants';
import ShowItems from '../../Custom/ShowItems';
export default function SaveEntry({route, navigation}) {
  const toast = useToast();
  const [editItem, setEditItem] = useState();
  const [deleteItem, setDeleteItem] = useState();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const {listItems, customer, setListItems, itemTotal} = route.params;
  const [completeTotal, setCompleteTotal] = useState(itemTotal);
  console.log('Before item total');
  console.log(itemTotal);
  let tempEdit = {};
  let tempDelete;
  const handleSave = async () => {
    try {
      const createEntryURL = `${URL}/entries/create-entry`;
      console.log(createEntryURL);
      const result = await axios.post(`${URL}/entries/create-entry`, {
        date: Date.now(),
        id: customer._id,
        entry: listItems,
        total: completeTotal,
      });
      console.log(result.data);
      if (result.data === 'Items Added') {
        toast.show({
          description: 'Entry Done ',
        });
        navigation.navigate('Rahul Foods');
      } else {
        toast.show({
          description: 'Something went wrong',
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelteItem = () => {
    let tempItems = listItems;
    console.log(tempItems);
    for (var i = 0; i < tempItems.length; i++) {
      if (tempItems[i].name === deleteItem.name) {
        console.log('Found at ' + i);
        tempItems.splice(i, 1);
      }
    }
    console.log(tempItems);
    setListItems(tempItems);
    handleTotal();
    setShowDeleteModal(false);
    setOpenAction(false);
  };
  const handleEdit = () => {
    setShowEditModal(true);
    tempEdit = editItem;
  };
  const handleDelete = () => {
    console.log('Delete');
    setShowDeleteModal(true);
    tempDelete = editItem;
  };
  const handleCalculate = (e, field) => {
    console.log(e, field);
    listItems.map(item => {
      if (item.name === editItem.name) {
        item[field] = parseInt(e);
      }
    });
  };

  const handleTotal = () => {
    let tempTotal = 0;
    listItems.map(item => {
      console.log(item.rate);
      console.log(item.qty);
      console.log(item.rate * item.qty);
      item.total = item.rate * item.qty;
      tempTotal = tempTotal + item.total;
    });
    console.log(tempTotal);
    setCompleteTotal(tempTotal);
    console.log(listItems);
    setShowEditModal(false);
    setOpenAction(false);
  };
  useEffect(() => {
    console.log('New Chages');
    console.log(editItem);
  }, [editItem]);
  useEffect(() => {
    console.log('Items');
    console.log(listItems);
  }, [listItems]);

  const EditModal = () => {
    return (
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
        <Modal.Content width="90%">
          <Modal.CloseButton />
          <Modal.Header>Edit Entry</Modal.Header>
          <Modal.Body>
            <FormControl>
              <HStack p={2} width="100%">
                <FormControl.Label marginTop={3} width="20%">
                  <Text>Item Name</Text>
                </FormControl.Label>
                <Input
                  isDisabled={true}
                  value={editItem?.name}
                  backgroundColor="white"
                  width="70%"
                />
              </HStack>
              <HStack p={2} width="100%">
                <FormControl.Label marginTop={3} width="20%">
                  <Text>Rate</Text>
                </FormControl.Label>
                <Input
                  defaultValue={editItem?.rate.toString()}
                  onChangeText={e => handleCalculate(e, 'rate')}
                  keyboardType="number-pad"
                  backgroundColor="white"
                  width="25%"
                />
                <FormControl.Label marginLeft={6} marginTop={3} width="10%">
                  <Text>Qty</Text>
                </FormControl.Label>
                <Input
                  defaultValue={editItem?.qty.toString()}
                  onChangeText={e => handleCalculate(e, 'qty')}
                  // onChangeText={e => (tempEdit.qty = e)}
                  keyboardType="number-pad"
                  backgroundColor="white"
                  width="25%"
                />
              </HStack>

              <Button
                onPress={handleTotal}
                alignSelf={'center'}
                width="100%"
                bgColor={primary}
                color="white">
                <Text style={{color: 'white'}}>Update</Text>
              </Button>
            </FormControl>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    );
  };
  const DeleteModal = () => {
    return (
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <Modal.Content width="70%">
          <Modal.CloseButton />
          <Modal.Header>Delete Entry</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>
                Are you Sure you want to delete this item ?
              </FormControl.Label>
              <HStack width="100%">
                <Button
                  onPress={() => {
                    setShowDeleteModal(false);
                  }}
                  alignSelf={'center'}
                  width="48%"
                  m={1}
                  bgColor={primary}
                  color="white">
                  <Text style={{color: 'white'}}>Cancel</Text>
                </Button>
                <Button
                  onPress={handleDelteItem}
                  alignSelf={'center'}
                  width="48%"
                  m={1}
                  bgColor={primary}
                  color="white">
                  <Text style={{color: 'white'}}>Delete</Text>
                </Button>
              </HStack>
            </FormControl>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    );
  };
  return (
    <Box>
      <ShowItems
        items={listItems}
        itemTotal={completeTotal}
        handleEdit={handleEdit}
        handleSave={handleSave}
        handleDelete={handleDelete}
        editItem={editItem}
        openAction={openAction}
        setOpenAction={setOpenAction}
        setEditItem={setEditItem}
        setDeleteItem={setDeleteItem}
      />
      <EditModal />
      <DeleteModal />
    </Box>
  );
}
