import { signTransaction } from "./CreateNFT";

export const hasWallet = async () => {
	//Si phantom no esta instalado
	const provider = window?.phantom?.solana;
	const { solana } = window;

	if (!provider?.isPhantom || !solana.isPhantom) {
		setTimeout(() => {
			window.open("https://phantom.app/", "_blank");
		}, 2000);
		return false;
	}
	//Si phantom esta instalado
	let phantom;
	if (provider?.isPhantom) phantom = provider;

	const { publicKey } = await phantom.connect(); //conecta a phantom
	window.localStorage.setItem("publicKey", publicKey.toString()); //guarda la publicKey en el localStorage

	return true;
};

export const hasNFTProfile = (walletPubKey) => { };

export const createNFTProfile = async (publicKey, userData) => {
	let myHeaders = new Headers();
	myHeaders.append("x-api-key", process.env.NEXT_PUBLIC_API_KEY);

	let formData = new FormData();
	formData.append("network", process.env.NEXT_PUBLIC_SOLANA_NETWORK);
	formData.append("creator_wallet", publicKey);
	formData.append("name", userData.name);
	formData.append("symbol", userData.symbol);
	formData.append("description", userData.description);
	formData.append("attributes", userData.attributes);
	formData.append("image", userData.file, `${userData.name}.jpeg`);
	formData.append("fee_payer", publicKey);
	formData.append("receiver", publicKey);

	let requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: formData,
		redirect: "follow",
	};

	try {
		const response = await fetch("https://api.shyft.to/sol/v2/nft/create", requestOptions);
		const result = await response.json();
		const encodedTransaction = result.result.encoded_transaction;
		return signTransaction(encodedTransaction);
	} catch (error) {
		console.log("error", error);
	}

};
