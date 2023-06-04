import { getImageFromSD } from "../../api/StableDiffusion";

export default async function handler(req, res) {
	const { data: { animal, nombre, breed, size, temperament } } = req.body;
	try {
		const prompt = `This adorable ${animal}, named ${nombre}, is a ${size} pet with a ${temperament} temperament. It belongs to the ${breed} breed. The artwork portraying ${nombre} is in a colorful and artistic style, with a cartoon-like appearance. It features a neon background with colorful lights and neon stripes. The portrait, created by Ginger, is a high-resolution 4k image rendered using Octane Render. The dominant color used in the artwork is yellow mustard, which adds a vibrant touch to the overall composition. This NFT portrait captures the essence of ${nombre} and celebrates the beauty and uniqueness of pets in general. It is a perfect addition to any art collection, reflecting the joy and companionship that pets bring to our lives.`;

		const response = await getImageFromSD(prompt);

		res.status(200).json({
			data: response,
		});
	} catch (error) {
		console.error("error =>", error);
		res.status(500).json(error);
	}
}
