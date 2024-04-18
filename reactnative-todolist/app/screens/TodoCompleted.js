import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";

const TodoCompleted = ({ item }) => {

	return (
		item?.completed && <View style={styles.todoContainer}>
			<View style={styles.containerSecond}>
				<AntDesign
					name='checkcircle'
					size={24}
					color='green'
					onPress={() => {
						setVisible(true);
						setOrigin('Edit');
						setEditItem(item);
					}}
				/>
				<Text style={styles.todoTitle}>{item.title}</Text>
				<Text
					style={styles.subTitle}
				>
					{item.date}
				</Text>
			</View>
		</View>
	);
};

export default TodoCompleted;

const styles = StyleSheet.create({
	todoContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: "#6bfa7e",
		padding: 15,
		borderRadius: 10,
		marginBottom: 10,
	},
	containerSecond: {
		flexDirection: 'row', 
		width: '100%'
	},
	todoTitle: {
		fontWeight: "bold",
		fontSize: 18,
		marginLeft: 10,
	},
	subTitle: {
		opacity: 0.6,
		marginLeft: 'auto',
		alignSelf: 'center',
	},
});
