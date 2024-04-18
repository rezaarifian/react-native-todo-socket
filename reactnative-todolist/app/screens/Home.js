import { SafeAreaView, Text, StyleSheet, View, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useLayoutEffect, useState } from "react";
import Todo from "./Todo";
import TodoCompleted from "./TodoCompleted";
import socket from "../utils/socket";
import ShowModal from "./ShowModal";

const Home = () => {
	const [data, setData] = useState([]);
	const [dataCompleted, setDataCompleted] = useState([]);
	const [visible, setVisible] = useState(false);
	const [origin, setOrigin] = useState(null);
	const [editItem, setEditItem] = useState('');

	useLayoutEffect(() => {
		function fetchTodos() {
			fetch("http://192.168.100.88:4000/todos")
				.then((res) => res.json())
				.then((data) => setData(data))
				.catch((err) => console.error(err));
			fetch("http://192.168.100.88:4000/todoCompleted")
				.then((res) => res.json())
				.then((data) => setDataCompleted(data))
				.catch((err) => console.error(err));
		}
		fetchTodos();
	}, []);

	useLayoutEffect(() => {
		socket.on("todos", (data) => setData(data));
		socket.on("todoCompleted", (data) => setDataCompleted(data));
	}, [socket]);

	console.log('data', data);

	return (
		<SafeAreaView style={styles.mainContainer}>
			<View style={styles.header}>
				<Ionicons
						name='menu'
						size={30}
						color='black'
						onPress={() => {
							setVisible(!visible);
						}}
				/>
				<Text style={styles.heading}>My Todo</Text>
				<Ionicons
					name='notifications'
					size={30}
					color='black'
				/>
			</View>
			<View style={styles.container}>
				<FlatList
					data={dataCompleted}
					keyExtractor={(item) => item._id}
					renderItem={({ item }) => <TodoCompleted item={item} />}
				/>
			</View>
			<Text style={{fontSize: 20, paddingHorizontal: 20}}>
				Remaining Task 
				<Text style={{fontSize: 20, fontWeight: 'bold'}}> ({data?.length})</Text>
			</Text>
			<View style={styles.container}>
				<FlatList
					data={data}
					keyExtractor={(item) => item._id}
					renderItem={({ item }) => <Todo item={item} setVisible={setVisible} setOrigin={setOrigin} setEditItem={setEditItem}/>}
				/>
			</View>
			<ShowModal setVisible={setVisible} visible={visible} setOrigin={setOrigin} origin={origin} editItem={editItem} />
			<View style={styles.addContainer}>
				<Ionicons
					name='add'
					size={30}
					color='white'
					style={styles.alignSelfCenter}
					onPress={() => {
						setVisible(!visible);
					}}
				/>
			</View>
		</SafeAreaView>
	);
};

export default Home;

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: "#e7ebe6",
		padding: 10,
	  },
	header: {
		padding: 10,
		justifyContent: "space-between",
		flexDirection: "row",
		marginBottom: 20,
	},
	heading: {
		fontSize: 24,
		fontWeight: "bold",
	},
	container: {
		padding: 15,
	},
	addContainer: {
		backgroundColor: '#03a1fc',
		width: 50, 
		height: 50, 
		borderRadius: 17, 
		justifyContent: 'center', 
		alignSelf: 'flex-end', 
		position: 'absolute', 
		bottom: 70, 
		right: 20
	},
	alignSelfCenter: {
		alignSelf: 'center'
	},
});
