import dbConnect from "@/db/connect";
import Work from "@/db/models/Work";

export default async function handler(request, response) {
  await dbConnect();
  const { slug } = request.query;
  if (request.method === "GET") {
    const work = await Work.findOne({ slug });

    if (!work) {
      response.status(404).json({ status: "NOT WORKINGGGG" });
    }
    response.status(200).json(work);
  }
}
