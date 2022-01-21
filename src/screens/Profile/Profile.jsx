import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, SafeAreaView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";
import { addUser, editUser } from '../../actions/userActions';
import { forEach as _forEach, union as _union, differenceWith as _differenceWith } from "lodash";
import { Formik, FieldArray } from 'formik';
import { TextInput, Button, Divider, Title, HelperText, IconButton } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import MultiSelect from 'react-native-multiple-select';
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { getCountries } from '../../actions/countryActions'



export const Profile = ({ route, navigation }) => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.user)


  const email = Yup.object({
    id: Yup.number().nullable(),
    email: Yup.string().email("Invalid email"),
  });

  const phoneRegExp = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;

  const schema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    name: Yup.string().required("Required"),
    phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
    emails: Yup.array().of(email).nullable(),
  });


  const handleOnSubmit = (values, { setSubmitting }) => {
    const finalValues = {
      ...values,
    };

    const toBeRemovedEmails = _differenceWith(
      user.emails,
      values.emails,
      (arrValue, othValue) => arrValue.email == othValue.email
    );

    const toBeAddedEmails = _differenceWith(
      values.emails,
      user.emails,
      (arrValue, othValue) => arrValue.email == othValue.email
    );

    finalValues.emails = toBeAddedEmails;
    finalValues.removedEmails = toBeRemovedEmails;
    delete finalValues.password;

    // console.log(finalValues);

    dispatch(editUser(finalValues, false));

    setSubmitting(false);
  };


  const initialValues = user

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
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
                style={styles.textInput}
                placeholder='username'
                autoCapitalize='none'
                mode="outlined"
                selectionColor='#005374'
                activeOutlineColor='#005374'
                error={errors.username && touched.username}
              />
              <HelperText type="error" visible={errors.username && touched.username}>{errors.username}</HelperText>

              {/* <TextInput
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
                            <HelperText type="error" visible={errors.password && touched.password}>{errors.password}</HelperText> */}


              <TextInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                style={styles.textInput}
                placeholder='Main email'
                autoCapitalize='none'
                mode="outlined"
                selectionColor='#005374'
                activeOutlineColor='#005374'
                error={errors.email && touched.email}
              />
              <HelperText type="error" visible={errors.email && touched.email}>{errors.email}</HelperText>



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



              {user && user.type.name == "Distributor" ?

                <View style={{ marginBottom: 20, marginTop: 20 }}>

                  <FieldArray
                    name="emails"
                    render={(arrayHelpers) => (

                      <>

                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                          <Title>
                            Additional Emails
                          </Title>
                          <IconButton
                            icon="plus"
                            color={'#005374'}
                            // size={20}
                            onPress={() => arrayHelpers.push({ email: "" })}
                          />
                        </View>
                        {values.emails.map((email, index) => (

                          <View style={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                            {/* <Field
                                                    name={`emails[${index}].email`}
                                                    component={TextField}
                                                    label="Email"
                                                    type="email"
                                                /> */}

                            <TextInput
                              onChangeText={text => setFieldValue(
                                `emails[${index}].email`,
                                text)}
                              onBlur={handleBlur(`emails[${index}].email`)}
                              value={values.emails[index].email}
                              style={styles.emailTextInput}
                              placeholder='email'
                              autoCapitalize='none'
                              // mode="outlined"
                              selectionColor='#005374'
                              activeOutlineColor='#005374'
                              dense
                            />

                            <IconButton
                              icon="delete"
                              color={'#005374'}
                              size={20}
                              onPress={() => arrayHelpers.remove(index)}
                            />

                          </View>



                        ))}

                      </>
                    )}
                  />
                </View>

                : <></>}


              <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <Button onPress={handleSubmit} title="Submit" mode='contained' color='#005374'>Change info</Button>
                <Button onPress={() => navigation.navigate('ChangePassword')}
                  mode='default' color='#005374'>Change Password</Button>
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