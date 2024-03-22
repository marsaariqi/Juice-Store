"use client";
import { useEffect } from "react";

export function useDynamicViewportHeight() {
	useEffect(() => {
		function adjustHeight() {
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty("--vh", `${vh}px`);
		}

		adjustHeight();
		window.addEventListener("resize", adjustHeight);

		return () => {
			window.removeEventListener("resize", adjustHeight);
		};
	}, []);
}
