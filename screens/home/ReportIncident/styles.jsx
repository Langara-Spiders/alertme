import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imagePicker: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  categoryButtons: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ddd',
    marginRight: 5,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: '#000',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  textArea: {
    height: 80,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    paddingTop: 10,
  },
  confirmationCard: {
    display: 'flex',
    width: 346,
    padding: 64,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -173 }, { translateY: -150 }], // Centering using half width and half height
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  confirmationText: {
    fontSize: 18,
    marginBottom: 20,
  },
  confirmationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  confirmationButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ddd',
    marginRight: 10,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  successCard: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  successText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default styles;
