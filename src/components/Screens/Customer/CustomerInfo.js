import axios from 'axios';
import {
  Box,
  HStack,
  VStack,
  Modal,
  Pressable,
  Button,
  ScrollView,
  Actionsheet,
  Input,
  Heading,
  FormControl,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/dist/Feather';
import {Text} from 'react-native';
import {primary, URL} from '../../Constants';

export default function CustomerInfo({route, navigation}) {
  const {customer} = route.params;
  navigation.setOptions({title: customer.name});
  let itemTotal = 0;
  let tempUpdateEntry = {};
  const [openAction, setOpenAction] = useState(false);
  const [customerEntries, setCustomerEntries] = useState();
  const [selectedEntry, setSelectedEntry] = useState();
  const [showModal, setShowModal] = useState(false);
  const [selectedCust, setSelectCust] = useState('');
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const getEntryDates = data => {
    let tempEntries = [];

    data?.entries.map(entry => {
      const d = new Date(entry.date);
      let entryDate;
      const day = d.getDate();
      let month = d.getMonth();
      if (month < 9) {
        entryDate = `${day}/0${++month}`;
      } else {
        entryDate = `${day}/${++month}`;
      }
      const tempEntry = {
        date: entryDate,
        items: entry.items,
        total: entry.total,
      };
      tempEntries.push(tempEntry);
    });

    setSelectCust(tempEntries);
    setLoading(false);
  };

  const handleEdit = () => {
    setShowModal(true);
  };
  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleEditItem = async (e, item, field) => {
    itemTotal = 0;
    tempUpdateEntry = selectedEntry;
    const {text} = e.nativeEvent;
    tempUpdateEntry.items.map(mapitem => {
      if (mapitem.name === item.name) {
        console.log(item[field]);
        item[field] = text;
        if (field === 'rate') {
          item.total = item.qty * parseInt(text);
        } else {
          item.total = item.rate * parseInt(text);
        }
      }
      itemTotal = itemTotal + mapitem.total;
    });
    tempUpdateEntry.total = itemTotal;
    setSelectedEntry(tempUpdateEntry);
  };

  const handleEditSave = async () => {
    const res = await axios.post(`${URL}/entries/edit-entry`, {
      entry: tempUpdateEntry,
      id: customer._id,
    });
    console.log(res.data);
    if (res.data.acknowledged) {
      setShowModal(false);
      setOpenAction(false);
      getEntries();
    }
  };
  const getEntries = async () => {
    const entries = await axios.post(`${URL}/entries/get-entries`, {
      id: customer._id,
    });
    console.log(entries.data);
    setCustomerEntries(entries.data);
    getEntryDates(entries.data);
  };
  const handleDelteItem = async () => {
    console.log(selectedEntry);
    const res = await axios.post(`${URL}/entries/delete-entry`, {
      entry: selectedEntry,
      id: customer._id,
    });
    console.log(res.data);
    if (res.data.acknowledged) {
      setShowDeleteModal(false);
      setOpenAction(false);
      getEntries();
    }
  };
  useEffect(() => {
    getEntries();
  }, []);
  useEffect(() => {
    console.log('Selected customer is ' + selectedCust);
  }, [selectedCust]);

  const EditModal = () => {
    return (
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content width="90%">
          <Modal.CloseButton />
          <Modal.Header>Edit Entry</Modal.Header>
          <Modal.Body>
            <Box>
              <HStack
                display="flex"
                justifyContent="space-between"
                textAlign="left"
                width="100%">
                <Heading fontSize="13" width="40%">
                  Name
                </Heading>
                <Heading fontSize="13" width="22%">
                  Rate
                </Heading>
                <Heading fontSize="13" width="22%">
                  Qty
                </Heading>
              </HStack>

              <ScrollView>
                {selectedEntry?.items.map(item => {
                  return (
                    <Box>
                      <HStack
                        display="flex"
                        pb={2}
                        justifyContent="space-between"
                        width="100%">
                        <Input
                          onChange={e => {
                            handleEditItem(e, item, 'name');
                          }}
                          defaultValue={item.name}
                          width="40%"
                        />
                        <Input
                          onChange={e => {
                            handleEditItem(e, item, 'rate');
                          }}
                          defaultValue={item.rate.toString()}
                          width="22%"
                        />
                        <Input
                          name="qty"
                          id="qty"
                          onChange={e => {
                            handleEditItem(e, item, 'qty');
                          }}
                          defaultValue={item.qty.toString()}
                          width="22%"
                        />
                      </HStack>
                    </Box>
                  );
                })}
              </ScrollView>
            </Box>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}>
                <Text>Cancel</Text>
              </Button>
              <Button bgColor={primary} onPress={handleEditSave}>
                <Text style={{color: 'white'}}> Save</Text>
              </Button>
            </Button.Group>
          </Modal.Footer>
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
    <Box px={1} height="100%">
      {loading ? (
        <Box>
          <Text>Loading...</Text>
        </Box>
      ) : (
        <ScrollView bgColor="white" height="100%">
          <VStack px={2} py={2} shadow={1} bgColor="white">
            <ScrollView>
              {selectedCust.map(entry => (
                <Pressable
                  onLongPress={() => {
                    setSelectedEntry(entry);
                    setOpenAction(true);
                  }}>
                  <Box
                    borderWidth={1}
                    bgColor="white"
                    shadow={1}
                    minHeight="16"
                    rounded={3}
                    borderColor="coolGray.300"
                    p={1}
                    mb={2}>
                    <VStack>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 'bold',
                          marginBottom: 10,
                        }}>
                        {entry.date}
                      </Text>
                      <HStack
                        width="100%"
                        display="flex"
                        justifyContent="space-between">
                        <HStack width="70%" display="flex" flexWrap="wrap">
                          {entry.items.map(item => {
                            return (
                              <Box>
                                <Text style={{fontSize: 16}}>
                                  {item.qty} {item.name} ({item.rate}),
                                </Text>
                              </Box>
                            );
                          })}
                        </HStack>
                        <Box
                          width="30%"
                          px={2}
                          alignItems="flex-end"
                          justifyContent="center">
                          <Text style={{fontSize: 18, color: 'green'}}>
                            {entry.total}/-
                          </Text>
                        </Box>
                      </HStack>
                    </VStack>
                  </Box>
                </Pressable>
              ))}
            </ScrollView>
            <Actionsheet
              isOpen={openAction}
              onClose={() => setOpenAction(false)}>
              <Actionsheet.Content>
                <Actionsheet.Item p={0} onPress={handleEdit}>
                  <HStack m={0}>
                    <Icon name="edit" size={15} />
                    <Text> Edit</Text>
                  </HStack>
                </Actionsheet.Item>
                <Actionsheet.Item p={0} onPress={handleDelete}>
                  <HStack>
                    <Icon name="trash" size={15} />
                    <Text> Delete</Text>
                  </HStack>
                </Actionsheet.Item>
              </Actionsheet.Content>
            </Actionsheet>
          </VStack>
        </ScrollView>
      )}
      <EditModal />
      <DeleteModal />
    </Box>
  );
}
