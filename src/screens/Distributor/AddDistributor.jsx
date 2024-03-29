import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, SafeAreaView, KeyboardAvoidingView } from 'react-native'
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

// const items = [
//     {
//       name: 'Distributor',
//       children: [
//         {
//           name: 'Add',

//         },
//         {
//           name: 'Delete',

//         },
//         {
//           name: 'Enable',

//         },
//     ]
// },
// {
//     name: 'Movies',
//     children: [
//       {
//         name: 'Add',

//       },
//       {
//         name: 'Delete',

//       },
//       {
//         name: 'Enable',
//       },
//   ]
// }

//       ]




export const Adddistributor = ({ route, navigation }) => {
    const dispatch = useDispatch()
    const [selectedCountries, setselectedCountries] = useState([])
    const { user } = route?.params ? route.params : {};
    const phoneRegExp = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/

    const email = Yup.object({
        id: Yup.number().nullable(),
        email: Yup.string().email("Invalid email")
    });

    const schema = Yup.object().shape({
        username: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Required"),
        password: user
            ? Yup.string().min(2, "Too Short!").max(50, "Too Long!")
            : Yup.string()
                .min(2, "Too Short!")
                .max(50, "Too Long!")
                .required("Required"),

        email: Yup.string().email("Invalid email").required("Required"),

        email2: Yup.string().email("Invalid email"),
        name: Yup.string().required("Required"),
        phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
        countries: Yup.array().required("Required"),
        emails: Yup.array().of(email).nullable()
    });


    useEffect(() => {
        dispatch(getCountries())
    }, [])

    const countries = useSelector(state => state.country.countries)
    // console.log(countries)


    useEffect(() => {
        if (user) {
            setselectedCountries(user.countries ? user.countries.map(country => country.id) : [])
        }
    }, [user])

    const handleOnSubmit = (values, { setSubmitting }) => {
        const userPermissions = {
            movies_AssignToCinema: true,
            movies_GenerateKdms: true,
            movies_SendKdmsNotification: true,
            movies_Request: true,
        };
        const finalValues = {
            ...values,
            ...{
                permissions: userPermissions,
            },
        };

        // console.log(finalValues)

        if (user) {
            const toBeRemovedValues = _differenceWith(
                user.countries,
                values.countries,
                (arrValue, othValue) => arrValue.id == othValue.id
            );

            const toBeAddedValues = _differenceWith(
                values.countries,
                user.countries,
                (arrValue, othValue) => arrValue.id == othValue.id
            );

            finalValues.countries = toBeAddedValues;
            finalValues.removedCountries = toBeRemovedValues;



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

            if (finalValues.password == "") {
                delete finalValues.password;
            }

            // console.log(finalValues)

            dispatch(editUser(finalValues,false,navigation));
        } else {

            // console.log(finalValues)
            dispatch(addUser(finalValues,navigation));
        }

        setSubmitting(false);
    };



    const initialValues = user
        ? {
            ...user,
            // ...{
            //     permissions: convertPermissionsObjectToValueArray(user.permissions),
            // },
            ...{ password: "" },
        }
        : {
            username: "",
            password: "",
            email: "",
            email2: "",
            name: "",
            phone: "",
            enabled: true,
            type: "Distributor",
            countries: [],
            emails: [],          // permissions: convertPermissionsObjectToValueArray(userPermissions),
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

                        <View style={styles.div} >
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
                                onChangeText={handleChange('email2')}
                                onBlur={handleBlur('email2')}
                                value={values.email2}
                                style={styles.textInput}
                                placeholder='email2'
                                autoCapitalize='none'
                                mode="outlined"
                                selectionColor='#005374'
                                activeOutlineColor='#005374'
                                error={errors.email2 && touched.email2}
                            />
                            <HelperText type="error" visible={errors.email2 && touched.email2}>{errors.email2}</HelperText>


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

                            <View style={{ width: '100%'}}>
                                <SectionedMultiSelect
                                    items={countries}
                                    IconRenderer={Icon}
                                    modalWithSafeAreaView
                                    uniqueKey="id"
                                    subKey="children"
                                    selectText={"Restrict user to countries"}
                                    selectedText={"Countries"}
                                    searchPlaceholderText={'Search Countries'}

                                    showCancelButton
                                    // showDropDowns={true}
                                    // readOnlyHeadings={true}
                                    onSelectedItemsChange={(items) => { setselectedCountries(items) }}
                                    onSelectedItemObjectsChange={items => {
                                        setFieldValue('countries', items)
                                    }
                                    }
                                    selectedItems={selectedCountries}
                                    showRemoveAll
                                    colors={{primary:'#005374'}}
                                    // styles={{ selectToggle:{width: '100%', backgroundColor:'red'} }}
                                />

                            </View>


                            <View style={{ marginBottom:20, marginTop:20 }}>

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



                            

                            {/* <FieldArray
                                name="permissions"
                                render={(arrayHelpers) => (
                                    <View style={{ width: '100%' }}>
                                        {values.permissions.map((perm, index) => (
                                            <SectionedMultiSelect
                                                items={perm.options}
                                                IconRenderer={Icon}
                                                modalWithSafeAreaView
                                                uniqueKey="name"
                                                // subKey="children"
                                                selectText="Choose some things..."
                                                showDropDowns={true}
                                                readOnlyHeadings={true}
                                                onSelectedItemsChange={items => setFieldValue(
                                                    `permissions.${index}.values`,
                                                    items
                                                )}
                                                selectedItems={values.permissions[index].values}
                                            />
                                            // <MultiSelect
                                            //     items={perm.options}
                                            //     uniqueKey="name"
                                            //     onSelectedItemsChange={items => setFieldValue(
                                            //         `permissions.${index}.values`,
                                            //         items
                                            //     )}
                                            //     selectedItems={values.permissions[index].values}
                                            //     selectText={`${perm.type} Permissions`}
                                            //     searchInputPlaceholderText="Search Skills..."
                                            //     tagContainerStyle={{ backgroundColor: 'rgba(28,52,70,0.2)', borderWidth: 0 }}
                                            //     tagRemoveIconColor='rgb(28,52,70)'
                                            //     tagColor='rgba(28,52,70,0.2)'
                                            //     tagTextColor="#000"
                                            //     selectedItemTextColor="#CCC"
                                            //     selectedItemIconColor="#CCC"
                                            //     itemTextColor="#000"
                                            //     displayKey="name"
                                            //     searchInputStyle={{ color: '#CCC' }}
                                            //     submitButtonColor="#CCC"
                                            //     submitButtonText="Submit"
                                            //     hideSubmitButton
                                            // />
                                            //   <Autocomplete
                                            //     multiple
                                            //     filterSelectedOptions
                                            //     limitTags={3}
                                            //     name={`permissions.${index}.values`}
                                            //     options={perm.options}
                                            //     value={values.permissions[index].values}
                                            //     getOptionSelected={(option, value) => {
                                            //       return option == value;
                                            //     }}
                                            //     onChange={(e, value) => {
                                            //       setFieldValue(
                                            //         `permissions.${index}.values`,
                                            //         value
                                            //       );
                                            //     }}
                                            //     renderInput={(params) => (
                                            //       <MaterialUiTextField
                                            //         label={`${perm.type} Permissions`}
                                            //         fullWidth
                                            //         name={`permissions.${index}.values`}
                                            //         {...params}
                                            //       />
                                            //     )}
                                            //   />
                                        ))}
                                    </View>

                                )}
                            /> */}

                            {/* <Divider />

                            <View style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', width: '100%' }}>
                                <Title>Permissions</Title>
                            </View> */}



                            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                <Button onPress={handleSubmit} title="Submit" mode='contained' color='#005374'> {user?"Edit":"Add"} distributor</Button>
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