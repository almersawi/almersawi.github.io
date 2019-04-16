var myDiv = document.getElementById('linkedin');
document.onscroll = function() {
    var scrollValue = document.documentElement.scrollTop;
    if (scrollValue >= 65) {
      myDiv.classList.add('scrolled');
    }
    else {
     myDiv.classList.remove('scrolled');
    }
    console.log(scrollValue);
  }