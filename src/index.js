import { app } from './app';
const root = document.getElementById('root');

console.log('clicked');
console.log('application name', app.name);
const clickme = () => {
    root.innerText = 'changed after click';
    alert('clicked');
}
root.innerHTML = `Hello from index`;
root.addEventListener('click', () => {
    root.innerText = 'changed after click';
})