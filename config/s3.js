require("dotenv").config();
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

async function generateUploadURL(fileName, fileType) {
  const uniqueFileName = fileName || `upload-${Date.now()}`;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: uniqueFileName,
    ContentType: fileType,
  });

  const uploadURL = await getSignedUrl(s3, command, { expiresIn: 60 });
  const publicURL = `https://${bucketName}.s3.${region}.amazonaws.com/${uniqueFileName}`;

  return { uploadURL, publicURL };
}

module.exports = { generateUploadURL };
