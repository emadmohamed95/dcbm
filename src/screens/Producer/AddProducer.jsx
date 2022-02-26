import React, {  } from 'react'
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { useDispatch } from 'react-redux';
import * as Yup from "yup";
import { addUser, editUser } from '../../actions/userActions';
import { forEach as _forEach, union as _union, differenceWith as _differenceWith } from "lodash";
import { Formik } from 'formik';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { ScrollView } from 'react-native';


export const AddProducer = ({ route, navigation }) => {
    const dispatch = useDispatch()
    const { user } = route?.params ? route.params : {};
    const phoneRegExp = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/

    const schema = Yup.object().shape({
        name: Yup.string()
          .min(2, "Too Short!")
          .max(50, "Too Long!")
          .required("Required"),
    
        email: Yup.string().email("Invalid email"),
        phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
      });

      const handleOnSubmit = (values, { setSubmitting }) => {
        if (user) {
          if (values.name !== user.name) {
            values.username = values.name;
          }
    
          dispatch(editUser(values,false,navigation));
        } else {
          values.username = values.name;
          values.password = values.name;
    
          dispatch(addUser(values,navigation));
        }
    
        setSubmitting(false);
      };


      const initialValues = user
      ? user
      : {
          username: "",
          password: "",
          email: "",
          name: "",
          phone: "",
          enabled: true,
          type: "Producer",
        };

    return (
        <ScrollView>
            <Formik
                initialValues={initialValues}
                validationSchema={schema}

                onSubmit={handleOnSubmit}
            >
                {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors, touched }) => (
                    <KeyboardAvoidingView style={styles.container} behavior='padding'>
                        <View style={styles.div}>
                            
                        <TextInput
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                                style={styles.textInput}
                                placeholder='name'
                                autoCapitalize='none'
                                mode="outlined"
                                selectionColor='#005374'
                                activeOutlineColor='#005374'
                                error={errors.name && touched.name}
                            />
                            <HelperText type="error" visible={errors.name && touched.name}>{errors.name}</HelperText>


                            <TextInput
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                style={styles.textInput}
                                placeholder='email'
                                autoCapitalize='none'
                                mode="outlined"
                                selectionColor='#005374'
                                activeOutlineColor='#005374'
                                error={errors.email && touched.email}
                            />
                            <HelperText type="error" visible={errors.email && touched.email}>{errors.email}</HelperText>

                           
                            <TextInput
                                onChangeText={handleChange('phone')}
                                onBlur={handleBlur('phone')}
                                value={values.phone}
                                style={styles.textInput}
                                placeholder='phone'
                                autoCapitalize='none'
                                mode="outlined"
                                selectionColor='#005374'
                                activeOutlineColor='#005374'
                                error={errors.phone && touched.phone}
                            />
                            <HelperText type="error" visible={errors.phone && touched.phone}>{errors.phone}</HelperText>



                            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                <Button onPress={handleSubmit} title="Submit" mode='contained' color='#005374'> {user?"Edit":"Add"} producer</Button>
                                <Button onPress={navigation.goBack} mode='default' color='#005374'>Cancel</Button>
                            </View>
                        </View>
                    </KeyboardAvoidingView>

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