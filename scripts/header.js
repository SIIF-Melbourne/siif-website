const favicon = document.createElement('link');
favicon.rel = 'icon';
favicon.href = 'https://lshtgdpdskhqqxdcwpjo.supabase.co/storage/v1/object/public/photos//SiiF-Logo.png';
document.head.appendChild(favicon);

fetch("header.html")
    .then(response => response.text())
    .then(data => {
        document.querySelector("header").innerHTML = data;
        
        const hamburger = document.querySelector('.hamburger');
        const closeButton = document.querySelector('.mobile-menu-close-button');
        const overlay = document.querySelector('.mobile-menu-overlay');

        if (hamburger && closeButton && overlay) {
            hamburger.addEventListener('click', () => {
                overlay.classList.add('active');
                hamburger.classList.add('hide');
                document.body.classList.add('menu-open');
            });

            closeButton.addEventListener('click', () => {
                overlay.classList.remove('active');
                hamburger.classList.remove('hide');
                document.body.classList.remove('menu-open');
            });
        } else {
            console.error("Hamburger, overlay, or close button not found in DOM.");
        }
    })
    .catch(error => {
        console.error("Error loading header:", error);
    });