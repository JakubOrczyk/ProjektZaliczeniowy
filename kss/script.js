/**
 * Kontener paralaksy.
 * @type {HTMLElement}
 */
const parallaxContainer = document.getElementById('parallaxContainer');

/**
 * Pierwszy element paralaksy.
 * @type {HTMLElement}
 */
const item1 = document.getElementById('item1');

/**
 * Drugi element paralaksy.
 * @type {HTMLElement}
 */
const item2 = document.getElementById('item2');

/**
 * Trzeci element paralaksy.
 * @type {HTMLElement}
 */
const item3 = document.getElementById('item3');

/**
 * Dodaje efekt paralaksy do kontenera.
 * @param {MouseEvent} e - Obiekt zdarzenia myszy.
 */
parallaxContainer.addEventListener('mousemove', function (e) {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;

    item1.style.transform = `translate(${x * -50}px, ${y * -50}px)`;
    item2.style.transform = `translate(${x * -200}px, ${y * -200}px)`;
    item3.style.transform = `translate(${x * -100}px, ${y * -100}px)`;
});

/**
 * Inicjalizuje nawigację boczną.
 * @event DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', function () {
    /**
     * Linki nawigacyjne boczne.
     * @type {NodeListOf<HTMLAnchorElement>}
     */
    const asideLinks = document.querySelectorAll('aside a');

    /**
     * Sekcje boczne.
     * @type {NodeListOf<HTMLElement>}
     */
    const asideDivs = document.querySelectorAll('aside div');

    /**
     * Indeks aktywnego linku.
     * @type {number}
     */
    let activeLinkIndex = 0;

    /**
     * Ustawia aktywny link.
     * @param {number} index - Indeks linku.
     */
    const setActiveLink = (index) => {
        asideDivs.forEach(div => div.style.backgroundColor = '#fff');
        asideDivs[index].style.backgroundColor = '#111111';
    }

    /**
     * Obserwator intersekcji dla sekcji bocznych.
     * @type {IntersectionObserver}
     */
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = entry.target.getAttribute('id');
                activeLinkIndex = Array.from(asideLinks).findIndex(link => link.getAttribute('href') === `#${targetId}`);
                setActiveLink(activeLinkIndex);
            }
        });
    }, { threshold: 0.5 });
    /**
     * Obserwuje sekcje boczne w nawigacji.
     */
    asideLinks.forEach(link => {
        /**
         * Identyfikator docelowej sekcji.
         * @type {string}
         */
        const targetId = link.getAttribute('href').substring(1);
        /**
         * Element docelowej sekcji.
         * @type {HTMLElement}
         */
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            observer.observe(targetElement);
        }
    });
    /**
     * Dodaje obsługę kliknięcia na link boczny.
     */
    asideLinks.forEach((link, index) => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            setActiveLink(index);
            window.location.hash = this.getAttribute('href');
        });
    });
});
