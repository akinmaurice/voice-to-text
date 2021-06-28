import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { StyledContainer } from './App.styled';


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();


mic.continuous = true;
mic.interimResults = true;
mic.lang = 'en-US';



const App = () => {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log(transcript)
      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }, [isListening]);

  const buttonText = isListening ? 'Stop': 'Start';
  return (
    <StyledContainer>
      <Row>
        <Col md="6">
          <h2>Current Speech</h2>
          <br/>
          <p>{note}</p>
          <br/>
          <Button 
            onClick={()=> setIsListening(prevState => !prevState)}>{buttonText}</Button>
        </Col>
      </Row>
    </StyledContainer>
  );
}

export default App;
