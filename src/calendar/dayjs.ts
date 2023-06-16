import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData"
import IsBetween from "dayjs/plugin/isBetween"
import LocalizedFormat from "dayjs/plugin/localizedFormat"
import "dayjs/locale/ru"

dayjs.extend(localeData)
dayjs.extend(IsBetween)
dayjs.extend(LocalizedFormat)
dayjs.locale('ru')
export {dayjs}
