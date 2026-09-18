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

export default function App() {
  const [texto, setTexto] = useState('');
  const [tareas, setTareas] = useState([
    { id: '1', texto: 'Informe de métricas' },
    { id: '2', texto: 'Comprar insumos para el taller' },
    { id: '3', texto: 'Revisar pull request de pasarela' },
    { id: '4', texto: 'Llamar al médico para cita anual' },
    { id: '5', texto: 'Enviar reporte semanal por correo' },
  ]);
 
 const agregarTarea = () => {
    const limpio = texto.trim();
    if (limpio === '') return; // no agrega vacías ni solo espacios
    setTareas((prev) => [...prev, { id: Date.now().toString(), texto: limpio }]);
    setTexto('');
  };

  const eliminarTarea = (id) => {
    setTareas((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.pantalla}>
        <StatusBar style="dark" />
 
        {/* Encabezado */}
        <View style={styles.encabezado}>
          <View style={styles.logo}>
            <Ionicons name="checkmark" size={22} color="#fff" />
          </View>
          <Text style={styles.titulo}>Tareas</Text>
        </View>
 
        {/* Formulario */}
        <View style={styles.formulario}>
          <View style={styles.inputContenedor}>
            <Ionicons name="create-outline" size={20} color={MORADO} />
            <TextInput
              style={styles.input}
              placeholder="Escribe una nueva tarea..."
              placeholderTextColor="#8a8fa8"
              value={texto}
              onChangeText={setTexto}
              onSubmitEditing={agregarTarea}
              returnKeyType="done"
            />
          </View>
          <TouchableOpacity
            style={styles.botonAnadir}
            onPress={agregarTarea}
            activeOpacity={0.85}
          >
            <Ionicons name="add" size={20} color="#fff" />
            <Text style={styles.textoAnadir}>Añadir tarea</Text>
          </TouchableOpacity>
        </View>
 
        {/* Lista con scroll */}
        <FlatList
          data={tareas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TareaItem tarea={item} onEliminar={eliminarTarea} />
          )}
          contentContainerStyle={styles.lista}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}