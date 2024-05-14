// eslint-disable-next-line no-unused-vars
import { IconButton, Modal, ModalOverlay, useDisclosure, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Flex, FormControl, FormLabel, Input, Textarea, ModalFooter, Button, useToast } from '@chakra-ui/react'
import { useState } from 'react';
import { BiEditAlt } from "react-icons/bi";
import { BASE_URL } from '../App';

// eslint-disable-next-line react/prop-types
const EditModal = ({user, setUsers}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const [inputs, setInputs] = useState({
        name: user.name,
        role: user.role,
        description: user.description,
    });
    const toast = useToast();

    const handleEditUser = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch(BASE_URL + "/friends/" + user.id, {
                method: "PATCH",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs)
            })
            const data = await res.json();
            if(!res.ok){
                throw new Error(data.error)
            }
            setUsers((prevUsers) => prevUsers.map((u) => u.id === user.id ? data : u))
            toast({
				status: "success",
				title: "Yayy! 🎉",
				description: "Dados do usuario atualizado com sucesso.",
				duration: 2000,
				position: "top-center",
			});
            onClose()
        } catch (error) {
            toast({
				status: "error",
				title: "An error occurred.",
				description: error.message,
				duration: 4000,
				position: "top-center",
			});
        } finally{
            setIsLoading(false)
        }
    }

  return (
    <>
     <IconButton 
     onClick={onOpen}
     variant='ghost'
     colorScheme='blue'
     aria-label='See menu'
     size={'sm'}
     icon={<BiEditAlt size={20} />}
     />   

     <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleEditUser}>
            <ModalContent>
                <ModalHeader>Meu Novo BFF 😍</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Flex alignItems={'center'} gap={4}>
                        <FormControl>
                            <FormLabel>
                            Nome    
                            </FormLabel>
                            <Input 
                            placeholder='ex: Fulano...'
                            value={inputs.name}
							onChange={(e) => setInputs((prev) => ({ ...prev, name: e.target.value }))}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Ocupação</FormLabel>
                            <Input 
                            placeholder='ex: Tech Lead...'
                            value={inputs.role}
                            onChange={(e)=> setInputs((prev) => ({...prev, role: e.target.value}))}
                            />
                        </FormControl>
                    </Flex>
                    <FormControl mt={4}>
                        <FormLabel>Detalhes</FormLabel>
                        <Textarea 
                        resize={'none'}
                        overflow={'hidden'}
                        placeholder='Descreva sua tafera diaria...'
                        value={inputs.description}
                        onChange={(e)=> setInputs((prev) => ({...prev, description: e.target.value}))}
                        />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} type='submit' isLoading={isLoading} >
                        Atualizar
                    </Button>
                    <Button onClick={onClose}>Cancelar</Button>
                </ModalFooter>
            </ModalContent>
        </form>
     </Modal>
    </>
  )
}

export default EditModal