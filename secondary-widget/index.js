// index.js  Widget
import { createWidget, widget, align, text_style ,deleteWidget,prop} from '@zos/ui'
import {get_hijri_from_persian,jalaaliDayEvents} from '../page/date_events_handlers'
import {hijri_offset,font_path} from '../page/calendar_plotter'
import { ARABIC_MONTH_NAMES} from '../page/hijri-util-date.js';
import {persian_conv,gregorian_to_jalali,
  conv_year2per,get_persian_day,get_persian_month,get_geo_month,
  num_days_in_month,positive_mod} from '../page/date_conversion_functions.js'
import { jalaaliMonthLength, toGregorian } from '../page/jalali-util-date.js';
import { log as Logger, px } from "@zos/utils";

var text_hight = 55;
var text_width = 370;
const line_spacing = text_hight*3;
// var screen_center_v = Math.floor(466/2)-text_hight*2-20;
const screen_center_v = Math.floor((466)/2)-100;
const screen_center_h = Math.floor((466 - text_width)/2);
// var day_events_info = null;
// var month_top_info = null;
// var month_top_info2 = null;
var widgets_lst = [];

SecondaryWidget({ // Widgetstate: 
  // state: {
  //   widgets_lst : []
  // },
  build() {
    let today = new Date(); // .toLocaleDateString('fa-IR');
    today.setUTCHours(today.getUTCHours() - 4, today.getUTCMinutes() -30);
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
  if (holidays_of_month || day_of_week_persian == 7)
    event_color = 0xff0000;
  else
    event_color = 0x00ffff;
  Events_of_day = Events_of_month;
  // month_top_info = createWidget(widget.TEXT, {
  //   x: px(screen_center_h),
  //   y: px(screen_center_v - line_spacing/2),
  //   w: text_width,
  //   h: text_hight,
  //   color: 0xffffff,
  //   text_size: 40,
  //   align_h: align.CENTER_H,
  //   align_v: align.CENTER_V,
  //   text: ''.concat(day_of_week_persian_txt),
  //   // Font: font_path,
  // })
  // month_top_info2 = createWidget(widget.TEXT, {
  //   x: px(screen_center_h),
  //   y: px(screen_center_v ),
  //   w: text_width,
  //   h: text_hight,
  //   color: event_color,
  //   text_size: 35,
  //   align_h: align.CENTER_H,
  //   align_v: align.CENTER_V,
  //   text: ''.concat(persian_conv[`${date_in_p[2]}`],' ',month_txt,
  //   ' ',conv_year2per(date_in_p[0])),
  //   // Font: font_path,
  // })
  
  // day_events_info = createWidget(widget.TEXT, {
  //   x: px(screen_center_h),
  //   y: px(screen_center_v + line_spacing/2),
  //   w: text_width-40,
  //   h: text_hight*4,
  //   color: 0xffffff,
  //   text_size: 30,
  //   align_h: align.CENTER_H,
  //   align_v: align.CENTER_V,
  //   text: Events_of_day,
  //   wrapped: text_width-40
  //   // Font: font_path,
  // })
  TEXT1 = ''.concat(day_of_week_persian_txt);
  TEXT2 = ''.concat(persian_conv[`${date_in_p[2]}`],' ',month_txt,
  ' ',conv_year2per(date_in_p[0]));
  TEXT3 = Events_of_day;
  // if (TEXT3.length < 2)
  //   height_2_set = line_spacing * 1.5;
  // else
  //   height_2_set = line_spacing* 2;

  // setAppWidgetSize({ h: height_2_set});
  draw_widgets(TEXT1,TEXT2,TEXT3,event_color,widgets_lst);
  // day_events_info,month_top_info,month_top_info2 = draw_widgets(TEXT1,TEXT2,TEXT3,widgets_lst);
  // this.state.widgets_lst.push(day_events_info);
  // this.state.widgets_lst.push(month_top_info);
  // this.state.widgets_lst.push(month_top_info2);
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
  // try {
  //   deleteWidget(this.state.widgets_lst[2]);
  //   deleteWidget(this.state.widgets_lst[1]);
  //   deleteWidget(this.state.widgets_lst[0]);
  // } catch (error) {
    
  // }
  // deleteWidget(month_top_info2);
  // group = createWidget(widget.GROUP, Param);
  this.build();
}
})

function draw_widgets(TEXT1,TEXT2,TEXT3,event_color,widgets_lst){
  size1 = Math.min(Math.floor(text_width/TEXT2.length*2.1),text_hight);
  if (widgets_lst.length > 1){
    // button.setProperty(prop.VISIBLE, false)
    widgets_lst[0].setProperty(prop.MORE, {
      text : TEXT1,
      color: event_color,
      text_size: Math.floor(size1*.8),
    });
    widgets_lst[1].setProperty(prop.MORE, {
      text : TEXT2,
      color: event_color,
      text_size: size1,
    });
    widgets_lst[2].setProperty(prop.MORE, {
      text : TEXT3,
      // color: event_color,
      text_size: Math.floor(size1*.6),
    });
    
  }
  else{
    month_top_info = createWidget(widget.TEXT, {
    x: px(screen_center_h),
    y: px(screen_center_v - line_spacing/2),
    w: text_width,
    h: Math.floor(line_spacing/2),
    color: event_color,
    text_size: Math.floor(size1*.8),//Math.floor(text_width/length(TEXT1)),
    align_h: align.CENTER_H,
    align_v: align.TOP,
    text: TEXT1, // ''.concat(day_of_week_persian_txt),
    // Font: font_path,
  })
  month_top_info2 = createWidget(widget.TEXT, {
    x: px(screen_center_h),
    y: px(screen_center_v ),
    w: text_width,
    h: Math.floor(line_spacing/2),
    color: event_color,
    text_size: size1,//Math.floor(size1*.8),
    align_h: align.CENTER_H,
    align_v: align.TOP,
    text: TEXT2,// ''.concat(persian_conv[`${date_in_p[2]}`],' ',month_txt,
    // ' ',conv_year2per(date_in_p[0])),
    // Font: font_path,
  })
  day_events_info = createWidget(widget.TEXT, {
    x: px(screen_center_h),
    y: px(screen_center_v+ line_spacing/2),
    w: text_width,
    h: line_spacing,
    color: 0xffffff,
    text_size: Math.floor(size1*.6),
    align_h: align.CENTER_H,
    align_v: align.TOP,
    text: TEXT3, // Events_of_day,
    text_style: text_style.WRAP
    // Font: font_path,
  })
  widgets_lst.push(month_top_info); // 0
  widgets_lst.push(month_top_info2); // 1 
  widgets_lst.push(day_events_info); // 2
  // widgets_lst.push(day_geo_info); // 3
  // widgets_lst.push(day_events_info); // 4
  }
  // return [day_events_info,month_top_info,month_top_info2]
}