import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components/native';

const Page = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #00aeef;
`;
const ButtonsView = styled.View`
  flex-direction: row;
  margin-top: 200px;
`;
const Image = styled.Image`
  width: 450px;
`;
const Button = styled.TouchableOpacity`
  width: 120px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  height: 120px;
  margin: 17px;
  border-radius: 60px;
`;
const SecondsText = styled.Text`
  margin-top: -150px;
  color: #fff;
  font-size: 55px;
  font-weight: bold;
`;
const OldText = styled.Text`
  color: #fff;
  font-size: 25px;
  font-weight: bold;
`;
const ButtonText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #00aeef;
`;

export default function App() {
  const [seconds, setSeconds] = useState(0);
  const [Oldseconds, setOldSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  function toggle() {
    setIsActive(!isActive);
  }
  function reset() {
    setOldSeconds(seconds);
    setSeconds(0);
    setIsActive(false);
  }
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 0.1);
      }, 100);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);
  return (
    <Page>
      <Image source={require('./stopwatch.png')} resizeMode="contain" />
      <SecondsText>{seconds.toFixed(1)}</SecondsText>

      <ButtonsView>
        <Button onPress={toggle}>
          <ButtonText>{isActive ? 'Pause' : 'Start'}</ButtonText>
        </Button>
        <Button onPress={reset}>
          <ButtonText>Reset</ButtonText>
        </Button>
      </ButtonsView>
      <OldText>
        {Oldseconds !== 0 && `Your last time: ${Oldseconds.toFixed(1)}s`}
      </OldText>
    </Page>
  );
}
