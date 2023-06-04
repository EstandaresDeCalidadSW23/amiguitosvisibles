export const getImageFromSD = async (prompt) => {
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		key: process.env.NEXT_PUBLIC_SD_API_KEY,
		prompt: prompt,
		negative_prompt: null,
		width: "512",
		height: "512",
		samples: "1",
		num_inference_steps: "20",
		seed: null,
		guidance_scale: 7.5,
		safety_checker: "yes",
		multi_lingual: "no",
		panorama: "no",
		self_attention: "no",
		upscale: "no",
		embeddings_model: "embeddings_model_id",
		webhook: null,
		track_id: null,
	});

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	try {
		const response = await fetch(
			"https://stablediffusionapi.com/api/v3/text2img",
			requestOptions
		);
		const result = await response.json();
		//SD File
		return result;
	} catch (error) {
		console.log("error", error);
	}
};
