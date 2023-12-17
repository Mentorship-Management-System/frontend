import React, { useState } from 'react'
import { Box, Button, Center, CircularProgress, CircularProgressLabel, Flex, HStack,Select, Text, VStack } from '@chakra-ui/react'
import "./StudentCourses.css";

export default function StudentCourses() {
  const [viewDetails, setviewDetails] = useState(false);
  // const [showModel, setShowModel] = useState(false);

  const handleClick = () => {
    setviewDetails(!viewDetails);
  }

  const GradeSheetHandler = () => {

  }


  return (
    <div>
      {viewDetails ? <Box p='3% 4%'>
        <Button className='Button' onClick={handleClick}>Back</Button>

        <Box color='black' fontSize='1.5rem' mt='3%'>
          <HStack mt='1%'>
            <Text m='0'>Course Name:</Text>
            <Text m='0'>Operating System</Text>
          </HStack>
          <HStack mt='1%'>
            <Text m='0'>Course Code:</Text>
            <Text m='0'>CO401</Text>
          </HStack>
          <HStack mt='1%'>
            <Text m='0'>Course Instructor:</Text>
            <Text m='0'>Sanjib K. Deka</Text>
          </HStack>


          <Button className='Button1' mt='5%' colorScheme='blue' onClick={GradeSheetHandler} _hover={{backgroundColor: 'blue.600'}}>Grade Sheet</Button>
          {/* <HStack w='50vw' justify='space-between' mt="3%">
            <VStack>
              <CircularProgress value={20} size='120px' h="19vh">
                <CircularProgressLabel >20</CircularProgressLabel>
              </CircularProgress>
              <Text m='0'>Test 1</Text>
            </VStack>
            <VStack>
              <CircularProgress value={33} size='120px' h="19vh">
                <CircularProgressLabel >33</CircularProgressLabel>
              </CircularProgress>
              <Text m='0'>Mid term</Text>
            </VStack>
            <VStack>
              <CircularProgress value={22} size='120px' h="19vh">
                <CircularProgressLabel >22</CircularProgressLabel>
              </CircularProgress>
              <Text m='0'>Test 3</Text>
            </VStack>
            <VStack>
              <CircularProgress value={55} size='120px' h="19vh">
                <CircularProgressLabel >55</CircularProgressLabel>
              </CircularProgress>
              <Text m='0'>End Term</Text>
            </VStack>
          </HStack> */}

          
          {/* {showModel && <div className="modelcontainer">
                    <h5>Edit Marks</h5>
                      <Flex direction='column' m='0 4%' >
                        <Flex justify='space-between'>
                        <div>
                          <label>Test 1</label><br></br>
                          <input type='text' ></input>
                        </div>
                        <div>
                          <label>Mid Term</label><br></br>
                          <input type='text' ></input>
                        </div>
                        </Flex>
                        <Flex justify='space-between'>
                        <div>
                          <label>Test 3</label><br></br>
                          <input type='text' ></input>
                        </div>
                        <div>
                          <label>End Term</label><br></br>
                          <input type='text' ></input>
                        </div>
                        </Flex>
                      
                      </Flex>
                    <div className="buttonSave">
                        <div className="bottoncover">
                            <button onClick={() => {setShowModel(false)}}>
                                Cancel
                            </button>
                            <button style={{backgroundColor: "#3081D0", color: "white"}} onClick={handleEditmarks}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>} */}
        </Box>
      </Box>

      : <Box p='3% 4%'>
        
            <Select className='select' w='14vw' borderColor='gray'>
              <option value='option1'>Semester 1</option>
              <option value='option1'>Semester 2</option>
              <option value='option1'>Semester 3</option>
              <option value='option1'>Semester 4</option>
              <option value='option1'>Semester 5</option>
              <option value='option1'>Semester 6</option>
              <option value='option1'>Semester 7</option>
            </Select> 
              <HStack flexWrap='wrap' color='black' mt='3%'>
                  <Box className='coursebox' >
                      <Text m='0' mt='10px'>Operating System</Text>
                      <Text m='0' mt='10px'>CO401</Text>
                      <Text m='0' mt='10px'>by Sankib K. Deka</Text>
                      <Button colorScheme='blue' onClick={handleClick}>Details</Button>
                  </Box>
              </HStack>
        </Box>}
    </div>
  )
}
