import React, { useState, useEffect } from "react";
import {
	Text,
	ScrollView,
	StyleSheet,
	StatusBar,
	SafeAreaView,
	RefreshControl,
} from "react-native";
import { Link } from "expo-router";

import http from "../http";

const App = () => {
	useEffect(() => {
		loadData();
	}, []);

	const [refresh, setRefresh] = React.useState(false);
	const [title, setTitle] = React.useState("");
	const [content, setContent] = React.useState("");
	const onRefresh = React.useCallback(() => {
		setRefresh(true);
		setTimeout(() => {
			setRefresh(false);
		}, 500);
	}, []);

	const loadData = async () => {
		setRefresh(true);

		http
			.get("/belajar1")
			.then(function (res) {
				setRefresh(false);
				setTitle(res.data.title);
				setContent(res.data.content);
			})
			.catch(function (error) {
				console.log(error);
				setRefresh(false);
			});
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				contentContainerStyle={styles.contentContainer}
				refreshControl={
					<RefreshControl refreshing={refresh} onRefresh={loadData} />
				}
			>
				<Link href="/">Home</Link>
				<Text>{title}</Text>
				<Text>{content}</Text>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
	},
	contentContainer: {
		paddingHorizontal: 10,
	},
});

export default App;
