import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Orientation from 'react-native-orientation';

const CustomKeyboard = ({ onChange, onBackspace, onLanguageChange }) => {
  const [currentLanguage, setCurrentLanguage] = useState('english');
  const [isUppercase, setIsUppercase] = useState(false);
  const [buttonWidth, setButtonWidth] = useState(calculateButtonWidth());

  useEffect(() => {
    const orientationDidChange = () => {
      setButtonWidth(calculateButtonWidth());
    };

    Orientation.addOrientationListener(orientationDidChange);

    return () => {
      Orientation.removeOrientationListener(orientationDidChange);
    };
  }, []);
    
const calculateButtonWidth = () => {
  const screenWidth = Dimensions.get('window').width;
  const maxButtonsInRow = 8; // Reduce the number of buttons in a row
  const buttonMargin = 0; // No margin between buttons

  // Calculate the button width based on screen width and margins
  return (screenWidth - (maxButtonsInRow - 1) * buttonMargin) / maxButtonsInRow;
};

  const toggleUppercase = () => {
    setIsUppercase(!isUppercase);
  };

  const keyboardLayouts = {
    english: [
      '1234567890',
      isUppercase ? 'QWERTYUIOP' : 'qwertyuiop',
      isUppercase ? 'ASDFGHJKL' : 'asdfghjkl',
      isUppercase ? 'ZXCVBNM' : 'zxcvbnm',
      '?!@#$%^&*()',
      'ABC',
      '123',
    ],
    dutch: [
      '1234567890',
      isUppercase ? 'QWERTYUIOP' : 'qwertyuiop',
      isUppercase ? 'ASDFGHJKL' : 'asdfghjkl',
      isUppercase ? 'ZXCVBNM' : 'zxcvbnm',
      '?!@#$%^&*()',
      'ABC',
      '123',
    ],
  };

  const handleKeyPress = (key) => {
    if (key === 'ABC') {
      const newLanguage = currentLanguage === 'english' ? 'dutch' : 'english';
      setCurrentLanguage(newLanguage);
      onLanguageChange(newLanguage);
    } else if (key === '<-') {
      onBackspace();
    } else if (key === 'Shift') {
      toggleUppercase();
    } else {
      onChange(key);
    }
  };


  return (
    <View style={styles.keyboardContainer}>
      {keyboardLayouts[currentLanguage].map((row, rowIndex) => (
        <View key={row} style={styles.row}>
          {row.split('').map((key) => (
            <TouchableOpacity
              key={key}
              onPress={() => handleKeyPress(key)}
              style={[
                styles.button,
                {
                  width:
                    key === 'Shift'
                      ? buttonWidth * 2
                      : key === ' ' // Adjust space button width
                      ? buttonWidth * 5
                      : buttonWidth,
                },
              ]}
            >
              <Text>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
});

export default CustomKeyboard;
