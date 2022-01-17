import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers } from '../../actions/userActions'
import { DataTable } from 'react-native-paper';
import { Avatar, Button, Card, Title, Paragraph, IconButton, Colors } from 'react-native-paper';
import { FAB } from 'react-native-paper';
import { yellow100 } from 'react-native-paper/lib/typescript/styles/colors';
import { deleteCountry, getCountries } from '../../actions/countryActions';


const optionsPerPage = [5, 10, 20];


const UserRow = ({ country,navigation }) => {
    const [hidden, sethidden] = useState(true)
    const dispatch = useDispatch()

    return (
        <><DataTable.Row onPress={() => sethidden(hidden => !hidden)}>
            <DataTable.Cell>{country.name}</DataTable.Cell>
            <DataTable.Cell >{country.code}</DataTable.Cell>

            <IconButton
                icon="pencil"
                color={'#005374'}
                size={20}
                onPress={() => navigation.navigate('AddCountry', {
                    country:country
                  })}
            />
            <IconButton
                icon="delete"
                color={'#005374'}
                size={20}
                onPress={() => dispatch(deleteCountry(country))}
            />
        </DataTable.Row>
        </>
    )
}

export const Country = ({navigation}) => {

    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
    const [paginatedData, setPaginatedData] = useState([]);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCountries());
    }, [getCountries]);

  

    const countries = useSelector(state => state.country.countries)


    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, countries.length);

    useEffect(() => {
        setPage(0);
        const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, countries.length);
    setPaginatedData(countries.slice(from, to))
    }, [itemsPerPage]);

    useEffect(() => {
        setPaginatedData(countries.slice(from, to))
    }, [countries]);

    
    useEffect(() => {
        setPaginatedData(countries.slice(from, to))
    }, [page])

    console.log(countries)

    return (
        <ScrollView>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title >Name</DataTable.Title>
                    <DataTable.Title >Code</DataTable.Title>
                    <IconButton
                        icon="plus-circle"
                        color={'#005374'}
                        size={24}
                        onPress={() => navigation.navigate('AddCountry')}
                    />
                </DataTable.Header>

                {paginatedData.map((country, i) => (
                    <UserRow country={country} key={i} navigation={navigation}></UserRow>
                ))}

                <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(countries.length / itemsPerPage)}
                    onPageChange={page => setPage(page)}
                    label={`${from + 1}-${to} of ${countries.length}`} optionsPerPage={optionsPerPage}
                    ishowFastPaginationControls
                    numberOfItemsPerPageList={optionsPerPage}
                    numberOfItemsPerPage={itemsPerPage}
                    onItemsPerPageChange={setItemsPerPage}
                // selectPageDropdownLabel={'R'}
                />
            </DataTable>
        </ScrollView>
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