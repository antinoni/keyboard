import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import CustomKeyboard from './CustomKeyboard'; // Make sure to provide the correct path

const App = () => {
  const [inputText, setInputText] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('english'); // Track the current language

  const handleKeyPress = (key) => {
    setInputText(inputText + key);
  };

  const handleBackspace = () => {
    setInputText(inputText.slice(0, -1));
  };

  const handleLanguageChange = (newLanguage) => {
    setCurrentLanguage(newLanguage); // Update the current language state
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={inputText}
        placeholder="Type here..."
      />
      <CustomKeyboard
        onChange={handleKeyPress}
        onBackspace={handleBackspace}
        onLanguageChange={handleLanguageChange}
        currentLanguage={currentLanguage} // Pass the current language to the custom keyboard
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    width: 200,
    marginBottom: 20,
  },
});

export default App;
