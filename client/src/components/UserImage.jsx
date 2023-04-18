import { Box } from "@mui/material";

const UserImage = ({ cloudinary_id, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`https://res.cloudinary.com/dvmqacg6x/image/upload/v1681382302/${cloudinary_id}.jpg`}
      />
    </Box>
  );
};

export default UserImage;
