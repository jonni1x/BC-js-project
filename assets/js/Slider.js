const Slider = (images) => {
    const img = document.querySelector('.slider-container img');
    const btns = document.querySelectorAll('.slider-container iconify-icon');
    const dots = document.querySelectorAll('.dots span');
    if(!images) return;
    let i  = 0;
    btns.forEach(btn => {
        btn.addEventListener('click', e => {
            let el = e.target;

            if(el.classList.contains('left')) { 
                if(i < 0) {
                    i = images.length - 1
                }
                img.src = images[i]
                i--
            }

            
            if(el.classList.contains('right')) { 
                if(i > images.length - 1) {
                    i = 0
                }
                img.src = images[i]
                i++
            }
        })
    });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            img.src = images[i]
        })
    })
}

export default Slider;