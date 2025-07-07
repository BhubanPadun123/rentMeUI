export const uploadImagesToCloudinary = async (image) => {
    try {
        const data = new FormData();
        data.append('file', {
            uri: image,
            type: 'image/jpeg',
            name: 'upload.jpg',
        });
        data.append('upload_preset', 'ml_default'); // Use your UNSIGNED preset
        // cloud_name should not be added to FormData

        const response = await fetch('https://api.cloudinary.com/v1_1/dli3rzw0s/image/upload', {
            method: 'POST',
            body: data,
        });

        const result = await response.json();

        if (response.ok) {
            return result.secure_url
        } else {
            throw new Error(result.error?.message || 'Cloudinary upload failed');
        }
    } catch (error) {
        throw error;
    }
};