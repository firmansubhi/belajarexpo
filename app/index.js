import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	Image,
	ScrollView,
	TextInput,
	StyleSheet,
	StatusBar,
	SafeAreaView,
	Button,
	Alert,
	Pressable,
	RefreshControl,
	Switch,
	Platform,
} from "react-native";
import * as Location from "expo-location";
import { Link } from "expo-router";

const App = () => {
	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 500);
	}, []);

	const [isEnabled, setIsEnabled] = useState(false);
	const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
		})();
	}, []);

	let text = "Waiting..";
	if (errorMsg) {
		text = errorMsg;
	} else if (location) {
		text = JSON.stringify(location);
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				contentContainerStyle={styles.contentContainer}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			>
				<Link href="/about">About</Link>
				<Text>Some text</Text>
				<View>
					<Text>{text}</Text>
					<Image
						source={{
							uri: "https://reactnative.dev/docs/assets/p_cat2.png",
						}}
						style={{ width: 200, height: 200 }}
					/>
				</View>
				<TextInput style={styles.input} placeholder="Nama anda" />

				<Switch
					trackColor={{ false: "#767577", true: "#81b0ff" }}
					thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
					ios_backgroundColor="#3e3e3e"
					onValueChange={toggleSwitch}
					value={isEnabled}
				/>

				<Pressable
					style={styles.btn}
					onPress={() => Alert.alert("Button with adjusted color pressed")}
				>
					<Text style={styles.btnText}>Kirim</Text>
				</Pressable>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	item: {
		backgroundColor: "#00FF00",
		padding: 20,
		marginVertical: 8,
	},
	header: {
		fontSize: 32,
		backgroundColor: "#fff",
	},
	title: {
		fontSize: 24,
	},

	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
	},
	contentContainer: {
		paddingHorizontal: 10,
	},

	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},

	btn: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 4,
		elevation: 3,
		backgroundColor: "black",
	},
	btnText: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: "bold",
		letterSpacing: 0.25,
		color: "white",
	},
});

export default App;
