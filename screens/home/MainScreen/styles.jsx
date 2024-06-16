import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'grey',  
    backgroundColor: '#09090D',  
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "2rem",
    width: "100%",
    marginTop: "2rem",
    paddingTop: 100
  }
});

export default styles;
