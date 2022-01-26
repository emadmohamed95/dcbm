import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers } from '../../actions/userActions'
import { DataTable, Searchbar } from 'react-native-paper';
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
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(0);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const dispatch = useDispatch()

    

    useEffect(() => {
        dispatch(getMovies());
    }, [getMovies]);

    const movies = useSelector(state => state.movie.movies)

    useEffect(() => {
        setData(movies)
        setFilteredData(movies)
    }, [movies]);


    useEffect(() => {
        setPage(0)
        const nfrom = 0 * itemsPerPage;
        setFrom(nfrom)
        const nto = Math.min((0 + 1) * itemsPerPage, filteredData.length);
        setTo(nto)
        setPaginatedData(filteredData.slice(nfrom, nto))
     }, [filteredData,itemsPerPage])


     useEffect(() => {
        const nfrom = page * itemsPerPage;
        setFrom(nfrom)
        const nto = Math.min((page + 1) * itemsPerPage, filteredData.length);
        setTo(nto)
        setPaginatedData(filteredData.slice(nfrom, nto))
    }, [page])

    const [searchQuery, setSearchQuery] = useState('');


    const onChangeSearch = query => {
        setSearchQuery(query)
        setFilteredData(data.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(query.toLowerCase())
        }))
    };

    const isLoading = useSelector(state => state.loading.isLoading)


    return (
        <SafeAreaView>
        <ScrollView>
        {isLoading?<Loading/>:
            <>
            <Searchbar
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title >Name</DataTable.Title>
                    <DataTable.Title >Localized Name</DataTable.Title>
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
                   numberOfPages={Math.ceil(filteredData.length / itemsPerPage)}
                   onPageChange={page => setPage(page)}
                   label={`${from + 1}-${to} of ${filteredData.length}`} optionsPerPage={optionsPerPage}
                   showFastPaginationControls
                   numberOfItemsPerPageList={optionsPerPage}
                   numberOfItemsPerPage={itemsPerPage}
                   onItemsPerPageChange={setItemsPerPage}
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