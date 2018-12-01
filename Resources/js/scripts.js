
// import { sayHello } from './home';
import '../sass/styles.scss';
import 'normalize.css/normalize.css';

// sayHello();

document.onload = () => {

  fetch('/users')
    .then(res => res.json())
    .then((data) => {
      console.log(data);
    });


};
