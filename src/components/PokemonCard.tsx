import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';

import ImageColors from 'react-native-image-colors';

import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';

const windowWidth = Dimensions.get('window').width;

interface Props {
    pokemon: SimplePokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {

    const navigation = useNavigation();
    const [bgColor, setBgColor] = useState('grey');
    const isMounted = useRef(true);

    useEffect(() => {

        ImageColors.getColors( pokemon.image, { fallback: 'grey' })
            .then( colors => {

                if ( !isMounted.current ) 
                    return;

                (colors.platform === 'android' )
                    ? setBgColor(colors.dominant || 'grey')
                    : setBgColor(colors.background || 'grey')
            });
        
        return () => {
            isMounted.current = false;
        }
        

    }, []);

    return (
        <TouchableOpacity
            activeOpacity={ 0.9 }
            onPress={ () => navigation.navigate('PokemonScreen', { simplePokemon: pokemon, color: bgColor })}
        >
            <View style={{
                ...styles.cardContainer,
                backgroundColor: bgColor,
                width: windowWidth * 0.40
            }}>
                {/* Nombre y ID */}
                <View>
                    <Text style={ styles.name }>
                        { pokemon.name }
                        { '\n#' + pokemon.id }
                    </Text>
                </View>

                <View style={ styles.pokebolaContainer }>
                    <Image
                        source={ require('../assets/pokebola-blanca.png') }
                        style={ styles.pokebola }
                    />
                </View>

                <FadeInImage
                    uri={ pokemon.image }
                    style={ styles.pokemonImage }
                />

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        // backgroundColor: 'red',
        height: 120,
        width: 160,
        marginBottom: 25,
        borderRadius: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    }, 

    name: {
        color: 'white',
        fontWeight: 'bold',
        top: 10,
        left: 10

    },

    pokebolaContainer: {
        height: 100,
        width: 100,
        position: 'absolute',
        bottom: 0,
        right: 0,
        opacity: 0.5,
        overflow: 'hidden',
    },

    pokebola: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: -25,
        right: -25,
    },

    pokemonImage: {
        width: 120,
        height: 120,
        position: 'absolute',
        right: -8,
        bottom: -5
    }
});


