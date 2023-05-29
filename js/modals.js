var modalbtns = document.querySelectorAll(".faq");
var modals = document.querySelectorAll(".modal");
var closebtns = document.querySelectorAll(".close");

modalbtns.forEach(function (btn, index) {
    btn.addEventListener("click", function () {
        var modalId = this.getAttribute("data-modal");
        document.getElementById(modalId).classList.add("open");
    });
});

closebtns.forEach(function (btn, index) {
    btn.addEventListener("click", function () {
        modals[index].classList.remove("open");
    });
});