//Facebook configs

window.fbAsyncInit = function() {
  FB.init({
    appId      : '406989749482439',
    xfbml      : true,
    version    : 'v2.2',
    status     : true
  });
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

Accounts.ui.config({
  requestPermissions: {
    
    facebook: ['email', 'public_profile', 'user_friends','read_stream','user_likes', 'manage_pages','publish_pages','read_insights']
  }

});

//initializing modal for choosing image modal


Template.newFbMsgTemplateCardBased.onRendered(function () {
  $('.modal-trigger').leanModal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: '.5',// Opacity of modal background
      in_duration: 300, // Transition in duration
      out_duration: 200, // Transition out duration
      //ready: function() { alert('Ready'); }, // Callback for Modal open
      //complete: function() { alert('Closed'); } // Callback for Modal close
    });

});

Template.newFbMsgTemplateCardBased.helpers({
  fbImagesuploads: function(){
    console.log("helper called");
    return FBImagesCollection.find();
  },

  selectedImageFSFileHelper: function(){
    return FBImagesCollection.findOne(Session.get("selectedFBIdentifierClassSession"));
  }
});

//Post new FB posts

Template.newFbMsgTemplateCardBased.events({

  "change .uploadImageClass": function(event, template) {
    event.preventDefault();
    FS.Utility.eachFile(event, function (file){
      var fileObj = new FS.File(file);
      //tstFileObj=fileObj;
      FBImagesCollection.insert(file, function(err){
        if(err){
          console.log("error is : "+err);
        }
      });
    });
  },

  "click .selectedFBIdentifierClass": function(event, template){
    Session.set("selectedFBIdentifierClassSession", event.target.id);
  },

  "submit .newFBMsgForm": function(event, details){
    tstevent=event;
    event.originalEvent.preventDefault;
    console.log("cpature new fb post msg");

    $(event.target.getElementsByClassName('newFBMsgFormSubmitBtn')).addClass("disabled");
    $(event.target.getElementsByClassName('newFBMsgFormSubmitBtnPreLoader')).removeClass("hide");
    var imageURLForFBUpload="http://localhost:3000"+event.target.getElementsByClassName('imageClassForFBUpload')[0].getAttribute('src');
    console.log("imageURLForFBUpload : "+imageURLForFBUpload);
    /* make the API call for publishing photo using /{page-id}/photos*/

    
    FB.api('/me/accounts', function (response) {
            //console.log(response);
            page_acs_token=response.data[0].access_token;

            FB.api(
                "/1558622937701203/photos",
                "POST",
                {
                    "url": "http://www.metalchild.net/wp-content/uploads/2011/08/skalmold-wide.jpeg",
                    "access_token": page_acs_token  
                },
                function (response) {
                  if (response && !response.error) {
                    /* handle the result */
                    console.log("photo uploaded mast");
                  }
                  else{
                    console.log("jhol in photo upload : ");
                    //console.log(response.error);
                  }
                }
            );

            FB.api(
                    "/1558622937701203/feed",
                    "POST",
                    {
                        "message": event.target.newFBMsgTextArea.value,
                        "access_token": page_acs_token,
                        "link": event.target.newFBMsgLunkURLInput.value
                    },
                    function (response) {
                      if (response && !response.error) {
                        event.target.newFBMsgTextArea.value="";
                        event.target.newFBMsgLunkURLInput.value="";
                        // handle the result 
                        //qwe=response;

                        var d = new Date();
                        var t= d.getTime();
                        $(event.target.getElementsByClassName('newFBMsgFormSubmitBtn')).removeClass("disabled");
                        $(event.target.getElementsByClassName('newFBMsgFormSubmitBtnPreLoader')).addClass("hide");
                        console.log("timstamp : "+t);
                        Materialize.toast('Success!', 4000); // 4000 is the duration of the toast

                      }
                      else{
                        event.target.getElementsByClassName('newFBMsgFormSubmitBtn').innerHTML="Error!";
                        $(event.target.getElementsByClassName('newFBMsgFormSubmitBtnPreLoader')).addClass("hide");
                      }
                    }
                );

        } );

    return false;
  }
});