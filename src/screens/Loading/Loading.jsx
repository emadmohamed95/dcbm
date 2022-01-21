import React, { useEffect, useState } from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";
import { addUser, editUser, markUserNotificationAsRead } from '../../actions/userActions';
import { forEach as _forEach, union as _union, differenceWith as _differenceWith } from "lodash";
import { Formik, FieldArray } from 'formik';
import { TextInput, Button, Divider, Title, HelperText, IconButton, List, Text ,ActivityIndicator} from 'react-native-paper';
import { ScrollView } from 'react-native';
import { compareDesc, format, parseISO, toDate } from 'date-fns';



export const Loading = ({ route, navigation }) => {
    const dispatch = useDispatch()

    const isLoading = useSelector(state => state.loading.isLoading)


    return (
            <View style={styles.container}>

                <View style={styles.div}>

                <ActivityIndicator size={100} animating={true} color={'#005374'} />
                </View>

            </View>



    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        marginBottom: 50
    },
    div: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        // alignItems: "center",
        height: '100%',
        width: '90%',
        marginTop:20

    },
    textInput: {
        // backgroundColor: 'red',
        width: '100%',
        marginTop: 20


    },

    emailTextInput: {
        // backgroundColor: 'red',
        width: '75%',
        marginTop: 20


    },

    readDiv: {
        backgroundColor: 'red',
       


    }
})