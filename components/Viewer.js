import React, { useMemo, useState } from "react";
import styles from "./../styles/Viewer.module.css";
import { createNFTProfile } from "../api/CreateUser";

const handleCreate = async (userInfo, blob) => {
	let publicKey = window.localStorage.getItem("publicKey");

	let userData = {
		name: userInfo.nombre,
		symbol: "CAR",
		description: `${userInfo.description} NFT`,
		attributes: JSON.stringify({
			user_type: "pet",
			match: userInfo.temperament,
			phone: userInfo.tel,
			edad: userInfo.edad,
		}),
		file: blob,
	};

	return createNFTProfile(publicKey, userData);
};

const RegionSelect = (props) => {
	const [animal, setAnimal] = useState("");
	const [nombre, setNombre] = useState("");
	const [description, setDescription] = useState("");
	const [breed, setBreed] = useState("");
	const [size, setSize] = useState("");
	const [temperament, setTemperament] = useState("");

	const [loading, setLoading] = useState(false);

	const handleContinue = async () => {
		if (loading) return;
		setLoading(true);
		const response = await fetch("/api/generatesd", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				data: {
					animal,
					nombre,
					description,
					breed,
					size,
					temperament,
				},
			}),
		});
		setLoading(false);
		const { data: replicateData } = await response.json();
		const url = replicateData.status === "error" ? "https://amiguitosvisibles.vercel.app/download.png" : replicateData.output[0]

		const blob = await fetch(url).then((r) => r.blob());

		await handleCreate({
			animal,
			nombre,
			description,
			breed,
			size,
			temperament,
		}, blob)

		props.setView(false)
	};

	const isAllFilled = useMemo(
		() => animal && breed && size && temperament,
		[animal, breed, size, temperament]
	);
	return (
		<div className={styles.regionselect}>
			<div className={styles.title}>Registra a la mascota</div>
			<div className={styles.subtitle}>
				Esto nos ayudará a ofrecerte la mejor experiencia a tu mascota.
			</div>
			<div className={styles.formContainer}>
				<div className={styles.title}>Nombre:</div>
				<div className={styles.input}>
					<input
						placeholder=""
						value={nombre}
						onChange={(e) => setNombre(e.target.value)}
					/>
				</div>
				<div className={styles.title}>Que animal es tu mascota?</div>
				<div className={styles.input}>
					<input
						placeholder="Perro, Gato, Conejo, etc..."
						value={animal}
						onChange={(e) => setAnimal(e.target.value)}
					/>
				</div>
				<div className={styles.title}>Que raza es tu mascota?</div>
				<div className={styles.input}>
					<input
						placeholder="Pug, Labrador, etc..."
						value={breed}
						onChange={(e) => setBreed(e.target.value)}
					/>
				</div>
				<div className={styles.title}>Que tamaño tiene tu mascota?</div>
				<div className={styles.input}>
					<input
						placeholder="Pequeño, Mediano, Grande, etc..."
						value={size}
						onChange={(e) => setSize(e.target.value)}
					/>
				</div>
				<div className={styles.title}>Que temperamento tiene tu mascota?</div>
				<div className={styles.input}>
					<input
						placeholder="Jugueton, Tranquilo, etc..."
						value={temperament}
						onChange={(e) => setTemperament(e.target.value)}
					/>
				</div>
				<div className={styles.title}>Describelo</div>
				<div className={styles.input}>
					<input
						placeholder=""
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
			</div>
			{
				loading && <div className={styles.title}>creado nft para que lo presumas con tus amigos, confirma las dos pestañas</div>
			}
			<div className={styles.space} />
			<div
				className={!isAllFilled ? styles.disabled : styles.button}
				onClick={() => handleContinue()}
			>
				{!loading ? 'Continuar' : "creado NFT...."}
			</div>
		</div>
	);
};

export default RegionSelect;
