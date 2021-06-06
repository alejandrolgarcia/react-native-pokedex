import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon  from 'react-native-vector-icons/Ionicons';
import { FadeInImage } from '../components/FadeInImage';
import { PokemonDetail } from '../components/PokemonDetail';
import { usePokemon } from '../hooks/usePokemon';
import { RootStackParams } from '../navigation/Navigator';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'>{};

export const PokemonScreen = ( { navigation, route } : Props ) => {

    const { simplePokemon, color } = route.params;
    const { id, name, image } = simplePokemon;
    const { top } = useSafeAreaInsets();

    const { isLoading, pokemon } = usePokemon( id );

    return (
        <View style={{ flex: 1 }}>

            {/* Header */}
            <View style={{
                ...styles.headerContainer,
                backgroundColor: color
            }}>
                {/* Back */}
                <TouchableOpacity
                    onPress={ () => navigation.pop() }
                    activeOpacity={ 0.8 }
                    style={{
                        ...styles.backButtom,
                        top: top  + 5
                    }}
                >
                    <Icon
                        name="chevron-back-outline"
                        color="white"
                        size={ 35 }
                    />
                </TouchableOpacity>

                {/* Name */}
                <Text style={{ ...styles.pokemonName, top: top + 40 }}>
                    { name + '\n' } #{ id }
                </Text>

                {/* Pokebola */}
                <Image
                    source={ require('../assets/pokebola-blanca.png') }
                    style={ styles.pokebola }
                />
                
                <FadeInImage
                    uri={ image }
                    style={ styles.pokemonImage }
                />
            </View>

            {/* Loading */}
            {
                isLoading 
                ? (
                    <View style={ styles.loadingIndicator }>
                        <ActivityIndicator
                            color={ color }
                            size={ 50 }
                        />
                    </View>
                )
                : <PokemonDetail pokemon={ pokemon } />
            }


        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 370,
        zIndex: 999,
        alignItems: 'center',
        borderBottomRightRadius: 1000,
        borderBottomLeftRadius: 1000,
    },

    backButtom: {
        position: 'absolute',
        left: 20,
    },

    pokemonName: {
        color: 'white',
        fontSize: 40,
        alignSelf: 'flex-start',
        left: 20,
    },

    pokebola: {
        height: 250,
        width: 250,
        bottom: -20,
        opacity: 0.6,
    },

    pokemonImage: {
        height: 250,
        width: 250,
        position: 'absolute',
        bottom: -15,
        right: -1
    },

    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
