import Head from "next/head";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Desktop from "../components/Desktop";
import { hasWallet, createNFTProfile } from "../api/CreateUser";
import { getNFTFromPubKey } from "../api/GetNTF";
import defaultIcon from "../public/images/taxi-pet-care.png";

export default function Home() {
	const [region, setRegion] = useState(0);
	const [onboarding, setOnboarding] = useState(false);
	const [check, setCheck] = useState(false);
	const [num, setNum] = useState(0);
	const [tensor, setTensor] = useState("");
	const [pred, setPred] = useState(0);
	const [file, setFile] = useState(null);

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

	const handleCreate = () => {
		let publicKey = window.localStorage.getItem("publicKey");
		let userData = {
			name: "Carlollos",
			symbol: "CAR",
			description: "Carlollos Account NFT",
			attributes: JSON.stringify({
				user_type: "user",
				match: "pacefull,chihuahua,big",
				phone: "6391164479",
			}),
			file: file,
		};

		createNFTProfile(publicKey, userData);
	};

	const handlePress = () => {
		let publicKey = window.localStorage.getItem("publicKey");
		getNFTFromPubKey(publicKey);
	};

	const handleUploadImage = (e) => {
		console.log(e.target.files[0]);
		setFile(e.target.files[0]);
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
				<button onClick={handleCreate}>Generar NFT</button>
				<button onClick={handlePress}>Obtener NFTs</button>
				<input type="file" onChange={handleUploadImage}></input>
				<Desktop
					pred={pred}
					setPred={setPred}
					tensor={tensor}
					setTensor={setTensor}
					region={region}
					setNum={setNum}
					num={num}
					onboarding={onboarding}
					setRegion={setRegion}
					check={check}
				/>
			</main>

			<footer className={styles.footer}></footer>
			<Toaster position="bottom-center" />
		</div>
	);
}
