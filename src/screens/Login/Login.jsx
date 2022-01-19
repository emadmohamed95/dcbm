import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/authActions';
import { TextInput , Button} from 'react-native-paper';

export const Login = () => {
    const dispatch = useDispatch()

    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={values => {
                // console.log(values)
                dispatch(login(values))
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
                        <Button onPress={handleSubmit} title="Submit" mode='contained' color='#005374'> Log In</Button>
                    </View>
                </View>

            )}
        </Formik>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    div: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: "center",
        height: '40%',
        width: '90%'

    },
    textInput: {
        // backgroundColor: 'red',
        width: '100%',
        // marginBottom: '10pt'


    }
})
