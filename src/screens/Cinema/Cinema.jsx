import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers } from '../../actions/userActions'
import { DataTable } from 'react-native-paper';
import { Avatar, Button, Card, Title, Paragraph, IconButton, Colors } from 'react-native-paper';
import { FAB } from 'react-native-paper';
import { yellow100 } from 'react-native-paper/lib/typescript/styles/colors';
import { deleteCinema, getCinemas } from '../../actions/cinemaActions';
import { Screen } from './Screens';
import { Loading } from '../Loading/Loading';


const optionsPerPage = [5, 10, 20];


const UserRow = ({ cinema,navigation }) => {
    const [hidden, sethidden] = useState(true)
    const dispatch = useDispatch()

    return (
        <><DataTable.Row onPress={() => sethidden(hidden => !hidden)}>
            <DataTable.Cell style={{}}>{cinema.name}</DataTable.Cell>
            <DataTable.Cell >{cinema.country.name}</DataTable.Cell>

            <IconButton
                icon="pencil"
                color={'#005374'}
                size={20}
                onPress={() => navigation.navigate('AddCinema', {
                    cinema:cinema
                  })}
            />
            <IconButton
                icon="delete"
                color={'#005374'}
                size={20}
                onPress={() => dispatch(deleteCinema(cinema))}
            />
        </DataTable.Row>

        {!hidden ?<>
        <View style={{ display:'flex', justifyContent:'center', alignItems:'center'}}>
        <View style={{width:'75%'}}>
            <Screen navigation={navigation} cinema={cinema} screens={cinema.screens}></Screen>
        </View>
            </View></>: <></>}
        </>
    )
}

export const Cinema = ({navigation}) => {

    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
    const [paginatedData, setPaginatedData] = useState([]);

    const dispatch = useDispatch()

    

    useEffect(() => {
        dispatch(getCinemas());
    }, [getCinemas]);

    const cinemas = useSelector(state => state.cinema.cinemas)

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, cinemas.length);

    useEffect(() => {
        setPage(0);
        const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, cinemas.length);
    setPaginatedData(cinemas.slice(from, to))
    }, [itemsPerPage]);

    useEffect(() => {
        setPaginatedData(cinemas.slice(from, to))
    }, [cinemas]);

    
    useEffect(() => {
        setPaginatedData(cinemas.slice(from, to))
    }, [page])


    const isLoading = useSelector(state => state.loading.isLoading)

    return (
        <SafeAreaView>
        <ScrollView>
        {isLoading?<Loading/>:
            <>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title >Name</DataTable.Title>
                    <DataTable.Title >Code</DataTable.Title>
                    <IconButton
                        icon="plus-circle"
                        color={'#005374'}
                        size={24}
                        onPress={() => navigation.navigate('AddCinema')}
                    />
                </DataTable.Header>

                {paginatedData.map((cinema, i) => (
                    <UserRow cinema={cinema} key={i} navigation={navigation}></UserRow>
                ))}

                <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(cinemas.length / itemsPerPage)}
                    onPageChange={page => setPage(page)}
                    label={`${from + 1}-${to} of ${cinemas.length}`}
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