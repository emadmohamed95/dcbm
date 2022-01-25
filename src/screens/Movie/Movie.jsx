import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers } from '../../actions/userActions'
import { DataTable } from 'react-native-paper';
import { Avatar, Button, Card, Title, Paragraph, IconButton, Colors } from 'react-native-paper';
import { FAB } from 'react-native-paper';
import { yellow100 } from 'react-native-paper/lib/typescript/styles/colors';
import { deleteMovie, getMovies } from '../../actions/movieActions';
import { MovieVersion } from './MovieVersion';
import { Loading } from '../Loading/Loading';


const optionsPerPage = [5, 10, 20];


const UserRow = ({ movie,navigation }) => {
    const [hidden, sethidden] = useState(true)
    const dispatch = useDispatch()

    return (
        <><DataTable.Row onPress={() => sethidden(hidden => !hidden)}>
            <DataTable.Cell style={{}}>{movie.name}</DataTable.Cell>
            <DataTable.Cell >{movie.localizedName}</DataTable.Cell>

            <IconButton
                icon="pencil"
                color={'#005374'}
                size={20}
                onPress={() => navigation.navigate('AddMovie', {
                    movie:movie
                  })}
            />
            <IconButton
                icon="delete"
                color={'#005374'}
                size={20}
                onPress={() => dispatch(deleteMovie(movie))}
            />
        </DataTable.Row>

        {!hidden ?<>
        <View style={{ display:'flex', justifyContent:'center', alignItems:'center'}}>
        <View style={{width:'75%'}}>
            <MovieVersion navigation={navigation} movie={movie} movieVersions={movie.movieVersions}></MovieVersion>
        </View>
            </View></>: <></>}
        </>
    )
}

export const Movie = ({navigation}) => {

    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
    const [paginatedData, setPaginatedData] = useState([]);

    const dispatch = useDispatch()

    

    useEffect(() => {
        dispatch(getMovies());
    }, [getMovies]);

    const movies = useSelector(state => state.movie.movies)

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, movies.length);

    useEffect(() => {
        setPage(0);
        const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, movies.length);
    setPaginatedData(movies.slice(from, to))
    }, [itemsPerPage]);

    useEffect(() => {
        setPaginatedData(movies.slice(from, to))
    }, [movies]);

    
    useEffect(() => {
        setPaginatedData(movies.slice(from, to))
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
                        onPress={() => navigation.navigate('AddMovie')}
                    />
                </DataTable.Header>

                {paginatedData.map((movie, i) => (
                    <UserRow movie={movie} key={i} navigation={navigation}></UserRow>
                ))}

                <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(movies.length / itemsPerPage)}
                    onPageChange={page => setPage(page)}
                    label={`${from + 1}-${to} of ${movies.length}`}
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