import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1C2F2D',
    },
    UserImage: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#1C2F2D',
        width: 170,
        height: 170,
        borderRadius: 100,
        marginBottom: 20, // Reduzi para dar espaço ao texto de boas-vindas
        marginTop: 60,
    },
    Image: {
        width: 150,
        height: 150,
    },
    welcomeText: {
        fontSize: 35,
        color: '#FFF',
        marginBottom: 5, // Adicionado para espaçamento entre o texto e o formulário
    },
    form: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        paddingBottom: 25,
    },
    textButton: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    ButtonCreate: {
        color: '#FFF',
        fontWeight: 'bold',
        marginTop: 80,
    },
    input: {
        backgroundColor: '#FFF',
        width: '90%',
        marginBottom: 15,
        color: '#222',
        fontSize: 22,
        borderRadius: 7,
        padding: 10,
    },
    buttonSubmit: {
        backgroundColor: '#32a852',
        width: '90%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
    },
});
