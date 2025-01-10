import React, { useEffect, useState, useRef, useMemo } from "react";

const containerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 200px)",
    gap: "10px",
};

const imageStyle = {
    width: "200px",
    height: "200px",
};

function ImageGallery({ images }) {
    const [visibleImageIdxs, setVisibleImageIdxs] = useState(new Set());
    const galleryImageRefs = useRef([]);

    const intersectionObserver = useMemo(
        () =>
            new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const visibleImageIndex = galleryImageRefs.current.indexOf(entry.target);
                            setVisibleImageIdxs((prev) => new Set([...prev, visibleImageIndex]));
                            intersectionObserver.unobserve(entry.target);
                        }
                    });
                },
                { rootMargin: "100px" }
            ),
        []
    );

    useEffect(() => {
        galleryImageRefs.current.forEach((imageElement) => {
            if (imageElement) {
                intersectionObserver.observe(imageElement);
            }
        });

        return () => intersectionObserver.disconnect();
    }, [intersectionObserver]);

    return (
        <div
            style={containerStyle}
        >
            {images.map((imageURL, index) => {
                return (
                    <img
                        key={imageURL}
                        ref={(element) => (galleryImageRefs.current[index] = element)}
                        src={visibleImageIdxs.has(index) ? imageURL : ""}
                        alt={`GalleryImage ${index}`}
                        style={imageStyle}
                    />
                )
            })}
        </div>
    );
}

export default ImageGallery;
