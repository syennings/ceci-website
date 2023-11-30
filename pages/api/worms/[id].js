import dbConnect from "@/db/connect";
import Worm from "@/db/models/Worm";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;
  console.log("are the worms loading in the backend??", id);

  if (request.method === "GET") {
    const worm = await Worm.findById(id);

    if (!worm) {
      response.status(404).json({ status: "NOT WORKINGGGG" });
    }
    response.status(200).json(worm);
  }
}
