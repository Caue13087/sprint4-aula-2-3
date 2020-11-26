import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Home = () => {

    const[token, setToken] = useState('');

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
    return(
        <View>
            <Text>Home</Text>
            <Text>{token}</Text>
        </View>
    )
}

export default Home;