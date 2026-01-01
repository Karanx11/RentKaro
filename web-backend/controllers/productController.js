import Product from "../models/Product.js";

/* =========================
   LIKE / DISLIKE PRODUCT
========================= */
export const voteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { vote } = req.body; // "like" | "dislike"
    const userId = req.user._id;

    if (!["like", "dislike"].includes(vote)) {
      return res.status(400).json({ message: "Invalid vote" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ❌ Prevent double voting
    const alreadyVoted = product.voters.find(
      (v) => v.user.toString() === userId.toString()
    );

    if (alreadyVoted) {
      return res.status(400).json({
        message: "You have already voted on this product",
      });
    }

    // ✅ Save vote
    product.voters.push({ user: userId, vote });

    if (vote === "like") product.likes += 1;
    if (vote === "dislike") product.dislikes += 1;

    await product.save();

    res.json({
      likes: product.likes,
      dislikes: product.dislikes,
    });
  } catch (error) {
    console.error("Vote error:", error);
    res.status(500).json({ message: "Voting failed" });
  }
};
