import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, SafeAreaView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";
import { addUser, changePassword, editUser } from '../../actions/userActions';
import { forEach as _forEach, union as _union, differenceWith as _differenceWith } from "lodash";
import { Formik, FieldArray } from 'formik';
import { TextInput, Button, Divider, Title, HelperText, IconButton } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import MultiSelect from 'react-native-multiple-select';
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { getCountries } from '../../actions/countryActions'



export const ChangePassword = ({ route, navigation }) => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.auth.user)



    const schema = Yup.object().shape({
        password: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Required"),

        newPassword: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Required"),

        confirmedPassword: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
            .required("Required"),
    });


    const handleOnSubmit = (values, { setSubmitting }) => {
        values.username = user.username;

        dispatch(changePassword(values));
        setSubmitting(false);
    };

    const initialValues = {
        password: "",
        newPassword: "",
        confirmedPassword: "",
    };
    return (
        <ScrollView>
            <Formik
                initialValues={initialValues}
                validationSchema={schema}

                onSubmit={handleOnSubmit}
            >
                {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors, touched }) => (
                    <View style={styles.container}>

                        <View style={styles.div}>

                            <TextInput
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                style={styles.textInput}
                                placeholder='password'
                                autoCapitalize='none'
                                textContentType="password"
                                secureTextEntry={true}
                                mode="outlined"
                                selectionColor='#005374'
                                activeOutlineColor='#005374'

                                error={errors.password && touched.password}
                            />
                            <HelperText type="error" visible={errors.password && touched.password}>{errors.password}</HelperText>

                            <TextInput
                                onChangeText={handleChange('newPassword')}
                                onBlur={handleBlur('newPassword')}
                                value={values.newPassword}
                                style={styles.textInput}
                                placeholder='newPassword'
                                autoCapitalize='none'
                                textContentType="newPassword"
                                secureTextEntry={true}
                                mode="outlined"
                                selectionColor='#005374'
                                activeOutlineColor='#005374'

                                error={errors.newPassword && touched.newPassword}
                            />
                            <HelperText type="error" visible={errors.newPassword && touched.newPassword}>{errors.newPassword}</HelperText>

                            <TextInput
                                onChangeText={handleChange('confirmedPassword')}
                                onBlur={handleBlur('confirmedPassword')}
                                value={values.confirmedPassword}
                                style={styles.textInput}
                                placeholder='confirmedPassword'
                                autoCapitalize='none'
                                textContentType="confirmedPassword"
                                secureTextEntry={true}
                                mode="outlined"
                                selectionColor='#005374'
                                activeOutlineColor='#005374'

                                error={errors.confirmedPassword && touched.confirmedPassword}
                            />
                            <HelperText type="error" visible={errors.confirmedPassword && touched.confirmedPassword}>{errors.confirmedPassword}</HelperText>



                            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                <Button onPress={handleSubmit} title="Submit" mode='contained' color='#005374'>Change Password</Button>
                                {/* <Button onPress={navigation.goBack} mode='default' color='#005374'>Cancel</Button> */}
                            </View>
                        </View>
                    </View>

                )
                }
            </Formik >
        </ScrollView >
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
        alignItems: "center",
        // height: '40%',
        width: '90%'

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


    }
})