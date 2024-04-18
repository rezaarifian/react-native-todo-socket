import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	TextInput,
	Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const Login = ({ navigation }) => {
	const [username, setUsername] = useState("");

	const handleLogin = () => {
		storeUsername(username);
		navigation.navigate("Home");
	};

	const storeUsername = async (value) => {
		try {
			await AsyncStorage.setItem("username", value);
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<SafeAreaView style={styles.loginScreen}>
			<View style={styles.toDoContainer}>
				<Ionicons
					name='checkmark'
					size={50}
					color='white'
					style={styles.alignSelfCenter}
				/>
			</View>
			<View style={{marginTop: 50}}>
				<Text style={{fontSize: 30, textAlign: 'center'}}>Welcome to</Text>
				<Text style={{fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>My Todo</Text>
				<Text style={{fontSize: 15, textAlign: 'center', paddingHorizontal: 50, paddingTop: 20, opacity: 0.6}}>
					My Todo helps you stay organized and perform your task much faster.
				</Text>
			</View>
			<View style={styles.loginContainer}>
				<Text
					style={{
						fontSize: 24,
						fontWeight: "bold",
						marginBottom: 15,
						textAlign: "center",
					}}
				>
					Login
				</Text>
				<View style={{ width: "100%" }}>
					<TextInput
						style={styles.textInput}
						value={username}
						onChangeText={(value) => setUsername(value)}
					/>
				</View>
				<Pressable onPress={handleLogin} style={styles.loginButton}>
					<View>
						<Text style={{ color: "#fff", textAlign: "center", fontSize: 16 }}>
							SIGN IN
						</Text>
					</View>
				</Pressable>
			</View>
		</SafeAreaView>
	);
};

export default Login;

const styles = StyleSheet.create({
	loginScreen: {
		flex: 1,
	},
	loginContainer: {
		flex: 1,
		padding: 10,
		flexDirection: "column",
	},
	textInput: {
		borderWidth: 1,
		width: "100%",
		padding: 12,
		marginBottom: 10,
		borderRadius: 20,
	},
	loginButton: {
		width: 150,
		backgroundColor: "#03a1fc",
		padding: 15,
		marginTop: 20,
		alignSelf: 'center',
		borderRadius: 20,
	},
	toDoContainer: {
		backgroundColor: '#03a1fc',
		width: 100, 
		height: 100, 
		borderRadius: 30, 
		justifyContent: 'center', 
		alignSelf: 'center',
		marginTop: 100,
	},
	alignSelfCenter: {
		alignSelf: 'center'
	},
});
