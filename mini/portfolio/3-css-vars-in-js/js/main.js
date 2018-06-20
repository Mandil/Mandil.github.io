const inputs = document.querySelectorAll('.controls input');
const handleChange = (e)=> {
    let suffex = e.target.name === 'color'? '' : 'px';
    document.documentElement.style.setProperty(`--${e.target.name}`, `${e.target.value}${suffex}`)
}
inputs.forEach(input => input.addEventListener('change', handleChange));
inputs.forEach(input => input.addEventListener('mousemove', handleChange));
