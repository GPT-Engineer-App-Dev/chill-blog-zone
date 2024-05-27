import { Box, Container, Flex, Heading, Text, VStack, Link, useColorMode, IconButton, Input, Textarea, Button, FormControl, FormLabel, useToast, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useState, useRef } from "react";

const Index = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [posts, setPosts] = useState([
    { title: "First Blog Post", excerpt: "This is the summary of the first blog post." },
    { title: "Second Blog Post", excerpt: "This is the summary of the second blog post." },
  ]);
  const [newPost, setNewPost] = useState({ title: "", content: "", tags: "" });

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const onCloseDeleteDialog = () => setIsDeleteDialogOpen(false);
  const cancelRef = useRef();
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, content, tags } = newPost;
    if (title && content) {
      setPosts([...posts, { title, excerpt: content, tags }]);
      setNewPost({ title: "", content: "", tags: "" });
    }
  };

  const handleDeleteClick = (index) => {
    setPostToDelete(index);
    setIsDeleteDialogOpen(true);
  };

  const handleDeletePost = () => {
    const updatedPosts = posts.filter((_, index) => index !== postToDelete);
    setPosts(updatedPosts);
    setIsDeleteDialogOpen(false);
    toast({
      title: "Post deleted.",
      description: "The blog post has been deleted successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.xl" p={4} bg={colorMode === "light" ? "white" : "gray.800"} color={colorMode === "light" ? "black" : "white"}>
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
              <Box key={index} p={5} shadow="md" borderWidth="1px" bg={colorMode === "light" ? "gray.100" : "gray.700"}>
                <Flex justifyContent="space-between" alignItems="center">
                  <Heading fontSize="xl">{post.title}</Heading>
                  <Button colorScheme="red" size="sm" onClick={() => handleDeleteClick(index)}>Delete</Button>
                </Flex>
                <Text mt={4}>{post.excerpt}</Text>
                {post.tags && <Text mt={2} color="gray.500">Tags: {post.tags}</Text>}
              </Box>
            ))}
          </VStack>
          <Box mt={8}>
            <Heading as="h2" size="md" mb={4}>Add New Post</Heading>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="stretch">
                <FormControl id="title" isRequired>
                  <FormLabel>Title</FormLabel>
                  <Input
                    type="text"
                    name="title"
                    value={newPost.title}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl id="content" isRequired>
                  <FormLabel>Content</FormLabel>
                  <Textarea
                    name="content"
                    value={newPost.content}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl id="tags">
                  <FormLabel>Tags</FormLabel>
                  <Input
                    type="text"
                    name="tags"
                    value={newPost.tags}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <Button type="submit" colorScheme="blue">Add Post</Button>
              </VStack>
            </form>
          </Box>
        </Box>
        <Box flex="1" p={4} borderLeft="1px solid" borderColor={colorMode === "light" ? "gray.200" : "gray.600"} bg={colorMode === "light" ? "white" : "gray.800"}>
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
      <AlertDialog
        isOpen={isDeleteDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={onCloseDeleteDialog}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Post
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this post? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseDeleteDialog}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeletePost} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
};

export default Index;