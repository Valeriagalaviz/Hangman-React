import Hangman from './components/Hangman';
import Welcome from './components/Welcome';

const fruits = ['apple','orange','watermelon','grape','strawberry','pear','cherry','kiwi']
const colors = ['red','purple','blue','green','pink','yellow','black','white']
const animals = ['pig','hen','rooster','chicken','cow','sheep','cat','dog']
const countries = ['japan','korea','spain','england','china','mexico','argentina']
const listas = [fruits,colors,animals,countries];

export function getTypeFromIndex(index: number): string {
  switch (index) {
      case 0:
          return 'fruits';
      case 1:
          return 'colors';
      case 2:
          return 'animals';
      case 3:
          return 'countries';
      default:
          return 'unknown';
  }
}

function App() {
  const randomIndex = Math.floor(Math.random() * listas.length);
  const randomArray = listas[randomIndex];
  const randomType = getTypeFromIndex(randomIndex);
  return (
      <div>
        <Welcome words={randomArray} type={randomType} />
        <Hangman words = {randomArray} />
      </div>    
  );
}
export default App;