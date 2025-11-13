import { User } from "../models/user.model.js";
import cloudinary from "../uttils/cloudinary.js";

const DEFAULT_PIC_URL = 'https://i.ibb.co/3ywTZFTd/download.png';

const uploadSingleImage = async (req, res) => {
  try {
    const { id } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }

    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(400).send({
        success: false,
        message: 'User not found!'
      });
    }

    // --- UPDATED FIX: Check if the current picture is not the default one before deleting ---
    if (user.profilePic && user.profilePic !== DEFAULT_PIC_URL) {
      try {
        // --- NEW, SAFER LOGIC ---
        // Extract public_id from URL (e.g., .../upload/v12345/uploads/my-pic.jpg -> "uploads/my-pic")
        const publicIdMatch = user.profilePic.match(/\/v\d+\/(.+)\.[a-zA-Z0-9]+$/);
        
        if (publicIdMatch && publicIdMatch[1]) {
            const publicIdToDelete = publicIdMatch[1];
            console.log(`Attempting to delete old image with public_id: ${publicIdToDelete}`);
            await cloudinary.uploader.destroy(publicIdToDelete);
        } else {
            console.log("Could not parse public_id from URL, skipping delete.");
        }
        // --- END OF NEW LOGIC ---

      } catch (deleteError) {
        // Don't stop the whole process, just log the error
        console.log('Old image delete error (non-fatal):', deleteError.message);
      }
    }

    // Convert buffer to data URI
    const base64String = req.file.buffer.toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${base64String}`;

    // Upload the new image
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'uploads', // This is the folder it will be placed in
      resource_type: 'image',
      transformation: [
        { width: 1000, height: 1000, crop: 'limit', quality: 'auto' }
      ]
    });

    // Save new URL to user
    user.profilePic = result.secure_url;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      url: result.secure_url,
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Upload failed',
      error: error.message
    });
  }
};

const deleteImage = async (req, res) => {
  try {
    const { public_id } = req.params;
    
    if (!public_id) {
      return res.status(400).json({
        success: false,
        message: 'Public ID required'
      });
    }

    const result = await cloudinary.uploader.destroy(public_id);
    
    if (result.result === 'ok') {
      res.status(200).json({
        success: true,
        message: 'Image deleted successfully'
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Image not found'
      });
    }

  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Delete failed',
      error: error.message
    });
  }
};

export {
  uploadSingleImage,
  deleteImage
}