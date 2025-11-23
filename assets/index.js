// 공통: 재생/정지 버튼 초기화
function resetPlayPauseButtons() {
  $(".btn-pause").show();
  $(".btn-play").hide();
}

// 탭별 마지막 인덱스 저장
const lastIndex = {};

// 스와이퍼 생성
function makeSwiper(selector, initialSlide = 0) {
  return new Swiper(selector, {
    loop: true,
    initialSlide,
    autoplay: { delay: 3000, disableOnInteraction: false },
    pagination: { el: ".swiper-pagination", type: "fraction" },
    navigation: { prevEl: ".swiper-btn-prev", nextEl: ".swiper-btn-next" },
  });
}

// 최초 인스턴스
let sw = makeSwiper("#tab1 .main-swiper");

// 탭 전환
$(".tab-nav .nav").on("click", function (e) {
  e.preventDefault();
  const $btn = $(this);
  if ($btn.hasClass("on")) return;

  // 현재 탭 인덱스 저장
  const $prev = $(".tab-nav .nav.on");
  const prevId = $prev.data("tab");
  if (sw) {
    lastIndex[prevId] = sw.realIndex || 0;
    // 인스턴스만 제거, DOM 유지 → 페이지네이션 그대로
    sw.destroy(true, false);
  }

  // 탭 표시 전환
  $btn.addClass("on").siblings().removeClass("on");
  const tabId = $btn.data("tab");
  $(tabId).addClass("on").siblings().removeClass("on");

  // 저장된 위치로 재생성
  sw = makeSwiper(`${tabId} .main-swiper`, lastIndex[tabId] ?? 0);

  // 버튼 상태 초기화
  resetPlayPauseButtons();
});

// 재생/정지
$(".btn-pause").on("click", function () {
  if (!sw) return;
  sw.autoplay.stop();
  $(this).hide();
  $(".btn-play").show();
});

$(".btn-play").on("click", function () {
  if (!sw) return;
  sw.autoplay.start();
  $(this).hide();
  $(".btn-pause").show();
});

// 전체보기
$(".btn-show-all").on("click", function (e) {
  e.preventDefault();
  const activeTabId = $(".tab-con .con.on").attr("id");
  $(`.show-all-wrap[data-tab="${activeTabId}"]`).addClass("on");
});

$(".show-all-wrap .close").on("click", function (e) {
  e.preventDefault();
  $(this).closest(".show-all-wrap").removeClass("on");
});

$(window).on("scroll", function () {
  if ($(window).scrollTop() > 100) {
    $(".btn-top").addClass("show");
  } else {
    $(".btn-top").removeClass("show");
  }
});
$(".btn-top").click(function (e) {
  e.preventDefault();

  window.scrollTo({ top: 0, behavior: "smooth" });
});

$(".sc-related-menu .menu-item .title").click(function (e) {
  e.preventDefault();

  $(".sc-related-menu .menu-item .title")
    .not($(this))
    .removeClass("show")
    .siblings(".inner")
    .stop()
    .slideUp();

  $(this).toggleClass("show").siblings(".inner").stop().slideToggle();
});

$(document).click(function (e) {
  // e.target = 클릭한 태그
  // 클릭한 요소(e.target)이 header에 포함되어 있는지 확인하고
  // header 에 포함되지 않은 걸 클릭했을때
  if ($(".sc-related-menu .menu-list").has(e.target).length == 0) {
    // 포함되지 않았으면 .nav에서 on 제거
    $(".sc-related-menu .inner").removeClass("show").stop().slideUp();
  }
});

const bannerSwiper = new Swiper(".banner-swiper", {
  loop: true,
  slidesPerView: 3,
  spaceBetween: 43,
  autoplay: { delay: 3000, disableOnInteraction: false },
  pagination: {
    el: ".sc-banner-slide .count-wrap",
    type: "fraction",
  },
  navigation: {
    prevEl: ".sc-banner-slide .prev",
    nextEl: ".sc-banner-slide .next",
  },
});

// 정지
$(".sc-banner-slide .stop").on("click", function () {
  bannerSwiper.autoplay.stop();
  $(this).hide();
  $(".sc-banner-slide .play").show();
});

// 재생
$(".sc-banner-slide .play").on("click", function () {
  bannerSwiper.autoplay.start();
  $(this).hide();
  $(".sc-banner-slide .stop").show();
});
