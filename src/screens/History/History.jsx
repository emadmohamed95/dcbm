import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers } from '../../actions/userActions'
import { DataTable, Searchbar } from 'react-native-paper';
import { Avatar, Button, Card, Title, Paragraph, IconButton, Colors } from 'react-native-paper';
import { FAB } from 'react-native-paper';
import { yellow100 } from 'react-native-paper/lib/typescript/styles/colors';
import { deleteMovie, getMovies, getMoviesAssignedToUser, getMovieVersionsAssignedToUser, getPreviouslyDistributedMovies } from '../../actions/movieActions';
import { MovieVersion } from './MovieVersion';
import { useIsFocused } from "@react-navigation/native";
import { MovieKDMs } from './MovieKDMs';
import { Loading } from '../Loading/Loading';
import {startLoading,finishLoading} from '../../actions/loadingActions'




const optionsPerPage = [5, 10, 20];


const UserRow = ({ movie,navigation }) => {
    const [hidden, sethidden] = useState(true)
    const dispatch = useDispatch()


    return (
        <><DataTable.Row onPress={() => sethidden(hidden => !hidden)}>
            <DataTable.Cell style={{}}>{movie.name}</DataTable.Cell>
            <DataTable.Cell >{movie.localizedName}</DataTable.Cell>

            <IconButton
                icon="restore"
                color={'#005374'}
                size={20}
                onPress={() => navigation.navigate('RedistributeMovie', {
                    movie:movie
                  })}
            />
        </DataTable.Row>

        {/* {!hidden ?<>
        <View style={{ display:'flex', justifyContent:'center', alignItems:'center'}}>
        <View style={{width:'75%'}}>
            <MovieKDMs navigation={navigation} movie={movie}></MovieKDMs>
        </View>
            </View></>: <></>} */}
        </>
    )
}

export const History = ({navigation}) => {
    const isFocused = useIsFocused();

    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
    const [paginatedData, setPaginatedData] = useState([]);
    // const [distMovies, setDistMovies] = useState([]);

    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(0);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);



    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.auth.user)
    const token = useSelector(state => state.auth.token)

    // console.log(token)
    

    useEffect(()=>{
        if(sessionUser){
            dispatch(startLoading())
            getPreviouslyDistributedMovies(sessionUser.id, token)
            .then((res) => {
            //   setDistMovies(res.data)
            setData(res.data)
        setFilteredData(res.data)
            })
            .catch(err=>console.log(err.response.data)).finally(()=>{
                dispatch(finishLoading())
            })
        }
        
    },[isFocused])


    // const from = page * itemsPerPage;
    // const to = Math.min((page + 1) * itemsPerPage, distMovies.length);

    // useEffect(() => {
    //     setPage(0);
    //     const from = page * itemsPerPage;
    // const to = Math.min((page + 1) * itemsPerPage, distMovies.length);
    // setPaginatedData(distMovies.slice(from, to))
    // }, [itemsPerPage]);

    // useEffect(() => {
    //     setPaginatedData(distMovies.slice(from, to))
    // }, [distMovies]);

    
    // useEffect(() => {
    //     setPaginatedData(distMovies.slice(from, to))
    // }, [page])

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
                    {/* <IconButton
                        icon="plus-circle"
                        color={'#005374'}
                        size={24}
                        onPress={() => navigation.navigate('AddMovie')}
                    /> */}
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