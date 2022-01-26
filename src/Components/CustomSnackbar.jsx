import React, { useState } from 'react'
import { Snackbar } from 'react-native-paper'
import { useSelector } from 'react-redux';

export const CustomSnackbar = () => {

    const [visible, setVisible] = useState(true);

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);

    const notification = useSelector(state => state.notification)

    return (
        <>
            <Snackbar
                visible={notification.type}
                // duration={3000}
                onDismiss={onDismissSnackBar}
            // action={{
            //   label: 'Undo',
            //   onPress: () => {
            //     // Do something
            //   },
            // }}
            style={{backgroundColor:notification.type=='error'?'red':'green'}}
            >
                {notification.message}
            </Snackbar>
        </>
    )
}
