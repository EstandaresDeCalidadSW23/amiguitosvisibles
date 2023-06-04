import { getImageFromSD } from "../../api/StableDiffusion";

export default async function handler(req, res) {
	try {
		const prompt = `adorable puppy, colorful, artistic style, cartoon, neon, 4k, neon background,colorful light, neon stripes, portrait by ginger, clear very height details, octane render, yellow colors`;
		const response = await getImageFromSD(prompt);

		res.status(200).json({
			data: response,
		});
	} catch (error) {
		console.error("error =>", error);
		res.status(500).json(error);
	}
}
