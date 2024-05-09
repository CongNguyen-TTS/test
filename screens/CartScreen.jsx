import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import * as React from 'react';
import {Checkbox} from 'react-native-paper';
import ModalForm from '../components/FormModal';

const formatPrice = price => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
};

const CartScreen = () => {
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [data, setData] = React.useState([
    {
      id: 1,
      name: 'very long product name that can not containe in one line',
      price: 300000,
      quantity: 1,
    },
    {
      id: 2,
      name: 'san pham 2',
      price: 300000,
      quantity: 1,
    },
    {
      id: 3,
      name: 'san pham 3',
      price: 300000,
      quantity: 1,
    },
    {
      id: 4,
      name: 'san pham 4',
      price: 300000,
      quantity: 1,
    },
    {
      id: 5,
      name: 'san pham 5',
      price: 300000,
      quantity: 1,
    },
  ]);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const toggleModal = item => {
    setModalVisible(!isModalVisible);
  };

  const handleSelectItem = selected => {
    let updatedSelectedIds = [...selectedItems];
    if (updatedSelectedIds.includes(selected)) {
      updatedSelectedIds = updatedSelectedIds.filter(item => item !== selected);
    } else {
      updatedSelectedIds.push(selected);
    }
    setSelectedItems(updatedSelectedIds);
  };

  const handleQuantityChange = (itemId, quantity) => {
    const updatedQuantity = Math.max(quantity, 1);
    const updatedData = data.map(item => {
      if (item.id === itemId) {
        return {...item, quantity: updatedQuantity};
      }
      return item;
    });
    setData(updatedData);

    const updatedSelectedItems = selectedItems
      .map(id => {
        const selectedItem = updatedData.find(item => item.id === id);
        return selectedItem ? selectedItem.id : null;
      })
      .filter(Boolean);
    setSelectedItems(updatedSelectedItems);
  };

  const toggleSelectAll = () => {
    const allItemIds = data.map(item => item.id);
    if (selectedItems.length === allItemIds.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(allItemIds);
    }
  };

  const totalPrice = React.useMemo(() => {
    return data.reduce((acc, item) => {
      if (selectedItems.includes(item.id)) {
        acc += item.price * item.quantity;
      }
      return acc;
    }, 0);
  }, [selectedItems, data]);

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <Checkbox.Android
          status={selectedItems.includes(item.id) ? 'checked' : 'unchecked'}
          color={'#FFC300'}
          onPress={() => handleSelectItem(item.id)}
        />
        <Image
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
          style={styles.image}
        />
        <View style={{flexShrink: 1, marginLeft: 4}}>
          <Text style={styles.titleText}>{item.name}</Text>
          <Text style={styles.priceText}>
            {formatPrice(item.price * item.quantity)}
          </Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => handleQuantityChange(item.id, item.quantity - 1)}
              style={styles.quantityButton}>
              <Text style={styles.quantityFont}>-</Text>
            </TouchableOpacity>
            <Text style={[styles.quantityFont, styles.quantityText]}>
              {item.quantity}
            </Text>
            <TouchableOpacity
              onPress={() => handleQuantityChange(item.id, item.quantity + 1)}
              style={styles.quantityButton}>
              <Text style={styles.quantityFont}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <React.Fragment>
      <View style={styles.topTab}>
        <Checkbox.Android
          status={
            selectedItems.length === data.length ? 'checked' : 'unchecked'
          }
          color={'#FFC300'}
          onPress={toggleSelectAll}
        />
      </View>
      <View style={styles.layoutContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
        <View style={styles.bottomTab}>
          <Text style={styles.priceText}>{formatPrice(totalPrice)}</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
              Mua hàng({selectedItems.length})
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ModalForm visible={isModalVisible} onClose={toggleModal} />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    borderTopWidth: 5,
    borderColor: '#C4C4C4',
    padding: 12,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'start',
    gap: 4,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    flexShrink: 1,
  },
  priceText: {
    fontWeight: '700',
    fontSize: 16,
    color: '#FF0000',
  },
  layoutContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  bottomTab: {
    borderTopWidth: 1,
    borderColor: '#979797',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
  },
  topTab: {
    padding: 12,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  image: {
    width: 78,
    height: 78,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    width: 80,
    justifyContent: 'center',
    fontSize: 16,
  },
  quantityButton: {
    paddingHorizontal: 8,
  },
  quantityFont: {
    fontSize: 16,
    color: '#000',
    fontWeight: '700',
  },
  quantityText: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingHorizontal: 12,
    borderColor: '#C4C4C4',
  },
  button: {
    padding: 20,
    backgroundColor: '#FFC300',
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
});

export default CartScreen;
