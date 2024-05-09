/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const ListTileTextInput = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  icon,
}) => {

  const [hidden, setHidden] = useState(secureTextEntry);
  const toggleHidden = () => {
    setHidden(!hidden);
  };
  return (
    <View elevation={3} style={styles.container}>
      <View style={styles.inputGroup}>
        {icon && (
          <Icon name={icon} size={20} color="#000" style={styles.icon} />
        )}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={hidden}
        />
      </View>
      {secureTextEntry && (
        <TouchableOpacity onPress={toggleHidden} style={styles.iconButton}>
          {hidden ? (
            <Icon name="eye-off" size={20} color="#000" />
          ) : (
            <Icon name="eye" size={20} color="#000" />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    width: "100%",
    backgroundColor: "#F6F6F6",
    borderRadius: 30,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
  },
  input: {
    fontSize: 16,
    paddingVertical: 4,
  },
  icon: {
    marginRight: 8,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ListTileTextInput;
