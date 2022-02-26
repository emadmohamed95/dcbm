import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";
import { forEach as _forEach, union as _union, differenceWith as _differenceWith, concat as _concat } from "lodash";
import { Formik, FieldArray } from 'formik';
import { TextInput, Button, Divider, Title, HelperText, IconButton, Checkbox } from 'react-native-paper';
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { getCountries } from '../../actions/countryActions';
import { addCinema, editCinema, getCinemas } from '../../actions/cinemaActions';
import DocumentPicker, {
    DirectoryPickerResponse,
    DocumentPickerResponse,
    isInProgress,
    types,
} from 'react-native-document-picker'
import { getUsers } from '../../actions/userActions';
import { addMovie, assignMovie, editMovie, getMovieUsers, getMovieVersionsAssignedToUser } from '../../actions/movieActions';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { addDays, format, differenceInCalendarDays } from 'date-fns';
import { handleError } from '../../helper/errorHandler';

export const AssignMovie = ({ route, navigation }) => {
    const dispatch = useDispatch()
    const [selectedCountries, setSelectedCountries] = useState([])
    const [selectedCinemas, setSelectedCinemas] = useState([])
    const [selectedVersions, setSelectedVersions] = useState([])
    const [cinemaOptions, setCinemaOptions] = useState([])
    const [checked, setChecked] = useState(false);




    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);

    const showStartDatePicker = () => {
        setStartDatePickerVisibility(true);
    };

    const hideStartDatePicker = () => {
        setStartDatePickerVisibility(false);
    };


    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

    const showEndDatePicker = () => {
        setEndDatePickerVisibility(true);
    };

    const hideEndDatePicker = () => {
        setEndDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    };


    useEffect(() => {
        dispatch(getCountries())
    }, [])

    useEffect(() => {
        dispatch(getCinemas())
    }, [])


    const { movie } = route?.params ? route.params : {};

    // console.log(movie)


    const countries = useSelector(state => state.country.countries)
    const cinemas = useSelector(state => state.cinema.cinemas)
    const users = useSelector(state => state.user.users)
    const sessionUser = useSelector(state => state.auth.user)
    const token = useSelector(state => state.auth.token)

    const [mvs, setMvs] = useState([]);


    useEffect(() => {
        if (movie && movie != "") {
            //   startLoadingInDialog()
            getMovieVersionsAssignedToUser(movie.id, sessionUser.id, token)
                .then((res) => {
                    // setMvs(res.data)
                    // console.log(res.data)
                    // console.log(res.data.map(mv=>({...mv,displayKey:mv.country.name})))
                    setMvs(res.data.map(mv=>({...mv,displayKey:mv.country.name})))
                    // finishLoadingInDialog()
                })
                .catch(err => { handleError(err) });
        }
    }, [movie])


    const schema = Yup.object().shape({
        // movieVersion: Yup.object().required("Required").nullable(),
        // cinemas: Yup.array().required("Required").nullable()
    });

    const handleOnSubmit = (values, { setSubmitting }) => {
        // console.log(values);
        dispatch(assignMovie(movie, values, navigation));
        setSubmitting(false);
    };

    const handleSelectAll = (isChecked, setFieldValue) => {
        if (isChecked) {
            setFieldValue("cinemas", cinemaOptions);
            setSelectedCinemas(cinemaOptions.map(cinema=>cinema.id))

        } else {

            setFieldValue("cinemas", []);
            setSelectedCinemas([])



        }

    };


    // const cinemaOptions = selectedCountries.length > 0 ? cinemas.filter(cinema => (selectedCountries.some(country => country == cinema.country.id))) : []
    // cinemaOptions.sort((a, b) =>
    //     (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
    // );

    // useEffect(() => {
    //     setSelectedCinemas()
    // }, [cinemas])

    useEffect(() => {
        // console.log(selectedCountries)
        // console.log(cinemas)


        const cin = selectedCountries.length > 0 ? cinemas.filter(cinema => (selectedCountries.some(country => country.id == cinema.country.id))) : []
        cin.sort((a, b) =>
            (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
        );
        // console.log('inside useeffect')
        // console.log(cin)
        setCinemaOptions(cin)
    }, [selectedCountries])

    const initialValues = {
        movieVersion: null,
        countries: [],
        cinemas: [],
        startDate: new Date(),
        endDate: addDays(new Date(), 30),
        duration: `30 Days`
    };


    return (
        <ScrollView>
            <Formik
                initialValues={initialValues}
                validationSchema={schema}
                // enableReinitialize
                onSubmit={handleOnSubmit}
            >
                {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors, touched }) => (
                    <KeyboardAvoidingView style={styles.container} behavior='padding'>
                        <View style={styles.div}>



                            <View style={{ width: '100%' }}>
                                <SectionedMultiSelect
                                    items={mvs}
                                    IconRenderer={Icon}
                                    modalWithSafeAreaView
                                    uniqueKey="id"
                                    subKey="children"
                                    selectText={"choose Movie Version"}
                                    selectedText={"Country"}
                                    searchPlaceholderText={'Search Versions'}
                                    single
                                    showCancelButton
                                    displayKey='displayKey'
                                     
                                    // showDropDowns={true}
                                    // readOnlyHeadings={true}
                                    onSelectedItemsChange={(items) => {
                                        setSelectedVersions(items)
                                        setFieldValue(`cinemas`, []);
                                        setSelectedCinemas([])


                                    }}
                                    onSelectedItemObjectsChange={items => {
                                        // console.log(items)
                                        setFieldValue(`movieVersion`, items[0]);
                                        // const count = [];
                                        // if (items) {
                                        //     count.push(items[0].country)
                                        // }
                                        // value.forEach(mv=>{count.push(mv.country)})
                                        setSelectedCountries(items.map(item => item.country));

                                    }
                                    }
                                    selectedItems={selectedVersions}
                                    showRemoveAll
                                    colors={{ primary: '#005374' }}
                                // styles={{ selectToggle:{width: '100%', backgroundColor:'red'} }}
                                />

                            </View>


                            <View style={{ width: '100%' }}>
                                <SectionedMultiSelect
                                    items={cinemaOptions}
                                    IconRenderer={Icon}
                                    modalWithSafeAreaView
                                    uniqueKey="id"
                                    subKey="children"
                                    selectText={"Cinemas"}
                                    selectedText={"Cinemas"}
                                    searchPlaceholderText={'Search Cinemas'}

                                    showCancelButton
                                    // showDropDowns={true}
                                    // readOnlyHeadings={true}
                                    onSelectedItemsChange={(items) => {
                                        setSelectedCinemas(items)

                                    }}
                                    onSelectedItemObjectsChange={items => {
                                        // console.log(items)
                                        setFieldValue(`cinemas`, items);
                                    }
                                    }
                                    selectedItems={selectedCinemas}
                                    showRemoveAll
                                    colors={{ primary: '#005374' }}
                                // styles={{ selectToggle:{width: '100%', backgroundColor:'red'} }}
                                />

                            </View>

                            {/* <Checkbox
                                status={checked ? 'checked' : 'unchecked'}
                                // label={'Select All Cinemas'}
                                onPress={() => {
                                    setChecked(!checked);
                                    handleSelectAll(!checked,setFieldValue)
                                }}

                                uncheckedColor='grey'
                                color='#005374'
                    
                            ></Checkbox> */}

                            <Checkbox.Item label="Select All Cinemas" status={checked ? 'checked' : 'unchecked'} onPress={() => {
                                    setChecked(!checked);
                                    handleSelectAll(!checked,setFieldValue)
                                }}
                                mode='android'
                                uncheckedColor='grey'
                                color='#005374'
                            />



                            <View style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
                                <Button onPress={showStartDatePicker} mode='' color='#005374'>Start Date</Button>
                                {/* <Text>{format(values.startDate),'yyyy-MM-ddTHH:mm:ss'}</Text> */}
                                <Text onPress={showStartDatePicker}>{values.startDate.toString()}</Text>
                            </View>


                            <DateTimePickerModal
                                isVisible={isStartDatePickerVisible}
                                mode="datetime"
                                onConfirm={date => {
                                    setFieldValue('startDate', date)
                                    hideStartDatePicker()
                                }}
                                onCancel={hideStartDatePicker}
                                date={values.startDate}
                            />

                            {/* <Button onPress={showEndDatePicker} mode='contained' color='#005374'>End Date</Button> */}

                            <View style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
                                <Button onPress={showEndDatePicker} mode='' color='#005374'>End Date</Button>
                                {/* <Text>{format(values.startDate),'yyyy-MM-ddTHH:mm:ss'}</Text> */}
                                <Text onPress={showEndDatePicker}>{values.endDate.toString()}</Text>
                            </View>

                            <DateTimePickerModal
                                isVisible={isEndDatePickerVisible}
                                mode="datetime"
                                onConfirm={date => {
                                    setFieldValue('endDate', date)
                                    hideEndDatePicker()
                                }}
                                onCancel={hideEndDatePicker}
                                date={values.endDate}
                            />

                            <Text >Duration: {`${differenceInCalendarDays(values.endDate, values.startDate)} Days`}</Text>










                            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 20 }}>
                                <Button onPress={handleSubmit} title="Submit" mode='contained' color='#005374'>Assign Movie</Button>
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