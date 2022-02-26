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
import { getCountries } from '../../actions/countryActions';
import { addCinema, editCinema } from '../../actions/cinemaActions';
import DocumentPicker, {
    DirectoryPickerResponse,
    DocumentPickerResponse,
    isInProgress,
    types,
} from 'react-native-document-picker'

export const Addcinema = ({ route, navigation }) => {
    const dispatch = useDispatch()
    const [selectedCountry, setselectedCountry] = useState([])

    const [result, setResult] = useState()
    useEffect(() => {
        console.log(JSON.stringify(result, null, 2))
    }, [result])

    const handleError = () => {
        if (DocumentPicker.isCancel(err)) {
            console.warn('cancelled')
            // User cancelled the picker, exit any dialogs or menus and move on
        } else if (isInProgress(err)) {
            console.warn('multiple pickers were opened, only the last will be considered')
        } else {
            throw err
        }
    }


    useEffect(() => {
        dispatch(getCountries())
    }, [])

    const countries = useSelector(state => state.country.countries)

    const phoneRegExp = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/

    const schema = Yup.object().shape({
        name: Yup.string().required("Required"),

        KdmEmail: Yup.string().email("Invalid email"),

        contactEmail: Yup.string().email("Invalid email"),
        contactPhone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
    });


    const { cinema } = route?.params ? route.params : {};

    // console.log(cinema)


    useEffect(() => {
        if (cinema) {
            setselectedCountry([cinema.country.id])
        }
    }, [cinema])

    const handleOnSubmit = (values, { setSubmitting }) => {

        // console.log(values)

        if (cinema) {

            const finalValues = {
                ...values
            };

            if (values.certificates) {

                const toBeAddedValues = _differenceWith(
                    values.certificates,
                    cinema.screens,
                    (arrValue, othValue) => arrValue.name == othValue.name
                );

                finalValues.certificates = toBeAddedValues;
            }
            dispatch(editCinema(finalValues, navigation));
        } else {
            dispatch(addCinema(values, navigation));
        }

        setSubmitting(false);
    };

    const handleFileUploadClick = (files,setFieldValue) => {

        setFieldValue("certificates", files);

        let certificatesNames = "";


        for (const file of files) {
            certificatesNames += "," + file.name;
        }

        setFieldValue("certificatesNames", certificatesNamesCombined + certificatesNames);
    };

    const certificatesNamesCombined = cinema ? cinema.screens.map(screen => screen.serverCertificate.split("\\").pop()).join(',') : "";
    const initialValues = cinema
        ? {
            ...cinema,
            ...{ certificatesNames: certificatesNamesCombined },
        }
        : {
            name: "",
            name2: "",
            KdmEmail: "",
            countryId: countries.length > 0 ? countries[0].id : "",
            address: "",
            contactName: "",
            enabled: true,
            contactPhone: "",
            contactEmail: "",
            zipcode: "",
            certificates: "",
            certificatesNames: "Choose Certificates"
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

                            <TextInput
                                onChangeText={handleChange('KdmEmail')}
                                onBlur={handleBlur('KdmEmail')}
                                value={values.KdmEmail}
                                style={styles.textInput}
                                placeholder='KdmEmail'
                                autoCapitalize='none'
                                mode="outlined"
                                selectionColor='#005374'
                                activeOutlineColor='#005374'
                                error={errors.KdmEmail && touched.KdmEmail}
                            />
                            <HelperText type="error" visible={errors.KdmEmail && touched.KdmEmail}>{errors.KdmEmail}</HelperText>

                            <View style={{ width: '100%' }}>
                                <SectionedMultiSelect
                                    items={countries}
                                    IconRenderer={Icon}
                                    modalWithSafeAreaView
                                    uniqueKey="id"
                                    subKey="children"
                                    selectText={"Country"}
                                    selectedText={"Country"}
                                    searchPlaceholderText={'Search Countries'}
                                    single
                                    showCancelButton
                                    // showDropDowns={true}
                                    // readOnlyHeadings={true}
                                    onSelectedItemsChange={(items) => {
                                        setselectedCountry(items)
                                        setFieldValue('countryId', items[0])
                                    }}
                                    // onSelectedItemObjectsChange={items => {
                                    //     setFieldValue('countryId', items)
                                    // }
                                    // }
                                    selectedItems={selectedCountry}
                                    showRemoveAll
                                    colors={{ primary: '#005374' }}
                                // styles={{ selectToggle:{width: '100%', backgroundColor:'red'} }}
                                />

                            </View>

                            <TextInput
                                onChangeText={handleChange('address')}
                                onBlur={handleBlur('address')}
                                value={values.address}
                                style={styles.textInput}
                                placeholder='address'
                                autoCapitalize='none'
                                mode="outlined"
                                selectionColor='#005374'
                                activeOutlineColor='#005374'
                                error={errors.address && touched.address}
                            />
                            <HelperText type="error" visible={errors.address && touched.address}>{errors.address}</HelperText>

                            <TextInput
                                onChangeText={handleChange('contactPhone')}
                                onBlur={handleBlur('contactPhone')}
                                value={values.contactPhone}
                                style={styles.textInput}
                                placeholder='contactPhone'
                                autoCapitalize='none'
                                mode="outlined"
                                selectionColor='#005374'
                                activeOutlineColor='#005374'
                                error={errors.contactPhone && touched.contactPhone}
                            />
                            <HelperText type="error" visible={errors.contactPhone && touched.contactPhone}>{errors.contactPhone}</HelperText>
                            <TextInput
                                onChangeText={handleChange('contactName')}
                                onBlur={handleBlur('contactName')}
                                value={values.contactName}
                                style={styles.textInput}
                                placeholder='contactName'
                                autoCapitalize='none'
                                mode="outlined"
                                selectionColor='#005374'
                                activeOutlineColor='#005374'
                                error={errors.contactName && touched.contactName}
                            />
                            <HelperText type="error" visible={errors.contactName && touched.contactName}>{errors.contactName}</HelperText>
                            <TextInput
                                onChangeText={handleChange('contactEmail')}
                                onBlur={handleBlur('contactEmail')}
                                value={values.contactEmail}
                                style={styles.textInput}
                                placeholder='contactEmail'
                                autoCapitalize='none'
                                mode="outlined"
                                selectionColor='#005374'
                                activeOutlineColor='#005374'
                                error={errors.contactEmail && touched.contactEmail}
                            />
                            <HelperText type="error" visible={errors.contactEmail && touched.contactEmail}>{errors.contactEmail}</HelperText>
                            <TextInput
                                onChangeText={handleChange('zipcode')}
                                onBlur={handleBlur('zipcode')}
                                value={values.zipcode}
                                style={styles.textInput}
                                placeholder='zipcode'
                                autoCapitalize='none'
                                mode="outlined"
                                selectionColor='#005374'
                                activeOutlineColor='#005374'
                                error={errors.zipcode && touched.zipcode}
                            />
                            <HelperText type="error" visible={errors.zipcode && touched.zipcode}>{errors.zipcode}</HelperText>

                            {!cinema?<Button icon="cloud" color='#005374' onPress={() => {
                                DocumentPicker.pick({
                                    allowMultiSelection: true,
                                    // type: [types.pem, types.docx],
                                }).then(result=>{
                                    setResult(result)
                                    handleFileUploadClick(result,setFieldValue)
                                }).catch(handleError)
                            }}>Choose Certificates
                            </Button>:<></>}




                            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop:20 }}>
                                <Button onPress={handleSubmit} title="Submit" mode='contained' color='#005374'> {cinema ? "Edit" : "Add"} cinema</Button>
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