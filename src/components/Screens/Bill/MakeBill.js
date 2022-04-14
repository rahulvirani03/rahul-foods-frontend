import axios from 'axios';
import {
  Box,
  Button,
  Divider,
  FormControl,
  HStack,
  Input,
  Modal,
  Spacer,
  useToast,
} from 'native-base';
import React, {useState} from 'react';
import {ActivityIndicator, Pressable, Text} from 'react-native';
import {primary, URL} from '../../Constants';
import ShowItems from '../../Custom/ShowItems';

export default function MakeBill({route, navigation}) {
  let tempEdit;
  let tempDelete;
  let customerNumber = '7798277741';
  const toast = useToast();
  const [deleteItem, setDeleteItem] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const {listItems, customer, setListItems, itemTotal} = route.params;
  const [editItem, setEditItem] = useState();
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mailModal, setMailModal] = useState(false);
  const [selected, setSelected] = useState('primary');
  const [completeTotal, setCompleteTotal] = useState(itemTotal);
  const [email, setEmail] = useState('rahulfoodsandgeneral@gmail.com');
  console.log(customer);
  const handleSave = async () => {
    setMailModal(true);
  };
  const handleCalculate = (e, field) => {
    console.log(e, field);
    items.map(item => {
      if (item.name === editItem.name) {
        item[field] = parseInt(e);
      }
    });
  };

  const sendBill = async () => {
    setLoading(true);
    console.log('Pressed');
    console.log(customerNumber);
    const res = await axios.post(`${URL}/bills/create-bill`, {
      customer: customer,
      items: listItems,
      itemTotal: itemTotal,
      number: customerNumber,
    });
    console.log(res.data);
    const {message} = res.data;
    console.log(message);
    if (message === 'Bill Sent') {
      // setLoading(false);
      // setMailModal(false);
      toast.show({
        description: 'Invoice Sent ',
      });
      navigation.navigate('Rahul Foods');
    }
  };

  const handlecustomerNumber = e => {
    // console.log(e);
    customerNumber = e;
    console.log(customerNumber);
  };

  const handleDelete = () => {
    console.log('Delete');
    setShowDeleteModal(true);
    tempDelete = editItem;
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
  };
  const handleEdit = () => {
    setShowEditModal(true);
    tempEdit = editItem;
  };

  const UpdateModal = () => {
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
  const MailModalComponent = () => {
    return (
      <Modal isOpen={mailModal} onClose={() => setMailModal(false)}>
        <Modal.Content maxWidth="400px" minHeight={200}>
          <Modal.CloseButton />
          <Modal.Header>Bill Number</Modal.Header>
          <Modal.Body>
            {loading ? (
              <Box
                display="flex"
                alignSelf="center"
                alignItems="center"
                flex="1"
                mt="25%"
                height="100%">
                <ActivityIndicator color="blue" />
              </Box>
            ) : (
              <Box>
                <FormControl>
                  <FormControl.Label>Customer Number</FormControl.Label>
                  <Input
                    onChangeText={e => handlecustomerNumber(e)}
                    keyboardType="number-pad"
                  />
                </FormControl>
              </Box>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setMailModal(false);
                }}>
                <Text>Cancel</Text>
              </Button>
              <Button bgColor={primary} onPress={sendBill}>
                <Text style={{color: 'white'}}> Send</Text>
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
    <Box>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}></Pressable>
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
        bill={true}
      />

      <UpdateModal />
      <MailModalComponent />
      <DeleteModal />
    </Box>
  );
}

// import React, {useState, useEffect} from 'react';

// import {
//   Box,
//   Modal,
//   FormControl,
//   HStack,
//   Button,
//   Input,
//   useToast,
// } from 'native-base';
// import {Text, TextInput} from 'react-native';
// import axios from 'axios';
// import {primary, URL} from '../../Constants';
// import ShowItems from '../../Custom/ShowItems';
// export default function SaveEntry({route, navigation}) {
//   const toast = useToast();
//   const [editItem, setEditItem] = useState();
//   const [deleteItem, setDeleteItem] = useState();
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [openAction, setOpenAction] = useState(false);
//   const {listItems, customer, setListItems, itemTotal} = route.params;
//   const [completeTotal, setCompleteTotal] = useState(itemTotal);
//   console.log('Before item total');
//   console.log(itemTotal);
//   let tempEdit = {};
//   let tempDelete;
//   const handleSave = async () => {
//     try {
//       const createEntryURL = `${URL}/entries/create-entry`;
//       console.log(createEntryURL);
//       const result = await axios.post(`${URL}/entries/create-entry`, {
//         date: Date.now(),
//         id: customer._id,
//         entry: listItems,
//         total: completeTotal,
//       });
//       console.log(result.data);
//       if (result.data === 'Items Added') {
//         toast.show({
//           description: 'Entry Done ',
//         });
//         navigation.navigate('Home');
//       } else {
//         toast.show({
//           description: 'Something went wrong',
//         });
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   const handleDelteItem = () => {
//     let tempItems = listItems;
//     console.log(tempItems);
//     for (var i = 0; i < tempItems.length; i++) {
//       if (tempItems[i].name === deleteItem.name) {
//         console.log('Found at ' + i);
//         tempItems.splice(i, 1);
//       }
//     }
//     console.log(tempItems);
//     setListItems(tempItems);
//     handleTotal();
//     setShowDeleteModal(false);
//     setOpenAction(false);
//   };
//   const handleEdit = () => {
//     setShowEditModal(true);
//     tempEdit = editItem;
//   };
//   const handleDelete = () => {
//     console.log('Delete');
//     setShowDeleteModal(true);
//     tempDelete = editItem;
//   };
//   const handleCalculate = (e, field) => {
//     console.log(e, field);
//     listItems.map(item => {
//       if (item.name === editItem.name) {
//         item[field] = parseInt(e);
//       }
//     });
//   };

//   const handleTotal = () => {
//     let tempTotal = 0;
//     listItems.map(item => {
//       console.log(item.rate);
//       console.log(item.qty);
//       console.log(item.rate * item.qty);
//       item.total = item.rate * item.qty;
//       tempTotal = tempTotal + item.total;
//     });
//     console.log(tempTotal);
//     setCompleteTotal(tempTotal);
//     console.log(listItems);
//     setShowEditModal(false);
//     setOpenAction(false);
//   };
//   useEffect(() => {
//     console.log('New Chages');
//     console.log(editItem);
//   }, [editItem]);
//   useEffect(() => {
//     console.log('Items');
//     console.log(listItems);
//   }, [listItems]);

//   const EditModal = () => {
//     return (
//       <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
//         <Modal.Content width="90%">
//           <Modal.CloseButton />
//           <Modal.Header>Edit Entry</Modal.Header>
//           <Modal.Body>
//             <FormControl>
//               <HStack p={2} width="100%">
//                 <FormControl.Label marginTop={3} width="20%">
//                   <Text>Item Name</Text>
//                 </FormControl.Label>
//                 <Input
//                   isDisabled={true}
//                   value={editItem?.name}
//                   backgroundColor="white"
//                   width="70%"
//                 />
//               </HStack>
//               <HStack p={2} width="100%">
//                 <FormControl.Label marginTop={3} width="20%">
//                   <Text>Rate</Text>
//                 </FormControl.Label>
//                 <Input
//                   defaultValue={editItem?.rate.toString()}
//                   onChangeText={e => handleCalculate(e, 'rate')}
//                   keyboardType="number-pad"
//                   backgroundColor="white"
//                   width="25%"
//                 />
//                 <FormControl.Label marginLeft={6} marginTop={3} width="10%">
//                   <Text>Qty</Text>
//                 </FormControl.Label>
//                 <Input
//                   defaultValue={editItem?.qty.toString()}
//                   onChangeText={e => handleCalculate(e, 'qty')}
//                   // onChangeText={e => (tempEdit.qty = e)}
//                   keyboardType="number-pad"
//                   backgroundColor="white"
//                   width="25%"
//                 />
//               </HStack>

//               <Button
//                 onPress={handleTotal}
//                 alignSelf={'center'}
//                 width="100%"
//                 bgColor={primary}
//                 color="white">
//                 <Text style={{color: 'white'}}>Update</Text>
//               </Button>
//             </FormControl>
//           </Modal.Body>
//         </Modal.Content>
//       </Modal>
//     );
//   };
//   const DeleteModal = () => {
//     return (
//       <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
//         <Modal.Content width="70%">
//           <Modal.CloseButton />
//           <Modal.Header>Delete Entry</Modal.Header>
//           <Modal.Body>
//             <FormControl>
//               <FormControl.Label>
//                 Are you Sure you want to delete this item ?
//               </FormControl.Label>
//               <HStack width="100%">
//                 <Button
//                   onPress={() => {
//                     setShowDeleteModal(false);
//                   }}
//                   alignSelf={'center'}
//                   width="48%"
//                   m={1}
//                   bgColor={primary}
//                   color="white">
//                   <Text style={{color: 'white'}}>Cancel</Text>
//                 </Button>
//                 <Button
//                   onPress={handleDelteItem}
//                   alignSelf={'center'}
//                   width="48%"
//                   m={1}
//                   bgColor={primary}
//                   color="white">
//                   <Text style={{color: 'white'}}>Delete</Text>
//                 </Button>
//               </HStack>
//             </FormControl>
//           </Modal.Body>
//         </Modal.Content>
//       </Modal>
//     );
//   };
//   return (
//     <Box>
//       <ShowItems
//         items={listItems}
//         itemTotal={completeTotal}
//         handleEdit={handleEdit}
//         handleSave={handleSave}
//         handleDelete={handleDelete}
//         editItem={editItem}
//         openAction={openAction}
//         setOpenAction={setOpenAction}
//         setEditItem={setEditItem}
//         setDeleteItem={setDeleteItem}
//       />
//       <EditModal />
//       <DeleteModal />
//     </Box>
//   );
// }
