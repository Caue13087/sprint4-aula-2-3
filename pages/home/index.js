import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Home = () => {

    const[token, setToken] = useState('');
    const [eventos, setEventos] = useState([]);

    useEffect(()=>{
         getData();
    }, [token])

    const getData = async () => {
        try{
            const value = await AsyncStorage.getItem('@jwt')
            if(value !== null) {
              setToken(value);
            }
        }
        catch(e){

        }
    }
    useEffect(() => {
        listarEventos();
    }, []); 

    const listarEventos = () => {
        fetch('http://192.168.15.10:5000/api/eventos')
            .then(response => response.json())
            .then(data => {
                setEventos(data.data)
                console.log(data.data);
            })
            .catch(err => console.error(err));
    }

    const renderItem = ({ item }) => (
        <ItemEvento nome={item.nome} imagem={item.urlImagem} link={item.link} />
      );

    return(
        <View>
            <Text>HOME</Text>
            {/* <Text>{token}</Text> */}
            <FlatList
                data={eventos}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default Home;