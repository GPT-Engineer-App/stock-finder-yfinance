import { useState } from "react";
import { Box, Heading, Input, Button, Text, VStack, HStack, Spinner, Image } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const Index = () => {
  const [symbol, setSymbol] = useState("");
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/stock?symbol=${symbol}`);
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setStockData(data);
      }
    } catch (error) {
      setError("Failed to fetch stock data");
    }
    setLoading(false);
  };

  return (
    <Box p={8}>
      <Heading as="h1" size="xl" mb={8}>
        Stock Finder
      </Heading>
      <HStack mb={8}>
        <Input placeholder="Enter stock symbol" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
        <Button leftIcon={<FaSearch />} onClick={handleSearch}>
          Search
        </Button>
      </HStack>
      {loading && <Spinner size="xl" />}
      {error && <Text color="red.500">{error}</Text>}
      {stockData && (
        <VStack align="start" spacing={4}>
          <Image src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxzdG9jayUyMG1hcmtldHxlbnwwfHx8fDE3MTI5NDY0NTl8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="Stock Market" mb={4} />
          <Text fontSize="2xl" fontWeight="bold">
            {stockData.name} ({stockData.symbol})
          </Text>
          <Text>Price: ${stockData.price}</Text>
          <Text>Change: {stockData.change}%</Text>
          <Text>Market Cap: ${stockData.marketCap}</Text>
          <Text>Volume: {stockData.volume}</Text>
        </VStack>
      )}
    </Box>
  );
};

export default Index;
