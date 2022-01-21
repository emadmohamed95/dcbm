import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, SafeAreaView } from 'react-native'
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
import { addMovie, addMovieVersion, editMovie, editMovieVersion, getMovieUsers } from '../../actions/movieActions';

export const Addmovieversion = ({ route, navigation }) => {
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

    const { movie, movieVersion } = route?.params ? route.params : {};

    // console.log(movie)


    const countries = useSelector(state => state.country.countries)
    const users = useSelector(state => state.user.users)
    const sessionUser = useSelector(state => state.auth.user)




    const producers = users.filter((user) => user.type.name == "Producer");

    // const [movieProducer, setMovieProducer] = useState({id:''});
  
    // const [movieAdmin, setMovieAdmin] = useState(sessionUser);
  
    // const [movieDistributors, setMovieDistributors] = useState([]);

    const movieProducer = movieVersion && movieVersion.users
    ? movieVersion.users.filter((user) => user.type.name == "Producer")[0]
    : undefined;

  const movieAdmin = movieVersion && movieVersion.users
    ? movieVersion.users.filter((user) => user.type.name == "Admin")[0]
    : undefined;

  const movieDistributors = movieVersion && movieVersion.users
    ? movieVersion.users.filter((user) => user.type.name == "Distributor")
    : [];
  
    const [movieCountry, setMovieCountry] = useState(null);
    const [distributors, setDistributors] = useState([]);

   
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
        setDistributors(users.filter((user) => (user.type.name == "Distributor" && isUserCountryEligible(user))))
      }, [users]);
    
      
      useEffect(() => {
        setDistributors(users.filter((user) => (user.type.name == "Distributor" && isUserCountryEligible(user))))
      }, [selectedCountry]);
    
      useEffect(() => {
        setselectedCountry(movieVersion?.country?[movieVersion.country.id]:[])
        const movieDistributors = movieVersion && movieVersion.users
        ? movieVersion.users.filter((user) => user.type.name == "Distributor")
        : [];
        // console.log(movieDistributors)
        setselectedDistributors(movieDistributors.map(dist=>dist.id))
      }, [movieVersion]);


    //   useEffect(() => {
    //     setselectedCountry(countries?countries.length>0?[countries[0]]:[]:[])
    //   }, [countries]);
    
    //   useEffect(() => {
    //     setDistributors(users.filter((user) => (user.type.name == "Distributor" && isUserCountryEligible(user))))
    //   }, [users]);
    
      
    //   useEffect(() => {
    //     setDistributors(users.filter((user) => (user.type.name == "Distributor" && isUserCountryEligible(user))))
    //   }, [selectedCountry]);

      const schema = Yup.object().shape({
        name: Yup.string().required("Required"),
        // country:Yup.object().required("Required").nullable()
    
      });
    
      const handleOnSubmit = (values, { setSubmitting }) => {

        if (movieVersion) {
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
    
            // toBeAddedValues.push(
            //   producers.find((prod) => prod.id == values.producer)
            // );
            // toBeRemovedValues.push(movieVersion.producer);
          // console.log(toBeAddedValues)
    
          const finalValues = {
            ...values,
            ...{ users: toBeAddedValues },
            ...{ removedUsers: toBeRemovedValues },
          };
          delete finalValues.admin;
          delete finalValues.distributors;
          delete finalValues.producer;
          delete finalValues.cinemas;
          delete finalValues.movie;
          finalValues.users = JSON.stringify(finalValues.users);

          if(finalValues.removedUsers.length>0){
            finalValues.removedUsers = JSON.stringify(finalValues.removedUsers);

          }else{
              delete finalValues.removedUsers
          }
          finalValues.movieId = movie.id;
          // finalValues.movie = JSON.stringify(movie);
          finalValues.country = JSON.stringify(finalValues.country);
    
          const strmovie = JSON.stringify(movie);
    
          const final = {...{movie: strmovie},...finalValues}
    
          // console.log(final);
          dispatch(editMovieVersion(final,navigation));
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
          // console.log(finalValues.users);
          finalValues.users = JSON.stringify(finalValues.users);
          // finalValues.movie = JSON.stringify(movie);
          finalValues.country = JSON.stringify(finalValues.country);
    
          finalValues.movieId = movie.id;
          // console.log(finalValues);
    
          const strmovie = JSON.stringify(movie);
    
          const final = {...{movie: strmovie},...finalValues}
    
          dispatch(addMovieVersion(final,navigation));
        }
    
        setSubmitting(false);
          };
    
      const handledkdmFileUploadClick = (files, setFieldValue) => {
        const file = files[0];
    
          setFieldValue("dkdm", file);
          setFieldValue("dkdmName", file.name);
          setFieldValue("name", file.name);
      
      };

          
      const handlesuppFileUploadClick = (files, setFieldValue) => {
        const file = files[0];
    
        
          setFieldValue("supPackage", file);
          setFieldValue("supPackageName", file.name);
        
    
      
      };

   

      
  const initialValues = movieVersion
  ? {
      ...movieVersion,
      ...{ producer: movieProducer?[movieProducer.id]:[producers[0].id] },
      ...{ admin: movieAdmin },
      ...{ distributors: movieDistributors },
      ...{oldDkdm:movieVersion.dkdm?movieVersion.dkdm:''},
      ...{ dkdmName: movieVersion.dkdm?movieVersion.dkdm.split("\\").pop():""},
      ...{oldSupPackage:movieVersion.supPackage?movieVersion.supPackage:''},
      ...{ supPackageName: movieVersion.supPackage?movieVersion.supPackage.split("\\").pop():""},
    }
  : {
      name: "",
      producer: producers.length > 0 ? [producers[0].id] : [],
      admin: sessionUser,
      distributors: [],
      enabled: true,
      dkdm: "",
      dkdmName: "Choose DKDM",
      country:null,
      supPackage:"",
      supPackageName: "Choose Supplemental package",
      isMainVersion:false
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
                    <View style={styles.container}>

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

                            
                            <Button icon="cloud" color='#005374' onPress={() => {
                                DocumentPicker.pick({
                                    // allowMultiSelection: true,
                                    // type: [types.pem, types.docx],
                                }).then(result=>{
                                    setResult(result)
                                    handledkdmFileUploadClick(result,setFieldValue)
                                }).catch(handleError)
                            }}>Choose DKDM
                            </Button>

                            <Button icon="cloud" color='#005374' onPress={() => {
                                DocumentPicker.pick({
                                    // allowMultiSelection: true,
                                    // type: [types.pem, types.docx],
                                }).then(result=>{
                                    setResult(result)
                                    handlesuppFileUploadClick(result,setFieldValue)
                                }).catch(handleError)
                            }}>Choose Supplemental Package
                            </Button>




                            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop:20 }}>
                                <Button onPress={handleSubmit} title="Submit" mode='contained' color='#005374'> {movieVersion ? "Edit" : "Add"} Movie Version</Button>
                                <Button onPress={navigation.goBack} mode='default' color='#005374'>Cancel</Button>
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