import dbConnect from "@/db/connect";
import Worm from "@/db/models/Worm";

export default async function handler(request, response) {
  await dbConnect();

  console.log("hiiåi");
  if (request.method === "GET") {
    const worms = await Worm.find().sort({ createdAt: -1 });
    console.log("wormswormswormsworms", worms);
    return response.status(200).json(worms);
  }

  if (request.method === "POST") {
    try {
      const formData = request.body;
      await Worm.create(formData);

      response.status(201).json({ status: "Form created" });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }
}
