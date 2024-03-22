import mongoose from "mongoose";
const { Schema } = mongoose;

const transactionSchema = new Schema(
	{
		transactionId: String,
		name: String,
		status: String,
		paymentMethod: String,
		totalPrice: Number,
		cartItems: [
			{
				name: String,
				price: Number,
				qty: Number,
				imageUrl: String,
			},
		],
	},
	{
		timestamps: true,
	}
);

const TransactionModel =
	mongoose.models.Transaction ||
	mongoose.model("Transaction", transactionSchema);

export default TransactionModel;
