import { signTransaction } from "./CreateNFT";

export const donateToInstitution = (senderPubKey, receiverPubKey, amount) => {
	var myHeaders = new Headers();
	myHeaders.append("x-api-key", process.env.NEXT_PUBLIC_API_KEY);
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		network: process.env.NEXT_PUBLIC_SOLANA_NETWORK,
		from_address: senderPubKey,
		to_address: receiverPubKey,
		amount,
	});

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	fetch("https://api.shyft.to/sol/v1/wallet/send_sol", requestOptions)
		.then((response) => response.json())
		.then((result) => {
			console.log(result);
			const encodedTransaction = result.result.encoded_transaction;

			signTransaction(encodedTransaction);
		})
		.catch((error) => console.log("error", error));
};
