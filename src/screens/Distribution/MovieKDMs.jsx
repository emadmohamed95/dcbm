import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers } from '../../actions/userActions'
import { DataTable } from 'react-native-paper';
import { Avatar, Button, Card, Title, Paragraph, IconButton, Colors } from 'react-native-paper';
import { FAB } from 'react-native-paper';
import { yellow100 } from 'react-native-paper/lib/typescript/styles/colors';
import { deassignMovie, deleteMovieVersion, distributeMovie, getMovieVersionsAssignedToUser } from '../../actions/movieActions';
import { Loading } from '../Loading/Loading';
import { startLoading, finishLoading } from '../../actions/loadingActions'

const optionsPerPage = [5, 10, 20];


const UserRow = ({ mvCinema, navigation, movie, sessionUser, refreshData, setRefreshData }) => {
    // console.log(mvCinema)
    const [hidden, sethidden] = useState(true)
    const dispatch = useDispatch()

    const toggleRefresh = () => {
        setRefreshData(!refreshData)

    }

    const onClickDistributeMovie = (sendKdmToCinema) => {

        // console.log([mvCinema.CinemaMovies])

        dispatch(distributeMovie(movie, sessionUser, [mvCinema.CinemaMovies], sendKdmToCinema, toggleRefresh))
        // setRefreshData(refreshData=>!refreshData)

    };

    const onClickDeassignCinemaMovies = () => {
        dispatch(deassignMovie(movie, [mvCinema.CinemaMovies], toggleRefresh));
    };

    return (
        <><DataTable.Row onPress={() => sethidden(hidden => !hidden)}>
            <DataTable.Cell>{mvCinema.name}</DataTable.Cell>
            <DataTable.Cell>{mvCinema.country.name}</DataTable.Cell>

            <IconButton
                icon="account-key"
                color={'#005374'}
                size={20}
                onPress={() => onClickDistributeMovie(false)}
            />
            <IconButton
                icon="projector"
                color={'#005374'}
                size={20}
                onPress={() => onClickDistributeMovie(true)}
            />

            <IconButton
                icon="delete"
                color={'#005374'}
                size={20}
                onPress={() => onClickDeassignCinemaMovies()}
            />
        </DataTable.Row>
        </>
    )
}

export const MovieKDMs = ({ navigation, movie }) => {

    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
    const [paginatedData, setPaginatedData] = useState([]);
    const [refreshData, setRefreshData] = useState(false);
    const [mvCinemas, setMvCinemas] = useState([]);


    const sessionUser = useSelector(state => state.auth.user)
    const token = useSelector(state => state.auth.token)


    const toggleRefresh = () => {
        setRefreshData(!refreshData)
    }

    const dispatch = useDispatch()




    useEffect(() => {
        console.log(refreshData)
        if (sessionUser) {
            // dispatch(startLoading())
            // startLoading()
            getMovieVersionsAssignedToUser(movie.id, sessionUser.id, token)
                .then((res) => {
                    // console.log(res.data)
                    let movieVersionCountries = res.data.map(mv => mv.country)
                    let mvc = [].concat.apply([], res.data.map(mv => mv.cinemas))
                    // console.log(mvc)
                    // let mvcc = mvc.map(c=>({...c,country:res.data.country}))
                    mvc.forEach(c => {
                        c.country = movieVersionCountries.find(country => country.id == c.countryId)
                    })
                    // console.log(mvc)

                    setMvCinemas(mvc.filter(mvcc=>!mvcc.CinemaMovies.kdmCreated))
                    // setMvCinemas([].concat.apply([], res.data.map(mv => mv.cinemas)).filter(mvc => !mvc.CinemaMovies.kdmCreated))
                    // console.log(mvcc)
                    // finishLoading()
                })
                .catch(err => {
                    console.log(err)
                })
            // .finally(()=>{
            //     dispatch(finishLoading())
            // })
        }
    }, [refreshData])

    // const mvCinemas = [].concat.apply([], distMV.map(mv => mv.cinemas)).filter(mvc => !mvc.CinemaMovies.kdmCreated);

    // console.log(mvCinemas)


    const onClickDistributeMovie = (sendKdmToCinema) => {

        const cinemaMovies = []

        mvCinemas.forEach(cinema => {
            cinemaMovies.push(cinema.CinemaMovies);
        });

        // console.log(cinemaMovies.length)

        dispatch(distributeMovie(movie, sessionUser, cinemaMovies, sendKdmToCinema, toggleRefresh))
        // setRefreshData(refreshData=>!refreshData)

    };

    const onClickDeassignCinemaMovies = () => {
        const cinemaMovies = []

        mvCinemas.forEach(cinema => {
            cinemaMovies.push(cinema.CinemaMovies);
        });
        dispatch(deassignMovie(movie, cinemaMovies, toggleRefresh));
    };

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, mvCinemas.length);

    useEffect(() => {
        setPage(0);
        const from = page * itemsPerPage;
        const to = Math.min((page + 1) * itemsPerPage, mvCinemas.length);
        setPaginatedData(mvCinemas.slice(from, to))
    }, [itemsPerPage]);


    useEffect(() => {
        setPaginatedData(mvCinemas.slice(from, to))
    }, [mvCinemas]);


    useEffect(() => {
        setPaginatedData(mvCinemas.slice(from, to))
    }, [page])


    const isLoading = useSelector(state => state.loading.isLoading)

    return (<>
        {isLoading ? <Loading /> :
            <>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title >Cinema</DataTable.Title>
                        <DataTable.Title >Country</DataTable.Title>
                        {/* <IconButton
                        icon="plus-circle"
                        color={'#005374'}
                        size={24}
                        onPress={() => navigation.navigate('AddMovieVersion', {
                            movie: movie
                        })} /> */}
                        <IconButton
                            icon="account-key"
                            color={'#005374'}
                            size={20}
                            disabled={paginatedData.length==0}
                        onPress={() => onClickDistributeMovie(false)}
                        />
                        <IconButton
                            icon="projector"
                            color={'#005374'}
                            size={20}
                            disabled={paginatedData.length==0}

                        onPress={() => onClickDistributeMovie(true)}
                        />

                        <IconButton
                            icon="delete"
                            color={'#005374'}
                            size={20}
                            disabled={paginatedData.length==0}

                        onPress={() => onClickDeassignCinemaMovies()}
                        />
                    </DataTable.Header>

                    {paginatedData.map((mvCinema, i) => (
                        <UserRow mvCinema={mvCinema} key={i} navigation={navigation} movie={movie} sessionUser={sessionUser} refreshData={refreshData} setRefreshData={setRefreshData}></UserRow>
                    ))}

                    <DataTable.Pagination
                        page={page}
                        numberOfPages={Math.ceil(mvCinemas.length / itemsPerPage)}
                        onPageChange={page => setPage(page)}
                        label={`${from + 1}-${to} of ${mvCinemas.length}`} optionsPerPage={optionsPerPage}
                        showFastPaginationControls
                        numberOfItemsPerPageList={optionsPerPage}
                        numberOfItemsPerPage={itemsPerPage}
                        onItemsPerPageChange={setItemsPerPage}
                    // selectPageDropdownLabel={'R'}
                    />
                </DataTable>
            </>}
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