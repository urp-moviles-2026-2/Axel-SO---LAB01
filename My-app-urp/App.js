import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,FlatList,StyleSheet,SafeAreaView,Platform,StatusBar as RNStatusBar,} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

function TareaItem({ tarea, onEliminar }) {
  return (
    <ReanimatedSwipeable
      renderRightActions={() => (
        <View style={styles.accionContenedor}>
          <TouchableOpacity
            style={styles.botonEliminar}
            onPress={() => onEliminar(tarea.id)}
            activeOpacity={0.8}
          >
            <Ionicons name="trash-outline" size={18} color="#fff" />
            <Text style={styles.textoEliminar}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      )}
      overshootRight={false}
      containerStyle={styles.swipeContenedor}
    >
      <View style={styles.tarjeta}>
        <Text style={styles.textoTarea}>{tarea.texto}</Text>
      </View>
    </ReanimatedSwipeable>
  );
}