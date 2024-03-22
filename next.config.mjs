/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "images.example.com",
			},
		],
	},
};

export default nextConfig;
