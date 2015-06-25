$(document).ready(function() {
    $('.button-collapse').sideNav({
        menuWidth: 160, // Default is 240
        closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });
    // Materialize.toast(message, displayLength, className, completeCallback);
      Materialize.toast('v. 0.1', 1); // 4000 is the duration of the toast
});

/*Router.route('/', function () {
  this.render('mainBodyRoute');
});*/

Template.sideNavTemp.events({
    "click .feedsAll": function(event) {
        Session.set("whichMainPanel", "feedsAll");
        console.log("whichMainPanel : "+Session.get("whichMainPanel"));
    },
    "click .contactsAll": function(event) {
        Session.set("whichMainPanel", "contactsAll");
        console.log("whichMainPanel : "+Session.get("whichMainPanel"));
    },
    "click .campaignsAll": function(event) {
        /*Session.set("whichMainPanel", "campaignsAll");*/
        Session.set("whichMainPanel", "campaignsAll");
        Template.instance().$('ul#slide-out-homeNavUL').addClass('hide');
        
        Materialize.showStaggeredList('#slide-out-campaignsNavUL');
        Template.instance().$('ul#slide-out-campaignsNavUL').removeClass('hide');

    },
    "click .restaurantAll": function(event) {
        /*Session.set("whichMainPanel", "campaignsAll");*/
        Session.set("whichMainPanel", "restaurantAll");
        Template.instance().$('ul#slide-out-homeNavUL').addClass('hide');
        
        Materialize.showStaggeredList('#slide-out-restaurantNavUL');
        Template.instance().$('ul#slide-out-restaurantNavUL').removeClass('hide');

    },
    "click .sideNavEmailItem": function(event) {
        Session.set("whichMainPanel", "email");
    },
    "click .sideNavAnalyticsItem": function(event) {
        Session.set("whichMainPanel", "analytics");
    },
    "click .sideNavConnectionStatus": function(event) {
        Session.set("whichMainPanel", "socioConnectionStatus");
    },
    "click .campaignNow": function(event) {
        Session.set("whichMainPanel", "newCampaignWizard");
    },
    "click .newFacebookPost": function(event) {
        Session.set("whichMainPanel", "campaignsFacebookTmpl");
    },
    "click .restaurantAnalyticsNavLI": function(event) {
        Session.set("whichMainPanel", "restaurantAnalyticsTmpl");
    }

});

Template.mainContentWrapper.helpers({
    whichMainPanelHelper:function(){
        
        var whichMainPanelVar = Session.get("whichMainPanel");
        
        if(whichMainPanelVar === undefined ){
            whichMainPanelVar="feedsAll";
        }
        
        console.log("whichMainPanelHelper : "+whichMainPanelVar);
        
        return whichMainPanelVar;
    }
});

Template.sideNavTemp.helpers({
    whichMainPanelHelper:function(){
        
        var whichMainPanelVar = Session.get("whichMainPanel");
        
        if(whichMainPanelVar === undefined ){
            whichMainPanelVar="feedsAll";
        }
        
        console.log("whichMainPanelHelper : "+whichMainPanelVar);
        
        return whichMainPanelVar;
    }
});

Template.sideNavTemp.onRendered(function () {
    Template.instance().$('ul#slide-out-campaignsNavUL').addClass('hide');
    Template.instance().$('ul#slide-out-restaurantNavUL').addClass('hide');
});