// components/CustomScrollbar.js
import { useEffect } from "react";

export default function CustomScrollbar() {
    useEffect(() => {
        // Scrollbar thumb ko target karne ke liye CSS add karenge
        const scrollbarStyle = document.createElement("style");
        scrollbarStyle.innerHTML = `
            ::-webkit-scrollbar {
                width: 8px;
            }
            ::-webkit-scrollbar-track {
                background: transparent;
            }
            ::-webkit-scrollbar-thumb {
                background-color: #888;
                border-radius: 10px;
                opacity: 0; /* Initially hidden */
                transition: opacity 0.3s ease; /* Smooth transition */
            }
        `;
        document.head.appendChild(scrollbarStyle);

        // Scroll event handler function
        const handleScroll = () => {
            const scrollbarThumb = document.querySelector("::-webkit-scrollbar-thumb");
            if (scrollbarThumb) {
                scrollbarThumb.style.opacity = 1;

                clearTimeout(window.scrollTimeout);
                window.scrollTimeout = setTimeout(() => {
                    scrollbarThumb.style.opacity = 0;
                }, 500);
            }
        };

        // Scroll event listener add karain
        window.addEventListener("scroll", handleScroll);

        // Clean up function
        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.head.removeChild(scrollbarStyle);
        };
    }, []);

    return null;
}
