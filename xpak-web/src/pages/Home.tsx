import styled from "styled-components"
import Input from "../components/Input"
import { Button } from "../styles"
import Tile from "../components/Tile"
import { useNavigate } from "react-router-dom"


const Container = styled.div`

    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: column;
    gap:24px;
    padding-top: 20px;

`

const Box = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 60%;

`

const Title = styled.h2`

`

const Header = styled.div`

    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 10px;
    margin-bottom: 30px;

`

const Buttons = styled.div`

    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    

`


const Home = () => {
    const navigate = useNavigate();
  return (
    <Container>
        <Title>Welcome to Your Xpak Account</Title>
        <Box>
            <Header>
                <h3 style={{flex: "2"}}>Vehicles Available</h3>

                <Buttons>
                    <Button>Add Vehicle</Button>
                    <Button onClick={()=>{navigate("/states")}}>View States</Button>
                </Buttons>
                
            </Header>
            <div style={{width: "100%"}}>
                {
                    [2,3,4].map((num, index)=>(
                        <Tile 
                            index={index + 1}
                            title={"way finder"}
                        />
                    ))
                }
            </div>
        </Box>

        

    </Container>
  )
}

export default Home