import { Container, VStack, Text, Box, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom"; // If using React Router
import React, { useEffect } from "react";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log(products);
  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products
        </Text>
        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>
        <Box textAlign="center">
          {products.length === 0 ? (
            <VStack>
              <Text fontSize="lg" color="gray.600" mb={4}>
                No products available.
              </Text>
              <Text
                as={Link}
                to="/create"
                color="blue.500"
                fontWeight="semibold"
                fontSize="lg"
                _hover={{
                  color: "blue.600",
                  textDecoration: "underline",
                }}
                cursor="pointer"
              >
                Create new Product
              </Text>
            </VStack>
          ) : null}
        </Box>
      </VStack>
    </Container>
  );
};

export default HomePage;
