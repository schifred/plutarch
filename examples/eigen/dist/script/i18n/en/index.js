"use strict";

export const Languages = [{
  key: "ru", title: "RU"
},{
  key: "en", title: "EN"
}];

export const TopMenus = [{
  key: "projects", title: "PROJECTS",
  children: []
},{
  key: "aboutUs", title: "ABOUT US",
  children: []
},{
  key: "stories", title: "STORIES",
  children: []
},{
  key: "contract", title: "CONTRACT",
  children: []
}];

export const SocialIcons = [{
  key: "facebook", link: "image/header/facebook.png"
},{
  key: "twitter", link: "image/header/twitter.png"
},{
  key: "instagram", link: "image/header/instagram.png"
}];

export const BannerConfig = {
  imgUrls: [ "image/pages/index/banner.png" ],
  logoUrl: "image/pages/index/logo.png",
  mainTitle: "We Build Object\nAnd Spaces",
  subTitle: "Support bright students today for \n a butter tomorrow"
};

export const IndexFormConfig = {
  model: {
    email: { placeholder:"E-mail" },
    investment: { placeholder:"Inverstment" }
  },
  button: {
    title: "LET'S START"
  }
};

export const SecondaryScreenConfig = {
  mainImgUrl: "image/pages/index/icon.png",
  mainTitle: "Your Next Move",
  subTitle: "Helping talented students unlock \n potential.Help us help them thrive.",
  columns: [{
    icon: "image/pages/index/Icon1.png",
    mainTitle: "EXPERIENCE",
    subTitle: "72% of the students \n attended on scholarship"
  },{
    icon: "image/pages/index/Icon2.png",
    mainTitle: "OUR FUTURE",
    subTitle: "20% of its student body is \n currently under scholarship"
  },{
    icon: "image/pages/index/Icon3.png",
    mainTitle: "ACADEMIC TALENTS",
    subTitle: "More than 1000 scholarships \n have been awarded"
  },{
    icon: "image/pages/index/Icon4.png",
    mainTitle: "BRILLIANT MINDS",
    subTitle: "Anatolia College has always \n relied on donations"
  }]
};
