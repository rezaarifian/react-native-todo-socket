import {
	Modal,
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	TextInput,
	Pressable,
} from "react-native";
import React, { useState } from "react";
import socket from "../utils/socket";

const ShowModal = ({ setVisible, visible, setOrigin, origin, editItem }) => {
	const [input, setInput] = useState("");

	const handleSubmit = () => {
		if (input !== "") {
			socket.emit("addTodo", input);
			setVisible(!visible);
		}
	};

	const handleEdit = () => {
		if (input !== "") {
			socket.emit("editTodo", editItem, input);
			setVisible(!visible);
		}
	};

	return (
		<Modal
			animationType='slide'
			transparent={true}
			visible={visible}
			onRequestClose={() => {
				setVisible(!visible);
				setOrigin(null);
			}}
		>
			<SafeAreaView style={styles.modalScreen}>
				<TextInput
					style={styles.textInput}
					value={input}
					onChangeText={(value) => setInput(value)}
				/>

				<Pressable onPress={origin === 'Edit' ? handleEdit : handleSubmit} style={styles.modalButton}>
					<View>
						<Text style={styles.buttonText}>{origin === 'Edit' ? 'Edit Todo' : 'Add Todo'}</Text>
					</View>
				</Pressable>
			</SafeAreaView>
		</Modal>
	);
};

export default ShowModal;

const styles = StyleSheet.create({
	modalScreen: {
		backgroundColor: "#fff",
		flex: 1,
		padding: 10,
		alignItems: "center",
	},
	textInput: {
		borderWidth: 1,
		padding: 10,
		width: "95%",
		marginBottom: 15,
	},
	modalButton: {
		backgroundColor: "#0D4C92",
		padding: 10,
	},
	buttonText: {
		fontSize: 18,
		textAlign: "center",
		color: "#fff",
	},
});
