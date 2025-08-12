

$(window).on("load", function () {
  gsap.registerPlugin(ScrollTrigger);
});

$(document).ready(function () {
  const headerHeight = $(".mobile-header").outerHeight();

  const isDesktop = window.innerWidth > 700;

  $("#burger-btn, #close-btn").on("click", function () {
    $("#burger-btn, #close-btn").toggleClass("icon-active");

    if ($(".mobile_menu").is(":visible")) {
      $(".mobile_menu").fadeOut();
      $("body").css("overflow", "auto");
    } else {
      $(".mobile_menu")
        .css({
          top: headerHeight + "px",
          height: `calc(105vh - ${headerHeight}px)`,
        })
        .fadeIn();
      $("body").css("overflow", "hidden");
    }
  });

  let jsPlayer = videojs('promo-video', {
    autoplay: true,
    playsinline: true,
    muted: true,
  });
  


  $('.sound_on_btn').on('click', function () {
  jsPlayer.ready(function () {
    $('.sound_on_btn').addClass('sound_on_hidden');
    jsPlayer.muted(false);
    jsPlayer.currentTime(0);
    jsPlayer.play();
  });
});

const video = $(".video_container video").get(0);
  const playerButton = $(".player_button");
  const player = $(".player");

  playerButton.on("click", function () {
    if (video.paused || video.ended) {
      video.play();
      player.toggleClass("active");
    } else {
      video.pause();
      player.toggleClass("active");
    }
  });

  $(video).on("ended", function () {
    player.toggleClass("active");
  });


  $(".hero").css({
    height: `calc(100vh - ${headerHeight}px)`,
  });

 
  $(".mobile_menu li").on("click", function (e) {
  e.preventDefault();

  let rawTarget = $(this).data("target");

  if (window.location.pathname !== '/' && !window.location.pathname.endsWith('/index.html')) {
    
    window.location.href = rawTarget;
    return;
  }


  let target = rawTarget.replace(/^\//, ""); 
  let $targetEl = $(target);

  if ($targetEl.length === 0) return; 

  let offset = $targetEl.offset().top;

  $("#burger-btn, #close-btn").toggleClass("icon-active");
  $(".mobile_menu").fadeOut();
  $("body").css("overflow", "auto");

  $("html, body").animate({ scrollTop: offset }, 600);
});



  $(".section.animate-content").each(function () {
    const section = $(this);
    const title = section.find(".block_title");
    const coachingImages = section.find(".coaching_images");
    const leftImg = coachingImages.find(".left-img");
    const rightImg = coachingImages.find(".right-img");
    const newsletterSection = section[0].id == "book" ? section : null;
    const consultingSection = section[0].id == "consulting" ? section : null;
    const firstDesc = section.find(".block-description").first();
    const lastDesc = section.find(".block-description").last();
    const listTitle = section.find(".list_title");
    const listItems = section.find(".text_list li");

    let startTrigger;

    if (isDesktop) {
      startTrigger = "top 55%";
    } else {
      if (newsletterSection) {
        startTrigger = "top 50%";
      } else if (consultingSection) {
        startTrigger = "top 20%";
      } else {
        startTrigger = "bottom 115%";
      }
    }

    if (title.length) {
      const originalHTML = title.html();
      const lines = [];

      const words = originalHTML.split(" ");
      title.html("");

      words.forEach((word) => {
        const span = $(`<span class="word">${word} </span>`);
        title.append(span);
      });

      const wordEls = title.find(".word").toArray();
      let currentTop = null;
      let currentLine = [];

      wordEls.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (currentTop === null || Math.abs(top - currentTop) < 2) {
          currentLine.push(el);
          currentTop = top;
        } else {
          lines.push(currentLine);
          currentLine = [el];
          currentTop = top;
        }
      });
      if (currentLine.length) lines.push(currentLine);

      lines.forEach((lineWords) => {
        const lineWrapper = $('<div class="line"></div>');
        $(lineWords).wrapAll(lineWrapper);
      });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section[0],

        start: startTrigger,

        toggleActions: "play none none none",

        once: true,
      },
    });

    if (coachingImages.length && leftImg.length && rightImg.length) {
      tl.from(
        leftImg,
        {
          xPercent: -100,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        ">"
      );

      tl.from(
        rightImg,
        {
          xPercent: 100,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "<"
      );
    }

    if (title.length) {
      tl.from(title.find(".line"), {
        y: 60,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.2,
      });
    }

    if (firstDesc.length) {
      tl.from(
        firstDesc,
        {
          y: 300,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.2"
      );
    }

    if (listTitle.length) {
      tl.from(
        listTitle,
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      );
    }

    if (listItems.length) {
      tl.from(
        listItems,
        {
          y: 40,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.2,
        },
        "-=0.5"
      );
    }

    if (lastDesc.length && !firstDesc.is(lastDesc)) {
      tl.from(
        lastDesc,
        {
          y: 160,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.2"
      );
    }

    const button = section.find(".link-btn");
    if (button.length) {
      gsap.set(button, {
        opacity: 0,
        y: 20,
      });

      tl.to(
        button,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      );
    }
  });

  $(".section.testimonials").each(function () {
    const section = $(this);
    const testimonials = section.find(".testimonials-wrapper p");
    const startTestimonials = isDesktop ? "bottom 95%" : "top -10%";

    if (testimonials.length) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: testimonials[0],
          start: startTestimonials,

          toggleActions: "play none none none",

          once: true,
        },
      });

      tl.from(testimonials, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.3,
      });
    }
  });

  $(".section.consultations").each(function () {
    const section = $(this);
    const leftImg = section.find(".left-img");
    const rightImg = section.find(".right-img");
    const heading = section.find(".text_content h2");
    const paragraph = section.find(".text_content p");
    const button = section.find(".link-btn");
    const consultationTrigger = isDesktop ? "bottom 135%" : "top -80%";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section[0],

        start: consultationTrigger,
        toggleActions: "play none none none",
        once: true,
      },
    });

    tl.from(
      leftImg,
      {
        xPercent: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      },
      ">"
    );

    tl.from(
      rightImg,
      {
        xPercent: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      },
      "<"
    );

    if (heading.length) {
      tl.from(heading, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }

    if (paragraph.length) {
      tl.from(
        paragraph,
        {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.6"
      );
    }

    if (button.length) {
      gsap.set(button, {
        opacity: 0,
        y: 40,
      });

      tl.to(
        button,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5"
      );
    }
  });

  $(".section.quote").each(function () {
    const section = $(this);
    const title = section.find("h2");
    const description = section.find(".quote_text");
    const lines = description.find(".line");
    const quoteTrigger = isDesktop ? "bottom 70%" : "top -45%";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: description[0],
        start: quoteTrigger,
        toggleActions: "play none none none",
        once: true,
      },
    });

    if (title.length) {
      tl.from(title, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }

    if (lines.length) {
      lines.each(function (index, el) {
        tl.from(
          el,
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            delay: 0.1,
            ease: "power3.out",
          },
          "-=0.4" + index * 0.2
        );
      });
    }
  });
});

$(window).on("load", function () {
  ScrollTrigger.refresh();
  //calls functions
});

$(window).on("resize", function () {
  //calls functions
});

$(window).load(function () {
  //calls functions
});

$(window).scroll(function () {
  //calls functions
});

//functions
