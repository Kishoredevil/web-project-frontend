import axios from "axios";

export default axios.create({
	baseURL: "http://localhost:5000/",
	withCredentials: false,
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
		"Access-Control-Allow-Headers": "*",
		"Content-Type": "application/json",
	},
});
