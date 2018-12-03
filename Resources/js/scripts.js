
// import { sayHello } from './home';
import '../sass/styles.scss';
import 'normalize.css/normalize.css';

fetch('/users').then(res => res.json()).then(data => console.log(data));

document.body.style.background = 'darkblue';
