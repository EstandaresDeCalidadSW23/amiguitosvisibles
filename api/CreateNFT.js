import { clusterApiUrl, Transaction, Connection } from "@solana/web3.js";

export const signTransaction = async (encodedTransaction) => {
	try {
		const connection = new Connection(
			clusterApiUrl(process.env.NEXT_PUBLIC_SOLANA_NETWORK),
			"confirmed"
		);

		const recoveredTransaction = Transaction.from(Buffer.from(encodedTransaction, "base64"));

		const txnSignature = await connection.sendRawTransaction(recoveredTransaction.serialize());

		return txnSignature;
	} catch (error) {
		console.log(error);
	}
};
