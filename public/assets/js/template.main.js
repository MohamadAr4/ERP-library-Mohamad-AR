/* global bootstrap */

(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
  }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener));
    } else {
      select(el, all).addEventListener(type, listener);
  }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
  };

  /**
   * Sidebar toggle
   */
  if (select('.toggle-sidebar-btn')) {
    on('click', '.toggle-sidebar-btn', function (e) {
      e.preventDefault();
      select('body').classList.toggle('toggle-sidebar');
      select('.sidebar-backdrop').classList.toggle('d-none');
    });
    on('click', '.sidebar-backdrop', function (e) {
      e.preventDefault();
      select('body').classList.toggle('toggle-sidebar');
      select('.sidebar-backdrop').classList.toggle('d-none');
    });
  }

  /**
   * Search bar toggle
   */
  if (select('.search-bar-toggle')) {
    on('click', '.search-bar-toggle', function (e) {
      e.preventDefault();
      select('.search-bar').classList.toggle('search-bar-show');
    });
  }

  /**
   * toggle direction
   */
  let Labels = [];
  let direction = {
    dir: ['ltr', 'rtl'],
    css: ['assets/css/style-ltr.css', 'assets/css/style-rtl.css'],
    bootstrap: ['assets/plugins/bootstrap/css/bootstrap.ltr.min.css', 'assets/plugins/bootstrap/css/bootstrap.rtl.min.css'],
    lang: ['en', 'ar'],
    nDir: PhSettings.display.nDir
  };
  if (select('.dir-toggle', true)) {
    on('click', '.dir-toggle', function (e) {
      e.preventDefault();
      direction.nDir = 1 - direction.nDir;
      let vLanguage = direction.lang[direction.nDir];
      select("#dir-ltr").classList.add('d-none');
      select("#dir-rtl").classList.add('d-none');
      select("#dir-" + direction.dir[direction.nDir]).classList.remove('d-none');
      select("#app-style").setAttribute("href", direction.css[direction.nDir]);
      select("#bootstrap").setAttribute("href", direction.bootstrap[direction.nDir]);
      document.body.setAttribute('lang', direction.lang[direction.nDir]);
      document.body.setAttribute('dir', direction.dir[direction.nDir]);
      $.ajax({
        type: PhSettings.changeLanguage.Method,
        url: PhSettings.changeLanguage.URL,
        data: {
          language: vLanguage
        },
        success: function (response) {
          location.reload();
        }
      });
    }, true);
  }

  /**
   * toggle color mode
   */
  let theme = {
    mode: ['dark', 'light'],
    css: ['assets/css/style-dark.css', 'assets/css/style-light.css'],
    nMode: PhSettings.display.nMode
  };
  const isDarkMode = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const switchToMode = (nMode) => {
    theme.nMode = nMode;
    select("#app-mode").setAttribute("href", theme.css[theme.nMode]);
    document.body.setAttribute('data-bs-theme', theme.mode[theme.nMode]);
  };
  const switchToDarkMode = () => {
    switchToMode(0);
  };
  const switchToLightMode = () => {
    switchToMode(1);
  };
  const toggleMode = () => {
    theme.nMode = 1 - theme.nMode;
    select("#app-mode").setAttribute("href", theme.css[theme.nMode]);
    document.body.setAttribute('data-bs-theme', theme.mode[theme.nMode]);
    $.ajax({
      type: PhSettings.changeMode.Method,
      url: PhSettings.changeMode.URL,
      data: {
        mode: theme.mode[theme.nMode]
      },
      success: function (response) {
        //location.reload();
      }
    });

  };
  if (select('.theme-toggle', true)) {
    on('click', '.theme-toggle', function (e) {
      e.preventDefault();
      toggleMode();
    }, true);
  }

  /**
   * toggle Setting
   */
  if (select('#setting-bar', true)) {
    on('click', '#setting-bar', function (e) {
      e.preventDefault();
      const bsOffcanvas = new bootstrap.Offcanvas(select('#setting-bar').getAttribute('target'));
      bsOffcanvas.show();
    }, true);
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar', true);
  const navbarlinksActive = (e) => {
    e.preventDefault();
    let position = window.scrollY + 200;
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash)
        return;
      let section = select(navbarlink.hash);
      if (!section)
        return;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  };
  //window.addEventListener('load', navbarlinksActive);
  //onscroll(document, navbarlinksActive);

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header');
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled');
      } else {
        selectHeader.classList.remove('header-scrolled');
      }
    };
    window.addEventListener('load', headerScrolled);
    onscroll(document, headerScrolled);
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top');
  if (backtotop) {
    on('click', '.back-to-top', function (e) {
      e.preventDefault();
      window.scrollTo(0, 0);
    }, true);
    const toggleBacktotop = (e) => {
      e.preventDefault();
      if (window.scrollY > 100) {
        backtotop.classList.add('active');
      } else {
        backtotop.classList.remove('active');
      }
    };
    window.addEventListener('load', toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  if (PhSettings.display.nMode === undefined) {
    if (isDarkMode()) {
      switchToDarkMode();
    } else {
      switchToLightMode();
    }
  } else {
    switchToMode(PhSettings.display.nMode);
  }

})();
