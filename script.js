//paralaksa
const parallaxContainer = document.getElementById('parallaxContainer');
const item1 = document.getElementById('item1');
const item2 = document.getElementById('item2');
const item3 = document.getElementById('item3');

parallaxContainer.addEventListener('mousemove', function (e) {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;

    item1.style.transform = `translate(${x * -50}px, ${y * -50}px)`;
    item2.style.transform = `translate(${x * -200}px, ${y * -200}px)`;
    item3.style.transform = `translate(${x * -100}px, ${y * -100}px)`;
});

//aside
document.addEventListener('DOMContentLoaded', function () {
    const asideLinks = document.querySelectorAll('aside a');
    const asideDivs = document.querySelectorAll('aside div');

    let activeLinkIndex = 0;

    const setActiveLink = (index) => {
        asideDivs.forEach(div => div.style.backgroundColor = '#fff');
        asideDivs[index].style.backgroundColor = '#111111';
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = entry.target.getAttribute('id');
                activeLinkIndex = Array.from(asideLinks).findIndex(link => link.getAttribute('href') === `#${targetId}`);
                setActiveLink(activeLinkIndex);
            }
        });
    }, { threshold: 0.5 });

    asideLinks.forEach(link => {
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            observer.observe(targetElement);
        }
    });

    asideLinks.forEach((link, index) => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            setActiveLink(index);
            window.location.hash = this.getAttribute('href');
        });
    });
});
