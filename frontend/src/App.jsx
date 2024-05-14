import { Container, Stack, Text} from "@chakra-ui/react"
import Navbar from "./components/Navbar"
import UserGrid from "./components/UserGrid"
import { useState } from "react"

export const BASE_URL = 'http://127.0.0.1:5000/api';

function App() {
  const [users, setUsers] = useState([])

  return (
    <Stack minH={"100vh"}>

      <Navbar setUsers={setUsers} />

      <Container maxH={'1200px'} my={4}>
        <Text
        fontSize={{ base: "3xl", md: "50" }}
        fontWeight={"bold"}
        letterSpacing={"2px"}
        textTransform={"uppercase"}
        textAlign={"center"}
        mb={8}
        >
          <Text as={'span'} bgGradient={'linear(to-r, cyan.400, green.500)'} bgClip={'text'}>
            Minha Equipe
          </Text>
          🚀
        </Text>
        
      </Container>
      <UserGrid users={users} setUsers={setUsers} />
    </Stack>
  )
}

export default App
