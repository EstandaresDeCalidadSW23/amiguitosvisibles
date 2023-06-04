import { Transaction } from "@solana/web3.js";

const getProvider = () => {
	if ("phantom" in window) {
		const provider = window.phantom?.solana;

		if (provider?.isPhantom) {
			return provider;
		}
	}

	window.open("https://phantom.app/", "_blank");
};

export const signTransaction = async (encodedTransaction) => {
	try {
		console.log("Creando firmando NFT");
		const provider = getProvider();
		const recoveredTransaction = Transaction.from(Buffer.from(encodedTransaction, "base64"));
		console.log("Transaction: ", recoveredTransaction);
		const { signature } = await provider.signAndSendTransaction(recoveredTransaction);

		return signature;
	} catch (error) {
		console.log(error);
		return null;
	}
};

const signPetNFT = async (encodedTransaction, mint) => {
	try {
		console.log("Creando firmando NFT del pet");

		let publicKey = window.localStorage.getItem("publicKey");

		const provider = getProvider();
		const recoveredTransaction = Transaction.from(Buffer.from(encodedTransaction, "base64"));
		//Firmar NFT
		const { signature } = await provider.signAndSendTransaction(recoveredTransaction);
		//Subir al marketplace
		addToMarketplace(mint, publicKey);
		return signature;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const signUserNFT = async (encodedTransaction, mint) => {
	try {
		console.log("Creando firmando NFT del usuario");

		let publicKey = window.localStorage.getItem("publicKey");

		const provider = getProvider();
		const recoveredTransaction = Transaction.from(Buffer.from(encodedTransaction, "base64"));
		//Firmar NFT
		const { signature } = await provider.signAndSendTransaction(recoveredTransaction);
		//Subir al marketplace
		addToMarketplace(mint, publicKey);
		return signature;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const createPetNFT = async (pubKey, petData) => {
	console.log("Creando el nft de la mascota...");
	let myHeaders = new Headers();
	myHeaders.append("x-api-key", process.env.NEXT_PUBLIC_API_KEY);

	let formData = new FormData();
	formData.append("network", process.env.NEXT_PUBLIC_SOLANA_NETWORK);
	formData.append("creator_wallet", pubKey);
	formData.append("name", petData.name);
	formData.append("symbol", petData.symbol);
	formData.append("description", petData.description);
	formData.append("attributes", petData.attributes);
	formData.append("image", petData.file, `${petData.name}.jpeg`);
	formData.append("fee_payer", pubKey);
	formData.append("receiver", pubKey);

	let requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: formData,
		redirect: "follow",
	};

	fetch("https://api.shyft.to/sol/v2/nft/create", requestOptions)
		.then((response) => response.json())
		.then((result) => {
			const encodedTransaction = result.result.encoded_transaction;
			const mint = result.result.mint;
			signPetNFT(encodedTransaction, mint);
		})
		.catch((error) => console.log("error", error));
};

export const addToMarketplace = (nftAddress, pubKey) => {
	console.log("Vinculando el nft con el marketplace...");

	var myHeaders = new Headers();
	myHeaders.append("x-api-key", process.env.NEXT_PUBLIC_API_KEY);
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		network: process.env.NEXT_PUBLIC_SOLANA_NETWORK,
		marketplace_address: process.env.NEXT_PUBLIC_MARKETPLACE_KEY,
		nft_address: nftAddress,
		price: 10,
		seller_wallet: pubKey,
	});

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	fetch("https://api.shyft.to/sol/v1/marketplace/list", requestOptions)
		.then((response) => response.json())
		.then((result) => {
			const encodedTransaction = result.result.encoded_transaction;
			signTransaction(encodedTransaction);
		})
		.catch((error) => console.log("error", error));
};
