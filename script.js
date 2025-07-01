class StickyNavigation {
  constructor() {
    this.currentId = null;
    this.currentTab = null;
    this.tabContainerHeight = 70;

    $('.et-hero-tab').click((event) => {
      this.onTabClick(event, $(event.currentTarget));
    });

    $(window).scroll(() => this.onScroll());
    $(window).resize(() => this.onResize());

    // Activa sección actual si hay hash en la URL
    if (window.location.hash) {
      let target = $(window.location.hash);
      if (target.length) {
        $('html, body').scrollTop(target.offset().top - this.tabContainerHeight + 1);
      }
    }
  }

  onTabClick(event, element) {
    event.preventDefault();
    let target = $(element.attr('href'));
    if (target.length) {
      let scrollTop = target.offset().top - this.tabContainerHeight + 1;
      $('html, body').animate({ scrollTop: scrollTop }, 600);
    }
  }

  onScroll() {
    this.checkTabContainerPosition();
    this.findCurrentTabSelector();
  }

  onResize() {
    if (this.currentId) {
      this.setSliderCss();
    }
  }

  checkTabContainerPosition() {
    let offset = $('.et-hero-tabs').offset().top + $('.et-hero-tabs').height() - this.tabContainerHeight;
    let isFixed = $('.et-hero-tabs-container').hasClass('et-hero-tabs-container--top');

    if ($(window).scrollTop() > offset && !isFixed) {
      $('.et-hero-tabs-container').addClass('et-hero-tabs-container--top');
    } else if ($(window).scrollTop() <= offset && isFixed) {
      $('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top');
    }
  }

  findCurrentTabSelector() {
    let newCurrentId;
    let newCurrentTab;
    let self = this;

    $('.et-hero-tab').each(function () {
      let id = $(this).attr('href');
      let $section = $(id);
      if ($section.length === 0) return;

      let offsetTop = $section.offset().top - self.tabContainerHeight;
      let offsetBottom = offsetTop + $section.height();
      if ($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
        newCurrentId = id;
        newCurrentTab = $(this);
      }
    });

    if (this.currentId !== newCurrentId || this.currentId === null) {
      this.currentId = newCurrentId;
      this.currentTab = newCurrentTab;
      this.setSliderCss();

      $('.et-hero-tab').removeClass('active');
      this.currentTab.addClass('active');
    }
  }

  setSliderCss() {
    let width = 0;
    let left = 0;
    if (this.currentTab) {
      width = this.currentTab.outerWidth();
      left = this.currentTab.offset().left;
    }
    $('.et-hero-tab-slider').css({ width: width, left: left });
  }
}

$(document).ready(() => {
  new StickyNavigation();
});
