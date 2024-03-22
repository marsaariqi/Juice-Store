import mongoose from "mongoose";
const { Schema } = mongoose;

const cartSchema = new Schema(
	{
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

const CartModel =
	mongoose.models.CartItem || mongoose.model("CartItem", cartSchema);

export default CartModel;
