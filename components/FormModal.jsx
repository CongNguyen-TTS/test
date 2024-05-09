import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';

const ModalForm = ({visible, onClose, onSubmit, selectedItem}) => {
  const [nameText, setNameText] = useState('');
  const [priceText, setPriceText] = useState('');
  const [imageText, setImageText] = useState('');

  useEffect(() => {
    if (selectedItem) {
      const {title, price, image} = selectedItem;
      setNameText(title);
      setPriceText(price.toString());
      setImageText(image);
    } else {
      // Clear input fields when no item is selected
      setNameText('');
      setPriceText('');
      setImageText('');
    }
  }, [selectedItem]);

  const handleSubmit = () => {
    const formData = {
      title: nameText,
      price: parseFloat(priceText),
      image: imageText,
    };

    if (selectedItem) {
      formData.id = selectedItem.id;
    }

    onSubmit(formData);
    closeModal();
  };

  const closeModal = () => {
    setNameText('');
    setPriceText('');
    setImageText('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.modalTitle}>
            {selectedItem ? 'Update' : 'Add'} product
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={nameText}
            onChangeText={setNameText}
          />
          <TextInput
            style={styles.input}
            placeholder="Price"
            value={priceText}
            onChangeText={setPriceText}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Image link"
            value={imageText}
            onChangeText={setImageText}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>
              {selectedItem ? 'Update' : 'Add'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={closeModal}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  innerContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FFC300',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButtonText: {
    color: '#FFC300',
  },
});

export default ModalForm;
