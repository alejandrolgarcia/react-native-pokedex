import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { PokemonDetails } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';

interface Props {
    pokemon: PokemonDetails;
}

export const PokemonDetail = ({ pokemon }: Props ) => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={ false }
            style={{
                ...StyleSheet.absoluteFillObject,
            }}
        >
            {/* Types */}
            <View style={{
                ...styles.container,
                marginTop: 350,
            }}>
                <Text style={ styles.title }>Types</Text>
                <View style={{ flexDirection: 'row' }}>
                    {
                        pokemon.types.map( ({ type }) => (
                            <Text
                                key={ type.name }
                                style={{
                                    ...styles.regularText,
                                    marginRight: 10,
                                }}
                            >
                                { type.name }
                            </Text>
                        ))
                    }
                </View>

                <Text style={ styles.title }>Weight</Text>
                <Text style={ styles.regularText }>{ pokemon.weight } </Text>
            </View>

            {/* Sprites */}
            <View style={ styles.container }>
                <Text style={ styles.title }>Sprites</Text>
            </View>

            <ScrollView
                horizontal={ true }
                showsHorizontalScrollIndicator={ false }
            >
                <FadeInImage
                    uri={ pokemon.sprites.front_default }
                    style={ styles.basicSprite }
                />

                <FadeInImage
                    uri={ pokemon.sprites.back_default}
                    style={ styles.basicSprite }
                />

                <FadeInImage
                    uri={ pokemon.sprites.front_shiny }
                    style={ styles.basicSprite }
                />

                <FadeInImage
                    uri={ pokemon.sprites.back_shiny}
                    style={ styles.basicSprite }
                />
            </ScrollView>

            {/* Habilidades */}
            <View style={ styles.container }>
                <Text style={ styles.title }>Abilities</Text>
                <View style={{ flexDirection: 'row' }}>
                    {
                        pokemon.abilities.map( ({ ability }) => (
                            <Text
                                key={ ability.name }
                                style={{
                                    ...styles.regularText,
                                    marginRight: 10,
                                }}
                            >
                                { ability.name }
                            </Text>
                        ))
                    }
                </View>
            </View>

            {/* Movimientos */}
            <View style={ styles.container }>
                <Text style={ styles.title }>Moves</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {
                        pokemon.moves.map( ({ move }) => (
                            <Text
                                key={ move.name }
                                style={{
                                    ...styles.regularText,
                                    marginRight: 10,
                                }}
                            >
                                { move.name }
                            </Text>
                        ))
                    }
                </View>
            </View>


            {/* Stats */}
            <View style={ styles.container }>
                <Text style={ styles.title }>Stats</Text>
                <View>
                    {
                        pokemon.stats.map( (stat, i) => (
                            <View
                                style={{ flexDirection: 'row' }} 
                                key={ stat.stat.name + i 
                            }>
                                <Text
                                    style={{
                                        ...styles.regularText,
                                        marginRight: 10,
                                        width: 200,
                                    }}
                                >
                                    { stat.stat.name }
                                </Text>

                                <Text
                                style={{
                                    ...styles.regularText,
                                    fontWeight: 'bold',
                                }}
                                >
                                { stat.base_stat }
                                </Text>
                            </View>
                            
                        ))
                    }
                </View>
            </View>

            {/* Sprite final */}
            <View style={{
                marginBottom: 20,
                alignItems: 'center',
            }}>
                <FadeInImage
                    uri={ pokemon.sprites.front_default }
                    style={ styles.basicSprite }
                />
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },

    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20
    },

    regularText: {
        fontSize: 18,
    },

    basicSprite: {
        height: 100,
        width: 100,
    }
});
