const root = document.getElementById('root');

console.log('clicked');
const clickme = () => {
    root.innerText = 'changed after click';
    alert('clicked');
}
root.innerHTML = `Hello from index`;
root.addEventListener('click', () => {
    root.innerText = 'changed after click';
})