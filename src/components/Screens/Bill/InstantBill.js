import {Box, Button, FormControl, Heading, Input} from 'native-base';
import DatePicker from 'react-native-datepicker';
import {Text} from 'react-native';
import React, {useState} from 'react';
import {primary} from '../../Constants';

export default function InstantBill({navigation}) {
  let today = new Date();
  const [billDate, setBillDate] = useState(today);
  const [billName, setBillName] = useState();
  const [billNo, setBillNo] = useState();
  const handleNext = () => {
    navigation.navigate('Bill Entries', {
      customer: {
        billName: billName,
        billNo: billNo,
        billDate: billDate,
      },
    });
  };
  return (
    <Box alignItems="center" width="100%" height="100%">
      <Box
        justifyContent="center"
        p={6}
        my="auto"
        minHeight="70%"
        minWidth="80%"
        height="100%"
        width="100%">
        <Box rounded={3} shadow={1} bgColor="white" px={6} py={3}>
          <Heading mb={2} underline={true}>
            Bill Details
          </Heading>
          <FormControl>
            <FormControl.Label>
              <Text> Date</Text>
            </FormControl.Label>
            <Box borderColor="gray.200" borderWidth={1} rounded={1}>
              <DatePicker
                style={{width: '100%'}}
                date={billDate}
                mode="date"
                placeholder="select date"
                format="DD-MM-YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    marginLeft: 0,
                  },
                  dateInput: {
                    borderColor: '#ffffff',
                    marginLeft: -140,
                  },
                }}
                onDateChange={date => {
                  console.log(date);
                  setBillDate(date);
                }}
              />
            </Box>
            <FormControl.Label mt={2}>
              <Text>Invoice Number</Text>
            </FormControl.Label>
            <Input keyboardType="number-pad" onChangeText={e => setBillNo(e)} />
            <FormControl.Label mt={2}>
              <Text> Name</Text>
            </FormControl.Label>
            <Input type="rounded" onChangeText={e => setBillName(e)} />
          </FormControl>
          <FormControl>
            <Button bgColor={primary} mt={4} onPress={handleNext}>
              <Text style={{color: 'white'}}>Next</Text>
            </Button>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}
