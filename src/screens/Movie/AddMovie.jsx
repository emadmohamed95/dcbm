import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";
import { forEach as _forEach, union as _union, differenceWith as _differenceWith, concat as _concat } from "lodash";
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
import { getUsers } from '../../actions/userActions';
import { addMovie, editMovie, getMovieUsers } from '../../actions/movieActions';

export const Addmovie = ({ route, navigation }) => {
    const dispatch = useDispatch()
    const [selectedCountry, setselectedCountry] = useState([])
    const [selectedDistributors, setselectedDistributors] = useState([])

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

    useEffect(() => {
        dispatch(getUsers())
    }, [])

    const { movie } = route?.params ? route.params : {};

    // console.log(movie)


    const countries = useSelector(state => state.country.countries)
    const users = useSelector(state => state.user.users)
    const sessionUser = useSelector(state => state.auth.user)
    const token = useSelector(state => state.auth.token)




    const producers = users.filter((user) => user.type.name == "Producer");

    const [movieProducer, setMovieProducer] = useState({id:''});
  
    const [movieAdmin, setMovieAdmin] = useState(sessionUser);
  
    const [movieDistributors, setMovieDistributors] = useState([]);
  
    const [movieCountry, setMovieCountry] = useState(null);
    const [distributors, setDistributors] = useState([]);

    useEffect(()=>{

        if (movie&&movie!="") {
        //   startLoadingInDialog()
        // console.log('getting movie')
          getMovieUsers(movie.id, token)
            .then((res) => {

                // console.log(res.data)
    
              const users = res.data.users;
             
                let newmovieProducer = users.some((user) => user.type.name == "Producer")
                      ? users.filter((user) => user.type.name == "Producer")[0]
                      : producers[0]
    
                let newmovieAdmin =  users.some((user) => user.type.name == "Admin")
                      ? users.filter((user) => user.type.name == "Admin")[0]
                      : sessionUser
                
                let newmovieDistributors = users.filter((user) => user.type.name == "Distributor")
    
                let newmovieCountry = res.data.country

                // console.log(newmovieDistributors.map(dist=>dist.id))
    
    
                setMovieProducer(newmovieProducer)
                setMovieAdmin(newmovieAdmin)
                setMovieDistributors(newmovieDistributors)
                // setDistributors(newmovieDistributors)
                setselectedDistributors(newmovieDistributors.map(dist=>dist.id))
                setMovieCountry(newmovieCountry)
                setselectedCountry([newmovieCountry.id])
    
                // finishLoadingInDialog()
    
            })
            .catch(err=>{handleError(err)});
    
    
        }
    
      },[movie])

      const isUserCountryEligible = (user)=>{
        if(!selectedCountry.length>0){
          return true;
        }else{
    
          if(user.countries.length==0){
            return true;
          }else{
    
            const userCountry = user.countries.find(country=>{
              
              // console.log(country.id);
              // console.log(selectedCountry.id);
              return country.id == selectedCountry[0]
            
            });
    
            // console.log(userCountry);
            return userCountry?true:false;
          }
          
        }
    
      }


      useEffect(() => {
        setselectedCountry(countries?countries.length>0?[countries[0]]:[]:[])
      }, [countries]);
    
      useEffect(() => {
        setDistributors(users.filter((user) => (user.type.name == "Distributor" && isUserCountryEligible(user))))
      }, [users]);
    
      
      useEffect(() => {
        setDistributors(users.filter((user) => (user.type.name == "Distributor" && isUserCountryEligible(user))))
      }, [selectedCountry]);

      const schema = Yup.object().shape({
        name: Yup.string().required("Required"),
        // country:Yup.object().required("Required").nullable()
    
      });
    

      const handleOnSubmit = (values, { setSubmitting }) => {

        if (movie) {
          const toBeRemovedValues = _differenceWith(
            movieDistributors,
            values.distributors,
            (arrValue, othValue) => arrValue.id == othValue.id
          );
    
          const toBeAddedValues = _differenceWith(
            values.distributors,
            movieDistributors,
            (arrValue, othValue) => arrValue.id == othValue.id
          );
    
          if (movieProducer.id !== values.producer) {
            toBeAddedValues.push(
              producers.find((prod) => prod.id == values.producer)
            );
            toBeRemovedValues.push(movie.producer);
          }
    
          const finalValues = {
            ...values,
            ...{ users: toBeAddedValues },
            ...{ removedUsers: toBeRemovedValues },
          };
          delete finalValues.admin;
          delete finalValues.distributors;
          delete finalValues.producer;
          delete finalValues.cinemas;
    
          // console.log(finalValues);
          finalValues.users = JSON.stringify(finalValues.users);
          finalValues.removedUsers = JSON.stringify(finalValues.removedUsers);
    
          if(finalValues.country){
            finalValues.country = JSON.stringify(finalValues.country);
          }else{
            delete finalValues.country;
          }
          
    
    
          if(values.dkdm){
    
            // console.log(values.dkdm[0]);
    
            const toBeAddedValues = _differenceWith(
              values.dkdm,
              movie.movieVersions,
              (arrValue, othValue) => arrValue.name == othValue.name
            );
    
            // console.log(toBeAddedValues);
    
            finalValues.dkdm = toBeAddedValues;
    
            const defUsers = values.distributors;
            defUsers.push(values.admin)
            defUsers.push(producers.find((prod) => prod.id == values.producer))
    
            finalValues.commonValues = JSON.stringify({
              users: defUsers
          })
        }
    
          dispatch(editMovie(finalValues,navigation));
        } else {
          const finalValues = {
            ...values,
            ...{
              users: _concat(values.distributors, [
                values.admin,
                producers.find((prod) => prod.id == values.producer),
              ]),
            },
          };
          delete finalValues.admin;
          delete finalValues.distributors;
          delete finalValues.producer;
          finalValues.users = JSON.stringify(finalValues.users);
          if(finalValues.country){
            finalValues.country = JSON.stringify(finalValues.country);
          }else{
            delete finalValues.country;
          }

          // console.log(finalValues)
    
          dispatch(addMovie(finalValues,navigation));
        }
    
        setSubmitting(false);
    
      };

    // const handleOnSubmit = (values, { setSubmitting }) => {

    //     console.log(values)

    //     if (cinema) {

    //         const finalValues = {
    //             ...values
    //         };

    //         if (values.certificates) {

    //             const toBeAddedValues = _differenceWith(
    //                 values.certificates,
    //                 cinema.screens,
    //                 (arrValue, othValue) => arrValue.name == othValue.name
    //             );

    //             finalValues.certificates = toBeAddedValues;
    //         }
    //         dispatch(editCinema(finalValues, navigation));
    //     } else {
    //         dispatch(addCinema(values, navigation));
    //     }

    //     setSubmitting(false);
    // };
    const handleFileUploadClick = (files, setFieldValue) => {
    
        setFieldValue("dkdm", files);
    
        let dkdmNames = "";
    
    
        for (const file of files) {
          dkdmNames+=","+file.name;
        }
    
        setFieldValue("dkdmName", dkdmNameCombined+dkdmNames);
      };

      const dkdmNameCombined = movie?movie.movieVersions.map(mv=>mv.dkdm.split("\\").pop()).join(','):"";


      let initialValues = movie
      ? {
          ...movie,
          ...{ producer: movieProducer?[movieProducer.id]:[producers[0].id]},
          ...{ admin: movieAdmin },
          ...{ distributors: movieDistributors },
          ...{ country: movieCountry },
          ...{ dkdmName:dkdmNameCombined},
        }
      : {
          name: "",
          localizedName: "",
          producer: producers.length > 0 ? [producers[0].id] : [],
          admin: sessionUser,
          distributors: [],
          enabled: true,
          dkdm: "",
          dkdmName: "Choose DKDM",
          // country:{id:"All",name:"All"}
          country:countries?countries.length>0?countries[0]:null:null
        };


    return (
        <ScrollView>
            <Formik
                initialValues={initialValues}
                validationSchema={schema}
                enableReinitialize
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
                                onChangeText={handleChange('localizedName')}
                                onBlur={handleBlur('localizedName')}
                                value={values.localizedName}
                                style={styles.textInput}
                                placeholder='localizedName'
                                autoCapitalize='none'
                                mode="outlined"
                                selectionColor='#005374'
                                activeOutlineColor='#005374'
                                error={errors.localizedName && touched.localizedName}
                            />
                            <HelperText type="error" visible={errors.localizedName && touched.localizedName}>{errors.localizedName}</HelperText>

                            <View style={{ width: '100%' }}>
                                <SectionedMultiSelect
                                    items={producers}
                                    IconRenderer={Icon}
                                    modalWithSafeAreaView
                                    uniqueKey="id"
                                    subKey="children"
                                    selectText={"Producer"}
                                    selectedText={"Producer"}
                                    searchPlaceholderText={'Search Producers'}
                                    single
                                    showCancelButton
                                    // showDropDowns={true}
                                    // readOnlyHeadings={true}
                                    onSelectedItemsChange={(items) => {
                                       
                                        setFieldValue('producer', items)
                                    }}
                                    // onSelectedItemObjectsChange={items => {
                                    //     setFieldValue('countryId', items)
                                    // }
                                    // }
                                    selectedItems={values.producer}
                                    showRemoveAll
                                    colors={{ primary: '#005374' }}
                                // styles={{ selectToggle:{width: '100%', backgroundColor:'red'} }}
                                />

                            </View>


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
                                        setFieldValue(`distributors`, []);

                                    }}
                                    onSelectedItemObjectsChange={items => {
                                        setFieldValue('country', items[0])
                                    }
                                    }
                                    selectedItems={selectedCountry}
                                    showRemoveAll
                                    colors={{ primary: '#005374' }}
                                // styles={{ selectToggle:{width: '100%', backgroundColor:'red'} }}
                                />

                            </View>


                            <View style={{ width: '100%' }}>
                                <SectionedMultiSelect
                                    items={distributors}
                                    IconRenderer={Icon}
                                    modalWithSafeAreaView
                                    uniqueKey="id"
                                    subKey="children"
                                    selectText={"Distributors"}
                                    selectedText={"Distributors"}
                                    searchPlaceholderText={'Search Distributors'}
        
                                    showCancelButton
                                    // showDropDowns={true}
                                    // readOnlyHeadings={true}
                                    onSelectedItemsChange={(items) => {
                                        setselectedDistributors(items)
                                        // setFieldValue(`distributors`, items);

                                    }}
                                    onSelectedItemObjectsChange={items => {
                                        setFieldValue('distributors', items)
                                    }
                                    }
                                    selectedItems={selectedDistributors}
                                    showRemoveAll
                                    colors={{ primary: '#005374' }}
                                // styles={{ selectToggle:{width: '100%', backgroundColor:'red'} }}
                                />

                            </View>

                            
                            {!movie?<Button icon="cloud" color='#005374' onPress={() => {
                                DocumentPicker.pick({
                                    // allowMultiSelection: true,
                                    // type: [types.pem, types.docx],
                                }).then(result=>{
                                    setResult(result)
                                    handleFileUploadClick(result,setFieldValue)
                                }).catch(handleError)
                            }}>Choose DKDM
                            </Button>:<></>}

                            {result && result.length>0? 
                            
                            <View>
                            {result.map(file=><Text>{file.name}</Text>)}
                            </View>
                            :
                            <></>}



                            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop:20 }}>
                                <Button onPress={handleSubmit} title="Submit" mode='contained' color='#005374'> {movie ? "Edit" : "Add"} Movie</Button>
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