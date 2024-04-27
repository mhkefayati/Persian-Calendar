// index.js  Widget
import { createWidget, widget, align, text_style } from '@zos/ui'
import {get_hijri_from_persian,jalaaliDayEvents} from '../page/date_events_handlers'
import {hijri_offset,font_path} from '../page/calendar_plotter'
import { ARABIC_MONTH_NAMES} from '../page/hijri-util-date.js';
import {persian_conv,gregorian_to_jalali,
  conv_year2per,get_persian_day,get_persian_month,get_geo_month,
  num_days_in_month,positive_mod} from '../page/date_conversion_functions.js'
import { jalaaliMonthLength, toGregorian } from '../page/jalali-util-date.js';
import { log as Logger, px } from "@zos/utils";

const text_hight = 70;
const text_width = 400;
const line_spacing = text_hight;
const screen_center_v = Math.floor(466/2)-text_hight*2-20;
const screen_center_h = Math.floor((466 - text_width)/2);

SecondaryWidget({ // Widget
  build() {
    let today = new Date(); // .toLocaleDateString('fa-IR');
    today.setUTCHours(today.getUTCHours() - 3.5);
  var date_in_g = [today.getFullYear(), today.getMonth()+1, today.getDate()];
  day_of_week = today.getDay();
  
  date_in_p = gregorian_to_jalali(date_in_g[0], date_in_g[1], date_in_g[2]); 
  if (day_of_week < 6)
    day_of_week_persian = day_of_week+2;
  else
    day_of_week_persian = day_of_week-5;

  day_of_week_persian_txt = get_persian_day(day_of_week_persian);
  month_txt = get_persian_month(date_in_p[1]);
  month_txt_g = get_geo_month(date_in_g[1]);
  
//   d_per_with_off = date_in_p[2]+hijri_offset;
//   y_per_with_off = date_in_p[0];
//   m_per_with_off =  date_in_p[1];
//   if (d_per_with_off > jalaaliMonthLength(y_per_with_off,m_per_with_off)){
//     d_per_with_off = d_per_with_off - jalaaliMonthLength(y_per_with_off,m_per_with_off);
//     m_per_with_off = m_per_with_off +1;
//     if (m_per_with_off > 12)
//       y_per_with_off = y_per_with_off + 1;
//   }
//   else if (d_per_with_off < 1){
//       m_per_with_off = m_per_with_off -1;
//       if (m_per_with_off < 1){
//           m_per_with_off = 12;
//           y_per_with_off = y_per_with_off - 1;
//       }
//     d_per_with_off = jalaaliMonthLength(y_per_with_off,m_per_with_off)+d_per_with_off;
// }
//   year_h, month_h, day_h = get_hijri_from_persian(y_per_with_off,m_per_with_off,d_per_with_off);
  holidays_of_month, Events_of_month, 
  hijri_year_in_per_month, hijri_month_in_per_month, hijri_day_in_per_month
   = jalaaliDayEvents(date_in_p[0], date_in_p[1], date_in_p[2],hijri_offset);
  
  // month_top_info_g = createWidget(widget.TEXT, {
  //   x: px(screen_center_h),
  //   y: px(screen_center_v + line_spacing/2), //px(screen_center_v),
  //   w: text_width,
  //   h: text_hight,
  //   color: 0xffffff,
  //   text_size: 35,
  //   align_h: align.CENTER_H,
  //   align_v: align.CENTER_V,
  //   text: ''.concat('',
  //   ' ', persian_conv[`${date_in_g[2]}`],' ',month_txt_g,
  //   ' ',conv_year2per(date_in_g[0])),
  //   // Font: font_path,
  // })
  if (holidays_of_month || day_of_week_persian == 6)
    event_color = 0xff0000;
  else
    event_color = 0x00ffff;
  Events_of_day = Events_of_month;
  month_top_info = createWidget(widget.TEXT, {
    x: px(screen_center_h),
    y: px(screen_center_v - line_spacing/2),
    w: text_width,
    h: text_hight,
    color: 0xffffff,
    text_size: 40,
    align_h: align.CENTER_H,
    align_v: align.CENTER_V,
    text: ''.concat(day_of_week_persian_txt),
    // Font: font_path,
  })
  month_top_info2 = createWidget(widget.TEXT, {
    x: px(screen_center_h),
    y: px(screen_center_v ),
    w: text_width,
    h: text_hight,
    color: event_color,
    text_size: 35,
    align_h: align.CENTER_H,
    align_v: align.CENTER_V,
    text: ''.concat(persian_conv[`${date_in_p[2]}`],' ',month_txt,
    ' ',conv_year2per(date_in_p[0])),
    // Font: font_path,
  })
  
  day_events_info = createWidget(widget.TEXT, {
    x: px(screen_center_h),
    y: px(screen_center_v + line_spacing/2),
    w: text_width-40,
    h: text_hight*4,
    color: 0xffffff,
    text_size: 30,
    align_h: align.CENTER_H,
    align_v: align.CENTER_V,
    text: Events_of_day,
    wrapped: text_width-40
    // Font: font_path,
  })
  //

  // date_info_sel = createWidget(widget.TEXT, {
  //   x: px(screen_center_h),
  //   y: px(screen_center_v + line_spacing),
  //   w: text_width,
  //   h: text_hight,
  //   color: 0xffffff,
  //   text_size: 35,
  //   align_h: align.CENTER_H,
  //   align_v: align.CENTER_V, // hijri_year_in_per_month, hijri_month_in_per_month, hijri_date_in_per_month
  //   text:  ''.concat(persian_conv[`${day_h}`],' ',ARABIC_MONTH_NAMES[month_h],
  //   ' ',conv_year2per(year_h)), //today.toString(), //
  //   Font: font_path,
  // })
  // const text = createWidget(widget.TEXT, {
  //   x: 96,
  //   y: 120,
  //   w: 288,
  //   h: 46,
  //   color: 0xffffff,
  //   text_size: 36,
  //   align_h: align.CENTER_H,
  //   align_v: align.CENTER_V,
  //   text_style: text_style.NONE,
  //   text: 'HELLO, not OS'
  // })
},
onResume(){
  // deleteWidget(month_top_info_g);
  deleteWidget(day_events_info);
  deleteWidget(month_top_info);
  deleteWidget(month_top_info2);
  // group = createWidget(widget.GROUP, Param);
  this.build();
}
})