import dbConnect from "@/db/connect";
import Worm from "@/db/models/Worm";

export default async function handler(request, response) {
  await dbConnect();

  console.log("hiiåi");
  if (request.method === "GET") {
    const worms = await Worm.find();
    console.log("wormswormswormsworms", worms);
    return response.status(200).json(worms);
  }
}
