import Head from "next/head";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Desktop from "../components/Desktop";
import { hasWallet, createNFTProfile } from "../api/CreateUser";
import { getNFTFromPubKey, getMarketNFT } from "../api/GetNTF";
import { createPetNFT } from "../api/CreateNFT";
import { getImageFromSD } from "../api/StableDiffusion";

export default function Home() {
	const [region, setRegion] = useState(0);
	const [onboarding, setOnboarding] = useState(false);
	const [check, setCheck] = useState(false);
	const [num, setNum] = useState(0);
	const [tensor, setTensor] = useState("");
	const [pred, setPred] = useState(0);
	const [file, setFile] = useState(null);

	// form
	const [userType, setUserType] = useState("");
	const [userInfo, setUserInfo] = useState("");

	// Saved preferences
	useEffect(() => {
		if (typeof window !== "undefined") {
			//localStorage.removeItem("region");
			//localStorage.removeItem("onboarding");

			if (localStorage.getItem("region") != null) {
				setRegion(parseInt(localStorage.getItem("region")));
			}
			if (localStorage.getItem("onboarding") != null) {
				setOnboarding(localStorage.getItem("onboarding"));
			}
			if (localStorage.getItem("num") != null) {
				setNum(parseInt(localStorage.getItem("num")));
			}

			//Sing In
			signIn();

			setCheck(true);
		}
	}, []);

	const signIn = () => {
		if (hasWallet()) toast.success("Wallet Conectada :D");
		else toast.error("Porfavor Inicia una Wallet en Phantom");

		//createNFTProfile(publicKey, userData);
		//getNFTFromPubKey(publicKey);
	};

	const handleCreate = async (userInfo) => {
		console.log("aqui");
		let publicKey = window.localStorage.getItem("publicKey");

		const blob = await fetch(
			`https://api.dicebear.com/6.x/bottts/png?seed=${userInfo.nombre}`
		).then((r) => r.blob());

		let userData = {
			name: userInfo.nombre,
			symbol: "CAR",
			description: `${userInfo.nombre} NFT`,
			attributes: JSON.stringify({
				match: "",
				phone: userInfo.tel,
				edad: userInfo.edad,
				user_type: userType === 1 ? "user" : "refugio",
			}),

			file: blob,
		};

		return createNFTProfile(publicKey, userData);
	};

	const handlePress = () => {
		let publicKey = window.localStorage.getItem("publicKey");
		getNFTFromPubKey(publicKey);
	};

	const handleUploadImage = (e) => {
		console.log(e.target.files[0]);
		setFile(e.target.files[0]);
	};

	const handleCreatePet = () => {
		let publicKey = window.localStorage.getItem("publicKey");
		let petData = {
			name: "Albondiga",
			symbol: "ALB",
			description: "Albondiga Pet NFT",
			attributes: JSON.stringify({
				user_type: "pet",
				match: "pacefull,chihuahua,big",
			}),
			file: file,
		};

		createPetNFT(publicKey, petData);
	};

	const handleGetMarket = () => {
		getMarketNFT();
	};
	console.log({ userInfo });

	const handleStableDiffusion = () => {
		getImageFromSD(
			"adorable puppy, colorful, artistic style, cartoon, neon, 4k, neon background,colorful light, neon stripes, portrait by ginger, clear very height details, octane render"
		);
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>
					AmiguitosVisibles - Encuentra tu compañero perfecto, con total transparencia y
					responsabilidad.
				</title>
				<meta
					name="title"
					content="AmiguitosVisibles - Encuentra tu compañero perfecto, con total transparencia y responsabilidad."
				/>
				<meta
					name="description"
					content="Uniendo lazos perfectos entre mascotas y adoptantes, encontrando la combinación ideal en cada latido de corazón."
				/>
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://amiguitosvisibles.vercel.app/" />
				<meta
					property="og:title"
					content="AmiguitosVisibles - Encuentra tu compañero perfecto, con total transparencia y responsabilidad."
				/>
				<meta
					property="og:description"
					content="Uniendo lazos perfectos entre mascotas y adoptantes, encontrando la combinación ideal en cada latido de corazón."
				/>
				<meta
					property="twitter:title"
					content="AmiguitosVisibles - Encuentra tu compañero perfecto, con total transparencia y responsabilidad."
				/>
				<meta
					property="twitter:description"
					content="Uniendo lazos perfectos entre mascotas y adoptantes, encontrando la combinación ideal en cada latido de corazón."
				/>

				<link rel="icon" href="/favicon.ico" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
				<link
					href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Manrope:wght@500;600;700&display=swap"
					rel="stylesheet"
				/>
				<meta name="viewport" content="initial-scale=1, viewport-fit=cover, minimal-ui" />
			</Head>

			<main className={styles.main}>
				<button onClick={handleCreate}>Generar NFT De Cuenta</button>
				<button onClick={handleCreatePet}>Generar NFT de Mascota</button>
				<button onClick={handlePress}>Obtener mis NFT</button>
				<button onClick={handleGetMarket}>Obtener NFT en el mercado</button>
				<button onClick={handleStableDiffusion}>Generar Imagen SD</button>
				<input type="file" onChange={handleUploadImage}></input>
				<Desktop
					pred={pred}
					setUserType={setUserType}
					setUserInfo={setUserInfo}
					setPred={setPred}
					tensor={tensor}
					setTensor={setTensor}
					region={region}
					setNum={setNum}
					num={num}
					onboarding={onboarding}
					setRegion={setRegion}
					check={check}
					handleCreate={handleCreate}
				/>
			</main>

			<footer className={styles.footer}></footer>
			<Toaster position="bottom-center" />
		</div>
	);
}
