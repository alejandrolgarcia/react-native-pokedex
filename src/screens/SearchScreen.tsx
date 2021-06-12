import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Platform, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Loading } from '../components/Loading';
import { PokemonCard } from '../components/PokemonCard';
import { SearchInput } from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';

import { styles } from '../theme/globalTheme';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';

const screenWidth = Dimensions.get('window').width;

export const SearchScreen = () => {

    const { top } = useSafeAreaInsets();
    const { isFetching, simplePokemonList } = usePokemonSearch();

    const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);

    const [term, setTerm] = useState('');

    useEffect(() => {

        if ( term.length === 0 ) {
            return setPokemonFiltered([]);
        }

        if ( isNaN( Number(term) ) ) {
            setPokemonFiltered(
                simplePokemonList.filter(
                    (pokemon) => pokemon.name.toLocaleLowerCase()
                        .includes(term.toLocaleLowerCase())
                )
            )
        } else {
            const pokemonById = simplePokemonList.find( pokemon => pokemon.id === term );
            setPokemonFiltered(
                ( pokemonById ) ? [pokemonById] : []
            )
        }

    }, [term]);

    if ( isFetching ){
        return <Loading />
    } 

    return (
        <View style={{
            flex: 1,
            // marginTop: (Platform.OS === 'ios') ? top : top + 20,
            marginHorizontal: 20,
        }}>
            
            <SearchInput
                onDebounce={ (value) => setTerm(value) }
                style={{
                    position: 'absolute',
                    zIndex: 999,
                    width: screenWidth - 40,
                    top: (Platform.OS === 'ios') ? top : top + 20
                }}
            />

            <FlatList
                data={ pokemonFiltered }
                keyExtractor={ (pokemon) => pokemon.id  }
                showsVerticalScrollIndicator={ false }
                numColumns={ 2 }
                
                // Header
                ListHeaderComponent={(
                    <Text style={{
                        ...styles.title,
                        ...styles.globalMargin,
                        marginTop: (Platform.OS === 'ios') ? top + 50 : top + 70,
                    }}>{ term }</Text>
                )}

                renderItem={ ({ item }) => ( <PokemonCard pokemon={ item } /> )}

            />

        </View>
    )
}



