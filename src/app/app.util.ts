import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { RouterModule, Routes } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs/Subject';
//import { BlockUI, NgBlockUI } from 'ng-block-ui';
import * as $ from 'jquery';
@Injectable()
export class AppUtil {
  //@BlockUI() blockUI: NgBlockUI;
  private appComponentMethodCallSource = new Subject<any>();
  private accessTokenService = new Subject<any>();
  private toastComponentCallSource = new Subject<any>();

  toastComponentMethodCall$ = this.toastComponentCallSource.asObservable();
  appComponentMethodCalled$ = this.appComponentMethodCallSource.asObservable();
  accessTokenService$ = this.accessTokenService.asObservable();
  constructor(private cookieService: CookieService, private router: Router, private location: Location) {

  }

  getAccessToken() {
    return this.cookieService.get('token');
  }

  setAccessToken(token) {
    this.cookieService.put('token', token);
  }

  setStoreVal(key: string, val: any) {
    this.cookieService.put(key, val);
  }

  getStoreVal(key: string) {
    return this.cookieService.get(key);
  }

  removeStoreVal(key: string) {
    return this.cookieService.remove(key);
  }

  sessionExpiredService() {
    this.cookieService.remove('user');
    this.cookieService.remove('token');
    this.router.navigate(['home']);
  }

  getActivityResults() {
  }

  callToastComponentMethod(message) {
    this.toastComponentCallSource.next(message);
  }

  callAppComponentMethod(tt) {
    this.appComponentMethodCallSource.next(tt);
  }
  applyReportEvent() {
    $('.view-report-nav').click(function () {
      $('.report-nav').toggleClass('show-report-nav');
      $('.custom-backdrop').addClass('show');
    });

    $('.close-report-nav, .custom-backdrop').click(function () {
      $('.report-nav').removeClass('show-report-nav');
      $('.custom-backdrop').removeClass('show');
    });
  }

  jqueryapply() {
    $('.modal-body form input, textarea#rejection-reason, textarea#noteDescription, textarea.description, .profile-details input, .contact-us-wrapper form input, .contact-us-wrapper form textarea, .organization-signup-section input, .organization-signup-section textarea, .login-form-wrapper input, form.completeForm input', ).each(function () {
      $(this).on('focus', function () {
        $(this).parent('.move').addClass('active');
        $('.show-input-dollar').show();
      });

      $(this).on('blur', function () {
        if ($(this).val().length == 0) {
          $(this).parent('.move').removeClass('active');
          $('.show-input-dollar').hide();
        }
      });

      if ($(this).val() != '') {
        $(this).parent('.move').addClass('active');
      } else {
        $(this).parent('.move').removeClass('label-heightlight').removeClass('active');
      }
      $(this).on('focusin', function () {
        $('.show-input-dollar').show();
        $(this).parent('.move').addClass('label-heightlight');
      });
      $(this).on('focusout', function () {
        $(this).parent('.move').removeClass('label-heightlight');
      });

    });

  }
  editProfileJquery() {
    $('.profile-details input').each(function () {
      $(this).on('focus', function () {
        $(this).parent('.move').addClass('active');
        $('.show-input-dollar').show();
      });

      $(this).on('blur', function () {
        if ($(this).val().length == 0) {
          $(this).parent('.move').removeClass('active');
          $('.show-input-dollar').hide();
        }
      });
      $(this).on('focusin', function () {
        $('.show-input-dollar').show();
        $(this).parent('.move').addClass('label-heightlight');
      });
      $(this).on('focusout', function () {
        $(this).parent('.move').removeClass('label-heightlight');
      });

    })
  }

  fixButtonOnScroll() {
    $(window).scroll(function () {
      if ( ($(window).scrollTop() + $(window).height()) > ($(document).height() - 320) ) {
        $('.fl-btn-fixed').removeClass('fix-filter-btn-box');
      } else {
        $('.fl-btn-fixed').addClass('fix-filter-btn-box');
      }
    });
  }

  homePageScript() {
    $('.scroll-link').on('click', function (event) {
      event.preventDefault();
      var sectionID = $(this).attr("data-id");
      scrollToID('#' + sectionID, 750);
      $('.navbar-collapse-sidebar').removeClass('left-side');
      $('.custom-backdrop').removeClass('show');
    });
    // scroll to top action
    $('.scroll-top').on('click', function (event) {
      event.preventDefault();
      $('html, body').animate({ scrollTop: 0 }, 'slow');
    });
    // mobile nav toggle
    $('#nav-toggle').on('click', function (event) {
      event.preventDefault();
      $('#main-nav').toggleClass("open");
    });

    function scrollToID(id, speed) {
      if ($(window).width() <= 767) {
        var offSet = 50;
      } else if ($(window).width() <= 1200) {
        var offSet = 64;
      } else {
        var offSet = 75;
      };

      var targetOffset = $(id).offset().top - offSet;
      var mainNav = $('#main-nav');
      $('html,body').animate({ scrollTop: targetOffset }, speed);
      if (mainNav.hasClass("open")) {
        mainNav.css("height", "1px").removeClass("in").addClass("collapse");
        mainNav.removeClass("open");
      }
    }

    $('.navbar-toggle').click(function () {
      $('.navbar-collapse-sidebar').toggleClass('left-side');
      $('.custom-backdrop').addClass('show');
    });

    $('.close-sidebar, .custom-backdrop').click(function () {
      $('.navbar-collapse-sidebar').removeClass('left-side');
      $('.custom-backdrop').removeClass('show');
    });

    $('.treble-help-subsection').fadeOut();
    $('.treble-help-slider .item').click(function () {
      $('.treble-help-subsection').fadeIn();
    });

  }

  public getNumberOfDays(endDate) {
    let diffDays = null;
    let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    let firstDate = new Date();
    let secondDate = new Date(endDate);
    return diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay))) + 1;
  }
  formatCurrency(numb) {
    let num = numb.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
      num = "0";
    let sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    let cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
      cents = Number("0" + cents);
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
      num = num.substring(0, num.length - (4 * i + 3)) + ',' +
        num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + '$' + num + '.' + cents);
  }
  isMobile() {
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase());
  }
  goToBack() {
    this.location.back();
  }
  errorHandling(error) {
    if (error.status == 0) {
      alert("Please check your internet connection!");
      return;
    }
    if (error.status == 401) {
      this.sessionExpiredService();
      return;
    }
  }
  networkStatusEvent() {
    window.addEventListener('online', () => { this.callAppComponentMethod(true); });
    window.addEventListener('offline', () => { this.callAppComponentMethod(false); });

  }
  setAccessTokenService(token) {
    this.accessTokenService.next(token);
  }
  getNetworkSelectOptions() {
    let obj = [
      {
        value: 'Select',
        id: ''
      },
      {
        value: 'Imbalance : Most to Fewest',
        id: 'imbalance_desc'
      },
      {
        value: 'Imbalance : Fewest to Most',
        id: 'imbalance_asc'
      },
      {
        value: 'Activity : Most to Fewest',
        id: 'activity_desc'
      },
      {
        value: 'Activity : Fewest to Most',
        id: 'activity_asc'
      },
      {
        value: 'Treble Points : Most to Fewest',
        id: 'treble_points_desc'
      },
      {
        value: 'Treble Points : Fewest to Most',
        id: 'treble_points_asc'
      },
      {
        value: 'Network Points : Most to Fewest',
        id: 'network_points_desc'
      },
      {
        value: 'Network Points : Fewest to Most',
        id: 'network_points_asc'
      },
    ];
    return obj;
  }
  getSortByptions() {
    let obj = [
      {
        value: 'Select',
        id: ''
      },
      {
        value: 'Imbalance : Most to Fewest',
        id: 'imbalance_desc'
      },
      {
        value: 'Imbalance : Fewest to Most',
        id: 'imbalance_asc'
      },
      {
        value: 'Volume : Most to Fewest',
        id: 'volume_desc'
      },
      {
        value: 'Volume : Fewest to Most',
        id: 'volume_asc'
      },
      {
        value: 'Treble Points : Most to Fewest',
        id: 'treble_points_desc'
      },
      {
        value: 'Treble Points : Fewest to Most',
        id: 'treble_points_asc'
      },
      {
        value: 'Network Points : Most to Fewest',
        id: 'network_points_desc'
      },
      {
        value: 'Network Points : Fewest to Most',
        id: 'network_points_asc'
      },
    ];
    return obj;
  }

  getTimeOptions() {
    let obj = [
      {
        value: 'Choose Timeframe',
        id: ''
      },
      {
        value: '1 day',
        id: 'days'
      },
      {
        value: '3 days',
        id: 'days'
      },
      {
        value: '1 week',
        id: 'week'
      },
      {
        value: '1 month',
        id: 'month'
      }
    ];
    return obj;
  }

  public getUserTypeOptions() {
    return [
      {
        value: 'Individual Templates',
        id: 'individual'
      },
      {
        value: 'Group Templates',
        id: 'group'
      }
    ]
  }

  public getGranularityOption() {
    return [{
      value: 'Daily',
      id: 'daily'
    },
    {
      value: 'Weekly',
      id: 'individual'
    },
    {
      value: 'Monthly',
      id: 'monthly'
    }
    ]
  }
  public getTimeRangeOptions() {
    return [{
      value: '3 Months',
      id: '3_months'
    },
    {
      value: '6 Months',
      id: '6_months'
    },
    {
      value: '1 year',
      id: '1_year'
    },
    {
      value: '2 years',
      id: '2_year'
    },
    {
      value: 'Custom',
      id: 'custom'
    }
    ]
  }
  public getTemplateTypeOptions() {
    return [
      {
        value: 'Introduction',
        id: 'introduction'
      },
      {
        value: 'Referral',
        id: 'referral'
      },
      {
        value: 'Thanks',
        id: 'thanks'
      },
      {
        value: 'Wish Fulfilment',
        id: 'wish_fulfilment'
      },

    ]
  }
  public getPrivacyOptions() {
    return [{
      value: 'My Network',
      id: '1'
    },
    {
      value: 'My Network Mutual Connections',
      id: '2'
    },
    {
      value: 'Entire Treble Network',
      id: '3'
    }
    ]
  }
  public getSortByOptionsForThanks() {
    return [{
      value: 'First Name',
      id: 'first_name'
    },
    {
      value: 'Last Name',
      id: 'last_name'
    },
    ]
  }
  public getTemplateFieldOptions() {
    return [
      {
        value: '[Contact Full Name]',
        id: '<contact_full_name>'
      },
      {
        value: '[Contact Nick Name]',
        id: '<contact_nick_name>'
      },
      {
        value: '[Contact First Name]',
        id: '<contact_first_name>'
      },
      {
        value: '[Intro Full Name]',
        id: '<intro_intro_name>'
      },
      {
        value: '[Intro Nick Name]',
        id: '<intro_nick_name>'
      },
      {
        value: '[Intro First Name]',
        id: '<intro_first_name>'
      },
      {
        value: '[Your First Name]',
        id: '<your_first_name>'
      },
      {
        value: '[Your Full Name]',
        id: '<your_full_name>'
      },
      {
        value: '[Your Nick Name]',
        id: '<your_nick_name>'
      }
    ]
  }

  public getTemplateFieldThanksOptions() {
    return [
      {
        value: '[Contact Full Name]',
        id: '<contact_full_name>'
      },
      {
        value: '[Contact Nick Name]',
        id: '<contact_nick_name>'
      },
      {
        value: '[Contact First Name]',
        id: '<contact_first_name>'
      },
      {
        value: '[Your First Name]',
        id: '<your_first_name>'
      },
      {
        value: '[Your Full Name]',
        id: '<your_full_name>'
      },
      {
        value: '[Your Nick Name]',
        id: '<your_nick_name>'
      }
    ]
  }

  public getReferralTypeOptions() {
    return [
      {
        value: 'Introduction',
        id: '1'
      },
      {
        value: 'Referral',
        id: '2'
      }
    ]
  }

  scrollToTop() {
    $('body,html').animate({ scrollTop: 0 }, 'slow');
  }
  scrollToElement(id) {
    $('html, body').animate({
      scrollTop: $(id).offset().top
    }, 800)
  }
  redirectToNewTab(user) {
    let currentUserId = JSON.parse(this.getStoreVal('user') || "{}").user_id;
    if (user.user_id != currentUserId) {
      if (user.is_treble && user.is_treble.toLowerCase() === "yes") {
        window.open("user/" + user.user_id + "/profile", "_blank");
      }
      if (user.is_treble_user && user.is_treble_user.toLowerCase() === "yes") {
        window.open("user/" + user.user_id + "/profile", "_blank");
      }
    }
  }
  redirectToUserProfile(user) {
    let currentUserId = JSON.parse(this.getStoreVal('user') || "{}").user_id;
    if (user.user_id != currentUserId) {
      if (user.is_treble && user.is_treble.toLowerCase() === "yes") {
        this.router.navigateByUrl("user/" + user.user_id + "/profile");
      }
      if (user.is_treble_user && user.is_treble_user.toLowerCase() === "yes") {
        this.router.navigateByUrl("user/" + user.user_id + "/profile");
      }
    }
  }
  bindAccordionEvent() {
    function close_accordion_section() {
      $('.accordion .accordion-section-title').removeClass('active');
      $('.accordion .accordion-section-content').slideUp(300).removeClass('open');
    }
    $('.accordion-section-title').click(function (e) {
      // Grab current anchor value
      var currentAttrValue = $(this).attr('href');

      if ($(e.target).is('.active')) {
        close_accordion_section();
        $(this).find('span').removeClass('icon-plus');
      } else {
        close_accordion_section();
        // Add active class to section title
        $(this).addClass('active');
        $(this).find('span').addClass('icon-minus');
        // Open up the hidden content panel
        $('.accordion ' + currentAttrValue).slideDown(300).addClass('open');
      }
      e.preventDefault();
    });
  }
  bindHamburgerEvent() {
    $('.navbar-toggle').on('click', function () {
      $('.navbar-collapse-sidebar').addClass('left-side');
      $('.custom-backdrop').addClass('show');
    });

    $('.close-sidebar, .custom-backdrop').on('click', function () {
      $('.navbar-collapse-sidebar').removeClass('left-side');
      $('.custom-backdrop').removeClass('show');
    });

    $('.search-icon').click(function () {
      $('.header-search').toggleClass('show-header-search');
    });
  }


  // startBlockUI() {
  //   this.blockUI.start();
  // }

  // stopBlockUI() {
  //   this.blockUI.stop(); // Stop blocking
  // }
  public getBreadCrumUrlName(url) {
    if (url.indexOf('mynetwork-connections') != -1) {
      return "Network";
    }
    if (url.indexOf('/advanced-search') != -1) {
      return "Advance Search";
    }
    if (url.indexOf('/advanced-search') != -1) {
      return "Advance Search";
    }
    if (url.indexOf('/make-a-connection') != -1) {
      return "Make Connection";
    }
    if (url.indexOf('/connections-in-process') != -1) {
      return " Connection in Process";
    }
    if (url.indexOf('/connections-in-history') != -1) {
      return " Connection in Histroy";
    }
    if (url.indexOf('/dashboard') != -1) {
      return "Dashboard";
    }
    if (url.indexOf('/ai') != -1) {
      return "AI";
    }
    if (url.indexOf('/my-organizations') != -1) {
      return "My Organizations";
    }
    if (url.indexOf('/all-organizations') != -1) {
      return "All Organizations";
    }
    if (url.indexOf('/profile/view-profile') != -1) {
      return "My Profile";
    }
    if (url.indexOf('/wish/my-wish') != -1) {
      return "My Wishes";
    }

    if (url.indexOf('/profile/manage-tags') != -1) {
      return "Manage Tags";
    }
    if (url.indexOf('/profile/manage-template') != -1) {
      return "Manage Template";
    }


  }
  public getAnalyticsEventObj() {
    return {
      AI_Wish_Match: {
        category: 'AI',
        action: 'AI_Wish_Match'
      },
      AI_Overlapping_Interest: {
        category: 'AI',
        action: 'AI_Overlapping_Interest'
      },
      AI_Imbalance_Contact: {
        category: 'AI',
        action: 'AI_Imbalance_Contact'
      },
      AI_Improve_Score: {
        category: 'AI',
        action: 'AI_Improve_Score'
      },
      AI_Reminder: {
        category: 'AI',
        action: 'AI_Reminder'
      },
      Connection_Request: {
        category: 'Network',
        action: 'Connection_Request'
      },
      Reminder_Set: {
        category: 'Reminder',
        action: 'Reminder_Set'
      },
      Wish_Process_Quit: {
        category: 'Wish',
        action: 'Wish_Process_Quit'
      },
      Wishes_From_Home: {
        category: 'Wish',
        action: 'Wishes_From_Home'
      },
      Historical_Interaction_Created: {
        category: 'Historical',
        action: 'Historical_Interaction_Created'
      },
      About_US: {
        category: 'Pages',
        action: 'About_US'
      },
      Privacy_Policy: {
        category: 'Pages',
        action: 'Privacy_Policy'
      },
      Terms_Of_Use: {
        category: 'Pages',
        action: 'Terms_Of_Use'
      },
      /*Tutorial_Click : {
        category : 'Pages',
        action : 'Tutorial_Click'
      },*/
      News_Click: {
        category: 'News',
        action: 'News_Click'
      },
      Interaction_Summary_View: {
        category: 'Interaction_Summary',
        action: 'Interaction_Summary_View'
      },
      Interaction_Summary_Rating_View: {
        category: 'Interaction_Summary',
        action: 'Interaction_Summary_Rating_View'
      },
      Interaction_Summary_Edit_Rating: {
        category: 'Interaction_Summary',
        action: 'Interaction_Summary_Edit_Rating'
      },
      Interaction_Summary_Report_View: {
        category: 'Interaction_Summary',
        action: 'Interaction_Summary_Report_View'
      },
      Invite_From_Thanks: {
        category: 'Invite',
        action: 'Invite_From_Thanks'
      },
      Invite_From_Intro_Refer: {
        category: 'Invite',
        action: 'Invite_From_Intro/Refer'
      },
      Invite_From_Wish: {
        category: 'Invite',
        action: 'Invite_From_Wish'
      },
      Referral_Process_Quit: {
        category: 'Referral',
        action: 'Referral_Process_Quit'
      },
      Resend_Invite: {
        category: 'Invite',
        action: 'Resend_Invite'
      },
      Demographics_View: {
        category: 'Other User',
        action: 'Demographics_View'
      },
      Subscription_From_Profile: {
        category: 'Subscription',
        action: 'Subscription_From_Profile'
      },
      Thanks_From_Profile: {
        category: 'Thanks',
        action: 'Thanks_From_Profile'
      },
      Refer_From_Profile: {
        category: 'Referral',
        action: 'Refer_From_Profile'
      },
      Wishes_View: {
        category: 'Wish',
        action: 'Wishes_View'
      },
      Subscription_From_Wish: {
        category: 'Subscription',
        action: 'Subscription_From_Wish'
      },
      /*Invite_All : {
        category : 'Invite',
        action : 'Invite_All'
      },*/
      Invite_Individual: {
        category: 'Invite',
        action: 'Invite_Individual'
      },
      Fulfill_Wish_Inside_Treble: {
        category: 'Wish',
        action: 'Fulfill_Wish_Inside_Treble'
      },
      Refer_From_Home: {
        category: 'Referral',
        action: 'Refer_From_Home'
      },
      Thanks_From_Home: {
        category: 'Thanks',
        action: 'Thanks_From_Home'
      },
      Contact_Us_Email: {
        category: 'Contact Us',
        action: 'Contact_Us_Email'
      },
      Contact_Us_Facebook: {
        category: 'Contact Us',
        action: 'Contact_Us_Facebook'
      },
      /*Sync_Contact : {
        category : '',
        action : 'Sync_Contact'
      },*/
      Apply_Tag: {
        category: 'Tags',
        action: 'Apply_Tag'
      },
      Subscription_From_Template: {
        category: 'Subscription',
        action: 'Subscription_From_Template'
      },
      Remove_Connection: {
        category: 'Network',
        action: 'Remove_Connection'
      },
      Referral: {
        category: 'Referral',
        action: 'Referral'
      },
      Introduction: {
        category: 'Introduction',
        action: 'Introduction'
      }
    }
  }
  public ratingValueKey() {
    return ['one_rating', 'two_rating', 'three_rating', 'four_rating', 'five_rating']
  }
}
