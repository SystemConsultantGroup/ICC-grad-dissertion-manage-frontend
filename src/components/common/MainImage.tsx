import { Flex } from "@mantine/core";
import Image from "next/image";
import largeTitle from "@/images/largeTitle.svg";

function MainImage() {
  return (
    <Flex p={20} justify="center">
      <Image src={largeTitle} alt="SKKU logo" />
    </Flex>
  );
}

export default MainImage;
