// Shortcut Cards
import { createWidget, widget, align, text_style, getAppWidgetSize} from '@zos/ui'
import {get_hijri_from_persian,jalaaliDayEvents} from '../page/date_events_handlers'
import {hijri_offset,font_path} from '../page/calendar_plotter'
import { ARABIC_MONTH_NAMES} from '../page/hijri-util-date.js';
import {persian_conv,gregorian_to_jalali,
  conv_year2per,get_persian_day,get_persian_month,get_geo_month,
  num_days_in_month,positive_mod} from '../page/date_conversion_functions.js'
import { jalaaliMonthLength, toGregorian } from '../page/jalali-util-date.js';
import { log as Logger, px } from "@zos/utils";

const text_hight = 70;
const text_width =  370; // getAppWidgetSize().w; //
const line_spacing = text_hight * 1.5;
const screen_center_v = Math.floor(466/2)-text_hight*2-20;
const screen_center_h = Math.floor((466 - text_width)/2);
// var group = createWidget(widget.GROUP, Param);
var day_events_info = null;
var day_geo_info = null;
var day_hij_info  = null;
var day_per_info = null;

AppWidget({ // Shortcut Cards
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
      event_color = 0xffffff;
    Events_of_day = Events_of_month;
    // day_per_info = createWidget(widget.TEXT, {
    //   x: px(screen_center_h),
    //   y: px(screen_center_v - line_spacing/2),
    //   w: text_width,
    //   h: text_hight,
    //   color: event_color,
    //   text_size: 35,
    //   align_h: align.CENTER_H,
    //   align_v: align.CENTER_V,
    //   text: ''.concat(day_of_week_persian_txt,
    //   ' ', persian_conv[`${date_in_p[2]}`],' ',month_txt,
    //   ' ',conv_year2per(date_in_p[0])),
    //   // Font: font_path,
    // })
    // day_hij_info = createWidget(widget.TEXT, {
    //   x: px(screen_center_h),
    //   y: px(screen_center_v ),
    //   w: text_width,
    //   h: text_hight,
    //   color: 0xffffff,
    //   text_size: 30,
    //   align_h: align.CENTER_H,
    //   align_v: align.CENTER_V,
    //   text: ''.concat(persian_conv[`${hijri_day_in_per_month}`],' ',ARABIC_MONTH_NAMES[hijri_month_in_per_month],
    //   ' ',conv_year2per(hijri_year_in_per_month)), //today.toString(), //
    //   // Font: font_path,
    // })
    
    // day_geo_info = createWidget(widget.TEXT, {
    //   x: px(screen_center_h),
    //   y: px(screen_center_v + line_spacing/2),
    //   w: text_width,
    //   h: text_hight,
    //   color: event_color,
    //   text_size: 30,
    //   align_h: align.CENTER_H,
    //   align_v: align.CENTER_V,
    //   text: ''.concat(persian_conv[`${date_in_g[2]}`],' ',month_txt_g,
    //   ' ',conv_year2per(date_in_g[0])),
    //   // Font: font_path,
    // })

    // day_events_info = createWidget(widget.TEXT, {
    //   x: px(screen_center_h),
    //   y: px(screen_center_v + line_spacing),
    //   w: text_width-40,
    //   h: text_hight*4,
    //   color: 0xffffff,
    //   text_size: 25,
    //   align_h: align.CENTER_H,
    //   align_v: align.CENTER_V,
    //   text: Events_of_day,
    //   wrapped: text_width-40
    //   // Font: font_path,
    // })
    // //
    TEXT1 = ''.concat(day_of_week_persian_txt,
      ' ', persian_conv[`${date_in_p[2]}`],' ',month_txt,
      ' ',conv_year2per(date_in_p[0]));
    TEXT2 = ''.concat(persian_conv[`${hijri_day_in_per_month}`],' ',ARABIC_MONTH_NAMES[hijri_month_in_per_month],
    ' ',conv_year2per(hijri_year_in_per_month));
    TEXT3 = ''.concat(persian_conv[`${date_in_g[2]}`],' ',month_txt_g,
    ' ',conv_year2per(date_in_g[0]));
    TEXT4 = Events_of_day;
    day_events_info, day_geo_info, day_hij_info, day_per_info = 
      draw_widgets(TEXT1,TEXT2,TEXT3,TEXT4,event_color);
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
    deleteWidget(day_geo_info);
    deleteWidget(day_hij_info);
    deleteWidget(day_per_info);
    // group = createWidget(widget.GROUP, Param);
    this.build();
  }
})

function draw_widgets(TEXT1,TEXT2,TEXT3,TEXT4,event_color){
  size1 = Math.floor(text_width/TEXT1.length*2.1);
  day_per_info = createWidget(widget.TEXT, {
    x: px(screen_center_h),
    y: px(screen_center_v - line_spacing/2),
    w: text_width,
    h: text_hight,
    color: event_color,
    text_size: size1,
    align_h: align.CENTER_H,
    align_v: align.TOP,
    text: TEXT1, //''.concat(day_of_week_persian_txt,
    // ' ', persian_conv[`${date_in_p[2]}`],' ',month_txt,
    // ' ',conv_year2per(date_in_p[0])),
    // Font: font_path,
  })
  day_hij_info = createWidget(widget.TEXT, {
    x: px(screen_center_h),
    y: px(screen_center_v ),
    w: text_width,
    h: text_hight,
    color: 0xffffff,
    text_size: Math.floor(size1*.9),
    align_h: align.CENTER_H,
    align_v: align.TOP,
    text: TEXT2, //''.concat(persian_conv[`${hijri_day_in_per_month}`],' ',ARABIC_MONTH_NAMES[hijri_month_in_per_month],
    // ' ',conv_year2per(hijri_year_in_per_month)), //today.toString(), //
    // Font: font_path,
  })
  
  day_geo_info = createWidget(widget.TEXT, {
    x: px(screen_center_h),
    y: px(screen_center_v + line_spacing/2),
    w: text_width,
    h: text_hight,
    color: event_color,
    text_size: Math.floor(size1*.8),
    align_h: align.CENTER_H,
    align_v: align.TOP,
    text: TEXT3, //''.concat(persian_conv[`${date_in_g[2]}`],' ',month_txt_g,
    // ' ',conv_year2per(date_in_g[0])),
    // Font: font_path,
  })

  day_events_info = createWidget(widget.TEXT, {
    x: px(screen_center_h),
    y: px(screen_center_v + line_spacing),
    w: text_width-40,
    h: text_hight*2,
    color: 0xffffff,
    text_size: Math.floor(size1*.7),
    align_h: align.CENTER_H,
    align_v: align.TOP,
    text: TEXT4, //Events_of_day,
    text_style: text_style.WRAP
    // Font: font_path,
  })
  return day_events_info, day_geo_info, day_hij_info, day_per_info
}
