import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import OTPInput from '../components/OTPInput';
import Button from '../components/Button';

const OTPScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mã xác minh</Text>
      <Text style={styles.notification}>Mã OTP đã gửi về SĐT của bạn</Text>
      <Text style={styles.notification}>
        Vui lòng kiểm tra tin nhắn và nhập mã xác minh tại đây.
      </Text>
      <OTPInput inputCount={4} />
      <Text style={styles.question}>Bạn chưa nhận được?</Text>
      <Text style={styles.resend}>Gửi lại mã xác minh</Text>
      <Button label="Tiếp tục" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 36,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#FFC300',
  },
  notification: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
    textAlign: 'center',
    color: '#655665',
    paddingHorizontal: 40,
  },
  question: {
    fontSize: 20,
    fontWeight: '300',
    marginTop: 30,
  },
  resend: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFC300',
    marginBottom: 40,
  },
});

export default OTPScreen;
