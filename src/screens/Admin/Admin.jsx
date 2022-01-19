import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers } from '../../actions/userActions'
import { DataTable } from 'react-native-paper';
import { Avatar, Button, Card, Title, Paragraph, IconButton, Colors } from 'react-native-paper';
import { FAB } from 'react-native-paper';
import { yellow100 } from 'react-native-paper/lib/typescript/styles/colors';


const optionsPerPage = [5, 10, 20];

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const UserRow = ({ admin, navigation }) => {
    const [hidden, sethidden] = useState(true)
    const dispatch = useDispatch()

    return (
        <><DataTable.Row onPress={() => sethidden(hidden => !hidden)}>
            <DataTable.Cell>{admin.username}</DataTable.Cell>
            <DataTable.Cell >{admin.name}</DataTable.Cell>

            <IconButton
                icon="pencil"
                color={'#005374'}
                size={20}
                onPress={() => navigation.navigate('AddAdmin', {
                    user: admin
                })}
            />
            <IconButton
                icon="delete"
                color={'#005374'}
                size={20}
                onPress={() => dispatch(deleteUser(admin))}
            />
        </DataTable.Row>
            {/* <DetailsCard title={admin.username} hidden={hidden} user={admin}></DetailsCard> */}
        </>
    )
}

const DetailsCard = ({ title, hidden, user }) => {
    const dispatch = useDispatch()

    return (
        !hidden ? <>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: '75%' }}>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Dessert</DataTable.Title>
                            <DataTable.Title numeric>Calories</DataTable.Title>
                            <DataTable.Title numeric>Fat</DataTable.Title>
                        </DataTable.Header>

                        <DataTable.Row>
                            <DataTable.Cell>Frozen yogurt</DataTable.Cell>
                            <DataTable.Cell numeric>159</DataTable.Cell>
                            <DataTable.Cell numeric>6.0</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
                            <DataTable.Cell numeric>237</DataTable.Cell>
                            <DataTable.Cell numeric>8.0</DataTable.Cell>
                        </DataTable.Row>

                        {/* <DataTable.Pagination
        page={page}
        numberOfPages={3}
        onPageChange={(page) => setPage(page)}
        label="1-2 of 6"
        optionsPerPage={optionsPerPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        showFastPagination
        optionsLabel={'Rows per page'}
      /> */}
                    </DataTable>
                </View>
            </View></> : <></>
    )
}

export const Admin = ({ navigation }) => {

    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
    const [paginatedData, setPaginatedData] = useState([]);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers());
    }, [getUsers]);



    const users = useSelector(state => state.user.users)
    // const admins = users
    const admins = users.filter((user) => user.type.name == "Admin")

    // useEffect(() => {
    //     setPaginatedData(users.filter((user) => user.type.name == "Admin"))
    // }, [users]);

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, admins.length);


    useEffect(() => {
        setPage(0);
        const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, admins.length);
    setPaginatedData(admins.slice(from, to))
    }, [itemsPerPage]);


    useEffect(() => {
        setPaginatedData(admins.slice(from, to))
    }, [users]);

    useEffect(() => {
        setPaginatedData(admins.slice(from, to))
    }, [page])

    // console.log(admins)

    return (
        <SafeAreaView>
        <ScrollView>
            {/* <FAB
                style={styles.fab}

                icon="plus"
                onPress={() => console.log('Pressed')}
            /> */}

            <DataTable>
                <DataTable.Header>
                    <DataTable.Title >Username</DataTable.Title>
                    <DataTable.Title >Name</DataTable.Title>
                    <IconButton
                        icon="plus-circle"
                        color={'#005374'}
                        size={24}
                        onPress={() => navigation.navigate('AddAdmin')}
                    />
                    {/* <FAB
                        style={styles.fab}

                        icon="plus"
                        onPress={() => console.log('Pressed')}
                    /> */}
                </DataTable.Header>

                {paginatedData.map((admin, i) => (
                    <UserRow admin={admin} key={i} navigation={navigation}></UserRow>
                ))}

                <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(admins.length / itemsPerPage)}
                    onPageChange={page => setPage(page)}
                    label={`${from + 1}-${to} of ${admins.length}`} optionsPerPage={optionsPerPage}
                    showFastPaginationControls
                    numberOfItemsPerPageList={optionsPerPage}
                    numberOfItemsPerPage={itemsPerPage}
                    onItemsPerPageChange={setItemsPerPage}
                // selectPageDropdownLabel={'R'}
                />
            </DataTable>
        </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    div: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    text: {
        color: 'red'
    },
    fab: {
        // position: 'absolute',
        backgroundColor: '#005374',
        color: 'white',
        // margin: 16,
        // bottom: 0,
        // right: 0,
    },

});