import React, {useState, useRef} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const OTPInput = () => {
  const [otp, setOTP] = useState(['', '', '', '']);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleOTPChange = (index, value) => {
    if (value === '') {
      const newOTP = [...otp];
      newOTP[index] = '';
      setOTP(newOTP);

      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
    } else if (isNaN(value)) {
      return;
    } else {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);

      if (index < otp.length - 1) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleOTPPaste = text => {
    const newOTP = text.split('').slice(0, otp.length);
    setOTP(newOTP);

    if (newOTP.length < otp.length) {
      inputRefs[newOTP.length].current.focus();
    }
  };

  const handleBackspace = (index, value) => {
    const newOTP = [...otp];
    if (value === '') {
      newOTP[index - 1] = '';
      setOTP(newOTP);
      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
    } else {
      newOTP[index] = '';
      setOTP(newOTP);
    }
    if (inputRefs[index] === inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          elevation={5}
          key={index}
          style={styles.input}
          value={digit}
          onChangeText={text => handleOTPChange(index, text)}
          onPaste={event => handleOTPPaste(event.nativeEvent.text)}
          onKeyPress={({nativeEvent: {key}}) =>
            key === 'Backspace' && handleBackspace(index, digit)
          }
          keyboardType="numeric"
          maxLength={1}
          ref={inputRefs[index]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 60,
    height: 60,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {width: -4, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    textAlign: 'center',
    margin: 12,
    backgroundColor: '#F6F6F6',
    fontSize: 34,
    fontWeight: '900',
    color: 'black',
  },
});

export default OTPInput;
