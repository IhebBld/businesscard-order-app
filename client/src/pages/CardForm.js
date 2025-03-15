import { Navigation } from "../components/navigation";
import { Header } from "../components/header";
import { Contact } from "../components/contact";
import { Submition2 } from "../components/form2";
import JsonData from "../data/formdata.json";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from 'react-router-dom'
export default function Form() {
	const [formPageData, setFormPageData] = useState({});
	useEffect(() => {
		setFormPageData(JsonData);
	}, []);

	const navigate = useNavigate();
	Axios.defaults.withCredentials = true;
	useEffect(() => {
		Axios.get("http://localhost:5000/login").then((response) => {
			if (response.data.loggedIn == false) {
				navigate('/login');
			}

		});
	}, [navigate]);
	return (

		<div>
			<Navigation />
			<Header data={formPageData.Header} />
			<Submition2 />
			<Contact />
		</div>

	)
}