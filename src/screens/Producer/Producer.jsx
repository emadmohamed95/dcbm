import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers } from '../../actions/userActions'
import { DataTable } from 'react-native-paper';
import { Avatar, Button, Card, Title, Paragraph, IconButton, Colors } from 'react-native-paper';
import { FAB } from 'react-native-paper';
import { yellow100 } from 'react-native-paper/lib/typescript/styles/colors';
import { Loading } from '../Loading/Loading';


const optionsPerPage = [5, 10, 20];


const UserRow = ({ producer,navigation }) => {
    const [hidden, sethidden] = useState(true)
    const dispatch = useDispatch()

    return (
        <><DataTable.Row onPress={() => sethidden(hidden => !hidden)}>
            <DataTable.Cell>{producer.name}</DataTable.Cell>
            <DataTable.Cell >{producer.email}</DataTable.Cell>

            <IconButton
                icon="pencil"
                color={'#005374'}
                size={20}
                onPress={() => navigation.navigate('AddProducer', {
                    user:producer
                  })}
            />
            <IconButton
                icon="delete"
                color={'#005374'}
                size={20}
                onPress={() => dispatch(deleteUser(producer))}
            />
        </DataTable.Row>
        </>
    )
}

export const Producer = ({navigation}) => {

    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
    const [paginatedData, setPaginatedData] = useState([]);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers());
    }, [getUsers]);

  

    const users = useSelector(state => state.user.users)
    const producers = users.filter((user) => user.type.name == "Producer")


    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, producers.length);

    useEffect(() => {
        setPage(0);
        const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, producers.length);
    setPaginatedData(producers.slice(from, to))
    }, [itemsPerPage]);

    useEffect(() => {
        setPaginatedData(producers.slice(from, to))
    }, [users]);

    
    useEffect(() => {
        setPaginatedData(producers.slice(from, to))
    }, [page])

    // console.log(producers)

    const isLoading = useSelector(state => state.loading.isLoading)


    return (
        <SafeAreaView>
        <ScrollView>
        {isLoading?<Loading/>:
            <>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title >Name</DataTable.Title>
                    <DataTable.Title >Email</DataTable.Title>
                    <IconButton
                        icon="plus-circle"
                        color={'#005374'}
                        size={24}
                        onPress={() => navigation.navigate('AddProducer')}
                    />
                    
                </DataTable.Header>

                {paginatedData.map((producer, i) => (
                    <UserRow producer={producer} key={i} navigation={navigation}></UserRow>
                ))}

                <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(producers.length / itemsPerPage)}
                    onPageChange={page => setPage(page)}
                    label={`${from + 1}-${to} of ${producers.length}`} optionsPerPage={optionsPerPage}
                    showFastPaginationControls
                    numberOfItemsPerPageList={optionsPerPage}
                    numberOfItemsPerPage={itemsPerPage}
                    onItemsPerPageChange={setItemsPerPage}
                    // selectPageDropdownLabel={'R'}
                />
            </DataTable>
            </>}
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