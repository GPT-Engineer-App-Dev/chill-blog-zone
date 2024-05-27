import { Box, Container, Flex, Heading, Text, VStack, HStack, Link, useColorMode, IconButton } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [posts] = useState([
    { title: "First Blog Post", excerpt: "This is the summary of the first blog post." },
    { title: "Second Blog Post", excerpt: "This is the summary of the second blog post." },
  ]);

  return (
    <Container maxW="container.xl" p={4}>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading as="h1" size="lg">My Blog</Heading>
        <IconButton
          aria-label="Toggle dark mode"
          icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
          onClick={toggleColorMode}
        />
      </Flex>
      <Flex>
        <Box flex="3" p={4}>
          <VStack spacing={8} align="stretch">
            {posts.map((post, index) => (
              <Box key={index} p={5} shadow="md" borderWidth="1px">
                <Heading fontSize="xl">{post.title}</Heading>
                <Text mt={4}>{post.excerpt}</Text>
              </Box>
            ))}
          </VStack>
        </Box>
        <Box flex="1" p={4} borderLeft="1px solid" borderColor="gray.200">
          <Heading as="h2" size="md" mb={4}>About Me</Heading>
          <Text mb={4}>This is a brief description about me.</Text>
          <Heading as="h2" size="md" mb={4}>Links</Heading>
          <VStack align="start">
            <Link href="#">Link 1</Link>
            <Link href="#">Link 2</Link>
            <Link href="#">Link 3</Link>
          </VStack>
        </Box>
      </Flex>
    </Container>
  );
};

export default Index;