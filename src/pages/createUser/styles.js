import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1C2F2D',
    },
    form: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
    },
    UserImage: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },

    textButton: {
        color: '#FFF',
        fontWeight: 'bold',
    },

    input: {
        backgroundColor: '#FFF',
        width: '90%',
        marginBottom: 15,
        color: '#222',
        fontSize: 22,
        borderRadius: 7,
        padding: 10
      },
      buttonSubmit: {
        backgroundColor: '#59BFFF',
        width: '90%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
      },
})