import replicateLib from "../../api/replicateLib";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default async function handler(req, res) {
  //if is not post
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // // //Image Generation Here....
    const { data, imageGenerator = "replicate" } = req.body;
    if (imageGenerator === "replicate" && data && typeof data === "object") {
      console.info("generating Stable Difussion image....");
      const { animal,
        description,
        breed,
        size,
        temperament } = data;

      const prompt = `face portrait of race: ${animal}, breed: ${breed} size: ${size}, temperament: ${temperament}, description: ${description} pet character illustration, 4k. `;
      console.log(prompt)
      // const replicateResponse = await replicateLib.generateImage(
      //   prompt); // stable difussion

      res.status(200).json({
        data: replicateResponse?.data,
      });
    } else {
      console.error("error =>", "probably didnt get data");
      res
        .status(500)
        .json({ message: "Somethhing went wrong sending job to replicate" });
    }
  } catch (error) {
    console.error("error =>", error);
    res.status(500).json(error);
  }
}
