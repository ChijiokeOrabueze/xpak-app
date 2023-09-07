import styled from "styled-components"
import Input from "../components/Input"
import { useNavigate } from "react-router-dom"


const Container = styled.div`

    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap:24px;

`

const LoginForm = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 60%;

`

const Title = styled.h1`

`

const Button = styled.div`

    background: #6576ff;
    border-radius: 3px;
    color: white;
    width: 100px;
    height: 36px;
    padding: 8px 18px;
    text-align: center;
    cursor: pointer;
    font-size: 15px;
    font-weight: 700;
    border: 0;

`


const Login = () => {
    const navigate = useNavigate()
  return (
    <Container>
        <Title>Enter Your Credentials to Login to Your Xpak Account</Title>
        <LoginForm>
            <Input 
                name="username"
                title="username"
                type="text"
            />
            <Input 
                name="password"
                title="password"
                type="password"
            />
        </LoginForm>
        <Button onClick={()=>{navigate("/home")}}>Login</Button>

    </Container>
  )
}

export default Login