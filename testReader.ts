const GLOBALTEST = `
Page Sex: Option selection doesn't affect the flow.

/*-*/ FUN-24 /*-*/

/*-*/ Complete the flow until you are in /dob /*-*/

Select Female // Since it is Single-select choice, it should auto advance to /dob -+
Go back // The previous selection should remain there -+
Select Male // Since it is Single-select choice, it should auto advance to /dob -+
Go back // The previous selection should remain there -+
Select I prefer not to answer // Since it is Single-select choice, it should auto advance to /dob

/*-*/ /Page: Sex /*-*/

*****

Page: Interstitial find med message

/*-*/ FUN-34 * FUN-33 /*-*/

/*-*/ Complete the flow until you are in /interstitial-state /*-*/

Refresh the page // The animation starts again * The previous state image should remain there. * After a few seconds the continue button should fade in -+
Click Next // The animation doesn't cut * Each paragraph and the next button fade in. -+
Click Next // The Condition page appears (/conditions)

/*-*/ /State - Interstitial-State-Ca - Interstitial med message /*-*/
`