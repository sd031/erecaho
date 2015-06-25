Template.newCampaignWizard.onRendered(function(){
	var i=1;
	newCampWzrdtmepisnta=Template.instance().$('div#newCampaignWizardFormProgress');
	window.setInterval(function(){
		i=i+1;
		newCampWzrdtmepisnta.css('width',i+'%');
	}, 100);
});