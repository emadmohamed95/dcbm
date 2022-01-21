import React, { useEffect, useState } from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";
import { addUser, editUser, markUserNotificationAsRead } from '../../actions/userActions';
import { forEach as _forEach, union as _union, differenceWith as _differenceWith } from "lodash";
import { Formik, FieldArray } from 'formik';
import { TextInput, Button, Divider, Title, HelperText, IconButton, List, Text } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import MultiSelect from 'react-native-multiple-select';
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { getCountries } from '../../actions/countryActions'
import { compareDesc, format, parseISO, toDate } from 'date-fns';



export const Notification = ({ route, navigation }) => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.auth.user)

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {

        if(user){

        

        let not = user.notifications

        not.sort((a, b) =>
            compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
        );
        setNotifications(not);
        }
    }, [user]);

    console.log(notifications)

    const handleMarkNotificationAsRead = (notification) => {
        dispatch(markUserNotificationAsRead(user, notification));
    };

    const handleMarkAllAsReadClick = () => {
        notifications.forEach((notification) => {
            if (!notification.isRead) {
                dispatch(markUserNotificationAsRead(user, notification));
            }
        });
    };


    //   const NotificationsList = notifications.map((notification) => (
    //     <React.Fragment key={notification.id}>
    //       <ListItem
    //         alignItems="flex-start"
    //         role={undefined}
    //         dense
    //         divider
    //         style={{ backgroundColor: notification.isRead ? "#FFFFFF" : "#bbdefb" }}
    //       >
    //         <ListItemText
    //           id={`checkbox-list-label-${notification.id}`}
    //           primary={notification.message}
    //           secondary={dateFns.format(
    //             dateFns.date(notification.createdAt),
    //             "MM/dd/yyyy HH:mm:ss"
    //           )}
    //         />
    //         <ListItemSecondaryAction hidden={notification.isRead}>
    //           <IconButton
    //             edge="end"
    //             aria-label="comments"
    //             onClick={() => {
    //               handleMarkNotificationAsRead(notification);
    //             }}
    //           >
    //             <CheckIcon />
    //           </IconButton>
    //         </ListItemSecondaryAction>
    //       </ListItem>
    //       {/* <Divider/> */}
    //     </React.Fragment>
    //   ));

    //   const NotificationsList = notifications.map((notification) => (
    //     <List.Item
    //     title={notification.message}
    //     description={format(
    //                     toDate(notification.createdAt),
    //                     "MM/dd/yyyy HH:mm:ss"
    //                   )}
    //     left={props => <List.Icon {...props} icon="folder" />}
    //   />
    //   ));


    return (
        <ScrollView>
            <View style={styles.container}>

                <View style={styles.div}>

                {notifications.length==0?<Title>{"No Notifications"}</Title>:<></>}

                    {notifications.map((notification, i) => (
                        <View key={i}         
                        style={{ backgroundColor: notification.isRead ? null: "#bbdefb", marginBottom:20, display:'flex', flexDirection:'row', flexWrap:'wrap', alignItems:'center' }}                        >
                        <Title>{notification.message}</Title>
                        <Text>{format(parseISO(notification.createdAt),"MM/dd/yyyy HH:mm:ss")}</Text>
                        {!notification.isRead?
                        <IconButton
                        icon="check"
                        color={'#005374'}
                        size={30}
                        onPress={() => handleMarkNotificationAsRead(notification)}
                    />
                    :<></>}

                        </View>

                        // <List.Item
                        //     title={notification.message}
                        //     key={i}
                        //     // description={format(
                        //     //     notification.createdAt,
                        //     //     "MM/dd/yyyy HH:mm:ss"
                        //     // )}
                        //     description={
                        //         notification.createdAt
                        //     }
                        //     left={props => <List.Icon {...props} icon="folder" />}
                        // />
                        )
                        )}

                </View>

            </View>



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
        // alignItems: "center",
        // height: '40%',
        width: '90%',
        marginTop:20

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


    },

    readDiv: {
        backgroundColor: 'red',
       


    }
})