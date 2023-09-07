import styled from "styled-components"
import Input from "../components/Input"
import Tile from "../components/Tile"


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

const Button = styled.div`

    background: #6576ff;
    border-radius: 3px;
    color: white;
    width: 120px;
    height: 36px;
    padding: 8px;
    text-align: center;
    cursor: pointer;
    font-size: 15px;
    font-weight: 700;
    border: 0;

`

const Header = styled.div`

    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 30px;

`

const Buttons = styled.div`

    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    

`


const States = () => {
  return (
    <Container>
        <Title>Welcome to Your Xpak Account</Title>
        <Box>
            <Header>
                <h3 style={{flex: "2"}}>All States</h3>

                <Buttons>
                    <Button>Add State</Button>
                </Buttons>
                
            </Header>
            <div style={{width: "100%"}}>
                {
                    ["Designed","Tested","Painted"].map((num, index)=>(
                        <Tile
                            index={index + 1}
                            title={num}
                        />
                    ))
                }
            </div>
        </Box>

        
        

    </Container>
  )
}

export default States