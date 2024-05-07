import '../css/main.css';
import hangman from '../img/hangman6.png';

interface WelcomeProps {
    words: string[];
    type: string;
  }
  
  export default function Welcome({ words, type }: WelcomeProps) {
    
    const topicHint = (type: string) => {
        let hint = '';
        switch (type) {
            case 'fruits':
                hint = 'Fruits';
                break;
            case 'colours':
                hint = 'Colours';
                break;
            case 'animals':
                hint = 'Animals';
                break;
            case 'countries':
                hint = 'Countries';
                break;
            default:
                hint = 'Unknown';
                break;
        }
        return hint;
    };

    return(
        <div className="wrapper">
            <h1>Welcome to HANGMAN GAME!!</h1>
            <h2>Find the hidden word</h2>
            <img src={hangman} alt='Hangman image' className='imagen'/>
            <br /> 
            <p className='hint'>The topic is... {topicHint(type)}</p>
            
        </div>
    );
}
