import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers } from '../../actions/userActions'
import { DataTable } from 'react-native-paper';
import { Avatar, Button, Card, Title, Paragraph, IconButton, Colors } from 'react-native-paper';
import { FAB } from 'react-native-paper';
import { yellow100 } from 'react-native-paper/lib/typescript/styles/colors';
import { deleteMovieVersion } from '../../actions/movieActions';


const optionsPerPage = [5, 10, 20];


const UserRow = ({ movieVersion,navigation,movie }) => {
    const [hidden, sethidden] = useState(true)
    const dispatch = useDispatch()

    return (
        <><DataTable.Row onPress={() => sethidden(hidden => !hidden)}>
            <DataTable.Cell>{movieVersion.name}</DataTable.Cell>
            <DataTable.Cell>{movieVersion.country.name}</DataTable.Cell>

            <IconButton
                icon="pencil"
                color={'#005374'}
                size={20}
                onPress={() => navigation.navigate('AddMovieVersion', {
                    movieVersion:movieVersion,
                    movie:movie
                  })}
            />
            <IconButton
                icon="delete"
                color={'#005374'}
                size={20}
                onPress={() => dispatch(deleteMovieVersion(movieVersion))}
            />
        </DataTable.Row>
        </>
    )
}

export const MovieVersion = ({navigation,movieVersions,movie}) => {

    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
    const [paginatedData, setPaginatedData] = useState([]);

    const dispatch = useDispatch()


    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, movieVersions.length);

    useEffect(() => {
        setPage(0);
        const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, movieVersions.length);
    setPaginatedData(movieVersions.slice(from, to))
    }, [itemsPerPage]);


    useEffect(() => {
        setPaginatedData(movieVersions.slice(from, to))
    }, [movieVersions]);

    
    useEffect(() => {
        setPaginatedData(movieVersions.slice(from, to))
    }, [page])


    return (
        <>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title >Name</DataTable.Title>
                    <DataTable.Title >Country</DataTable.Title>
                    <IconButton
                        icon="plus-circle"
                        color={'#005374'}
                        size={24}
                        onPress={() => navigation.navigate('AddMovieVersion', {
                            movie:movie
                          })}                    />
                </DataTable.Header>

                {paginatedData.map((movieVersion, i) => (
                    <UserRow movieVersion={movieVersion} key={i} navigation={navigation} movie={movie}></UserRow>
                ))}

                <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(movieVersions.length / itemsPerPage)}
                    onPageChange={page => setPage(page)}
                    label={`${from + 1}-${to} of ${movieVersions.length}`} optionsPerPage={optionsPerPage}
                    showFastPaginationControls
                    numberOfItemsPerPageList={optionsPerPage}
                    numberOfItemsPerPage={itemsPerPage}
                    onItemsPerPageChange={setItemsPerPage}
                // selectPageDropdownLabel={'R'}
                />
            </DataTable>
        </>
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