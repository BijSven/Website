if (window.innerWidth > 768) {
    var kinet = new Kinet({
        acceleration: 0.075,
        friction: 0.5,
        names: ["x", "y"],
    });

    var circle = document.getElementById('circle');

    kinet.on('tick', function (instances) {
        circle.style.transform = `translate3d(${instances.x.current}px, ${instances.y.current}px, 0) rotateX(${instances.x.velocity / 2}deg) rotateY(${instances.y.velocity / 2}deg)`;
    });

    function moveCursor(event) {
        lastMouseEvent = event;
        kinet.animate('x', event.pageX - window.innerWidth / 2);
        kinet.animate('y', event.pageY - window.innerHeight / 2);
    }

    document.addEventListener("mousemove", moveCursor, { passive: true });
}


var elementsAll = document.querySelectorAll("*");

elementsAll.forEach(function(element) {
    if (element.getAttribute('onclick') !== null || element.getAttribute('href') !== null || element.getAttribute('special') !== null) {
        element.addEventListener("mouseenter", function(event) {
            var mouse = document.getElementById('circle');
            mouse.style.padding = 'calc(1vw + 1vh)';
            mouse.style.marginLeft = '-2.25vw';
            mouse.style.marginTop = '-3.5vh';
            if (element.getAttribute('special') !== null) {
                mouse.style.background = `url('${element.getAttribute('special')}`;
                mouse.style.backgroundSize = "cover";
                mouse.style.padding = 'calc(2.5vw + 2.5vh)';
                mouse.style.marginLeft = '-5.125vw';
                mouse.style.marginTop = '-7.75vh';
                mouse.style.fontSize = 'calc(1vw + 1vh)';
            }
        });

        element.addEventListener("mouseleave", function(event) {
            var mouse = document.getElementById('circle');
            mouse.style.padding = '';
            mouse.style.marginLeft = '';
            mouse.style.marginTop = '';
            mouse.style.background = '';
            mouse.style.fontSize = '';
        });
    }
});