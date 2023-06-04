export const getNFTFromPubKey = (pubKey) => {
	let myHeaders = new Headers();
	myHeaders.append("x-api-key", process.env.NEXT_PUBLIC_API_KEY);

	let requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow",
	};

	const url = `https://api.shyft.to/sol/v2/nft/read_all?network=${process.env.NEXT_PUBLIC_SOLANA_NETWORK}&address=${pubKey}`;

	fetch(url, requestOptions)
		.then((response) => response.text())
		.then((result) => console.log(result))
		.catch((error) => console.log("error", error));
};

export const getMarketNFT = () => {};
