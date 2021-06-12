import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Navigator, RootStackParams } from './Navigator';
import { SearchScreen } from '../screens/SearchScreen';
import { Platform } from 'react-native';
import Icon  from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { PokemonScreen } from '../screens/PokemonScreen';
import { TabSearchScreen } from './TabSearchScreen';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
    return (
        <Tab.Navigator
            sceneContainerStyle={{
                backgroundColor: 'white'
            }}
            tabBarOptions={{
                activeTintColor: '#5856D6',
                labelStyle: {
                    marginBottom: (Platform.OS === 'ios') ? 0 : 10
                },
                style: {
                    position: 'absolute',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderWidth: 0,
                    elevation: 0,
                    height: (Platform.OS === 'ios') ? 70 : 60,
                    // marginBottom: 20,
                    // marginHorizontal: 20,
                    // borderRadius: 20,
                }

            }}
        >
            <Tab.Screen
                name="HomeScreen"
                component={ Navigator }
                options={{
                    tabBarLabel: "Listado",
                    tabBarIcon: ({ color }) => (
                        <Icon
                            color={ color }
                            size={ 20 }
                            name="list-outline"
                        />
                    )
                }}
            />
            <Tab.Screen
                name="SearchScreen"
                component={ TabSearchScreen }
                options={{
                    tabBarLabel: "Busqueda",
                    tabBarIcon: ({ color }) => (
                        <Icon
                            color={ color }
                            size={ 20 }
                            name="search-outline"
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}
