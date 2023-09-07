import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import styled from 'styled-components';


const Container = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    position: relative;
    overflow: hidden;

    * {
        box-sizing: border-box;
    }
`;

function App() {
    return (
        <Container>
            <>
                <Routes>
                    <Route path='/' element={<></>} />
                </Routes>
            </>
            <ToastContainer limit={1} />
        </Container>
    );
}

export default App;
