import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";
import { forEach as _forEach, union as _union, differenceWith as _differenceWith } from "lodash";
import { Formik, FieldArray } from 'formik';
import { TextInput, Button, Divider, Title, HelperText, IconButton } from 'react-native-paper';
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import countries from "./countries.json";
import { addCountry, editCountry } from '../../actions/countryActions';


export const Addcountry = ({ route, navigation }) => {
    const dispatch = useDispatch()
    const [selectedCountry, setselectedCountry] = useState([])
    const { country } = route?.params ? route.params : {};
    const schema = Yup.object().shape({});

    const handleOnSubmit = (values, { setSubmitting }) => {
        // console.log(values)
        if (country) {
            dispatch(editCountry(values, navigation));

        } else {
            dispatch(addCountry(values, navigation));
        }

        setSubmitting(false);
    };

    useEffect(() => {
        if(country){
            setselectedCountry([country.name])
        }
    }, [country])

    const initialValues = country
        ? {
            ...country,
            ...{ country: countries.find((con) => con.name == country.name) },
        }
        : {
            country: countries[0],
            name2: "",
            name: "",
            code: "",
            timezone: countries[0].timezones[0],
            enabled: true,
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

                            <View style={{ width: '100%' }}>
                                <SectionedMultiSelect
                                    items={countries}
                                    IconRenderer={Icon}
                                    modalWithSafeAreaView
                                    uniqueKey="name"
                                    subKey="children"
                                    selectText={"Countries"}
                                    selectedText={"Countries"}
                                    searchPlaceholderText={'Search Countries'}
                                    single
                                    showCancelButton
                                    // showDropDowns={true}
                                    // readOnlyHeadings={true}
                                    onSelectedItemsChange={(items) => { setselectedCountry(items) }}
                                    onSelectedItemObjectsChange={items => {
                                        // console.log(items)
                                        setFieldValue(`country`, items[0]);

                                        setFieldValue(`name`, items[0].name);

                                        setFieldValue(`code`, items[0].country_code);

                                        setFieldValue(
                                            `timezone`,
                                            items[0] ? items[0].timezones[0] : ""
                                        );
                                    }
                                    }
                                    selectedItems={selectedCountry}
                                    showRemoveAll
                                    colors={{ primary: '#005374' }}
                                // styles={{ selectToggle:{width: '100%', backgroundColor:'red'} }}
                                />

                            </View>

                            <TextInput
                                onChangeText={handleChange('name2')}
                                onBlur={handleBlur('name2')}
                                value={values.name2}
                                style={styles.textInput}
                                placeholder='name2'
                                autoCapitalize='none'
                                mode="outlined"
                                selectionColor='#005374'
                                activeOutlineColor='#005374'
                                error={errors.name2 && touched.name2}
                            />
                            <HelperText type="error" visible={errors.name2 && touched.name2}>{errors.name2}</HelperText>



                            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                <Button onPress={handleSubmit} title="Submit" mode='contained' color='#005374'> {country ? "Edit" : "Add"} country</Button>
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