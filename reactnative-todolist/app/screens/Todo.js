import { View, Text, StyleSheet } from "react-native";
import React, { useLayoutEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import socket from "../utils/socket";

const Todo = ({ item, setVisible, setOrigin, setEditItem }) => {
	const navigation = useNavigation();

	const deleteTodo = (id) => socket.emit("deleteTodo", id);
	const toDoDone = (item) => socket.emit("toDoDone", item);

	return (
		!item?.completed && <View style={styles.todoContainer}>
			<View>
				<Text style={styles.todoTitle}>{item.title}</Text>
				<Text
					style={styles.subTitle}
				>
					{item.date}
				</Text>
			</View>
			<View style={{flexDirection: 'row'}}>
			<View>
				<AntDesign
					name='edit'
					size={24}
					color='blue'
					onPress={() => {
						setVisible(true);
						setOrigin('Edit');
						setEditItem(item);
					}}
				/>
			</View>
			<View style={{marginHorizontal: 20}}>
				<AntDesign
					name='delete'
					size={24}
					color='red'
					onPress={() => deleteTodo(item._id)}
				/>
			</View>
			<View>
				<AntDesign
					name='checkcircle'
					size={24}
					color='green'
					onPress={async () => {
						await toDoDone(item);
						deleteTodo(item._id);
					}}
				/>
			</View>
			</View>
		</View>
	);
};

export default Todo;

const styles = StyleSheet.create({
	todoContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: "white",
		padding: 15,
		borderRadius: 10,
		marginBottom: 10,
	},
	todoTitle: {
		fontWeight: "bold",
		fontSize: 18,
		marginBottom: 8,
	},
	subTitle: {
		opacity: 0.6,
	},
});
