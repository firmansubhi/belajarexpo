import React from "react";
import {
	View,
	Text,
	Image,
	ScrollView,
	TextInput,
	StyleSheet,
	StatusBar,
	SafeAreaView,
} from "react-native";

const App = () => {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.contentContainer}>
				<Text>Some text</Text>
				<View>
					<Text>Some more text</Text>
					<Image
						source={{
							uri: "https://reactnative.dev/docs/assets/p_cat2.png",
						}}
						style={{ width: 200, height: 200 }}
					/>
				</View>
				<TextInput style={styles.input} placeholder="Nama anda" />
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

	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
});

export default App;
