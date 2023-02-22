import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, ImageBackground, ToastAndroid, Keyboard } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const Weather = () => {
    const [data, setData] = useState('');
    const [input, setInput] = useState('');
    const apiKey = '324a51544441d6b6e0dfacc3239075b5';

    const searchWeather = async (cityName) => {
        if (!cityName) return
        const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
        await axios.get(apiURL)
            .then((res) => {
                console.log(res.data)
                setData(res.data)
            })
            .catch((err) => {
                ToastAndroid.show('Wrong city name' + err, ToastAndroid.TOP);
            })
    }
    const handleSearch = () => {
        if (!input) {
            ToastAndroid.show('Enter city name', ToastAndroid.TOP);
        }
        else {
            searchWeather(input)
            Keyboard.dismiss()
            setInput('')
        }
    }
    return (

        <ImageBackground style={styles.container} source={require('../Images/background.jpeg')}>
            <Text style={styles.Text}>Weather App</Text>
            <View style={styles.seachBox}>
                <TextInput
                    style={styles.Input}
                    onChangeText={setInput}
                    value={input}
                    placeholder='Enter City Name'

                />
            </View>
            <TouchableOpacity onPress={handleSearch} style={styles.button}>
                <Text style={styles.btnText}>Search</Text>
            </TouchableOpacity>
            <View style={styles.innerContainer}>
                <Image style={styles.WeatherIcon} source={require('../Images/weathericon.png')} />
                {data ?
                    <View>
                        <Text style={styles.errText} >{data?.name}</Text>
                        <Text style={styles.errText}>{((data?.main?.temp) - 273.15).toFixed(2)}°C</Text>
                    </View>
                    : (
                        <Text style={styles.errText}>Nothing to show, search for city!</Text>
                    )}
            </View>
        </ImageBackground >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: wp('100%'),
        height: hp('100%')
    },
    Text: {
        color: '#fff',
        fontSize: hp('5%'),
        fontWeight: '500',
        textAlign: 'center'
    },

    Input: {
        backgroundColor: '#fff',
        marginTop: hp('3%'),
        color: '#000',
        fontSize: hp('2%'),
        alignSelf: 'center',
        width: wp('90%')
    },
    button: {
        width: wp('80%'),
        backgroundColor: '#007dff',
        alignSelf: 'center',
        marginTop: hp(3),
        borderRadius: 10,
        padding: 5

    },
    btnText: {
        color: '#000',
        fontSize: hp('3%'),
        textAlign: 'center',
    },
    WeatherIcon: {
        width: wp('80%'),
        height: hp('40%'),
        margin: 20,
        alignSelf: 'center'
    },
    innerContainer: {
        width: wp('90%'),
        height: hp('60%'),
        backgroundColor: '#fff',
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: hp(6),
    },
    errText: {
        color: '#000',
        textAlign: 'center',
        fontSize: hp('3%')
    }
})
export default Weather;