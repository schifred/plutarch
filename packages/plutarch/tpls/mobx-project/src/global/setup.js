import { message } from "antd";
import moment from "moment";
import "moment/locale/zh-cn";
import $i18n from "utils/$i18n";
import zh from "locales/zh";

moment.locale("zh-cn");
message.config({
  duration: 2,
  maxCount: 1
});
$i18n.registerLanguagePack("zh", zh);
$i18n.setLocale("zh");
