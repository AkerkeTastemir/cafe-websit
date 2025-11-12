// === Scroll Progress Bar ===
window.addEventListener('scroll', () => {
  const scrollBar = document.getElementById('scrollBar');
  if (!scrollBar) return;
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (window.scrollY / totalHeight) * 100;
  scrollBar.style.width = progress + '%';
});


// jQuery Real time Search + Autocomplete + Highlight ===
$(function () {
  const $search = $('#menuSearch');
  const $items = $('.item, .card');
  const $suggestions = $('#suggestions');

  if (!$search.length) return;

  
  const names = [];
  $('.item h3, .card h3').each(function () {
    names.push($(this).text());
  });

  
  $search.on('keyup', function () {
    const query = $(this).val().toLowerCase();
    $suggestions.empty();

    
    $items.each(function () {
      const text = $(this).text().toLowerCase();
      if (text.includes(query)) {
        $(this).fadeIn(200);
      } else {
        $(this).fadeOut(200);
      }
    });

    
    if (query.length > 0) {
      const matched = names.filter(n => n.toLowerCase().includes(query)).slice(0, 5);
      matched.forEach(name => {
        $suggestions.append(`<li class="list-group-item">${name}</li>`);
      });

      
      $suggestions.stop(true, true).slideDown(200);
    } else {
      
      $suggestions.stop(true, true).slideUp(150);
    }

    // highlight match
    const regex = new RegExp(`(${query})`, 'gi');
    $('.item h3, .card h3, .description').each(function () {
      const original = $(this).text();
      $(this).html(original.replace(regex, `<span style="background:#ffcc99;">$1</span>`));
    });
  });

  
  $suggestions.on('click', 'li', function () {
    $search.val($(this).text());
    $suggestions.stop(true, true).slideUp(150).empty();
    $search.trigger('keyup');
  });
});




$(function(){
  const specials = [
    "🌟 Today’s Special: Caramel Latte & Fresh Croissant 🌟",
    "☕ Limited Offer: Hazelnut Cappuccino & Banana Bread 🍌",
    "🍰 Don’t miss: Chocolate Lava Cake & Vanilla Latte ✨",
    "🥐 Breakfast Deal: Americano + Butter Croissant ☀️"
  ];

  let i = 0;
  setInterval(() => {
    i = (i + 1) % specials.length;
    $("#specialText")
      .fadeOut(400, function() {
        $(this).text(specials[i]).fadeIn(400);
      });
  }, 10000);
});




// === MENU PAGE: Stylish Center Toast ===
document.addEventListener("DOMContentLoaded", function () {
  const orderButtons = document.querySelectorAll(".order-btn");

  if (orderButtons.length > 0) {
    orderButtons.forEach(btn => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();

        // создаём элемент всплывашки
        const toast = document.createElement("div");
        toast.className = "order-toast";
        toast.textContent = "☕ Your coffee has been added to the order!";
        document.body.appendChild(toast);

        // плавное появление
        setTimeout(() => toast.classList.add("show"), 100);

        // исчезает через 2.5 секунды
        setTimeout(() => {
          toast.classList.remove("show");
          setTimeout(() => toast.remove(), 500);
        }, 2500);

        if (typeof playSound === "function") {
          playSound();
        }
      });
    });
  }
});
