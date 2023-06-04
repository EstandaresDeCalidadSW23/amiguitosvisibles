export const getImageFromSD = async (prompt) => {
	var raw = JSON.stringify({
		key: "9DgOiQm41a04dSTVPpbZatZfAtvwp0QAer9ELNQmX03q9uxPO8M4Vcypb2D0",
		prompt: "adorable puppy, colorful, artistic style, cartoon, neon, 4k, neon background,colorful light, neon stripes, portrait by ginger, clear very height details, octane render",
		negative_prompt: null,
		width: "512",
		height: "512",
		samples: "1",
		num_inference_steps: "20",
		safety_checker: "no",
		enhance_prompt: "yes",
		seed: null,
		guidance_scale: 7.5,
		multi_lingual: "no",
		panorama: "no",
		self_attention: "no",
		upscale: "no",
		embeddings_model: null,
		webhook: null,
		track_id: null,
	});

	let requestOptions = {
		method: "POST",
		body: raw,
	};

	try {
		const response = await fetch(
			"https://stablediffusionapi.com/api/v3/text2img",
			requestOptions
		);
		const result = await response.json();
		window.open(result.output[0], "_blank");
		//SD File
		return result.output[0];
	} catch (error) {
		console.log("error", error);
	}
};
