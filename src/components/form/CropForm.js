import './Form.scss'
import React, { useState, useRef } from "react";
import ReactCrop from "react-image-crop";
import 'react-image-crop/src/ReactCrop.scss'

const CropForm = (props) => {
    const [src, setSrc] = useState(null);
    const [crop, setCrop] = useState({
        unit: "%",
        x: 0,
        y: 0,
        width: 50,
        height: 50
    });
    const [croppedImageUrl, setCroppedImageUrl] = useState(null);
    const imageRef = useRef();
    console.log(imageRef)

    const onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () => setSrc(reader.result));
            setCroppedImageUrl(null)
            reader.readAsDataURL(e.target.files[0]);
            // console.log(reader)
        }
    };

    const onImageLoaded = (image) => {
        console.log("hello")
        imageRef.current = image;
    };

    const onCropComplete = (crop) => {
        makeClientCrop(crop);
    };

    const onCropChange = (crop) => {
        setCrop(crop);
    };

    const makeClientCrop = async (crop) => {
        if (imageRef.current && crop.width && crop.height) {
            const croppedImageUrl = await getCroppedImg(
                imageRef.current,
                crop,
                "newFile.jpeg"
            );
            setCroppedImageUrl(croppedImageUrl);
        }
    };

    const getCroppedImg = (image, crop, fileName) => {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    console.error("Canvas is empty");
                    return;
                }
                blob.name = fileName;
                window.URL.revokeObjectURL(croppedImageUrl);
                const fileUrl = window.URL.createObjectURL(blob);
                setCroppedImageUrl(fileUrl);
                resolve(fileUrl);
            }, "image/jpeg");
        });
    };

    return (
        <div className="">
            <div>
                <input type="file" accept="image/*" onChange={onSelectFile} />
            </div>
            {
                src && (
                    <ReactCrop
                        // src={src}
                        crop={crop}
                        ruleOfThirds
                        onImageLoaded={onImageLoaded}
                        onComplete={onCropComplete}
                        onChange={onCropChange}
                    ><img ref={imageRef} style={{ maxWidth: "200px" }} src={src} alt="" /></ReactCrop>
                )
            }
            {
                croppedImageUrl && (
                    <img alt="Crop" style={{ maxWidth: "100%" }} src={croppedImageUrl} />
                )
            }
        </div >
    );
}

export default CropForm