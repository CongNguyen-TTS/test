import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ListTileTextInput from '../components/FieldInput';
import {useNavigation} from '@react-navigation/native';
import Button from '../components/Button';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const navigation = useNavigation();

  const isEmailValid = () => {
    return email.length > 0;
  };

  const isPasswordValid = () => {
    return password.length >= 0;
  };

  const isConfirmPasswordExist = () => {
    return confirmPassword.length > 0;
  };

  const isConfirmPasswordValid = () => {
    return confirmPassword === password;
  };

  const isVerificationCodeValid = () => {
    return verificationCode.length > 0;
  };

  const handleLogin = () => {
    if (
      !isEmailValid() ||
      !isConfirmPasswordExist() ||
      !isPasswordValid() ||
      !isVerificationCodeValid()
    ) {
      alert('Hãy nhập toàn bộ các trường yêu cầu');
      return;
    } else if (!isConfirmPasswordValid()) {
      alert('Mật khẩu xác nhận không khớp');
      return;
    }
    navigation.navigate('Favorites');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Ký</Text>
      <ListTileTextInput
        placeholder="Email hoặc số điện thoại"
        icon="user"
        value={email}
        onChangeText={setEmail}
      />
      <ListTileTextInput
        placeholder="Mật khẩu"
        icon="lock"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <ListTileTextInput
        placeholder="Nhập lại mật khẩu"
        icon="lock"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <View style={styles.group}>
        <ListTileTextInput
          placeholder="Nhập mã xác minh"
          value={verificationCode}
          onChangeText={setVerificationCode}
        />
        <Text style={styles.textButton}>Gửi lại</Text>
      </View>
      <Button label="Đăng ký" onPress={handleLogin} />
      <View style={styles.textSpanView}>
        <Text style={styles.textSpanBody}>Tôi đã có tài khoản?</Text>
        <Text style={styles.textSpanHiLi}>Đăng nhập</Text>
      </View>
      <View style={{width: '100%'}}>
        <Text style={styles.caution}>Lưu ý</Text>
      </View>
      <View style={{width: '100%'}}>
        <Text style={styles.policy}>
          Khi nhấn vào đăng ký là bạn đã chấp nhận
          <Text style={styles.policyHiLi}> Chính sách bảo mật </Text>
          của chúng tôi
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 36,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFC300',
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 32,
  },
  textButton: {
    fontWeight: 'bold',
    color: '#FFC300',
    fontSize: 16,
  },
  textSpanView: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 16,
  },
  textSpanBody: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textSpanHiLi: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFC300',
  },
  caution: {
    fontWeight: '700',
    fontSize: 20,
    color: '#000000',
    justifyContent: 'flex-start',
    marginVertical: 20,
  },
  policy: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    lineHeight: 22,
  },
  policyHiLi: {
    fontWeight: '700',
    color: '#FFC300',
  },
});

export default LoginScreen;
