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
import DocumentPicker, {
    DirectoryPickerResponse,
    DocumentPickerResponse,
    isInProgress,
    types,
} from 'react-native-document-picker'
import { editScreen ,addScreen} from '../../actions/screenActions';

export const AddScreen = ({ route, navigation }) => {
    const dispatch = useDispatch()

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

    const schema = Yup.object().shape({
        name: Yup.string().required("Required"),
      });


    const { cinema,screen } = route?.params ? route.params : {};

    // console.log(screen)

    const handleOnSubmit = (values, { setSubmitting }) => {

        // console.log(values)


        if (screen) {

           
            dispatch(editScreen(values, navigation));
        } else {
            dispatch(addScreen(values, navigation));
        }

        setSubmitting(false);
    };

    const handleFileUploadClick = (file,setFieldValue) => {
        setFieldValue("serverCertificate", file);
        // setFieldValue("serverCertificateLastUpdate", Date.now());
        setFieldValue("serverCertificateName", file.name);
        setFieldValue("name", file.name);
    };

    const types = ["2D", "3D"];
    const cinemas = []
    cinemas.push(cinema);
    const initialValues = screen
    ? {
      ...{cinemaName: cinema.name},
        ...screen,
        ...{ serverCertificateName: screen.serverCertificate.split("\\").pop() },
        ...{oldCertificate:screen.serverCertificate}
        
      }
    : {
        name: `${cinema.name}-${+Date.now()}`,
        name2: "",
        cinemaId: cinema.id,
        cinemaName: cinema.name,
        serverMdsn: "",
        class: "",
        serverModel: "",
        type: types[0],
        serverCertificate: "",
        serverCertificateName: "Choose Server Certificate",
        // serverCertificateLastUpdate: Date.now(),
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

                            
                            {!screen?<Button icon="cloud" color='#005374' onPress={() => {
                                DocumentPicker.pick({
                                    allowMultiSelection: false,
                                    // type: [types.pem, types.docx],
                                }).then(result=>{
                                    setResult(result)
                                    handleFileUploadClick(result[0],setFieldValue)
                                }).catch(handleError)
                            }}>Choose Certificate
                            </Button>:<></>}

                            {result && result.length>0? 
                            
                            <View>
                            {result.map(file=><Text>{file.name}</Text>)}
                            </View>
                            :
                            <></>}


                            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                <Button onPress={handleSubmit} title="Submit" mode='contained' color='#005374'> {screen ? "Edit" : "Add"} screen</Button>
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