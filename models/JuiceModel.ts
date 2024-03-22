import mongoose from "mongoose";

const juiceSchema = new mongoose.Schema(
	{
		name: String,
		price: Number,
		imageUrl: String,
	},
	{
		timestamps: true,
	}
);

const JuiceModel =
	mongoose.models.Juice || mongoose.model("Juice", juiceSchema);

export default JuiceModel;
