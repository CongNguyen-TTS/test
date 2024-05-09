import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import ModalForm from '../components/FormModal';
import Button from '../components/Button';
import {Appbar, Checkbox} from 'react-native-paper';
import axios from 'axios';

const FavoritesScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemIds, setSelectedItemIds] = useState([]);

  const [fetchedData, setFetchedData] = useState([]);

  const toggleModal = item => {
    setModalVisible(!isModalVisible);
    if (!item) {
      setSelectedItem(null);
    }
  };

  const handleItemCheckbox = itemId => {
    let updatedSelectedIds = [...selectedItemIds];
    if (updatedSelectedIds.includes(itemId)) {
      updatedSelectedIds = updatedSelectedIds.filter(id => id !== itemId);
    } else {
      updatedSelectedIds.push(itemId);
    }
    setSelectedItemIds(updatedSelectedIds);
  };

  const toggleSelectAll = () => {
    const allItemIds = fetchedData.map(item => item.id);
    if (selectedItemIds.length === allItemIds.length) {
      setSelectedItemIds([]);
    } else {
      setSelectedItemIds(allItemIds);
    }
  };

  useEffect(() => {
    axios
      .get('http://shibe.online/api/shibes?count=10')
      .then(res => {
        setFetchedData(res.data);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Image source={{uri: item}} style={styles.image} />
      <View style={styles.textContainer}>
        <View style={styles.flexView}>
          <Text style={styles.productTitle}>{item}</Text>
          <View style={styles.checkboxContainer}>
            <Checkbox.Android
              status={selectedItemIds.includes(item) ? 'checked' : 'unchecked'}
              onPress={() => handleItemCheckbox(item)}
              color={'#009688'}
            />
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="My App" />
        <View style={styles.checkboxContainer}>
          <Checkbox.Android
            status={
              selectedItemIds.length === fetchedData.length
                ? 'checked'
                : 'unchecked'
            }
            onPress={toggleSelectAll}
            color={'#009688'}
          />
        </View>
      </Appbar.Header>
      <View style={{height: '90%', padding: 12}}>
        <FlatList
          data={fetchedData}
          renderItem={renderItem}
          keyExtractor={item => item}
        />
        <Button label="Add Product" onPress={toggleModal} />
      </View>

      <ModalForm
        visible={isModalVisible}
        onClose={toggleModal}
        selectedItem={selectedItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    padding: 4,
    borderBottomWidth: 1,
    borderColor: '#3f3f46',
  },
  image: {
    width: 133,
    height: 133,
  },
  textContainer: {
    flex: 1,
    marginLeft: 8,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },
  flexView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
});

export default FavoritesScreen;
