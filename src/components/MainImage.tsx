import { Box, Image } from "@mantine/core";

function MainImage() {
  return (
    <Box
      style={{
        padding: "20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Image src="/images/largeTitle.svg" alt="SKKU logo" fit="contain" w={500} h={116.4} />
    </Box>
  );
}

export default MainImage;
