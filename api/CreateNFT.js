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
		const provider = getProvider();
		const recoveredTransaction = Transaction.from(Buffer.from(encodedTransaction, "base64"));
		const { signature } = await provider.signAndSendTransaction(recoveredTransaction);

		return signature;
	} catch (error) {
		console.log(error);
	}
};
