import { View, StyleSheet, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import BackComponent from '../../Components/BackComponent'
import { COLORS } from '../../Constant/Images'
import Button from '../../Components/Button'
import { hp, wp } from '../../Components/Config'
import BankComponent from '../../Components/BankComponent'
import { useNavigation } from '@react-navigation/native'


const AddBankDetails = () => {
    const navigation = useNavigation()
    const [accountNumber, setAccountNumber] = useState('')
    const [reTypeAccountNumber, setReTypeAccountNumber] = useState('')
    const [ifscCode, setIfscCode] = useState('')
    const [bankName, setBankName] = useState('')
    const [branchName, setBranchName] = useState('')
    const [state, setState] = useState('')
    const [edit, setEdit] = useState(false)

    const OnSubmit = () => {
        let data = {
            'a/c_number': accountNumber,
        }
        console.log("data recieved========================>", data)
        navigation.navigate('ProfileStack', { screen: 'Profile' })
    }





    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView style={{}} showsVerticalScrollIndicator={false} >
                <BackComponent text={'Add Bank Details'} />
                <BankComponent edit={edit} name={accountNumber} setname={setAccountNumber} value={""} title={'Account Number'} />
                <BankComponent edit={edit} name={reTypeAccountNumber} setname={setReTypeAccountNumber} value={""} title={'Retype Account Number'} />
                <BankComponent name={ifscCode} setname={setIfscCode} value={""} title={'IFSC Code'} />
                <BankComponent name={bankName} setname={setBankName} value={""} title={'Bank Name'} />
                <BankComponent name={branchName} setname={setBranchName} value={""} title={'Branch Name'} />
                <BankComponent name={state} setname={setState} value={""} title={'State'} />
                <Button title={'Save'} style={styles.saveButton} color={{ color: '#fff' }} onPress={OnSubmit} />
            </ScrollView>
        </View>
    )
}

export default AddBankDetails
const styles = StyleSheet.create({
    saveButton: {
        marginTop: 20, 
        backgroundColor: COLORS.Green, 
        borderRadius: 30, 
        alignSelf: 'center', 
        marginBottom: 10,
         width: 170
    },
   
})