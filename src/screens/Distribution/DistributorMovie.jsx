import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers } from '../../actions/userActions'
import { DataTable } from 'react-native-paper';
import { Avatar, Button, Card, Title, Paragraph, IconButton, Colors } from 'react-native-paper';
import { FAB } from 'react-native-paper';
import { yellow100 } from 'react-native-paper/lib/typescript/styles/colors';
import { deleteMovie, getMovies, getMoviesAssignedToUser, getMovieVersionsAssignedToUser } from '../../actions/movieActions';
import { MovieVersion } from './MovieVersion';
import { useIsFocused } from "@react-navigation/native";
import { MovieKDMs } from './MovieKDMs';
import { handleError } from '../../helper/errorHandler';



const optionsPerPage = [5, 10, 20];


const UserRow = ({ movie,navigation }) => {
    const [hidden, sethidden] = useState(true)
    const dispatch = useDispatch()


    return (
        <><DataTable.Row onPress={() => sethidden(hidden => !hidden)}>
            <DataTable.Cell style={{}}>{movie.name}</DataTable.Cell>
            <DataTable.Cell >{movie.localizedName}</DataTable.Cell>

            <IconButton
                icon="theater"
                color={'#005374'}
                size={20}
                onPress={() => navigation.navigate('AssignMovie', {
                    movie:movie
                  })}
            />
        </DataTable.Row>

        {!hidden ?<>
        <View style={{ display:'flex', justifyContent:'center', alignItems:'center'}}>
        <View style={{width:'75%'}}>
            <MovieKDMs navigation={navigation} movie={movie}></MovieKDMs>
        </View>
            </View></>: <></>}
        </>
    )
}

export const DistributorMovie = ({navigation}) => {
    const isFocused = useIsFocused();

    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
    const [paginatedData, setPaginatedData] = useState([]);
    const [distMovies, setDistMovies] = useState([]);


    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.auth.user)
    const token = useSelector(state => state.auth.token)

    // console.log(token)
    

    useEffect(()=>{
        if(sessionUser){
            getMoviesAssignedToUser(sessionUser.id, token)
            .then((res) => {
              setDistMovies(res.data)
            })
            .catch(err=>handleError(err));
        }
        
    },[isFocused])


    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, distMovies.length);

    useEffect(() => {
        setPage(0);
        const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, distMovies.length);
    setPaginatedData(distMovies.slice(from, to))
    }, [itemsPerPage]);

    useEffect(() => {
        setPaginatedData(distMovies.slice(from, to))
    }, [distMovies]);

    
    useEffect(() => {
        setPaginatedData(distMovies.slice(from, to))
    }, [page])


    return (
        <SafeAreaView>
        <ScrollView>
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
                    numberOfPages={Math.ceil(distMovies.length / itemsPerPage)}
                    onPageChange={page => setPage(page)}
                    label={`${from + 1}-${to} of ${distMovies.length}`}
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