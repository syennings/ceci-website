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

  if (request.method === "DELETE") {
    await Worm.findByIdAndDelete(id);

    response.status(200).json({ message: "Success!" });
  }

  if (request.method === "PATCH") {
    await Worm.findByIdAndUpdate(id, {
      $set: request.body,
    });
    return response.status(200).json({ status: "Worm successfully updated." });
  }
}
