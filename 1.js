const slider = document.getElementById("slid");

// Initial data to add inside the slider
const imagesData = [
	{ imageName: "1img.png", alt: "slid-item-2" },
	{ imageName: "2img.png", alt: "slid-item-10" },
	{ imageName: "3img.png", alt: "slid-item-9" },
	{ imageName: "4img.jpg", alt: "slid-item-4" },
	{ imageName: "5img.jpg", alt: "slid-item-1" },
	{ imageName: "6img.jpg", alt: "slid-item-5" },
	{ imageName: "7img.jpg", alt: "slid-item-2" },
	{ imageName: "8img.png", alt: "slid-item-3" },
	{ imageName: "9img.png", alt: "slid-item-8" },
	{ imageName: "10img.png", alt: "slid-item-6" },
];
const imgCount = imagesData.length;

// Animation duration per image in the secondes unit
const animationTime = 3;

// Using the map method to fill the slider(slider is ul element)
imagesData.forEach((img, index) => {
	const liEl = document.createElement("li");
	const aniInd = index - imgCount;

        // Adding animation details to slide item
	liEl.style.animationName = dynamicAnimationHandler(imgCount);
	liEl.style.animationDuration = `${animationTime * imgCount}s`;
	liEl.style.animationDelay = `${animationTime * aniInd}s`;

	if (index === 1) {
		liEl.style.transform = "translateX(240px) translateZ(-240px) rotateY(-45deg)";
	} else if (index === imgCount - 1) {
		liEl.style.transform = "translateX(-240px) translateZ(-240px) rotateY(45deg)";
	} else {
		liEl.style.transform = "translateZ(-500px)";
	}

         // Create and append image element to slide item
	const imageElement = document.createElement("img");
	imageElement.src = `./images/${img.imageName}`;
	imageElement.alt = img.alt;
	liEl.appendChild(imageElement);

	slider.appendChild(liEl);
});

function dynamicAnimationHandler(imagesCount) {
	const Freezetime = 100 / imagesCount;
	const moverange = Freezetime * 0.2;

	const aniName = `animationFor${imagesCount}Images`;
	const aniBody = `0%,
		${Freezetime - moverange}% {
			transform: translateX(0);
		}
		${Freezetime}%,
		${2 * Freezetime - moverange}% {
			transform: translateX(-240px) translateZ(-240px) rotateY(45deg);
		}
		${2 * Freezetime}%,
		${100 - Freezetime - moverange}% {
			transform: translateZ(-500px);
		}
		${100 - Freezetime}%,
		${100 - moverange}% {
			transform: translateX(240px) translateZ(-240px) rotateY(-45deg);
		}
		${100 - moverange / 2}% {
			transform: translateX(240px) translateZ(-240px) rotateY(-45deg) translateX(160px);
		}
		100% {
			transform: translateX(0);
	}`;

	// Create an empty style element and append it to the DOM
	const styleElement = document.createElement("style");
	document.head.appendChild(styleElement);

	// Inserting the animation values to the stylesheet
	styleElement.sheet.insertRule(`@keyframes ${aniName} {${aniBody}}`, styleElement.length);

	return aniName;
}