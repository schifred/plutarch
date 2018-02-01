import facebookImg from 'image/header/facebook.png';
import twitterImg from 'image/header/twitter.png';
import instagramImg from 'image/header/instagram.png';
import bannerImg from 'image/pages/index/banner.png';
import logoImg from 'image/pages/index/logo.png';
import IconImg from 'image/pages/index/Icon.png';
import Icon1Img from 'image/pages/index/Icon1.png';
import Icon2Img from 'image/pages/index/Icon2.png';
import Icon3Img from 'image/pages/index/Icon3.png';
import Icon4Img from 'image/pages/index/Icon4.png';

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
  key: "facebook", link: facebookImg
},{
  key: "twitter", link: twitterImg
},{
  key: "instagram", link: instagramImg
}];

export const BannerConfig = {
  imgUrls: [ bannerImg ],
  logoUrl: logoImg,
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
  mainImgUrl: IconImg,
  mainTitle: "Your Next Move",
  subTitle: "Helping talented students unlock \n potential.Help us help them thrive.",
  columns: [{
    icon: Icon1Img,
    mainTitle: "EXPERIENCE",
    subTitle: "72% of the students \n attended on scholarship"
  },{
    icon: Icon2Img,
    mainTitle: "OUR FUTURE",
    subTitle: "20% of its student body is \n currently under scholarship"
  },{
    icon: Icon3Img,
    mainTitle: "ACADEMIC TALENTS",
    subTitle: "More than 1000 scholarships \n have been awarded"
  },{
    icon: Icon4Img,
    mainTitle: "BRILLIANT MINDS",
    subTitle: "Anatolia College has always \n relied on donations"
  }]
};
