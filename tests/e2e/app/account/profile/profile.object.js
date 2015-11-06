var loginPage = require('../login/login.object');
var path = require('path');

var ProfilePage = function() {
 
  this.get = function(baseUrl) {
	  browser.ignoreSynchronization = true;
    browser.get(baseUrl);
  };
 
//  this.selectWindow = function(index) {
//	  // wait for handles[index] to exist
//	  browser.wait(function() {
//	    return browser.getAllWindowHandles().then(function(handles) {
//	      /**
//	       * Assume that handles.length >= 1 and index >=0.
//	       * So when calling selectWindow(index) return
//	       * true if handles contains that window.
//	       */
//	      if (handles.length > index) {
//	        return true;
//	      }
//	    });
//	  }, 30000);
//	  // here i know that the requested window exists
//
//	  // switch to the window
//	  return browser.getAllWindowHandles().then(function(handles) {
//	    return browser.switchTo().window(handles[index]);
//	  });
//  };
  
  
  
  this.goToProfilePage = function(dashBoardUrl,loginUserCred) {
	  
	  browser.driver.ignoreSynchronization = true;
	
	  var EC = protractor.ExpectedConditions;
	  
	  var toolTip = element(by.css('.introjs-tooltip'));
	  var isClickable = EC.elementToBeClickable(toolTip);
	  browser.wait(isClickable, 30000);
	  var skipBtn = toolTip.all(by.css('.introjs-tooltipbuttons .introjs-skipbutton')).get(0);
	  isClickable = EC.elementToBeClickable(skipBtn);
	  browser.wait(isClickable, 30000);
	  skipBtn.click().then(function() {
		  
	  var menuItemHeaders = element.all(by.css('.menu-item-header'));
	  var nameHeader = menuItemHeaders.get(1);
	  var isClickable = EC.elementToBeClickable(nameHeader);
	  browser.wait(isClickable, 30000);
	  browser.actions().mouseMove(nameHeader).perform();
	  var profileHeader = element(by.repeater("item in vm.userMenu").row(1));
	  var mainMenuLiList = element.all(by.css('.main-menu li'));
	  var submenuLi = mainMenuLiList.get(1);
	  var profileLink = element(by.partialLinkText('MY PROFILE'));
	  
	  isClickable = EC.elementToBeClickable(profileLink);
	  browser.wait(isClickable, 30000);
	
	  profileLink.click().then(function() {
		  toolTip = element(by.css('.introjs-tooltip'));
		  isClickable = EC.elementToBeClickable(toolTip);
		  browser.wait(isClickable, 30000);
		  skipBtn = toolTip.all(by.css('.introjs-tooltipbuttons .introjs-skipbutton')).get(0);
		  isClickable = EC.elementToBeClickable(skipBtn);
		  browser.wait(isClickable, 30000);
		  skipBtn.click().then(function() {
		  
		  console.log('hii');
		  
//		  var username = element(by.css('.info .handle'));
////		  var isClickable = EC.elementToBeClickable(username);
////		  browser.wait(isClickable, 30000);
////		  console.log('username '+username.getInnerHtml());
//		  expect(username.getInnerHtml()).toEqual(loginUserCred.username);
		  
		  var editProfile = element(by.partialLinkText('EDIT PROFILE'));
		  isClickable = EC.elementToBeClickable(editProfile);
		  browser.wait(isClickable, 60000);
		  editProfile.click().then(function() {
			  var absolutePath = path.resolve(loginUserCred.profilePicDir, loginUserCred.profilePicFile);
			  var imageUpload = element(by.css('.file-upload'));
			  isClickable = EC.elementToBeClickable(imageUpload);
			  browser.wait(isClickable, 30000);
			  console.log('absolutePath'+absolutePath);
			  $('input[type="file"]').sendKeys(absolutePath);
			  var countryId = element(by.id('countryId_value'));
			  countryId.clear();
			  countryId.sendKeys(loginUserCred.country);
			  var countryIdDropDown = element(by.id('countryId_dropdown'));
			  isClickable = EC.elementToBeClickable(countryIdDropDown);
			  browser.wait(isClickable, 30000);
			  countryIdDropDown.all(by.css('.angucomplete-title')).filter(function(elem, index){
				  return elem.getInnerHtml().then(function(text){
					  return text.indexOf(loginUserCred.country) != -1 ;
				  })
			  }).then(function(filteredElements){
				  filteredElements[0].click();
			  });
			  
			  var shortBio = element(by.model('vm.userData.description'));
			  isClickable = EC.elementToBeClickable(shortBio);
			  browser.wait(isClickable, 60000);
			  shortBio.clear();
			  shortBio.sendKeys(loginUserCred.shortBio);
			  var selRep = element.all(by.repeater('track in [\'DESIGN\', \'DEVELOP\', \'DATA_SCIENCE\']'));

			  var designRep = selRep.get(0);
			  var designSwitch = designRep.all(by.css('.onoffswitch .onoffswitch-label')).get(0);
			  var designButton = designRep.all(by.css('.onoffswitch')).get(0);
			  isClickable = EC.elementToBeClickable(designButton);
			  browser.wait(isClickable, 30000);
			  
			  designSwitch.getCssValue('background-color').then(function(backgroundColor){
				  if(backgroundColor == 'rgba(209, 211, 212, 1)') {
					  console.log('d1d design');
					  if(loginUserCred.design == 'y'){
						  designButton.click();
					  }
				  } else{
					  console.log('selected design'+backgroundColor);
					  if(loginUserCred.design != 'y'){
						  designButton.click();
					  }
				  }
			  });
			  
			  var devRep = selRep.get(1);
			  var devSwitch = devRep.all(by.css('.onoffswitch .onoffswitch-label')).get(0);
			  var devButton = devRep.all(by.css('.onoffswitch')).get(0);
			  isClickable = EC.elementToBeClickable(devButton);
			  browser.wait(isClickable, 30000);
			  
			  devSwitch.getCssValue('background-color').then(function(backgroundColor){
				  if(backgroundColor == 'rgba(209, 211, 212, 1)') {
					  console.log('d1d dev');
					  if(loginUserCred.development == 'y'){
						  devButton.click();
					  }
				  } else{
					  console.log('selected dev '+backgroundColor);
					  if(loginUserCred.design != 'y'){
						  devButton.click();
					  }
				  }
			  });
			  
			  var dataScienceRep = selRep.get(2);
			  var dataScienceSwitch = dataScienceRep.all(by.css('.onoffswitch .onoffswitch-label')).get(0);
			  var dataScienceButton = dataScienceRep.all(by.css('.onoffswitch')).get(0);
			  isClickable = EC.elementToBeClickable(dataScienceButton);
			  browser.wait(isClickable, 30000);
			  
			  
			  dataScienceSwitch.getCssValue('background-color').then(function(backgroundColor){
				  if(backgroundColor == 'rgba(209, 211, 212, 1)') {
					  console.log('d1d science');
					  if(loginUserCred.dataScience == 'y'){
						  dataScienceButton.click();
					  }
				  } else{
					  console.log('selected science'+backgroundColor);
					  if(loginUserCred.dataScience != 'y'){
						  dataScienceButton.click();
					  }
				  }
			  });
			  
			  
			  var submitBtn = element(by.css('.settings-container .save-section button'));
			  isClickable = EC.elementToBeClickable(submitBtn);
			  browser.wait(isClickable, 30000);
			  
			  if(loginUserCred.design != 'y' && loginUserCred.development != 'y' && loginUserCred.dataScience != 'y'){
				  browser.actions().mouseMove(submitBtn).perform();
				  submitBtn.click();
			  } else {
				  browser.actions().mouseMove(submitBtn).perform();
				  submitBtn.click();//.then(function(){
					  this.selectWindow(1);
					  var toasterList = element.all(by.repeater('toaster in toasters'));
					  var firstToaster = toasterList.get(0);
					  isClickable = EC.elementToBeClickable(firstToaster);
					  browser.wait(isClickable, 30000);
					  var toastCloseBtn = firstToaster.all(by.css('.toast-close-button')).get(0);
					  isClickable = EC.elementToBeClickable(toastCloseBtn);
					  browser.wait(isClickable, 30000);
					  var toasterTitle = firstToaster.all(by.css('.toast-title')).get(0);
					  isClickable = EC.elementToBeClickable(toasterTitle);
					  browser.wait(isClickable, 30000);
					  toastCloseBtn.click();
					  
//				  });
				  /*.then(function(){
//					  browser.driver.navigate().refresh();
					  var countryId = element(by.id('countryId_value'));
					  isClickable = EC.elementToBeClickable(countryId);
					  browser.wait(isClickable, 30000);
					  expect(countryId.getText()).toContain(loginUserCred.country);
					  var shortBio = element(by.model('vm.userData.description'));
					  expect(loginUserCred.shortBio).toContain(shortBio.getText());
					  var selRep = element.all(by.repeater('track in [\'DESIGN\', \'DEVELOP\', \'DATA_SCIENCE\']'));

					  var designRep = selRep.get(0);
					  var designSwitch = designRep.all(by.css('.onoffswitch .onoffswitch-label')).get(0);
					  var designButton = designRep.all(by.css('.onoffswitch')).get(0);
					  isClickable = EC.elementToBeClickable(designButton);
					  browser.wait(isClickable, 30000);
					  
					  designSwitch.getCssValue('background-color').then(function(backgroundColor){
						  if(loginUserCred.design == 'y'){
							  expect(backgroundColor).toEqual('rgba(0, 150, 255, 1)');
						  } else {
							  expect(backgroundColor).toEqual('rgba(209, 211, 212, 1)');
						  }
					  });
					  
					  
					  var devRep = selRep.get(1);
					  var devSwitch = devRep.all(by.css('.onoffswitch .onoffswitch-label')).get(0);
					  var devButton = devRep.all(by.css('.onoffswitch')).get(0);
					  isClickable = EC.elementToBeClickable(devButton);
					  browser.wait(isClickable, 30000);
					  
					  devSwitch.getCssValue('background-color').then(function(backgroundColor){
						  if(loginUserCred.development == 'y'){
							  expect(backgroundColor).toEqual('rgba(0, 150, 255, 1)');
						  } else {
							  expect(backgroundColor).toEqual('rgba(209, 211, 212, 1)');
						  }
					  });
					  
					  
					  var dataScienceRep = selRep.get(2);
					  var dataScienceSwitch = dataScienceRep.all(by.css('.onoffswitch .onoffswitch-label')).get(0);
					  var dataScienceButton = dataScienceRep.all(by.css('.onoffswitch')).get(0);
					  isClickable = EC.elementToBeClickable(devButton);
					  browser.wait(isClickable, 30000);
					  
					  dataScienceSwitch.getCssValue('background-color').then(function(backgroundColor){
						  if(loginUserCred.dataScience == 'y'){
							  expect(backgroundColor).toEqual('rgba(0, 150, 255, 1)');
						  } else {
							  expect(backgroundColor).toEqual('rgba(209, 211, 212, 1)');
						  }
					  });
					  
					  
					  
					  
					  
				  });*/
			  }
			  
			  
			  
			  
		  });
		  });
	  });
  });
  };
  
  
  
  this.verifyProfileChanges = function(dashBoardUrl,loginUserCred){
	  browser.driver.ignoreSynchronization = true;
		
	  var EC = protractor.ExpectedConditions;
	  var menuItemHeaders = element.all(by.css('.menu-item-header'));
	  var nameHeader = menuItemHeaders.get(1);
	  var isClickable = EC.elementToBeClickable(nameHeader);
	  browser.wait(isClickable, 30000);
	  browser.actions().mouseMove(nameHeader).perform();
	  var profileHeader = element(by.repeater("item in vm.userMenu").row(1));
	  var mainMenuLiList = element.all(by.css('.main-menu li'));
	  var submenuLi = mainMenuLiList.get(1);
	  var profileLink = element(by.partialLinkText('MY PROFILE'));
	  
	  isClickable = EC.elementToBeClickable(profileLink);
	  browser.wait(isClickable, 30000);
	
	  profileLink.click().then(function() {
		  var editProfile = element(by.partialLinkText('EDIT PROFILE'));
		  isClickable = EC.elementToBeClickable(editProfile);
		  browser.wait(isClickable, 60000);
		  editProfile.click().then(function() {

//	  browser.driver.navigate().refresh();
	  var countryId = element(by.id('countryId_value'));
	  isClickable = EC.elementToBeClickable(countryId);
	  browser.wait(isClickable, 30000);
//	  expect(countryId.getText()).toContain(loginUserCred.country);
	  var shortBio = element(by.model('vm.userData.description'));
	  expect(loginUserCred.shortBio).toEqual(shortBio.getText());
	  var selRep = element.all(by.repeater('track in [\'DESIGN\', \'DEVELOP\', \'DATA_SCIENCE\']'));

	  var designRep = selRep.get(0);
	  var designSwitch = designRep.all(by.css('.onoffswitch .onoffswitch-label')).get(0);
	  var designButton = designRep.all(by.css('.onoffswitch')).get(0);
	  isClickable = EC.elementToBeClickable(designButton);
	  browser.wait(isClickable, 30000);
	  
	  designSwitch.getCssValue('background-color').then(function(backgroundColor){
		  if(loginUserCred.design == 'y'){
			  expect(backgroundColor).toEqual('rgba(0, 150, 255, 1)');
		  } else {
			  expect(backgroundColor).toEqual('rgba(209, 211, 212, 1)');
		  }
	  });
	  
	  
	  var devRep = selRep.get(1);
	  var devSwitch = devRep.all(by.css('.onoffswitch .onoffswitch-label')).get(0);
	  var devButton = devRep.all(by.css('.onoffswitch')).get(0);
	  isClickable = EC.elementToBeClickable(devButton);
	  browser.wait(isClickable, 30000);
	  
	  devSwitch.getCssValue('background-color').then(function(backgroundColor){
		  if(loginUserCred.development == 'y'){
			  expect(backgroundColor).toEqual('rgba(0, 150, 255, 1)');
		  } else {
			  expect(backgroundColor).toEqual('rgba(209, 211, 212, 1)');
		  }
	  });
	  
	  
	  var dataScienceRep = selRep.get(2);
	  var dataScienceSwitch = dataScienceRep.all(by.css('.onoffswitch .onoffswitch-label')).get(0);
	  var dataScienceButton = dataScienceRep.all(by.css('.onoffswitch')).get(0);
	  isClickable = EC.elementToBeClickable(devButton);
	  browser.wait(isClickable, 30000);
	  
	  dataScienceSwitch.getCssValue('background-color').then(function(backgroundColor){
		  if(loginUserCred.dataScience == 'y'){
			  expect(backgroundColor).toEqual('rgba(0, 150, 255, 1)');
		  } else {
			  expect(backgroundColor).toEqual('rgba(209, 211, 212, 1)');
		  }
	  });
	  });
	  });
	  
	  
	  
	  
  
  };
  
  
this.goToProfileSkill = function(dashBoardUrl,loginUserCred) {
	  
	  browser.driver.ignoreSynchronization = true;
//	  console.log(browser.driver.ignoreSynchronization +'browser.driver.ignoreSynchronization');
	
	  var EC = protractor.ExpectedConditions;
	  var until = protractor.until;
	  
	  var toolTip = element(by.css('.introjs-tooltip'));
	  var isClickable = EC.elementToBeClickable(toolTip);
	  browser.wait(isClickable, 30000);
	  var skipBtn = toolTip.all(by.css('.introjs-tooltipbuttons .introjs-skipbutton')).get(0);
	  isClickable = EC.elementToBeClickable(skipBtn);
	  browser.wait(isClickable, 30000);
	  skipBtn.click().then(function() {
		  
	  var menuItemHeaders = element.all(by.css('.menu-item-header'));
	  var nameHeader = menuItemHeaders.get(1);
	  var isClickable = EC.elementToBeClickable(nameHeader);
	  browser.wait(isClickable, 30000);
	  browser.actions().mouseMove(nameHeader).perform();
	  var profileHeader = element(by.repeater("item in vm.userMenu").row(1));
	  var mainMenuLiList = element.all(by.css('.main-menu li'));
	  var submenuLi = mainMenuLiList.get(1);
	  var profileLink = element(by.partialLinkText('MY PROFILE'));
	  
	  isClickable = EC.elementToBeClickable(profileLink);
	  browser.wait(isClickable, 30000);
	
	  profileLink.click().then(function() {
		  toolTip = element(by.css('.introjs-tooltip'));
		  isClickable = EC.elementToBeClickable(toolTip);
		  browser.wait(isClickable, 30000);
		  skipBtn = toolTip.all(by.css('.introjs-tooltipbuttons .introjs-skipbutton')).get(0);
		  isClickable = EC.elementToBeClickable(skipBtn);
		  browser.wait(isClickable, 30000);
		  skipBtn.click().then(function() {
		  
		  console.log('hii');
		  
//		  var username = element(by.css('.info .handle'));
////		  var isClickable = EC.elementToBeClickable(username);
////		  browser.wait(isClickable, 30000);
////		  console.log('username '+username.getInnerHtml());
//		  expect(username.getInnerHtml()).toEqual(loginUserCred.username);
		  
		  var editProfile = element(by.partialLinkText('EDIT PROFILE'));
		  isClickable = EC.elementToBeClickable(editProfile);
		  browser.wait(isClickable, 60000);
		  editProfile.click().then(function() {
			  
			  var skillSet = element(by.id('tagId_value'));
			  isClickable = EC.elementToBeClickable(skillSet);
			  browser.wait(isClickable, 60000);
//			  for(var i=0; i<loginUserCred.skillSet.length; i++) {
			  skillSet.clear();
			  skillSet.sendKeys(loginUserCred.skillSet[0]);
//				  skillSet.sendKeys(loginUserCred.skillSet[0]).then(function(){
					  var skillSetDropDown = element(by.id('tagId_dropdown'));
					  isClickable = EC.elementToBeClickable(skillSetDropDown);
					  browser.wait(isClickable, 60000);
					  
					  browser.debugger();
					  
//					  var row1 = element.all(by.css('.angucomplete-row')).first();
//					  isClickable = EC.elementToBeClickable(row1);
//					  browser.wait(isClickable, 60000);
					   
					  var titleFirst = element(by.css('.angucomplete-title'));
//					  expect(titleFirst.waitReady()).toBeTruthy();
//					  expect(titleFirst.isPresent()).toEqual(true);
					  isClickable = EC.elementToBeClickable(titleFirst);
					  browser.wait(isClickable, 60000);
					  
					  
					  skillSetDropDown.all(by.css('.angucomplete-title')).filter(function(elem, index){
						  return elem.getInnerHtml().then(function(text){
//							  return text.toLowerCase() == loginUserCred.skillSet[i].toLowerCase();
							  return text.indexOf(loginUserCred.skilSet[0]) != -1 ;
						  })
					  }).then(function(filteredElements){
						  filteredElements[0].click();
					  });
//				  });
				  
				  
//				  browser.driver.wait(until.elementLocated(by.css('.angucomplete-row'), 60000));
				  
//				  browser.wait(function() {
//					  var deferred = protractor.promise.defer();
//					  
//					  EC.elementToBeClickable(skillSetDropDown);
//					  element(by.css('.angucomplete-row')).isPresent()
//					  	.then(function (isPresent) {
//					      deferred.fulfill(!isPresent);
//					    });
//					  return deferred.promise;
//					});
				  
//				  browser.pause();
				  
//				  browser.actions().mouseMove(skillSet).perform();
				  
//				  browser.wait(element(by.css('.angucomplete-row')).isPresent());
//				  browser.pause();
//				  skillSetDropDown.all(by.css('.angucomplete-title')).filter(function(elem, index){
//					  return elem.getInnerHtml().then(function(text){
////						  return text.toLowerCase() == loginUserCred.skillSet[i].toLowerCase();
//						  return text.indexOf(loginUserCred.skilSet[0]) != -1 ;
//					  })
//				  }).then(function(filteredElements){
//					  filteredElements[0].click();
//				  });
//			  }
			  
		  });
		  });
	  });
  });
  };
  
  
  
  
  
  
this.goToProfileGitLogin = function(dashBoardUrl,loginUserCred) {
	  
	  browser.driver.ignoreSynchronization = true;
	
	  var EC = protractor.ExpectedConditions;
	  var until = protractor.until;
	  
	  var toolTip = element(by.css('.introjs-tooltip'));
	  var isClickable = EC.elementToBeClickable(toolTip);
	  browser.wait(isClickable, 30000);
	  var skipBtn = toolTip.all(by.css('.introjs-tooltipbuttons .introjs-skipbutton')).get(0);
	  isClickable = EC.elementToBeClickable(skipBtn);
	  browser.wait(isClickable, 30000);
	  skipBtn.click().then(function() {
		  
	  var menuItemHeaders = element.all(by.css('.menu-item-header'));
	  var nameHeader = menuItemHeaders.get(1);
	  var isClickable = EC.elementToBeClickable(nameHeader);
	  browser.wait(isClickable, 30000);
	  browser.actions().mouseMove(nameHeader).perform();
	  var profileHeader = element(by.repeater("item in vm.userMenu").row(1));
	  var mainMenuLiList = element.all(by.css('.main-menu li'));
	  var submenuLi = mainMenuLiList.get(1);
	  var profileLink = element(by.partialLinkText('MY PROFILE'));
	  
	  isClickable = EC.elementToBeClickable(profileLink);
	  browser.wait(isClickable, 30000);
	
	  profileLink.click().then(function() {
		  toolTip = element(by.css('.introjs-tooltip'));
		  isClickable = EC.elementToBeClickable(toolTip);
		  browser.wait(isClickable, 30000);
		  skipBtn = toolTip.all(by.css('.introjs-tooltipbuttons .introjs-skipbutton')).get(0);
		  isClickable = EC.elementToBeClickable(skipBtn);
		  browser.wait(isClickable, 30000);
		  skipBtn.click().then(function() {
		  
		  var editProfile = element(by.partialLinkText('EDIT PROFILE'));
		  isClickable = EC.elementToBeClickable(editProfile);
		  browser.wait(isClickable, 60000);
		  editProfile.click().then(function() {
			  
			  
			  var accountList = element.all(by.repeater('account in accountList | orderBy:\'order\''));
			  var githubAccount = accountList.get(0);
			  var statusList = githubAccount.all(by.css('.status'));
			  if(statusList.get(0).getInnerHtml() == 'Disconnect') {
				if(statusList.get(0).getCssValue('display') == 'none') {
					var faGithub = element(by.css('.el-github'));
					faGithub.click();
					selectWindow(1);
					  browser.driver.wait(function() {
						  var emailId = browser.driver.findElement(by.id('login_field'));
						  console.log('git username');
						  emailId.sendKeys(loginUserCred.gitUsername);
						  return true;
					  },30000);
					  
					  browser.driver.wait(function(){
						 var password = browser.driver.findElement(by.id('password'));
						 password.sendKeys(loginUserCred.gitPassword);
						 console.log(' Git login Passwd');
						 return true;
					  },30000);
					  
					  browser.driver.wait(function(){
							 var signIn = browser.driver.findElement(by.name('commit'));
							 console.log('Git signIn');
							 signIn.click();
							 return true;
					  },30000);
					  
					  browser.getAllWindowHandles().then(function (handles) {
						  browser.switchTo().window(handles[0]);
					  });
					  
					  if(githubAccount.all(by.css('.status')).get(0).getInnerHtml() == 'Connecting'){
						  expect(true).toEqual(true);
					  };
					
					
				}  
			  }
		  });
		  });
	  });
  });
  };
  
  
  
  
  
  
this.goToProfileBitBucketLogin = function(dashBoardUrl,loginUserCred) {
	  
	  browser.driver.ignoreSynchronization = true;
	
	  var EC = protractor.ExpectedConditions;
	  var until = protractor.until;
	  
	  var toolTip = element(by.css('.introjs-tooltip'));
	  var isClickable = EC.elementToBeClickable(toolTip);
	  browser.wait(isClickable, 30000);
	  var skipBtn = toolTip.all(by.css('.introjs-tooltipbuttons .introjs-skipbutton')).get(0);
	  isClickable = EC.elementToBeClickable(skipBtn);
	  browser.wait(isClickable, 30000);
	  skipBtn.click().then(function() {
		  
	  var menuItemHeaders = element.all(by.css('.menu-item-header'));
	  var nameHeader = menuItemHeaders.get(1);
	  var isClickable = EC.elementToBeClickable(nameHeader);
	  browser.wait(isClickable, 30000);
	  browser.actions().mouseMove(nameHeader).perform();
	  var profileHeader = element(by.repeater("item in vm.userMenu").row(1));
	  var mainMenuLiList = element.all(by.css('.main-menu li'));
	  var submenuLi = mainMenuLiList.get(1);
	  var profileLink = element(by.partialLinkText('MY PROFILE'));
	  
	  isClickable = EC.elementToBeClickable(profileLink);
	  browser.wait(isClickable, 30000);
	
	  profileLink.click().then(function() {
		  toolTip = element(by.css('.introjs-tooltip'));
		  isClickable = EC.elementToBeClickable(toolTip);
		  browser.wait(isClickable, 30000);
		  skipBtn = toolTip.all(by.css('.introjs-tooltipbuttons .introjs-skipbutton')).get(0);
		  isClickable = EC.elementToBeClickable(skipBtn);
		  browser.wait(isClickable, 30000);
		  skipBtn.click().then(function() {
		  
		  var editProfile = element(by.partialLinkText('EDIT PROFILE'));
		  isClickable = EC.elementToBeClickable(editProfile);
		  browser.wait(isClickable, 60000);
		  editProfile.click().then(function() {
			  var imageUpload = element(by.css('.file-upload'));
			  isClickable = EC.elementToBeClickable(imageUpload);
			  browser.wait(isClickable, 30000);
			  
			  
			  var accountList = element.all(by.css('.links .ext-tile'));
			  var githubAccount = accountList.get(6);
			  isClickable = EC.elementToBeClickable(githubAccount);
			  browser.wait(isClickable, 60000);
			  
			  var statusList = githubAccount.all(by.css('.status'));
			  expect(statusList.get(0).getInnerHtml()).toEqual('Disconnect');
			  statusList.get(0).getInnerHtml().then(function(statusType){
				  if(statusType == 'Disconnect'){
					  console.log('status type' + statusType);
					  statusList.get(0).getCssValue('display').then(function(displayType) {
						  console.log('status display' + displayType);
						  if(displayType == 'none') {
							  var faGithub = element(by.css('.el-bitbucket'));
								faGithub.click();
								loginPage.selectWindow(1);
								  browser.driver.wait(function() {
									  var emailId = browser.driver.findElement(by.id('id_username'));
									  console.log('git username');
									  emailId.sendKeys(loginUserCred.gitUserName);
									  return true;
								  },30000);
								  
								  browser.driver.wait(function(){
									 var password = browser.driver.findElement(by.id('id_password'));
									 password.sendKeys(loginUserCred.gitPassword);
									 console.log(' Git login Passwd');
									 return true;
								  },30000);
								  
								  browser.driver.wait(function(){
									  var signIn = browser.driver.findElement(by.name('submit'));
									  console.log('Git signIn');
									  signIn.click().then(function(){
//										  loginPage.selectWindow(1);
										  browser.driver.wait(function(){
											  var signIn1 = element(by.name('submit'));
											  signIn1.isPresent().then(function(present){
												 if(present == 'true'){
													 console.log('Git submit access');
													 signIn1.click();
													 return true;
												 } else {
													 console.log('present '+present)
												 }
											  });

										  },60000);
									  });
									  return true;
								  },30000);
//								  loginPage.selectWindow(1);
								  
								  
								  browser.getAllWindowHandles().then(function (handles) {
									  browser.switchTo().window(handles[0]);
								  });
								  
								  if(githubAccount.all(by.css('.status')).get(0).getInnerHtml() == 'Connecting'){
									  expect(true).toEqual(true);
								  };
						  } 
					  });
				  }else {
					  console.log('i am here .. get me');
				  }
			  })
			  /*
			  if(statusList.get(0).getInnerHtml() == 'Disconnect') {
				  expect(statusList.get(0).getAttirbute('display').toEqual('none'));
				if(statusList.get(0).getAttirbute('display') == 'none') {
					var faGithub = element(by.css('.el-bitbucket'));
					faGithub.click();
					this.selectWindow(1);
					  browser.driver.wait(function() {
						  var emailId = browser.driver.findElement(by.id('id_username'));
						  console.log('git username');
						  emailId.sendKeys(loginUserCred.gitUsername);
						  return true;
					  },30000);
					  
					  browser.driver.wait(function(){
						 var password = browser.driver.findElement(by.id('id_password'));
						 password.sendKeys(loginUserCred.gitPassword);
						 console.log(' Git login Passwd');
						 return true;
					  },30000);
					  
					  browser.driver.wait(function(){
						  var signIn = browser.driver.findElement(by.name('submit'));
						  console.log('Git signIn');
						  signIn.click();
						  return true;
					  },30000);
					  
					  browser.getAllWindowHandles().then(function (handles) {
						  browser.switchTo().window(handles[0]);
					  });
					  
					  if(githubAccount.all(by.css('.status')).get(0).getInnerHtml() == 'Connecting'){
						  expect(true).toEqual(true);
					  };
					
					
				}  
			  } else {
				  console.log('i am here .. get me');
			  }*/
		  });
		  });
	  });
  });
  };
  
  
  
   
  
  /*
  this.invalidPasswordLogin = function(loginUser, errMsg) {
	  browser.driver.ignoreSynchronization = true;
		
	  var EC = protractor.ExpectedConditions;
		
	  var userInput = element(by.model('vm.username'));
	  var isClickable = EC.elementToBeClickable(userInput);
	  browser.wait(isClickable, 30000);
	  userInput.sendKeys(loginUser.username);
  	
	  var passwordInput = element(by.model('vm.currentPassword'));
	  isClickable = EC.elementToBeClickable(passwordInput);
	  browser.wait(isClickable, 30000);
	  passwordInput.sendKeys(loginUser.password);
	  
	  console.log('password '+loginUser.password);
	  
	  var loginButton = browser.driver.findElement(By.css('.enabled-button'));
//	  isClickable = EC.elementToBeClickable(loginButton);
//	  browser.wait(isClickable, 30000);
	  console.log('userInput'); 
	  
    
	  loginButton.click().then(function(){
		  username = element(by.model('vm.username'));
		  var userNameAvail = username.isPresent();
		  console.log('user name status'+userNameAvail);
		  var formError = element(by.css('.form-errors')).all(by.css('.form-error')).get(1);
		  isClickable = EC.elementToBeClickable(formError);
		  browser.wait(isClickable, 30000);
		  console.log('text '+formError.getInnerHtml());
		  expect(formError.getInnerHtml()).toEqual(errMsg);
//		  expect(formError.isDisplayed()).toEqual(true);
		  
//    	element.all(by.css('.label')).each(function(element, index) {
//    		
//    	var isClickable = EC.elementToBeClickable(element);
//    	browser.wait(isClickable, 10000);
// 		element.getText().then(function (text) {
// 			console.log(index, text);
// 		});
//    });
    	expect(true).toEqual(true);
   });
  };
  
  
  this.invalidPasswordLogin = function(loginUser, errMsg) {
	  browser.driver.ignoreSynchronization = true;
		
	  var EC = protractor.ExpectedConditions;
		
	  var userInput = element(by.model('vm.username'));
	  var isClickable = EC.elementToBeClickable(userInput);
	  browser.wait(isClickable, 30000);
	  userInput.sendKeys(loginUser.username);
  	
	  var passwordInput = element(by.model('vm.currentPassword'));
	  isClickable = EC.elementToBeClickable(passwordInput);
	  browser.wait(isClickable, 30000);
	  passwordInput.sendKeys(loginUser.password);
	  
	  console.log('password '+loginUser.password);
	  
	  var loginButton = browser.driver.findElement(By.css('.enabled-button'));
//	  isClickable = EC.elementToBeClickable(loginButton);
//	  browser.wait(isClickable, 30000);
	  console.log('userInput'); 
	  
    
	  loginButton.click().then(function(){
		  username = element(by.model('vm.username'));
		  var userNameAvail = username.isPresent();
		  console.log('user name status'+userNameAvail);
		  var formError = element(by.css('.form-errors')).all(by.css('.form-error')).get(1);
		  isClickable = EC.elementToBeClickable(formError);
		  browser.wait(isClickable, 30000);
		  console.log('text '+formError.getInnerHtml());
		  expect(formError.getInnerHtml()).toEqual(errMsg);
//		  expect(formError.isDisplayed()).toEqual(true);
		  
//    	element.all(by.css('.label')).each(function(element, index) {
//    		
//    	var isClickable = EC.elementToBeClickable(element);
//    	browser.wait(isClickable, 10000);
// 		element.getText().then(function (text) {
// 			console.log(index, text);
// 		});
//    });
    	expect(true).toEqual(true);
   });
  };
  
  
  
  this.invalidSpaceHandleLogin = function(loginUser, errMsg) {
	  browser.driver.ignoreSynchronization = true;
		
	  var EC = protractor.ExpectedConditions;
		
	  var userInput = element(by.model('vm.username'));
	  var isClickable = EC.elementToBeClickable(userInput);
	  browser.wait(isClickable, 30000);
	  userInput.sendKeys(loginUser.username);
  	
	  var passwordInput = element(by.model('vm.currentPassword'));
	  isClickable = EC.elementToBeClickable(passwordInput);
	  browser.wait(isClickable, 30000);
	  passwordInput.sendKeys(loginUser.password);
	  
	  console.log('password '+loginUser.password);
	  
	  var loginButton = browser.driver.findElement(By.css('.enabled-button'));
//	  isClickable = EC.elementToBeClickable(loginButton);
//	  browser.wait(isClickable, 30000);
	  console.log('userInput'); 
	  
    
	  loginButton.click().then(function(){
		  username = element(by.model('vm.username'));
		  var userNameAvail = username.isPresent();
		  console.log('user name status'+userNameAvail);
		  var formError = element(by.css('.form-errors')).all(by.css('.form-error')).get(1);
		  isClickable = EC.elementToBeClickable(formError);
		  browser.wait(isClickable, 30000);
		  console.log('text '+formError.getInnerHtml());
		  expect(formError.getInnerHtml()).toEqual(errMsg);
//		  expect(formError.isDisplayed()).toEqual(true);
		  
//    	element.all(by.css('.label')).each(function(element, index) {
//    		
//    	var isClickable = EC.elementToBeClickable(element);
//    	browser.wait(isClickable, 10000);
// 		element.getText().then(function (text) {
// 			console.log(index, text);
// 		});
//    });
    	expect(true).toEqual(true);
   });  
  };
  
  this.invalidUserName = function(loginUser, errMsg) {
	  browser.driver.ignoreSynchronization = true;
		
	  var EC = protractor.ExpectedConditions;
		
	  var userInput = element(by.model('vm.username'));
	  var isClickable = EC.elementToBeClickable(userInput);
	  browser.wait(isClickable, 30000);
	  userInput.sendKeys(loginUser.username);
  	
	  var passwordInput = element(by.model('vm.currentPassword'));
	  isClickable = EC.elementToBeClickable(passwordInput);
	  browser.wait(isClickable, 30000);
	  passwordInput.sendKeys(loginUser.password);
	  
	  console.log('password '+loginUser.password);
	  
	  var loginButton = browser.driver.findElement(By.css('.enabled-button'));
//	  isClickable = EC.elementToBeClickable(loginButton);
//	  browser.wait(isClickable, 30000);
	  console.log('userInput'); 
	  
    
	  loginButton.click().then(function(){
		  username = element(by.model('vm.username'));
		  var userNameAvail = username.isPresent();
		  console.log('user name status'+userNameAvail);
		  var formError = element(by.css('.form-errors')).all(by.css('.form-error')).get(1);
		  isClickable = EC.elementToBeClickable(formError);
		  browser.wait(isClickable, 30000);
		  console.log('text '+formError.getInnerHtml());
		  expect(formError.getInnerHtml()).toEqual(errMsg);
//		  expect(formError.isDisplayed()).toEqual(true);
		  
//    	element.all(by.css('.label')).each(function(element, index) {
//    		
//    	var isClickable = EC.elementToBeClickable(element);
//    	browser.wait(isClickable, 10000);
// 		element.getText().then(function (text) {
// 			console.log(index, text);
// 		});
//    });
    	expect(true).toEqual(true);
   });
  };
  
  
  
  this.twitterLogin = function(loginUser1) {
	  browser.driver.ignoreSynchronization = true;
	  
	  var bD = browser.driver;
	  var EC = protractor.ExpectedConditions;
	  console.log('twitter login');
	  
	  var userInput = element(by.model('vm.username'));
	  var isClickable = EC.elementToBeClickable(userInput);
	  browser.wait(isClickable, 30000);
	  
	  var twitterSquare = browser.driver.findElement(by.css('.social-icons .twitter .ico'));
	  twitterSquare.click();
	  this.selectWindow(1);
	  browser.driver.wait(function() {
		  var emailId = browser.driver.findElement(by.id('username_or_email'));
		  console.log('twitter username');
		  emailId.sendKeys(loginUser1.username);
		  return true;
	  },30000);
	  browser.driver.wait(function() {
		  var password = browser.driver.findElement(by.id('password'));
		  console.log('twitter password');
		  password.sendKeys(loginUser1.password);
		  return true;
	  },30000);
	  
	  browser.driver.wait(function(){
		 var loginBtn = browser.driver.findElement(by.css('.submit'));
		 console.log(' twitter login button');
		 loginBtn.click();
		 return true;
	  },30000);
	  
	  
	  
	  browser.getAllWindowHandles().then(function (handles) {
		  browser.switchTo().window(handles[0]);
	  });
	  
	  var headerDash = element(by.css('.header-dashboard header h1'));
	  var isClickable = EC.elementToBeClickable(headerDash);
	  browser.wait(isClickable, 30000);
	  
	  
	  var menuItemHeaderList = element.all(by.css('.menu-item-header'));
	  var menuItemHeader = menuItemHeaderList.get(1);
	  var username = menuItemHeader.all(by.css('.username')).get(0);
	  isClickable = EC.elementToBeClickable(username);
	  browser.wait(isClickable, 30000);
	  
	  console.log('out of twitter login');
	  expect(true).toEqual(true);
	  
  };
  
  
  
  
  this.fbLogin = function(loginUser1) {
	 
	  browser.driver.ignoreSynchronization = true;
	  
	  var bD = browser.driver;
	  var EC = protractor.ExpectedConditions;
	  console.log('twitter login');
	  
	  var userInput = element(by.model('vm.username'));
	  var isClickable = EC.elementToBeClickable(userInput);
	  browser.wait(isClickable, 30000);
	  
	  var fbSquare = browser.driver.findElement(by.css('.social-icons .facebook .ico'));
	  fbSquare.click();
	  this.selectWindow(1);
	  browser.driver.wait(function() {
		  var emailId = browser.driver.findElement(by.id('email'));
		  console.log('fb username');
		  emailId.sendKeys(loginUser1.username);
		  return true;
	  },30000);
	  
	  browser.driver.wait(function() {
		  var password = browser.driver.findElement(by.id('pass'));
		  console.log('fb password');
		  password.sendKeys(loginUser1.password);
		  return true;
	  },30000);
	  
	  browser.driver.wait(function(){
		 var loginBtn = browser.driver.findElement(by.id('u_0_2'));
		 console.log(' fb login button');
		 loginBtn.click();
		 return true;
		 
	  },30000);
	  
	  browser.getAllWindowHandles().then(function (handles) {
		  browser.switchTo().window(handles[0]);
	  });
	  
	  var headerDash = element(by.css('.header-dashboard header h1'));
	  var isClickable = EC.elementToBeClickable(headerDash);
	  browser.wait(isClickable, 30000);
	  
	  
	  var menuItemHeaderList = element.all(by.css('.menu-item-header'));
	  var menuItemHeader = menuItemHeaderList.get(1);
	  var username = menuItemHeader.all(by.css('.username')).get(0);
	  isClickable = EC.elementToBeClickable(username);
	  browser.wait(isClickable, 30000);
	  
	  
	  
	  
//	  this.selectWindow(0);
	  /*browser.driver.wait(function() {
		  browser.driver.findElement(by.css('.social-icons .fa-facebook-square')).then(function(elem) {   
			  console.log('fb login');
			  elem.click();
				  browser.driver.findElement(by.id('email')).then(function(elem){
					  elem.sendKeys(loginUser1.username);
					  console.log('fb username');
					  return true;
				  });
				  browser.driver.findElement(by.id('pass')).then(function(elem){
					  elem.sendKeys(loginUser1.password);
					  console.log('fb password ');
					  return true;
				  });
				  browser.driver.findElement(by.id('u_0_2')).then(function(elem){
					  elem.click();
					  console.log(' fb login button');
					  return true;
				  });
				  
			  console.log('fb login click');
			  return true;
		  });
	  },30000);
	  
	  console.log('out of fb login');
	  expect(true).toEqual(true);
	  
  };
  
  
  
  this.googleLogin = function(loginUser1) {
	  browser.driver.ignoreSynchronization = true;
	  
	  var bD = browser.driver;
	  var EC = protractor.ExpectedConditions;
	  console.log('google login');
	  
	  var userInput = element(by.model('vm.username'));
	  var isClickable = EC.elementToBeClickable(userInput);
	  browser.wait(isClickable, 30000);
	  
	  var fbSquare = browser.driver.findElement(by.css('.social-icons .google-plus .ico'));
	  fbSquare.click();
	  this.selectWindow(1);
	  browser.driver.wait(function() {
		  var emailId = browser.driver.findElement(by.id('Email'));
		  console.log('google username');
		  emailId.sendKeys(loginUser1.username);
		  return true;
	  },30000);
	  
	  browser.driver.wait(function() {
		  var next = browser.driver.findElement(by.id('next'));
		  console.log('google next');
		  next.click();
		  return true;
	  },30000);
	  
	  browser.driver.wait(function(){
		 var password = browser.driver.findElement(by.id('Passwd'));
		 password.sendKeys(loginUser1.password);
		 console.log(' google login Passwd');
		 return true;
	  },30000);
	  
	  browser.driver.wait(function(){
			 var signIn = browser.driver.findElement(by.id('signIn'));
			 console.log('google signIn');
			 signIn.click();
			 return true;
	  },30000);
	  
	  browser.getAllWindowHandles().then(function (handles) {
		  browser.switchTo().window(handles[0]);
	  });
	  
	  var headerDash = element(by.css('.header-dashboard header h1'));
	  var isClickable = EC.elementToBeClickable(headerDash);
	  browser.wait(isClickable, 30000);
	  
	  
	  var menuItemHeaderList = element.all(by.css('.menu-item-header'));
	  var menuItemHeader = menuItemHeaderList.get(1);
	  var username = menuItemHeader.all(by.css('.username')).get(0);
	  isClickable = EC.elementToBeClickable(username);
	  browser.wait(isClickable, 30000);
	  
	  console.log('out of google login');
	  expect(true).toEqual(true);
  };
  
  
  
  this.gitLogin = function(loginUser1) {
	  browser.driver.ignoreSynchronization = true;
	  
	  var bD = browser.driver;
	  var EC = protractor.ExpectedConditions;
	  console.log('git login');
	  
	  var userInput = element(by.model('vm.username'));
	  var isClickable = EC.elementToBeClickable(userInput);
	  browser.wait(isClickable, 30000);
	  
	  var gitSquare = browser.driver.findElement(by.css('.social-icons .github .ico'));
	  gitSquare.click();
	  this.selectWindow(1);
	  browser.driver.wait(function() {
		  var emailId = browser.driver.findElement(by.id('login_field'));
		  console.log('git username');
		  emailId.sendKeys(loginUser1.username);
		  return true;
	  },30000);
	  
	  browser.driver.wait(function(){
		 var password = browser.driver.findElement(by.id('password'));
		 password.sendKeys(loginUser1.password);
		 console.log(' Git login Passwd');
		 return true;
	  },30000);
	  
	  browser.driver.wait(function(){
			 var signIn = browser.driver.findElement(by.name('commit'));
			 console.log('Git signIn');
			 signIn.click();
			 return true;
	  },30000);
	  
	  browser.getAllWindowHandles().then(function (handles) {
		  browser.switchTo().window(handles[0]);
	  });
	  
	  var headerDash = element(by.css('.header-dashboard header h1'));
	  var isClickable = EC.elementToBeClickable(headerDash);
	  browser.wait(isClickable, 30000);
	  
	  
	  var menuItemHeaderList = element.all(by.css('.menu-item-header'));
	  var menuItemHeader = menuItemHeaderList.get(1);
	  var username = menuItemHeader.all(by.css('.username')).get(0);
	  isClickable = EC.elementToBeClickable(username);
	  browser.wait(isClickable, 30000);
	  
	  console.log('out of git login');
	  expect(true).toEqual(true);
  };
  
  
  
  this.logOut = function (dashBoardUrl) {
	  this.get(dashBoardUrl);
	  var EC = protractor.ExpectedConditions;
	  var menuItemHeaders = element.all(by.css('.menu-item-header'));
	  var logoutHeader = menuItemHeaders.get(1);
	  var isClickable = EC.elementToBeClickable(logoutHeader);
	  browser.wait(isClickable, 30000);
	  browser.actions().mouseMove(logoutHeader).perform();
	  var mainMenuLiList = element.all(by.css('.main-menu li'));
	  var submenuLi = mainMenuLiList.get(1);
	  var logoutLink = element(by.partialLinkText('LOG OUT'));
	  
	  isClickable = EC.elementToBeClickable(logoutLink);
	  browser.wait(isClickable, 30000);
	
	  logoutLink.click().then(function() {
		
		  var userInput = element(by.model('vm.username'));
		  var isClickable = EC.elementToBeClickable(userInput);
		  browser.wait(isClickable, 30000);
//		  userInput.sendKeys(loginUser.username);
		  expect(true).toEqual(true);
		
	  });
  };*/
  
};
module.exports = new ProfilePage();