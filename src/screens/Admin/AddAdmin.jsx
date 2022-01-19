import React, { useState } from 'react'
import { Text, View, StyleSheet, SafeAreaView } from 'react-native'
import { useDispatch } from 'react-redux';
import * as Yup from "yup";
import { addUser, editUser } from '../../actions/userActions';
import { forEach as _forEach, union as _union } from "lodash";
import { Formik, FieldArray } from 'formik';
import { TextInput, Button, Divider, Title, HelperText } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import MultiSelect from 'react-native-multiple-select';
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

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




export const AddAdmin = ({route,navigation }) => {
    const dispatch = useDispatch()
    const { user } = route?.params?route.params:{};
    // console.log(user)

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
    // const [permissions, setPermissions] = useState([]);


    const permToTextMap = {
        "AssignToDistributor": "Assign Movie To Distributor",
        "LoadDkdms": "Upload DKDMs"
    }

    const textToPermMap = {
        "Assign Movie To Distributor": "AssignToDistributor",
        "Upload DKDMs": "LoadDkdms"
    }

    const handleOnSubmit = (values, { setSubmitting }) => {

        const userPermissions = {
            distributors_Add: true,
            distributors_Edit: true,
            distributors_Delete: true,
            // distributors_EnableOrDisable: true,

            producers_Add: true,
            producers_Edit: true,
            producers_Delete: true,
            // producers_EnableOrDisable: true,

            countries_Add: true,
            countries_Edit: true,
            countries_Delete: true,
            // countries_EnableOrDisable: true,

            cinemas_Add: true,
            cinemas_Edit: true,
            cinemas_Delete: true,
            // cinemas_EnableOrDisable: true,

            screens_Add: true,
            screens_Edit: true,
            screens_Delete: true,
            // screens_EnableOrDisable: true,

            movies_Add: true,
            movies_Edit: true,
            movies_Delete: true,
            // movies_EnableOrDisable: true,
            movies_AssignToDistributor: true,
            movies_LoadDkdms: true,
        };

        const finalValues = {
            ...values,
            ...{
                permissions: userPermissions,
            },
        };

        if (user) {
            if (finalValues.password == "") {
                delete finalValues.password;
            }

            dispatch(editUser(finalValues,false,navigation));
        } else {
            dispatch(addUser(finalValues,navigation));
        }

        setSubmitting(false);
        // navigation.navigate('Admins')
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
                options: [{ name: "Add" }, { name: "Edit" }, { name: "Delete" }],
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
        // console.log(transformedPermissions)

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
            // ...{
            //     permissions: convertPermissionsObjectToValueArray(user.permissions),
            // },
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
            // permissions: convertPermissionsObjectToValueArray(userPermissions),
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
                                <HelperText type="error" visible={errors.password&& touched.password}>{errors.password}</HelperText>
    

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
                                <HelperText type="error" visible={errors.email&& touched.email}>{errors.email}</HelperText>
    

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
                                <HelperText type="error" visible={errors.name&& touched.name}>{errors.name}</HelperText>
    

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
                                <HelperText type="error" visible={errors.phone&& touched.phone}>{errors.phone}</HelperText>
    

                            {/* <View styles={{width:'100%'}}>  */}
                            {/* <SectionedMultiSelect
                                items={values.permissions}
                                IconRenderer={Icon}
                                modalWithSafeAreaView
                                uniqueKey="type"
                                subKey="options"
                                selectText="Permisions"
                                showDropDowns={true}
                                readOnlyHeadings={true}
                                onSelectedItemsChange={items => {console.log(items)
                                setPermissions(items)}
                                }
                                selectedItems={permissions}
                                styles={{width:'100%'}}
                            /> */}
                            {/* <SectionedMultiSelect
                                items={items}
                                IconRenderer={Icon}
                                modalWithSafeAreaView
                                uniqueKey="name"
                                subKey="children"
                                selectText="Permisions"
                                showDropDowns={true}
                                readOnlyHeadings={true}
                                onSelectedItemsChange={items => {console.log(items)
                                setPermissions(items)}
                                }
                                selectedItems={permissions}
                                styles={{width:'100%'}}
                            />
                            </View> */}

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
                                <Button onPress={handleSubmit} title="Submit" mode='contained' color='#005374'> {user?"Edit":"Add"} Admin</Button>
                                <Button onPress={navigation.goBack} mode='default' color='#005374'>Cancel</Button>
                            </View>
                        </View>
                    </View>

                )}
            </Formik>
        </ScrollView>
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
        marginTop: 20


    }
})