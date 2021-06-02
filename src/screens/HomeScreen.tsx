import React from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInImage } from '../components/FadeInImage';
import { usePokemonPaginated } from '../hooks/usePokemonPaginated';

import { styles } from '../theme/globalTheme';

export const HomeScreen = () => {

    const { top } = useSafeAreaInsets();

    const { simplePokemonList, loadPokemons } = usePokemonPaginated();
    console.log(simplePokemonList);

    return (
        <>
            <Image
                source={ require('../assets/pokebola.png') }
                style={ styles.pokebolaBG }
            />

            <FlatList
                data={ simplePokemonList }
                keyExtractor={ (pokemon) => pokemon.id  }
                showsVerticalScrollIndicator={ false }
                renderItem={ ({ item }) => (
                    <FadeInImage
                        uri={ item.image }
                        style={{
                            width: 100,
                            height: 100
                        }}
                    />
                )}

                // Infinite Scroll
                onEndReached={ loadPokemons }
                onEndReachedThreshold={ 0.4 }

                ListFooterComponent={(
                    <ActivityIndicator
                        style={{ height: 100 }}
                        size={ 20 }
                        color="grey"
                    />
                )}
            />
            
            {/* <Text style={{
                ...styles.title,
                ...styles.globalMargin,
                top: top + 10
            }}>Pokedex</Text> */}
        </>
    )
}