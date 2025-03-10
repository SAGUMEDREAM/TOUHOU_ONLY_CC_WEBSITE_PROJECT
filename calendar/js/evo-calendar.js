/*!
 * Evo Calendar - Simple and Modern-looking Event Calendar Plugin
 *
 * Licensed under the MIT License
 *
 * Version: 1.1.3
 * Author: Edlyn Villegas
 * Docs: https://edlynvillegas.github.com/evo-calendar
 * Repo: https://github.com/edlynvillegas/evo-calendar
 * Issues: https://github.com/edlynvillegas/evo-calendar/issues
 *
 */
!function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function(e) {
    "use strict";
    var t = window.EvoCalendar || {};
    (t = function() {
        var t = 0;
        return function(a, n) {
            var i = this;
            if (i.defaults = {
                theme: null,
                format: "mm/dd/yyyy",
                titleFormat: "MM yyyy",
                eventHeaderFormat: "MM d, yyyy",
                firstDayOfWeek: 0,
                language: "zh",
                todayHighlight: !1,
                sidebarDisplayDefault: !0,
                sidebarToggler: !0,
                eventDisplayDefault: !0,
                eventListToggler: !0,
                calendarEvents: null
            },
                i.options = e.extend({}, i.defaults, n),
                i.initials = {
                    default_class: e(a)[0].classList.value,
                    validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
                    dates: {
                        zh: {
                            days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
                            daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                            daysMin: ["日", "一", "二", "三", "四", "五", "六"],
                            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                            noEventForToday: "今天没有事件... 休息一下吧！ :)",
                            noEventForThisDay: "这一天没有事件... 休息一下吧！ :)",
                            previousYearText: "上一年",
                            nextYearText: "下一年",
                            closeSidebarText: "关闭侧边栏",
                            closeEventListText: "关闭事件列表"
                        },
                        en: {
                            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                            daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                            daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                            noEventForToday: "No event for today.. so take a rest! :)",
                            noEventForThisDay: "No event for this day.. so take a rest! :)",
                            previousYearText: "Previous year",
                            nextYearText: "Next year",
                            closeSidebarText: "Close sidebar",
                            closeEventListText: "Close event list"
                        },
                        es: {
                            days: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
                            daysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
                            daysMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
                            months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                            monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
                            noEventForToday: "No hay evento para hoy.. ?así que descanse! :)",
                            noEventForThisDay: "Ningún evento para este día.. ?así que descanse! :)",
                            previousYearText: "A?o anterior",
                            nextYearText: "El próximo a?o",
                            closeSidebarText: "Cerrar la barra lateral",
                            closeEventListText: "Cerrar la lista de eventos"
                        },
                        de: {
                            days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
                            daysShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
                            daysMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
                            months: ["Januar", "Februar", "M?rz", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
                            monthsShort: ["Jan", "Feb", "M?r", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
                            noEventForToday: "Keine Veranstaltung für heute.. also ruhen Sie sich aus! :)",
                            noEventForThisDay: "Keine Veranstaltung für diesen Tag.. also ruhen Sie sich aus! :)",
                            previousYearText: "Vorheriges Jahr",
                            nextYearText: "N?chstes Jahr",
                            closeSidebarText: "Schlie?en Sie die Seitenleiste",
                            closeEventListText: "Schlie?en Sie die Ereignisliste"
                        },
                        pt: {
                            days: ["Domingo", "Segunda-Feira", "Ter?a-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"],
                            daysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
                            daysMin: ["Do", "2a", "3a", "4a", "5a", "6a", "Sa"],
                            months: ["Janeiro", "Fevereiro", "Mar?o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                            monthsShort: ["Jan", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
                            noEventForToday: "Nenhum evento para hoje.. ent?o descanse! :)",
                            noEventForThisDay: "Nenhum evento para este dia.. ent?o descanse! :)",
                            previousYearText: "Ano anterior",
                            nextYearText: "Próximo ano",
                            closeSidebarText: "Feche a barra lateral",
                            closeEventListText: "Feche a lista de eventos"
                        },
                        fr: {
                            days: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
                            daysShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
                            daysMin: ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"],
                            months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Ao?t", "Septembre", "Octobre", "Novembre", "Décembre"],
                            monthsShort: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Ao?t", "Sept", "Oct", "Nov", "Déc"],
                            noEventForToday: "Rien pour aujourd'hui... Belle journée :)",
                            noEventForThisDay: "Rien pour ce jour-ci... Profite de te réposer :)",
                            previousYearText: "Année précédente",
                            nextYearText: "L'année prochaine",
                            closeSidebarText: "Fermez la barre latérale",
                            closeEventListText: "Fermer la liste des événements"
                        },
                        nl: {
                            days: ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"],
                            daysShort: ["Zon", "Maan", "Din", "Woe", "Don", "Vrij", "Zat"],
                            daysMin: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"],
                            months: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"],
                            monthsShort: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
                            noEventForToday: "Geen event voor vandaag.. dus rust even uit! :)",
                            noEventForThisDay: "Geen event voor deze dag.. dus rust even uit! :)",
                            previousYearText: "Vorig jaar",
                            nextYearText: "Volgend jaar",
                            closeSidebarText: "Sluit de zijbalk",
                            closeEventListText: "Sluit de event lijst"
                        }
                    }
                },
                i.initials.weekends = {
                    sun: i.initials.dates[i.options.language].daysShort[0],
                    sat: i.initials.dates[i.options.language].daysShort[6]
                },
            null != i.options.calendarEvents)
                for (var o = 0; o < i.options.calendarEvents.length; o++)
                    i.options.calendarEvents[o].id || console.log('%c Event named: "' + i.options.calendarEvents[o].name + "\" doesn't have a unique ID ", "color:white;font-weight:bold;background-color:#e21d1d;"),
                    i.isValidDate(i.options.calendarEvents[o].date) && (i.options.calendarEvents[o].date = i.formatDate(i.options.calendarEvents[o].date, i.options.format));
            i.startingDay = null,
                i.monthLength = null,
                i.$current = {
                    month: isNaN(this.month) || null == this.month ? (new Date).getMonth() : this.month,
                    year: isNaN(this.year) || null == this.year ? (new Date).getFullYear() : this.year,
                    date: i.formatDate(i.initials.dates[i.defaults.language].months[(new Date).getMonth()] + " " + (new Date).getDate() + " " + (new Date).getFullYear(), i.options.format)
                },
                i.$active = {
                    month: i.$current.month,
                    year: i.$current.year,
                    date: i.$current.date,
                    event_date: i.$current.date,
                    events: []
                },
                i.$label = {
                    days: [],
                    months: i.initials.dates[i.defaults.language].months,
                    days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
                },
                i.$markups = {
                    calendarHTML: "",
                    mainHTML: "",
                    sidebarHTML: "",
                    eventHTML: ""
                },
                i.$elements = {
                    calendarEl: e(a),
                    innerEl: null,
                    sidebarEl: null,
                    eventEl: null,
                    sidebarToggler: null,
                    eventListToggler: null,
                    activeDayEl: null,
                    activeMonthEl: null,
                    activeYearEl: null
                },
                i.$breakpoints = {
                    tablet: 768,
                    mobile: 425
                },
                i.formatDate = e.proxy(i.formatDate, i),
                i.selectDate = e.proxy(i.selectDate, i),
                i.selectMonth = e.proxy(i.selectMonth, i),
                i.selectYear = e.proxy(i.selectYear, i),
                i.selectEvent = e.proxy(i.selectEvent, i),
                i.toggleSidebar = e.proxy(i.toggleSidebar, i),
                i.toggleEventList = e.proxy(i.toggleEventList, i),
                i.instanceUid = t++,
                i.init(!0)
        }
    }()).prototype.init = function(t) {
        var a = this
            , n = e(window).width();
        e(a.$elements.calendarEl).hasClass("calendar-initialized") || (e(a.$elements.calendarEl).addClass("evo-calendar calendar-initialized"),
            n <= a.$breakpoints.tablet ? e(a.$elements.calendarEl).addClass("sidebar-hide event-hide") : (a.options.sidebarDisplayDefault || e(a.$elements.calendarEl).addClass("sidebar-hide"),
            a.options.eventDisplayDefault || e(a.$elements.calendarEl).addClass("event-hide")),
        a.options.theme && a.setTheme(a.options.theme),
            a.buildTheBones())
    }
        ,
        t.prototype.destroy = function() {
            var t = this;
            t.destroyEventListener(),
            t.$elements.calendarEl && (t.$elements.calendarEl.removeClass("calendar-initialized"),
                t.$elements.calendarEl.removeClass("evo-calendar"),
                t.$elements.calendarEl.removeClass("sidebar-hide"),
                t.$elements.calendarEl.removeClass("event-hide")),
                t.$elements.calendarEl.empty(),
                t.$elements.calendarEl.attr("class", t.initials.default_class),
                e(t.$elements.calendarEl).trigger("destroy", [t])
        }
        ,
        t.prototype.limitTitle = function(e, t) {
            var a = [];
            /*if (t = void 0 === t ? 18 : t,
            e.split(" ").join("").length > t) {
                for (var n = e.split(" "), i = 0; i < n.length; i++)
                    n[i].length + a.join("").length <= t && a.push(n[i]);
                return a.join(" ") + "..."
            }*/
            return e
        }
        ,
        t.prototype.stringCheck = function(e) {
            return e.replace(/[^\w]/g, "\\$&")
        }
        ,
        t.prototype.parseFormat = function(e) {
            if ("function" == typeof e.toValue && "function" == typeof e.toDisplay)
                return e;
            var t = e.replace(this.initials.validParts, "\0").split("\0")
                , a = e.match(this.initials.validParts);
            return t && t.length && a && 0 !== a.length || console.log("%c Invalid date format ", "color:white;font-weight:bold;background-color:#e21d1d;"),
                {
                    separators: t,
                    parts: a
                }
        }
        ,
        t.prototype.formatDate = function(t, a, n) {
            var i = this;
            if (!t)
                return "";
            if (n = n || i.defaults.language,
            "string" == typeof a && (a = i.parseFormat(a)),
                a.toDisplay)
                return a.toDisplay(t, a, n);
            var o = new Date(t)
                , r = {
                d: o.getDate(),
                D: i.initials.dates[n].daysShort[o.getDay()],
                DD: i.initials.dates[n].days[o.getDay()],
                m: o.getMonth() + 1,
                M: i.initials.dates[n].monthsShort[o.getMonth()],
                MM: i.initials.dates[n].months[o.getMonth()],
                yy: o.getFullYear().toString().substring(2),
                yyyy: o.getFullYear()
            };
            r.dd = (r.d < 10 ? "0" : "") + r.d,
                r.mm = (r.m < 10 ? "0" : "") + r.m,
                t = [];
            for (var s = e.extend([], a.separators), l = 0, d = a.parts.length; l <= d; l++)
                s.length && t.push(s.shift()),
                    t.push(r[a.parts[l]]);
            return t.join("")
        }
        ,
        t.prototype.getBetweenDates = function(e) {
            for (var t = this, a = [], n = 0; n < t.monthLength; n++) {
                var i = t.formatDate(t.$label.months[t.$active.month] + " " + (n + 1) + " " + t.$active.year, t.options.format);
                t.isBetweenDates(i, e) && a.push(i)
            }
            return a
        }
        ,
        t.prototype.isBetweenDates = function(e, t) {
            var a, n;
            return t instanceof Array ? (a = new Date(t[0]),
                n = new Date(t[1])) : (a = new Date(t),
                n = new Date(t)),
            a <= new Date(e) && n >= new Date(e)
        }
        ,
        t.prototype.hasSameDayEventType = function(e, t) {
            for (var a = this, n = 0, i = 0; i < a.options.calendarEvents.length; i++)
                if (a.options.calendarEvents[i].date instanceof Array)
                    for (var o = a.getBetweenDates(a.options.calendarEvents[i].date), r = 0; r < o.length; r++)
                        e === o[r] && t === a.options.calendarEvents[i].type && n++;
                else
                    e === a.options.calendarEvents[i].date && t === a.options.calendarEvents[i].type && n++;
            return n > 0
        }
        ,
        t.prototype.setTheme = function(t) {
            var a = this
                , n = a.options.theme;
            a.options.theme = t.toLowerCase().split(" ").join("-"),
            a.options.theme && e(a.$elements.calendarEl).removeClass(n),
            "default" !== a.options.theme && e(a.$elements.calendarEl).addClass(a.options.theme)
        }
        ,
        t.prototype.resize = function() {
            var t = this
                , a = !t.$elements.calendarEl.hasClass("sidebar-hide")
                , n = !t.$elements.calendarEl.hasClass("event-hide")
                , i = e(window).width();
            i <= t.$breakpoints.tablet && i > t.$breakpoints.mobile ? (a && t.toggleSidebar(),
            n && t.toggleEventList(),
                e(window).off("click.evocalendar.evo-" + t.instanceUid).on("click.evocalendar.evo-" + t.instanceUid, e.proxy(t.toggleOutside, t))) : i <= t.$breakpoints.mobile ? (a && t.toggleSidebar(!1),
            n && t.toggleEventList(!1),
                e(window).off("click.evocalendar.evo-" + t.instanceUid)) : e(window).off("click.evocalendar.evo-" + t.instanceUid)
        }
        ,
        t.prototype.initEventListener = function() {
            var t = this;
            e(window).off("resize.evocalendar.evo-" + t.instanceUid).on("resize.evocalendar.evo-" + t.instanceUid, e.proxy(t.resize, t)),
            t.options.sidebarToggler && t.$elements.sidebarToggler.off("click.evocalendar").on("click.evocalendar", t.toggleSidebar),
            t.options.eventListToggler && t.$elements.eventListToggler.off("click.evocalendar").on("click.evocalendar", t.toggleEventList),
                t.$elements.sidebarEl.find("[data-month-val]").off("click.evocalendar").on("click.evocalendar", t.selectMonth),
                t.$elements.sidebarEl.find("[data-year-val]").off("click.evocalendar").on("click.evocalendar", t.selectYear),
                t.$elements.eventEl.find("[data-event-index]").off("click.evocalendar").on("click.evocalendar", t.selectEvent)
        }
        ,
        t.prototype.destroyEventListener = function() {
            var t = this;
            e(window).off("resize.evocalendar.evo-" + t.instanceUid),
                e(window).off("click.evocalendar.evo-" + t.instanceUid),
            t.options.sidebarToggler && t.$elements.sidebarToggler.off("click.evocalendar"),
            t.options.eventListToggler && t.$elements.eventListToggler.off("click.evocalendar"),
                t.$elements.innerEl.find(".calendar-day").children().off("click.evocalendar"),
                t.$elements.sidebarEl.find("[data-month-val]").off("click.evocalendar"),
                t.$elements.sidebarEl.find("[data-year-val]").off("click.evocalendar"),
                t.$elements.eventEl.find("[data-event-index]").off("click.evocalendar")
        }
        ,
        t.prototype.calculateDays = function() {
            var e, t, a, n = this;
            for (n.monthLength = n.$label.days_in_month[n.$active.month],
                 1 == n.$active.month && (n.$active.year % 4 == 0 && n.$active.year % 100 != 0 || n.$active.year % 400 == 0) && (n.monthLength = 29),
                     e = n.initials.dates[n.options.language].daysShort,
                     t = n.options.firstDayOfWeek; n.$label.days.length < e.length; )
                t == e.length && (t = 0),
                    n.$label.days.push(e[t]),
                    t++;
            a = new Date(n.$active.year,n.$active.month).getDay() - t,
                n.startingDay = a < 0 ? n.$label.days.length + a : a
        }
        ,
        t.prototype.buildTheBones = function() {
            var t = this;
            if (t.calculateDays(),
                !t.$elements.calendarEl.html()) {
                var a;
                a = '<div class="calendar-sidebar"><div class="calendar-year"><button class="icon-button" role="button" data-year-val="prev" title="' + t.initials.dates[t.options.language].previousYearText + '"><span class="chevron-arrow-left"></span></button>&nbsp;<p></p>&nbsp;<button class="icon-button" role="button" data-year-val="next" title="' + t.initials.dates[t.options.language].nextYearText + '"><span class="chevron-arrow-right"></span></button></div><div class="month-list"><ul class="calendar-months">';
                for (var n = 0; n < t.$label.months.length; n++)
                    a += '<li class="month" role="button" data-month-val="' + n + '">' + t.initials.dates[t.options.language].months[n] + "</li>";
                a += "</ul>",
                    a += "</div></div>",
                    a += '<div class="calendar-inner"><table class="calendar-table"><tr><th colspan="7"></th></tr><tr class="calendar-header">';
                for (n = 0; n < t.$label.days.length; n++) {
                    var i = "calendar-header-day";
                    t.$label.days[n] !== t.initials.weekends.sat && t.$label.days[n] !== t.initials.weekends.sun || (i += " --weekend"),
                        a += '<td class="' + i + '">' + t.$label.days[n] + "</td>"
                }
                a += "</tr></table></div>",
                    a += '<div class="calendar-events"><div class="event-header"><p></p></div><div class="event-list"></div></div>',
                    t.$elements.calendarEl.html(a),
                t.$elements.sidebarEl || (t.$elements.sidebarEl = e(t.$elements.calendarEl).find(".calendar-sidebar")),
                t.$elements.innerEl || (t.$elements.innerEl = e(t.$elements.calendarEl).find(".calendar-inner")),
                t.$elements.eventEl || (t.$elements.eventEl = e(t.$elements.calendarEl).find(".calendar-events")),
                t.options.sidebarToggler && (e(t.$elements.sidebarEl).append('<span id="sidebarToggler" role="button" aria-pressed title="' + t.initials.dates[t.options.language].closeSidebarText + '"><button class="icon-button"><span class="bars"></span></button></span>'),
                t.$elements.sidebarToggler || (t.$elements.sidebarToggler = e(t.$elements.sidebarEl).find("span#sidebarToggler"))),
                t.options.eventListToggler && (e(t.$elements.calendarEl).append('<span id="eventListToggler" role="button" aria-pressed title="' + t.initials.dates[t.options.language].closeEventListText + '"><button class="icon-button"><span class="chevron-arrow-right"></span></button></span>'),
                t.$elements.eventListToggler || (t.$elements.eventListToggler = e(t.$elements.calendarEl).find("span#eventListToggler")))
            }
            t.buildSidebarYear(),
                t.buildSidebarMonths(),
                t.buildCalendar(),
                t.buildEventList(),
                t.initEventListener(),
                t.resize()
        }
        ,
        t.prototype.buildEventList = function() {
            var e, t = this, a = !1;
            t.$active.events = [];
            var n = t.formatDate(t.$active.date, t.options.eventHeaderFormat, t.options.language);
            t.$elements.eventEl.find(".event-header > p").text(n);
            var i = t.$elements.eventEl.find(".event-list");
            if (i.children().length > 0 && i.empty(),
                t.options.calendarEvents)
                for (var o = 0; o < t.options.calendarEvents.length; o++)
                    if (t.isBetweenDates(t.$active.date, t.options.calendarEvents[o].date))
                        r(t.options.calendarEvents[o]);
                    else if (t.options.calendarEvents[o].everyYear) {
                        new Date(t.$active.date).getMonth() + 1 + " " + new Date(t.$active.date).getDate() == new Date(t.options.calendarEvents[o].date).getMonth() + 1 + " " + new Date(t.options.calendarEvents[o].date).getDate() && r(t.options.calendarEvents[o])
                    }
            function r(e) {
                a = !0,
                    t.addEventList(e)
            }
            a || (e = '<div class="event-empty">',
                t.$active.date === t.$current.date ? e += "<p>" + t.initials.dates[t.options.language].noEventForToday + "</p>" : e += "<p>" + t.initials.dates[t.options.language].noEventForThisDay + "</p>",
                e += "</div>"),
                i.append(e)
        }
        ,
        t.prototype.addEventList = function(e) {
            var t, a = this, n = a.$elements.eventEl.find(".event-list");
            0 === n.find("[data-event-index]").length && n.empty(),
                a.$active.events.push(e),
                t = '<div class="event-container" role="button" data-event-index="' + e.id + '">',
                t += '<div class="event-icon"><div class="event-bullet-' + e.type + '"',
            e.color && (t += 'style="background-color:' + e.color + '"'),
                t += '></div></div><div class="event-info"><p class="event-title">' + a.limitTitle(e.name),
            e.badge && (t += "<span>" + e.badge + "</span>"),
                t += "</p>",
            e.description && (t += '<p class="event-desc">' + e.description + "</p>"),
                t += "</div>",
                t += "</div>",
                n.append(t),
                a.$elements.eventEl.find('[data-event-index="' + e.id + '"]').off("click.evocalendar").on("click.evocalendar", a.selectEvent)
        }
        ,
        t.prototype.removeEventList = function(e) {
            var t, a = this, n = a.$elements.eventEl.find(".event-list");
            0 !== n.find('[data-event-index="' + e + '"]').length && (n.find('[data-event-index="' + e + '"]').remove(),
            0 === n.find("[data-event-index]").length && (n.empty(),
                a.$active.date === a.$current.date ? t += "<p>" + a.initials.dates[a.options.language].noEventForToday + "</p>" : t += "<p>" + a.initials.dates[a.options.language].noEventForThisDay + "</p>",
                n.append(t)))
        }
        ,
        t.prototype.buildSidebarYear = function() {
            this.$elements.sidebarEl.find(".calendar-year > p").text(this.$active.year)
        }
        ,
        t.prototype.buildSidebarMonths = function() {
            var e = this;
            e.$elements.sidebarEl.find(".calendar-months > [data-month-val]").removeClass("active-month"),
                e.$elements.sidebarEl.find('.calendar-months > [data-month-val="' + e.$active.month + '"]').addClass("active-month")
        }
        ,
        t.prototype.buildCalendar = function() {
            var e, t, a = this;
            a.calculateDays(),
                t = a.formatDate(new Date(a.$label.months[a.$active.month] + " 1 " + a.$active.year), a.options.titleFormat, a.options.language),
                a.$elements.innerEl.find(".calendar-table th").text(t),
                a.$elements.innerEl.find(".calendar-body").remove(),
                e += '<tr class="calendar-body">';
            for (var n = 1, i = 0; i < 9; i++) {
                for (var o = 0; o < a.$label.days.length; o++) {
                    if (n <= a.monthLength && (i > 0 || o >= a.startingDay)) {
                        var r = "calendar-day";
                        a.$label.days[o] !== a.initials.weekends.sat && a.$label.days[o] !== a.initials.weekends.sun || (r += " --weekend"),
                            e += '<td class="' + r + '">',
                            e += '<div class="day" role="button" data-date-val="' + a.formatDate(a.$label.months[a.$active.month] + " " + n + " " + a.$active.year, a.options.format) + '">' + n + "</div>",
                            n++
                    } else
                        e += "<td>";
                    e += "</td>"
                }
                if (n > a.monthLength)
                    break;
                e += '</tr><tr class="calendar-body">'
            }
            e += "</tr>",
                a.$elements.innerEl.find(".calendar-table").append(e),
            a.options.todayHighlight && a.$elements.innerEl.find("[data-date-val='" + a.$current.date + "']").addClass("calendar-today"),
                a.$elements.innerEl.find(".calendar-day").children().off("click.evocalendar").on("click.evocalendar", a.selectDate);
            var s = a.$elements.innerEl.find("[data-date-val='" + a.$active.date + "']");
            s && (a.$elements.innerEl.children().removeClass("calendar-active"),
                s.addClass("calendar-active")),
            null != a.options.calendarEvents && a.buildEventIndicator()
        }
        ,
        t.prototype.addEventIndicator = function(e) {
            var t, a, n = this, i = e.date, o = n.stringCheck(e.type);
            if (i instanceof Array) {
                if (e.everyYear)
                    for (var r = 0; r < i.length; r++)
                        i[r] = n.formatDate(new Date(i[r]).setFullYear(n.$active.year), n.options.format);
                for (var s = n.getBetweenDates(i), l = 0; l < s.length; l++)
                    d(s[l])
            } else
                e.everyYear && (i = n.formatDate(new Date(i).setFullYear(n.$active.year), n.options.format)),
                    d(i);
            function d(i) {
                0 === (a = n.$elements.innerEl.find('[data-date-val="' + i + '"]')).find("span.event-indicator").length && a.append('<span class="event-indicator"></span>'),
                0 === a.find("span.event-indicator > .type-bullet > .type-" + o).length && (t = '<div class="type-bullet"><div ',
                    t += 'class="type-' + e.type + '"',
                e.color && (t += 'style="background-color:' + e.color + '"'),
                    t += "></div></div>",
                    a.find(".event-indicator").append(t))
            }
        }
        ,
        t.prototype.removeEventIndicator = function(e) {
            var t = this
                , a = e.date
                , n = t.stringCheck(e.type);
            if (a instanceof Array)
                for (var i = t.getBetweenDates(a), o = 0; o < i.length; o++)
                    r(i[o]);
            else
                r(a);
            function r(e) {
                0 !== t.$elements.innerEl.find('[data-date-val="' + e + '"] span.event-indicator').length && (t.hasSameDayEventType(e, n) || t.$elements.innerEl.find('[data-date-val="' + e + '"] span.event-indicator > .type-bullet > .type-' + n).parent().remove())
            }
        }
        ,
        t.prototype.buildEventIndicator = function() {
            var e = this;
            e.$elements.innerEl.find(".calendar-day > day > .event-indicator").empty();
            for (var t = 0; t < e.options.calendarEvents.length; t++)
                e.addEventIndicator(e.options.calendarEvents[t])
        }
        ,
        t.prototype.selectEvent = function(t) {
            var a = this
                , n = e(t.target).closest(".event-container")
                , i = e(n).data("eventIndex").toString()
                , o = a.options.calendarEvents.map(function(e) {
                return e.id.toString()
            }).indexOf(i)
                , r = a.options.calendarEvents[o];
            r.date instanceof Array && (r.dates_range = a.getBetweenDates(r.date)),
                e(a.$elements.calendarEl).trigger("selectEvent", [a.options.calendarEvents[o]])
        }
        ,
        t.prototype.selectYear = function(t) {
            var a, n, i = this, o = e(window).width(), r = !i.$elements.calendarEl.hasClass("sidebar-hide");
            "string" == typeof t || "number" == typeof t ? 4 === parseInt(t).toString().length && (n = parseInt(t)) : (a = e(t.target).closest("[data-year-val]"),
                n = e(a).data("yearVal")),
                "prev" == n ? --i.$active.year : "next" == n ? ++i.$active.year : "number" == typeof n && (i.$active.year = n),
            o <= i.$breakpoints.mobile && r && i.toggleSidebar(!1),
                e(i.$elements.calendarEl).trigger("selectYear", [i.$active.year]),
                i.buildSidebarYear(),
                i.buildCalendar()
        }
        ,
        t.prototype.selectMonth = function(t) {
            var a = this
                , n = e(window).width()
                , i = !a.$elements.calendarEl.hasClass("sidebar-hide");
            "string" == typeof t || "number" == typeof t ? t >= 0 && t <= a.$label.months.length && (a.$active.month = t.toString()) : a.$active.month = e(t.currentTarget).data("monthVal"),
            n <= a.$breakpoints.tablet && i && a.toggleSidebar(!1),
                a.buildSidebarMonths(),
                a.buildCalendar(),
                e(a.$elements.calendarEl).trigger("selectMonth", [a.initials.dates[a.options.language].months[a.$active.month], a.$active.month])
        }
        ,
        t.prototype.selectDate = function(t) {
            var a, n, i, o, r, s = this, l = s.$active.date;
            "string" == typeof t || "number" == typeof t || t instanceof Date ? (a = s.formatDate(new Date(t), s.options.format),
                n = new Date(a).getFullYear(),
                i = new Date(a).getMonth(),
            s.$active.year !== n && s.selectYear(n),
            s.$active.month !== i && s.selectMonth(i),
                o = s.$elements.innerEl.find("[data-date-val='" + a + "']")) : a = (o = e(t.currentTarget)).data("dateVal"),
                r = s.$active.date === a,
                s.$active.date = a,
                s.$active.event_date = a,
                s.$elements.innerEl.find("[data-date-val]").removeClass("calendar-active"),
                o.addClass("calendar-active"),
            r || s.buildEventList(),
                e(s.$elements.calendarEl).trigger("selectDate", [s.$active.date, l])
        }
        ,
        t.prototype.getActiveDate = function() {
            return this.$active.date
        }
        ,
        t.prototype.getActiveEvents = function() {
            return this.$active.events
        }
        ,
        t.prototype.toggleOutside = function(e) {
            var t, a, n, i = this;
            t = !i.$elements.calendarEl.hasClass("sidebar-hide"),
                a = !i.$elements.calendarEl.hasClass("event-hide"),
                n = e.target === i.$elements.innerEl[0],
            t && n && i.toggleSidebar(!1),
            a && n && i.toggleEventList(!1)
        }
        ,
        t.prototype.toggleSidebar = function(t) {
            var a, n, i, o = this;
            i = e(window).width(),
                void 0 === t || t.originalEvent ? e(o.$elements.calendarEl).toggleClass("sidebar-hide") : t ? e(o.$elements.calendarEl).removeClass("sidebar-hide") : e(o.$elements.calendarEl).addClass("sidebar-hide"),
            i <= o.$breakpoints.tablet && i > o.$breakpoints.mobile && (a = !o.$elements.calendarEl.hasClass("sidebar-hide"),
                n = !o.$elements.calendarEl.hasClass("event-hide"),
            a && n && o.toggleEventList())
        }
        ,
        t.prototype.toggleEventList = function(t) {
            var a, n, i, o = this;
            i = e(window).width(),
                void 0 === t || t.originalEvent ? e(o.$elements.calendarEl).toggleClass("event-hide") : t ? e(o.$elements.calendarEl).removeClass("event-hide") : e(o.$elements.calendarEl).addClass("event-hide"),
            i <= o.$breakpoints.tablet && i > o.$breakpoints.mobile && (n = !o.$elements.calendarEl.hasClass("event-hide"),
                a = !o.$elements.calendarEl.hasClass("sidebar-hide"),
            n && a && o.toggleSidebar())
        }
        ,
        t.prototype.addCalendarEvent = function(e) {
            var t = this;
            function a(e) {
                if (e.id || console.log('%c Event named: "' + e.name + "\" doesn't have a unique ID ", "color:white;font-weight:bold;background-color:#e21d1d;"),
                e.date instanceof Array)
                    for (var a = 0; a < e.date.length; a++)
                        n(e.date[a]) && (e.date[a] = t.formatDate(new Date(e.date[a]), t.options.format));
                else
                    n(e.date) && (e.date = t.formatDate(new Date(e.date), t.options.format));
                function n(a) {
                    return !!t.isValidDate(a) || (console.log('%c Event named: "' + e.name + '" has invalid date ', "color:white;font-weight:bold;background-color:#e21d1d;"),
                        !1)
                }
                t.options.calendarEvents || (t.options.calendarEvents = []),
                    t.options.calendarEvents.push(e),
                    t.addEventIndicator(e),
                t.$active.event_date === e.date && t.addEventList(e)
            }
            if (e instanceof Array)
                for (var n = 0; n < e.length; n++)
                    a(e[n]);
            else
                "object" == typeof e && a(e)
        }
        ,
        t.prototype.removeCalendarEvent = function(e) {
            var t = this;
            function a(e) {
                var a = t.options.calendarEvents.map(function(e) {
                    return e.id
                }).indexOf(e);
                if (a >= 0) {
                    var n = t.options.calendarEvents[a];
                    t.options.calendarEvents.splice(a, 1),
                        t.removeEventList(e),
                        t.removeEventIndicator(n)
                } else
                    console.log("%c " + e + ": ID not found ", "color:white;font-weight:bold;background-color:#e21d1d;")
            }
            if (e instanceof Array)
                for (var n = 0; n < e.length; n++)
                    a(e[n]);
            else
                a(e)
        }
        ,
        t.prototype.isValidDate = function(e) {
            return new Date(e) && !isNaN(new Date(e).getTime())
        }
        ,
        e.fn.evoCalendar = function() {
            var e, a, n = this, i = arguments[0], o = Array.prototype.slice.call(arguments, 1), r = n.length;
            for (e = 0; e < r; e++)
                if ("object" == typeof i || void 0 === i ? n[e].evoCalendar = new t(n[e],i) : a = n[e].evoCalendar[i].apply(n[e].evoCalendar, o),
                void 0 !== a)
                    return a;
            return n
        }
});
