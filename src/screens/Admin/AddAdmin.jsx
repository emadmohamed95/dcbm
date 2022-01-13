import React, { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux';
import * as Yup from "yup";
import { addUser, editUser } from '../../actions/userActions';
import { forEach as _forEach, union as _union } from "lodash";
import { Formik } from 'formik';
import { TextInput, Button } from 'react-native-paper';

export const AddAdmin = ({ user }) => {
    const dispatch = useDispatch()

    const phoneRegExp = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/

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
        name: Yup.string().required("Required"),
        phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
    });

    const [showPassword, setShowPassword] = useState(false);

    const permToTextMap = {
        "AssignToDistributor": "Assign Movie To Distributor",
        "LoadDkdms": "Upload DKDMs"
    }

    const textToPermMap = {
        "Assign Movie To Distributor": "AssignToDistributor",
        "Upload DKDMs": "LoadDkdms"
    }

    const handleOnSubmit = (values, { setSubmitting }) => {
        const finalValues = {
            ...values,
            ...{
                permissions: convertValueArrayToPermissionsObjects(values.permissions),
            },
        };

        if (user) {
            if (finalValues.password == "") {
                delete finalValues.password;
            }

            dispatch(editUser(finalValues));
        } else {
            dispatch(addUser(finalValues));
        }

        setSubmitting(false);
        closeDialog();
    };

    const userPermissions = {
        distributors_Add: false,
        distributors_Edit: false,
        distributors_Delete: false,
        // distributors_EnableOrDisable: false,

        producers_Add: false,
        producers_Edit: false,
        producers_Delete: false,
        // producers_EnableOrDisable: false,

        countries_Add: false,
        countries_Edit: false,
        countries_Delete: false,
        // countries_EnableOrDisable: false,

        cinemas_Add: false,
        cinemas_Edit: false,
        cinemas_Delete: false,
        // cinemas_EnableOrDisable: false,

        screens_Add: false,
        screens_Edit: false,
        screens_Delete: false,
        // screens_EnableOrDisable: false,

        movies_Add: false,
        movies_Edit: false,
        movies_Delete: false,
        // movies_EnableOrDisable: false,
        movies_AssignToDistributor: false,
        movies_LoadDkdms: false,
    };

    const handleSelectAll = (permissions, isChecked, setFieldValue) => {
        if (isChecked) {
            permissions.forEach((perm) => {
                perm.values = _union(perm.values, perm.options);
            });
        } else {
            permissions.forEach((perm) => {
                perm.values = [];
            });
        }

        setFieldValue("values.permissions", permissions);
    };

    const convertPermissionsObjectToValueArray = (permissions) => {
        const transformedPermissions = [
            {
                type: "distributors",
                options: ["Add", "Edit", "Delete"],
                values: [],
            },
            {
                type: "producers",
                options: ["Add", "Edit", "Delete"],
                values: [],
            },
            {
                type: "countries",
                options: ["Add", "Edit", "Delete"],
                values: [],
            },
            {
                type: "cinemas",
                options: ["Add", "Edit", "Delete"],
                values: [],
            },
            {
                type: "screens",
                options: ["Add", "Edit", "Delete"],
                values: [],
            },
            {
                type: "movies",
                options: ["Add", "Edit", "Delete", "Assign Movie To Distributor", "Upload DKDMs"],
                values: [],
            },
        ];

        _forEach(permissions, function (value, key) {
            const splitted = key.split("_");

            const type = splitted[0];

            if (value) {
                transformedPermissions.forEach((perm) => {
                    if (perm.type == type) {
                        perm.values.push(permToTextMap[splitted[1]] ? permToTextMap[splitted[1]] : splitted[1]);
                    }
                });
            }
        });

        return transformedPermissions;
    };

    const convertValueArrayToPermissionsObjects = (transformedPermissions) => {
        const userPermissions = {
            distributors_Add: false,
            distributors_Edit: false,
            distributors_Delete: false,
            // distributors_EnableOrDisable: false,

            producers_Add: false,
            producers_Edit: false,
            producers_Delete: false,
            // producers_EnableOrDisable: false,

            countries_Add: false,
            countries_Edit: false,
            countries_Delete: false,
            // countries_EnableOrDisable: false,

            cinemas_Add: false,
            cinemas_Edit: false,
            cinemas_Delete: false,
            // cinemas_EnableOrDisable: false,

            screens_Add: false,
            screens_Edit: false,
            screens_Delete: false,
            // screens_EnableOrDisable: false,

            movies_Add: false,
            movies_Edit: false,
            movies_Delete: false,
            // movies_EnableOrDisable: false,
            movies_AssignToDistributor: false,
            movies_LoadDkdms: false,
        };

        transformedPermissions.forEach((tperm) => {
            tperm.values.forEach((value) => {
                userPermissions[`${tperm.type}_${textToPermMap[value] ? textToPermMap[value] : value}`] = true;
            });
        });

        return userPermissions;
    };

    const initialValues = user
        ? {
            ...user,
            ...{
                permissions: convertPermissionsObjectToValueArray(user.permissions),
            },
            ...{ password: "" },
        }
        : {
            username: "",
            password: "",
            email: "",
            name: "",
            phone: "",
            enabled: true,
            type: "Admin",
            permissions: convertPermissionsObjectToValueArray(userPermissions),
        };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={values => {
                console.log(values)
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
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
                        />

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

                        />

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
                        />

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
                        />

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
                        />

                        {/* <FieldArray
                            name="permissions"
                            render={(arrayHelpers) => (
                                <View>
                                    {values.permissions.map((perm, index) => (

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
                        <Button onPress={handleSubmit} title="Submit" mode='contained' color='#005374'> Add Admin</Button>
                    </View>
                </View>

            )}
        </Formik>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        alignItems: "center"
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
        marginBottom: 20


    }
})